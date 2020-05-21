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

  // 今後ログイン時に自動作成機能追加
  // createBasicInfo(userId: string): Promise<void> {
  //   return this.db.doc(`users/${userId}/basicInfo/${userId}`).set({
  //     userName: '未入力',
  //     gender: '未入力',
  //     height: '未入力',
  //     goalWeight: '未入力',
  //     goalFat: '未入力',
  //     goalCal: '未入力',
  //     authorId: userId,
  //   });
  // }

  getBasicInfo(authorId: string): Observable<BasicInfo> {
    return this.db
      .doc<BasicInfo>(`users/${authorId}/basicInfo/${authorId}`)
      .valueChanges();
  }
  updateBasicInfo(basicInfo: BasicInfo): Promise<void> {
    return this.db
      .doc(`users/${basicInfo.authorId}/basicInfo/${basicInfo.authorId}`)
      .set(basicInfo)
      .then(() => {
        this.snackBar.open('更新しました', null, {
          duration: 2000,
        });
      });
  }
}
