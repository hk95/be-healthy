import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFirestore,
  QueryDocumentSnapshot,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { Recipe } from '../interfaces/recipe';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { RecipeWithAuthor } from '../interfaces/recipe';
import { Location } from '@angular/common';
import { AngularFireFunctions } from '@angular/fire/functions';
import { BasicInfoService } from './basic-info.service';
import { BasicInfo } from '../interfaces/basic-info';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  allRecipes$: Observable<Recipe[]>;
  constructor(
    private db: AngularFirestore,
    public storage: AngularFireStorage,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
    private fns: AngularFireFunctions,
    private basicInfoService: BasicInfoService
  ) {}
  getMyRecipes(
    userId: string,
    getNumber: number,
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
          .limit(getNumber);
        if (lastDoc) {
          query = query.startAfter(lastDoc).limit(getNumber);
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
        if (recipes && recipes.length > 0 && basicInfo) {
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
    getNumber: number,
    lastDoc: QueryDocumentSnapshot<Recipe>
  ): Observable<{
    data: RecipeWithAuthor[];
    nextLastDoc: QueryDocumentSnapshot<Recipe>;
  }> {
    const publicRecipes$ = this.db
      .collection<Recipe>(`recipes`, (ref) => {
        let query = ref
          .where('public', '==', true)
          .orderBy('updatedAt', 'desc')
          .limit(getNumber);
        if (lastDoc) {
          query = query.startAfter(lastDoc).limit(getNumber);
        }
        return query;
      })
      .snapshotChanges();
    let nextLastDoc: QueryDocumentSnapshot<Recipe>;
    return publicRecipes$.pipe(
      switchMap((publicRecipes?: DocumentChangeAction<Recipe>[]) => {
        if (publicRecipes.length > 0) {
          nextLastDoc = publicRecipes[publicRecipes.length - 1].payload.doc;

          const publicRecipesWithoutAuthor: Recipe[] = publicRecipes.map(
            (recipeOfDoc) => recipeOfDoc.payload.doc.data()
          );

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
          if (publicRecipesWithoutAuthor.length) {
            return combineLatest([of(publicRecipesWithoutAuthor), basicInfos$]);
          } else {
            return combineLatest([of(null), of(null)]);
          }
        } else {
          return combineLatest([of(null), of(null)]);
        }
      }),
      map(([recipes, basicInfos]) => {
        if (basicInfos && basicInfos.length > 0) {
          const publicRecipes: RecipeWithAuthor[] = recipes.map(
            (recipe: Recipe) => {
              return {
                ...recipe,
                author: basicInfos.find(
                  (basicInfo?) => basicInfo.userId === recipe.authorId
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

  // tentativeCreateRecipe() {
  //   const recipeId = this.db.createId();
  //   return this.router.navigate(['/recipe-editor'], {
  //     queryParams: {
  //       id: recipeId,
  //     },
  //   });
  // }
  createRecipe(recipe: Omit<Recipe, 'recipeId'>): Promise<void> {
    const recipeId = this.db.createId();
    const updatedAt = firestore.Timestamp.now();
    return this.db
      .doc<Recipe>(`recipes/${recipeId}`)
      .set({ ...recipe, recipeId, updatedAt })
      .then(() => {
        this.snackBar.open('レシピを作成しました', null, {
          duration: 2000,
        });
        this.location.back();
      });
  }

  updateRecipe(recipe: Recipe): Promise<void> {
    const updatedAt = firestore.Timestamp.now();
    return this.db
      .doc<Recipe>(`recipes/${recipe.recipeId}`)
      .update({ ...recipe, updatedAt })

      .then(() => {
        this.snackBar.open('レシピを更新しました', null, {
          duration: 2000,
        });
        this.location.back();
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
        this.router.navigateByUrl('menu/recipe-list');
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

  async uploadProcessImage(userId: string, recipeId: string, file: Blob) {
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
