import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddedFood } from '../interfaces/added-food';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { RecipeWithAuthor } from '../interfaces/added-food';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  allRecipes$: Observable<AddedFood[]>;
  constructor(
    private db: AngularFirestore,
    public storage: AngularFireStorage,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private authServce: AuthService
  ) {
    this.allRecipes$ = this.db
      .collection<AddedFood>(`recipes`, (ref) =>
        ref.orderBy('createdAt', 'desc')
      )
      .valueChanges();
  }

  getMyRecipes(): Observable<RecipeWithAuthor[]> {
    const myRecipes = [];

    return this.allRecipes$.pipe(
      switchMap((allRecipes: AddedFood[]) => {
        allRecipes.map((recipe) => {
          if (recipe.authorId === this.authServce.uid) {
            return myRecipes.push(recipe);
          }
        });
        const authorIds: string[] = Array.from(
          new Set(allRecipes.map((recipe: AddedFood) => recipe.authorId))
        );

        const users$: Observable<User[]> = combineLatest(
          authorIds.map((authorId: string) =>
            this.userService.getUser(authorId)
          )
        );
        return combineLatest([of(myRecipes), users$]);
      }),
      map(([recipes, users]) => {
        return recipes.map((recipe: AddedFood) => {
          return {
            ...recipe,
            author: users.find((user) => user.userId === recipe.authorId),
          };
        });
      })
    );
  }
  getPublicRecipes(): Observable<RecipeWithAuthor[]> {
    const publicRecipes = [];

    return this.allRecipes$.pipe(
      switchMap((allRecipes: AddedFood[]) => {
        allRecipes.map((recipe) => {
          if (
            recipe.authorId !== this.authServce.uid &&
            recipe.public === true
          ) {
            return publicRecipes.push(recipe);
          }
        });
        const authorIds: string[] = Array.from(
          new Set(allRecipes.map((recipe: AddedFood) => recipe.authorId))
        );

        const users$: Observable<User[]> = combineLatest(
          authorIds.map((authorId: string) =>
            this.userService.getUser(authorId)
          )
        );
        return combineLatest([of(publicRecipes), users$]);
      }),
      map(([recipes, users]) => {
        return recipes.map((recipe: AddedFood) => {
          return {
            ...recipe,
            author: users.find((user) => user.userId === recipe.authorId),
          };
        });
      })
    );
  }

  getRecipeByRecipeId(recipeId: string): Observable<AddedFood> {
    return this.db.doc<AddedFood>(`recipes/${recipeId}`).valueChanges();
  }

  tentativeCreateRecipe(): Promise<void> {
    const recipeId = this.db.createId();
    return this.db
      .doc(`recipes/${recipeId}`)
      .set({
        recipeId,
        authorId: this.authServce.uid,
      })
      .then(() => {
        this.router.navigate(['/recipe-create'], {
          queryParams: {
            id: recipeId,
          },
        });
      });
  }
  tentativeDelRecipe(recipeId): Promise<void> {
    return this.db
      .doc(`recipes/${recipeId}`)
      .delete()
      .then(() => {
        this.router.navigateByUrl('/menu');
      });
  }

  createRecipe(
    recipe: Omit<AddedFood, 'processes' | 'createdAt'>,
    processes
  ): Promise<void> {
    return this.db
      .doc<AddedFood>(`recipes/${recipe.recipeId}`)
      .set(
        {
          ...recipe,
          processes,
          createdAt: firestore.Timestamp.now(),
        },
        {
          merge: true,
        }
      )
      .then(() => {
        this.snackBar.open('レシピを作成しました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('menu');
      });
  }
  updateRecipe(
    recipe: Omit<AddedFood, 'processes' | 'createdAt'>,
    processes
  ): Promise<void> {
    return this.db
      .doc<AddedFood>(`recipes/${recipe.recipeId}`)
      .update({ ...recipe, processes, createdAt: firestore.Timestamp.now() })
      .then(() => {
        this.snackBar.open('レシピを更新しました', null, {
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
