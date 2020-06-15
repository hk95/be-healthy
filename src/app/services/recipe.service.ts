import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddedFood } from '../interfaces/added-food';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(
    private db: AngularFirestore,
    public storage: AngularFireStorage,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  createRecipe(
    recipe: Omit<AddedFood, 'recipeId' | 'processes' | 'craetedAt'>,
    processes
  ): Promise<void> {
    const recipeId = this.db.createId();
    return this.db
      .doc<AddedFood>(`recipes/${recipeId}`)
      .set({
        recipeId,
        ...recipe,
        processes,
        craetedAt: firestore.Timestamp.now(),
      })
      .then(() => {
        this.snackBar.open('レシピを作成しました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('menu');
      });
  }

  async uploadThumbnail(userId: string, file: Blob) {
    const result = await this.storage
      .ref(`users/${userId}/recipes/thumnail`)
      .put(file);
    const imageURL: string = await result.ref.getDownloadURL();
    return imageURL;
  }

  async uploadProcessImage(userId: string, file: Blob) {
    const result = await this.storage
      .ref(`users/${userId}/recipes/processImage`)
      .put(file);
    const imageURL: string = await result.ref.getDownloadURL();
    return imageURL;
  }
}
