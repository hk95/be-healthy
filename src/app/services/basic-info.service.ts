import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Observable } from 'rxjs';
import { BasicInfo } from '../interfaces/basic-info';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class BasicInfoService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    public storage: AngularFireStorage
  ) {}

  getBasicInfo(authorId: string): Observable<BasicInfo> {
    return this.db
      .doc<BasicInfo>(`users/${authorId}/basicInfo/${authorId}`)
      .valueChanges();
  }

  async updateBasicInfo(basicInfo: BasicInfo): Promise<void> {
    return this.db
      .doc(`users/${basicInfo.userId}/basicInfo/${basicInfo.userId}`)
      .set(basicInfo, { merge: true })
      .then(() => {
        this.snackBar.open('更新しました', null, {
          duration: 2000,
        });
      });
  }
  async uploadAvatar(userId: string, file: Blob): Promise<string> {
    const imageId = this.db.createId();
    const result = await this.storage
      .ref(`users/${userId}/avatar/${imageId}`)
      .put(file);
    const imageURL: string = await result.ref.getDownloadURL();
    return imageURL;
  }
}
