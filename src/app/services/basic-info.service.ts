import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { BasicInfo } from '../interfaces/basic-info';

@Injectable({
  providedIn: 'root',
})
export class BasicInfoService {
  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  getBasicInfo(authorId: string): Observable<BasicInfo> {
    return this.db
      .doc<BasicInfo>(`users/${authorId}/basicInfo/${authorId}`)
      .valueChanges();
  }
  updateBasicInfo(basicInfo: Omit<BasicInfo, 'avatarURL'>): Promise<void> {
    return this.db
      .doc(`users/${basicInfo.userId}/basicInfo/${basicInfo.userId}`)
      .set(basicInfo, { merge: true })
      .then(() => {
        this.snackBar.open('更新しました', null, {
          duration: 2000,
        });
      });
  }
}
