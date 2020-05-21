import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { map, take, tap, switchMap } from 'rxjs/operators';
import { DailyInfo } from '../interfaces/daily-info';

@Injectable({
  providedIn: 'root',
})
export class DailyInfoService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  createDailyInfo(
    dailyInfo: Omit<DailyInfo, 'dailyId' | 'breakfast' | 'lunch' | 'dener'>
  ): Promise<void> {
    const dailyId = this.db.createId();
    return this.db
      .doc(`users/${dailyInfo.authorId}/dailyInfos/${dailyId}`)
      .set({
        dailyId,
        ...dailyInfo,
      })
      .then(() => {
        this.snackBar.open('登録しました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('');
      });
  }

  getDailyInfos(authorId: string): Observable<DailyInfo[]> {
    return this.db
      .collection<DailyInfo>(`users/${authorId}/dailyInfos`, (ref) =>
        ref.where('authorId', '==', authorId).orderBy('date', 'desc').limit(7)
      )
      .valueChanges();
  }
  getDailyInfo(authorId: string, id: string): Observable<DailyInfo> {
    return this.db
      .doc<DailyInfo>(`users/${authorId}/dailyInfos/${id}`)
      .valueChanges();
  }

  isTodayDailyInfo(userId: string, date: string): Observable<DailyInfo> {
    return this.db
      .collection<DailyInfo>(`users/${userId}/dailyInfos`, (ref) =>
        ref.where('date', '==', date)
      )
      .valueChanges()
      .pipe(
        map((isTodayDailyInfo) => {
          if (isTodayDailyInfo.length) {
            return isTodayDailyInfo[0];
          } else {
            console.log(date);
            return null;
          }
        })
      );
  }

  upadateDailyInfo(dailyInfo: any): Promise<void> {
    console.log(dailyInfo.id);
    return this.db
      .doc(`dailyInfos/${dailyInfo.id}`)
      .set(dailyInfo, {
        merge: true,
      })
      .then(() => {
        this.snackBar.open('変更しました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('');
      });
  }
}
