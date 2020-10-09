import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';

import { map, take } from 'rxjs/operators';
import { DailyInfo, DailyInfoList, DailyMeal } from '../interfaces/daily-info';

import { AngularFireFunctions } from '@angular/fire/functions';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DailyInfoService {
  private readonly mealSource = new BehaviorSubject<string>('notChange');
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

  private getDateOfPath(date: string): string {
    return date.substr(0, 5).replace(/\./g, '-');
  }

  private getDayOfMonth(date: string): number {
    return moment(
      date
        .replace(/^/, '20')
        .replace(/\./g, '-')
        .replace(/\(/, '')
        .replace(/\)/, '')
        .replace(/日|月|火|水|木|金|土/, '')
    ).date();
  }

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
          .where('date', '<', date)
          .orderBy('date', 'desc')
          .orderBy('currentWeight', 'desc')
          .limit(1)
      )
      .valueChanges();
  }

  getDailyInfosOfMonth(
    authorId: string,
    date: string
  ): Observable<DailyInfoList> {
    const dateOfPath = this.getDateOfPath(date);
    return this.db
      .doc<DailyInfoList>(`users/${authorId}/dailyInfos/${dateOfPath}`)
      .valueChanges();
  }

  getDailyInfosOfMonths(
    authorId: string,
    today: string
  ): Observable<DailyInfoList[]> {
    const dateOfPath = this.getDateOfPath(today);
    return this.db
      .collection<DailyInfoList>(`users/${authorId}/dailyInfos`, (ref) =>
        ref.where('dateOfPath', '<=', dateOfPath).limit(60)
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
    this.getDailyInfo(dailyInfo.authorId, dailyInfo.date)
      .pipe(take(1))
      .subscribe((isdoc) => {
        const dateOfPath = this.getDateOfPath(dailyInfo.date);
        const dayOfMonth = this.getDayOfMonth(dailyInfo.date);
        if (!isdoc?.date) {
          const dailyId = this.db.createId();
          this.db
            .doc(`users/${dailyInfo.authorId}/dailyInfos/${dateOfPath}`)
            .set(
              {
                list: { [dayOfMonth]: { dailyId, ...dailyInfo } },
                dateOfPath,
              },
              { merge: true }
            );
          return this.db
            .doc(`users/${dailyInfo.authorId}/dailyInfos/${dailyInfo.date}`)
            .set({ dailyId, ...dailyInfo }, { merge: true });
        }
      });
  }

  createDailyInfosMonth(authorId: string, date: string): Promise<void> {
    const dateOfPath = this.getDateOfPath(date);
    const dayOfMonth = this.getDayOfMonth(date);

    return this.db.doc(`users/${authorId}/dailyInfos/${dateOfPath}`).set(
      { list: { [dayOfMonth]: { authorId, date } }, dateOfPath },
      {
        merge: true,
      }
    );
  }

  async updateDailyInfoBody(
    dailyInfo: Omit<
      DailyInfo,
      'dailyId' | 'breakfast' | 'lunch' | 'dinner' | 'dailyMemo'
    >
  ): Promise<void> {
    const dateOfPath = this.getDateOfPath(dailyInfo.date);
    const dayOfMonth = this.getDayOfMonth(dailyInfo.date);
    this.db
      .doc(`users/${dailyInfo.authorId}/dailyInfos/${dailyInfo.date}`)
      .set(dailyInfo, {
        merge: true,
      });
    return this.db
      .doc(`users/${dailyInfo.authorId}/dailyInfos/${dateOfPath}`)
      .set(
        { list: { [dayOfMonth]: dailyInfo }, dateOfPath },
        {
          merge: true,
        }
      )
      .then(() => {
        this.snackBar.open('更新しました', null, {
          duration: 2000,
        });
      });
  }

  updateDailyInfoMemo(
    userId: string,
    date: string,
    dailyMemo: string
  ): Promise<void> {
    const dateOfPath = this.getDateOfPath(date);
    const dayOfMonth = this.getDayOfMonth(date);
    this.db
      .doc(`users/${userId}/dailyInfos/${dateOfPath}`)
      .set(
        { list: { [dayOfMonth]: { userId, date, dailyMemo } }, dateOfPath },
        { merge: true }
      )
      .then(() => {
        this.snackBar.open('保存しました', null, {
          duration: 2000,
        });
      });
    return this.db
      .doc(`users/${userId}/dailyInfos/${date}`)
      .set({ userId, date, dailyMemo }, { merge: true });
  }

  getSelectedFoodsOrSets(
    userId: string,
    date: string,
    whichMeal: string
  ): Observable<DailyMeal[]> {
    return this.db
      .collection<DailyMeal>(
        `users/${userId}/dailyInfos/${date}/${whichMeal}`,
        (ref) => ref.limit(50)
      )
      .valueChanges();
  }

  getAllSelectedFoodsOrSets(
    userId: string,
    date: string
  ): Observable<[DailyMeal[], DailyMeal[], DailyMeal[]]> {
    return combineLatest([
      this.getSelectedFoodsOrSets(userId, date, 'breakfast'),
      this.getSelectedFoodsOrSets(userId, date, 'lunch'),
      this.getSelectedFoodsOrSets(userId, date, 'dinner'),
    ]);
  }

  async addMeal(
    mealContent: Omit<DailyMeal, 'mealId'>,
    userId: string,
    date: string,
    foodOrSet: string
  ): Promise<void> {
    const mealId = this.db.createId();
    const dayOfMonth = this.getDayOfMonth(date);
    this.db
      .doc(`users/${userId}/dailyInfos/${date}/${this.whichMeal}/${mealId}`)
      .set({ ...mealContent, mealId, userId, date })
      .then(() => {
        this.snackBar.open('追加しました', null, {
          duration: 2000,
        });
      });
    const callable = this.fns.httpsCallable('addMeal');
    let cal = 0;
    if (foodOrSet === 'food') {
      cal = mealContent.food.foodCalPerAmount;
    } else if (foodOrSet === 'set') {
      cal = mealContent.set.setCal;
    }
    const amount = mealContent.amount;

    return callable({
      userId,
      date,
      dayOfMonth,
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
    const dayOfMonth = this.getDayOfMonth(date);
    this.db
      .doc(`users/${userId}/dailyInfos/${date}/${this.whichMeal}/${mealId}`)
      .delete();
    const callable = this.fns.httpsCallable('removeMeal');
    return callable({
      userId,
      date,
      dayOfMonth,
      meal: this.whichMeal,
      amount,
      cal,
    }).toPromise();
  }
}
