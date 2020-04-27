import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DailyInfoService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  editDailyInfo(dailyInfo: User) {
    const dailyId = this.db.createId();
    return this.db
      .doc(`dailyInfos/${dailyId}`)
      .set(dailyInfo)
      .then(() => {
        this.snackBar.open('登録しました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/top');
      });
  }

  getDailyInfo(userId: string): Observable<User> {
    return this.db
      .collection<User>('dailyInfos', (ref) =>
        ref.where('userId', '==', userId)
      )
      .valueChanges()
      .pipe(
        map((dailyinfos) => {
          if (dailyinfos.length) {
            return dailyinfos[2];
          } else {
            return null;
          }
        })
      );
  }
}
