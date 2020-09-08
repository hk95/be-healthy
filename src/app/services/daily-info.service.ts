import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';

import { map } from 'rxjs/operators';
import { DailyInfo, DailyMeal } from '../interfaces/daily-info';

import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root',
})
export class DailyInfoService {
  mealSource = new BehaviorSubject<string>('notChange');
  whichMeal$ = this.mealSource.asObservable();
  whichMeal: string;
  meal: string;
  date: string;
  queryParams: string[];
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router,
    private fns: AngularFireFunctions
  ) {}
  goToSetPage(date: string, meal: string) {
    this.queryParams = [date, meal];
    this.router.navigateByUrl('/menu/set-list');
  }
  changeMeal(meal: string) {
    this.whichMeal = meal;
    this.mealSource.next(meal);
  }
  getPreviousDailyInfo(userId: string, date: string): Observable<DailyInfo[]> {
    return this.db
      .collection<DailyInfo>(`users/${userId}/dailyInfos`, (ref) =>
        ref
          .where('date', '<=', date)
          .orderBy('date', 'desc')
          .orderBy('currentWeight', 'desc')
          .limit(1)
      )
      .valueChanges();
  }
  getDailyInfos(authorId: string, date: string): Observable<DailyInfo[]> {
    return this.db
      .collection<DailyInfo>(`users/${authorId}/dailyInfos`, (ref) =>
        ref.where('date', '<=', date).orderBy('date', 'desc').limit(7)
      )
      .valueChanges();
  }
  getDailyInfo(authorId: string, date: string): Observable<DailyInfo> {
    return this.db
      .doc<DailyInfo>(`users/${authorId}/dailyInfos/${date}`)
      .valueChanges();
  }
  getDailyInfosEveryWeek(
    authorId: string,
    dates: string[]
  ): Observable<DailyInfo>[] {
    return dates.map((date: string) => {
      return this.db
        .doc<DailyInfo>(`users/${authorId}/dailyInfos/${date}`)
        .valueChanges();
    });
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
            return null;
          }
        })
      );
  }

  createDailyInfo(
    dailyInfo: Omit<
      DailyInfo,
      | 'dailyId'
      | 'currentWeight'
      | 'currentFat'
      | 'breakfast'
      | 'lunch'
      | 'dinner'
      | 'dailyMemo'
    >
  ) {
    this.getDailyInfo(dailyInfo.authorId, dailyInfo.date).subscribe((isdoc) => {
      if (!isdoc) {
        const dailyId = this.db.createId();
        return this.db
          .doc(`users/${dailyInfo.authorId}/dailyInfos/${dailyInfo.date}`)
          .set({
            dailyId,
            ...dailyInfo,
          });
      }
    });
  }

  updateDailyInfoBody(
    dailyInfo: Omit<
      DailyInfo,
      'dailyId' | 'breakfast' | 'lunch' | 'dinner' | 'dailyMemo'
    >
  ): Promise<void> {
    return this.db
      .doc(`users/${dailyInfo.authorId}/dailyInfos/${dailyInfo.date}`)
      .set(dailyInfo, {
        merge: true,
      })
      .then(() => {
        this.snackBar.open('更新しました', null, {
          duration: 2000,
        });
      });
  }
  updateDailyInfoMemo(userId: string, date: string, dailyMemo: string) {
    return this.db
      .doc(`users/${userId}/dailyInfos/${date}`)
      .set(
        {
          dailyMemo,
        },
        { merge: true }
      )
      .then(() => {
        this.snackBar.open('保存しました', null, {
          duration: 2000,
        });
      });
  }

  getSelectedFoodsOrSets(
    userId: string,
    date: string,
    whichMeal: string
  ): Observable<DailyMeal[]> {
    return this.db
      .collection<DailyMeal>(`users/${userId}/dailyInfos/${date}/${whichMeal}`)
      .valueChanges();
  }
  getAllSelectedFoodsOrSets(userId: string, date: string) {
    return combineLatest([
      this.getSelectedFoodsOrSets(userId, date, 'breakfast'),
      this.getSelectedFoodsOrSets(userId, date, 'lunch'),
      this.getSelectedFoodsOrSets(userId, date, 'dinner'),
    ]);
  }

  async addMeal(
    mealContet: Omit<DailyMeal, 'mealId'>,
    userId: string,
    date: string,
    foodOrSet: string
  ): Promise<void> {
    const mealId = this.db.createId();
    this.db
      .doc(`users/${userId}/dailyInfos/${date}/${this.whichMeal}/${mealId}`)
      .set({ ...mealContet, mealId })
      .then(() => {
        this.snackBar.open('追加しました', null, {
          duration: 2000,
        });
      });
    const callable = this.fns.httpsCallable('addMeal');
    let cal = 0;
    if (foodOrSet === 'food') {
      cal = mealContet.food.foodCalPerAmount;
    } else if (foodOrSet === 'set') {
      cal = mealContet.set.setCal;
    }
    const amount = mealContet.amount;
    return callable({
      userId,
      date,
      meal: this.whichMeal,
      amount,
      cal,
    }).toPromise();
  }

  deleteMeal(
    userId: string,
    date: string,
    mealId: string,

    amount: number,
    cal: number
  ): Promise<void> {
    this.db
      .doc(`users/${userId}/dailyInfos/${date}/${this.whichMeal}/${mealId}`)
      .delete();
    const callable = this.fns.httpsCallable('removeMeal');
    return callable({
      userId,
      date,
      meal: this.whichMeal,
      amount,
      cal,
    }).toPromise();
  }
}
