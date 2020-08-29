import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Recipe } from '../interfaces/recipe';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { RecipeWithAuthor } from '../interfaces/recipe';
import { UserService } from './user.service';
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
    private userService: UserService,
    private location: Location,
    private fns: AngularFireFunctions,
    private basicInfoService: BasicInfoService
  ) {}
  getAllRecipes() {
    this.allRecipes$ = this.db
      .collection<Recipe>(`recipes`, (ref) => ref.orderBy('updatedAt', 'desc'))
      .valueChanges();
  }
  getMyRecipes(userId: string): Observable<RecipeWithAuthor[]> {
    const myRecipes$ = this.db
      .collection<Recipe>(`recipes`, (ref) =>
        ref.where('authorId', '==', userId).orderBy('updatedAt', 'desc')
      )
      .valueChanges();

    return myRecipes$.pipe(
      switchMap((myRecipes: Recipe[]) => {
        if (myRecipes.length > 0) {
          const authorIds: string[] = [
            ...new Set(myRecipes.map((recipe: Recipe) => recipe.authorId)),
          ];

          const basicInfos$: Observable<BasicInfo[]> = combineLatest(
            authorIds.map((authorId: string) =>
              this.basicInfoService.getBasicInfo(authorId)
            )
          );
          return combineLatest([of(myRecipes), basicInfos$]);
        } else {
          return combineLatest([of(null), of(null)]);
        }
      }),
      map(([recipes, basicInfos]) => {
        if (recipes && recipes.length > 0) {
          return recipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              author: basicInfos.find(
                (basicInfo) => basicInfo.userId === recipe.authorId
              ),
            };
          });
        }
      })
    );
  }
  getPublicRecipes(userId: string): Observable<RecipeWithAuthor[]> {
    let publicExcludeMyRecipes: Recipe[] = [];
    return this.db
      .collection<Recipe>(`recipes`, (ref) =>
        ref.where('public', '==', true).orderBy('updatedAt', 'desc')
      )
      .valueChanges()
      .pipe(
        switchMap((publicRecipes?: Recipe[]) => {
          if (publicRecipes.length > 0) {
            publicExcludeMyRecipes = publicRecipes.filter((recipe) => {
              return recipe.authorId !== userId;
            });

            const authorIds: string[] = [
              ...new Set(
                publicRecipes.map((recipe: Recipe) => recipe.authorId)
              ),
            ];

            const basicInfos$: Observable<BasicInfo[]> = combineLatest(
              authorIds.map((authorId: string) =>
                this.basicInfoService.getBasicInfo(authorId)
              )
            );
            if (publicExcludeMyRecipes.length) {
              return combineLatest([of(publicExcludeMyRecipes), basicInfos$]);
            } else {
              return combineLatest([of(null), of(null)]);
            }
          } else {
            return combineLatest([of(null), of(null)]);
          }
        }),
        map(([recipes, basicInfos]) => {
          if (basicInfos && basicInfos.length > 0) {
            return recipes.map((recipe: Recipe) => {
              return {
                ...recipe,
                author: basicInfos.find(
                  (basicInfo?) => basicInfo.userId === recipe.authorId
                ),
              };
            });
          }
        })
      );
  }

  getRecipeByRecipeId(recipeId: string): Observable<Recipe> {
    return this.db.doc<Recipe>(`recipes/${recipeId}`).valueChanges();
  }

  tentativeCreateRecipe() {
    const recipeId = this.db.createId();

    return this.router.navigate(['/recipe-update'], {
      queryParams: {
        id: recipeId,
      },
    });
  }

  updateRecipe(
    recipe: Omit<Recipe, 'processes' | 'updatedAt'>,
    processes
  ): Promise<void> {
    return this.db
      .doc<Recipe>(`recipes/${recipe.recipeId}`)
      .set(
        { ...recipe, processes, updatedAt: firestore.Timestamp.now() },
        { merge: true }
      )
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
