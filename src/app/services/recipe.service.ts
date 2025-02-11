import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  AngularFirestore,
  QueryDocumentSnapshot,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { Recipe } from '../interfaces/recipe';
import { Timestamp } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { RecipeWithAuthor } from '../interfaces/recipe';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { BasicInfoService } from './basic-info.service';
import { BasicInfo } from '../interfaces/basic-info';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(
    private db: AngularFirestore,
    public storage: AngularFireStorage,
    private snackBar: MatSnackBar,
    private fns: AngularFireFunctions,
    private basicInfoService: BasicInfoService
  ) {}

  getMyRecipes(
    userId: string,
    perDocNum: number,
    lastDoc?: QueryDocumentSnapshot<Recipe>
  ): Observable<{
    data: RecipeWithAuthor[];
    nextLastDoc: QueryDocumentSnapshot<Recipe>;
  }> {
    const myRecipes$ = this.db
      .collection<Recipe>(`recipes`, (ref) => {
        let query = ref
          .where('authorId', '==', userId)
          .orderBy('updatedAt', 'desc')
          .limit(perDocNum);
        if (lastDoc) {
          query = query.startAfter(lastDoc).limit(perDocNum);
        }
        return query;
      })
      .snapshotChanges();

    let nextLastDoc: QueryDocumentSnapshot<Recipe>;

    return myRecipes$.pipe(
      switchMap((myRecipes: DocumentChangeAction<Recipe>[]) => {
        if (myRecipes.length > 0) {
          nextLastDoc = myRecipes[myRecipes.length - 1].payload.doc;

          const RecipeWithoutAuthor = myRecipes.map((recipe) =>
            recipe.payload.doc.data()
          );
          const basicInfo$ = this.basicInfoService.getBasicInfo(userId);

          return combineLatest([of(RecipeWithoutAuthor), basicInfo$]);
        } else {
          return of([]);
        }
      }),
      map(([recipes, basicInfo]): {
        data: RecipeWithAuthor[];
        nextLastDoc: QueryDocumentSnapshot<Recipe>;
      } => {
        if (recipes?.length > 0 && basicInfo) {
          const recipeswithAuthor: RecipeWithAuthor[] = recipes.map(
            (recipe: Recipe) => {
              return {
                ...recipe,
                author: basicInfo,
              };
            }
          );
          return {
            data: recipeswithAuthor,
            nextLastDoc,
          };
        } else {
          return null;
        }
      })
    );
  }

  getPublicRecipes(
    perDocNum: number,
    lastDoc?: QueryDocumentSnapshot<Recipe>
  ): Observable<{
    data: RecipeWithAuthor[];
    nextLastDoc: QueryDocumentSnapshot<Recipe>;
  }> {
    const publicRecipes$ = this.db
      .collection<Recipe>(`recipes`, (ref) => {
        let query = ref
          .where('public', '==', true)
          .orderBy('updatedAt', 'desc')
          .limit(perDocNum);
        if (lastDoc) {
          query = query.startAfter(lastDoc).limit(perDocNum);
        }
        return query;
      })
      .snapshotChanges();
    let nextLastDoc: QueryDocumentSnapshot<Recipe>;
    return publicRecipes$.pipe(
      switchMap((publicRecipes?: DocumentChangeAction<Recipe>[]) => {
        if (publicRecipes.length > 0) {
          nextLastDoc = publicRecipes[publicRecipes.length - 1].payload.doc;
          const authorIds: string[] = [
            ...new Set(
              publicRecipes.map(
                (recipe: DocumentChangeAction<Recipe>) =>
                  recipe.payload.doc.data().authorId
              )
            ),
          ];

          const basicInfos$: Observable<BasicInfo[]> = combineLatest(
            authorIds.map((authorId: string) =>
              this.basicInfoService.getBasicInfo(authorId)
            )
          );

          const publicRecipesWithoutAuthor: Recipe[] = publicRecipes.map(
            (recipeOfDoc) => recipeOfDoc.payload.doc.data()
          );

          if (publicRecipesWithoutAuthor.length) {
            return combineLatest([of(publicRecipesWithoutAuthor), basicInfos$]);
          } else {
            return of([]);
          }
        } else {
          return of([]);
        }
      }),
      map(([recipes, basicInfos]: [Recipe[], BasicInfo[]]) => {
        if (basicInfos?.length > 0) {
          const publicRecipes: RecipeWithAuthor[] = recipes.map(
            (recipe: Recipe) => {
              return {
                ...recipe,
                author: basicInfos.find(
                  (basicInfo: BasicInfo) => basicInfo.userId === recipe.authorId
                ),
              };
            }
          );

          return {
            data: publicRecipes,
            nextLastDoc,
          };
        } else {
          return null;
        }
      })
    );
  }

  getRecipeByRecipeId(recipeId: string): Observable<Recipe> {
    return this.db.doc<Recipe>(`recipes/${recipeId}`).valueChanges();
  }

  async createRecipe(recipe: Omit<Recipe, 'recipeId'>): Promise<void> {
    const recipeId = this.db.createId();
    const updatedAt = Timestamp.now();
    return this.db
      .doc<Recipe>(`recipes/${recipeId}`)
      .set({ ...recipe, recipeId, updatedAt })
      .then(() => {
        this.snackBar.open('レシピを作成しました', null, {
          duration: 2000,
        });
      });
  }

  async updateRecipe(recipe: Recipe): Promise<void> {
    const updatedAt = Timestamp.now();
    return this.db
      .doc<Recipe>(`recipes/${recipe.recipeId}`)
      .update({ ...recipe, updatedAt })
      .then(() => {
        this.snackBar.open('レシピを更新しました', null, {
          duration: 2000,
        });
      });
  }

  async deleteRecipe(userId: string, recipeId: string): Promise<void> {
    this.deleteUpdatedImage(userId, recipeId);
    return this.db
      .doc<Recipe>(`recipes/${recipeId}`)
      .delete()
      .then(() => {
        this.snackBar.open('レシピを削除しました', null, {
          duration: 2000,
        });
      });
  }

  async uploadThumbnail(userId: string, recipeId: string, file: Blob) {
    const imageId = this.db.createId();
    const result = await this.storage
      .ref(`users/${userId}/recipes/${recipeId}/thumnail/${imageId}`)
      .put(file);
    const imageURL: string = await result.ref.getDownloadURL();
    return imageURL;
  }

  async uploadProcessImage(
    userId: string,
    recipeId: string,
    file: Blob
  ): Promise<string> {
    const imageId = this.db.createId();
    const result = await this.storage
      .ref(`users/${userId}/recipes/${recipeId}/processImages/${imageId}`)
      .put(file);
    const imageURL: string = await result.ref.getDownloadURL();
    return imageURL;
  }

  async deleteUpdatedImage(userId: string, recipeId: string) {
    const callable = this.fns.httpsCallable('deleteUpdatedImage');
    return callable({ userId, recipeId });
  }
}
