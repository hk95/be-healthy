import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(public storage: AngularFireStorage) {}

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
