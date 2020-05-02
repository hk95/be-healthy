import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DailyInfoService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  createDailyInfo(dailyInfo: any) {
    const id = this.db.createId();
    return this.db
      .doc(`dailyInfos/${id}`)
      .set({ id, ...dailyInfo })
      .then(() => {
        this.snackBar.open('登録しました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/top');
      });
  }

  getDailyInfos(userId: string): Observable<User[]> {
    return this.db
      .collection<User>('dailyInfos', (ref) =>
        ref.where('userId', '==', userId)
      )
      .valueChanges();
  }
  getDailyInfo(id: string): Observable<User> {
    console.log(id);
    console.log(this.db.doc<User>(`dailyInfos/${id}`));
    return this.db.doc<User>(`dailyInfos/${id}`).valueChanges();
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
        this.router.navigateByUrl('/top');
      });
  }
}
