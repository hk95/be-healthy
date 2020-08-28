import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Recipe } from '../interfaces/recipe';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, combineLatest, of, merge } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { RecipeWithAuthor } from '../interfaces/recipe';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { Location } from '@angular/common';

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
    private location: Location
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
        const authorIds: string[] = [
          ...new Set(myRecipes.map((recipe: Recipe) => recipe.authorId)),
        ];

        const users$: Observable<User[]> = combineLatest(
          authorIds.map((authorId: string) =>
            this.userService.getUser(authorId)
          )
        );
        return combineLatest([of(myRecipes), users$]);
      }),
      map(([recipes, users]) => {
        return recipes.map((recipe: Recipe) => {
          return {
            ...recipe,
            author: users.find((user) => user.userId === recipe.authorId),
          };
        });
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

            const users$: Observable<User[]> = combineLatest(
              authorIds.map((authorId: string) =>
                this.userService.getUser(authorId)
              )
            );
            if (publicExcludeMyRecipes.length) {
              return combineLatest([of(publicExcludeMyRecipes), users$]);
            } else {
              return combineLatest([of(null), of(null)]);
            }
          } else {
            return combineLatest([of(null), of(null)]);
          }
        }),
        map(([recipes, users]) => {
          if (users && users.length > 0) {
            return recipes.map((recipe: Recipe) => {
              return {
                ...recipe,
                author: users.find((user?) => user.userId === recipe.authorId),
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
  deleteRecipe(recipeId: string): Promise<void> {
    return this.db
      .doc<Recipe>(`recipes/${recipeId}`)
      .delete()
      .then(() => {
        this.snackBar.open('レシピを削除しました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('menu');
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
}
