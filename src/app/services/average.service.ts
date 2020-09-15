import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { DailyInfo } from '../interfaces/daily-info';
import { combineLatest, Observable } from 'rxjs';
import {
  AverageOfYear,
  AverageOfMonth,
  AverageOfWeek,
} from '../interfaces/average';

@Injectable({
  providedIn: 'root',
})
export class AverageService {
  totalCal = 0;
  constructor(
    private db: AngularFirestore,
    private fns: AngularFireFunctions
  ) {}
  getAllDataOfDate(date: string): string {
    return date
      .replace(/^/, '20')
      .replace(/\./g, '-')
      .replace(/\(/, '')
      .replace(/\)/, '')
      .replace(/日|月|火|水|木|金|土/, '');
  }

  getAveragesOfYear(
    userId: string
  ): Observable<[AverageOfYear[], AverageOfYear[], AverageOfYear[]]> {
    const getAverages = (category: string) => {
      return this.db
        .collection<AverageOfYear>(`users/${userId}/averagesYear`, (ref) =>
          ref.where('category', '==', category).orderBy('date', 'desc')
        )
        .valueChanges();
    };
    const weightAverages: Observable<AverageOfYear[]> = getAverages('weight');
    const fatAverages: Observable<AverageOfYear[]> = getAverages('fat');
    const calAverages: Observable<AverageOfYear[]> = getAverages('cal');
    return combineLatest([weightAverages, fatAverages, calAverages]);
  }
  getAveragesOfMonth(
    userId: string,
    date: string
  ): Observable<[AverageOfMonth[], AverageOfMonth[], AverageOfMonth[]]> {
    const getAverages = (category: string) => {
      return this.db
        .collection<AverageOfMonth>(`users/${userId}/averagesMonth`, (ref) =>
          ref
            .where('date', '<=', date)
            .where('category', '==', category)
            .orderBy('date', 'desc')
            .limit(12)
        )
        .valueChanges();
    };
    const weightAverages: Observable<AverageOfMonth[]> = getAverages('weight');
    const fatAverages: Observable<AverageOfMonth[]> = getAverages('fat');
    const calAverages: Observable<AverageOfMonth[]> = getAverages('cal');

    return combineLatest([weightAverages, fatAverages, calAverages]);
  }
  getAveragesOfWeek(
    userId: string,
    date: string
  ): Observable<[AverageOfWeek[], AverageOfWeek[], AverageOfWeek[]]> {
    const getAverages = (category: string): Observable<any[]> => {
      return this.db
        .collection<AverageOfWeek>(`users/${userId}/averagesWeek`, (ref) =>
          ref
            .where('date', '<=', date)
            .where('category', '==', category)
            .orderBy('date', 'desc')
            .limit(24)
        )
        .valueChanges();
    };
    const weightAverages: Observable<AverageOfWeek[]> = getAverages('weight');
    const fatAverages: Observable<AverageOfWeek[]> = getAverages('fat');
    const calAverages: Observable<AverageOfWeek[]> = getAverages('cal');
    return combineLatest([weightAverages, fatAverages, calAverages]);
  }

  async averageWeightAndFat(
    userId: string,
    date: string,
    currentWeight: number,
    currentFat: number
  ) {
    const weightOfYear = this.fns.httpsCallable('averageWeightOfYear');
    const fatOfYear = this.fns.httpsCallable('averageFatOfYear');
    const weightOfMonth = this.fns.httpsCallable('averageWeightOfMonth');
    const fatOfMonth = this.fns.httpsCallable('averageFatOfMonth');
    const weightOfWeek = this.fns.httpsCallable('averageWeightOfWeek');
    const fatOfWeek = this.fns.httpsCallable('averageFatOfWeek');

    const allDataOfDate = this.getAllDataOfDate(date);

    const year = await moment(allDataOfDate).year();
    const month = (await moment(allDataOfDate).month()) + 1;
    const week = await moment(allDataOfDate).week();
    const dayOfYear = await moment(allDataOfDate).dayOfYear();
    const dayOfMonth = await moment(allDataOfDate).date();
    const dayOfWeek = await moment(allDataOfDate).weekday();

    await this.db.doc(`users/${userId}/averagesYear/${year}年体重`).set(
      {
        [dayOfYear]: currentWeight,
        category: 'weight',
        date,
        year,
      },
      { merge: true }
    );
    this.db.doc(`users/${userId}/averagesMonth/${year}年${month}月体重`).set(
      {
        [dayOfMonth]: currentWeight,
        category: 'weight',
        date,
        year,
        month,
      },
      { merge: true }
    );
    await this.db
      .doc(`users/${userId}/averagesWeek/${year}年${week}週目体重`)
      .set(
        {
          [dayOfWeek]: currentWeight,
          category: 'weight',
          date,
          year,
          week,
        },
        { merge: true }
      );
    await this.db.doc(`users/${userId}/averagesYear/${year}年体脂肪`).set(
      {
        [dayOfYear]: currentFat,
        category: 'fat',
        date,
        year,
      },
      { merge: true }
    );
    this.db.doc(`users/${userId}/averagesMonth/${year}年${month}月体脂肪`).set(
      {
        [dayOfMonth]: currentFat,
        category: 'fat',
        date,
        year,
        month,
      },
      { merge: true }
    );
    await this.db
      .doc(`users/${userId}/averagesWeek/${year}年${week}週目体脂肪`)
      .set(
        {
          [dayOfWeek]: currentFat,
          category: 'fat',
          date,
          year,
          week,
        },
        { merge: true }
      );
    weightOfYear({
      userId,
      year,
      month,
      week,
      date,
    }).toPromise();
    weightOfMonth({
      userId,
      year,
      month,
      week,
      date,
    }).toPromise();
    weightOfWeek({
      userId,
      year,
      month,
      week,
      date,
    }).toPromise();
    fatOfYear({
      userId,
      year,
      month,
      week,
      date,
    }).toPromise();
    fatOfWeek({
      userId,
      year,
      month,
      week,
      date,
    }).toPromise();
    return fatOfMonth({
      userId,
      year,
      month,
      week,
      date,
    }).toPromise();
  }

  async averageTotalCal(userId: string, date: string) {
    const callableOfYear = this.fns.httpsCallable('averageCalOfYear');
    const callableOfMonth = this.fns.httpsCallable('averageCalOfMonth');
    const callableOfWeek = this.fns.httpsCallable('averageCalOfWeek');

    const allDataOfDate = this.getAllDataOfDate(date);
    await this.db
      .doc(`users/${userId}/dailyInfos/${date}`)
      .valueChanges()
      .pipe(take(1))
      .subscribe(async (dailyInfo: DailyInfo) => {
        if (dailyInfo && dailyInfo.totalCal) {
          this.totalCal = await dailyInfo.totalCal;
        } else {
          this.totalCal = await 0;
        }
      });
    const year = await moment(allDataOfDate).year();
    const month = (await moment(allDataOfDate).month()) + 1;
    const week = await moment(allDataOfDate).week();
    const dayOfYear = await moment(allDataOfDate).dayOfYear();
    const dayOfMonth = await moment(allDataOfDate).date();
    const dayOfWeek = await moment(allDataOfDate).weekday();

    await this.db.doc(`users/${userId}/averagesYear/${year}年カロリー`).set(
      {
        [dayOfYear]: this.totalCal,
        category: 'cal',
        date,
        year,
      },
      { merge: true }
    );
    this.db
      .doc(`users/${userId}/averagesMonth/${year}年${month}月カロリー`)
      .set(
        {
          [dayOfMonth]: this.totalCal,
          category: 'cal',
          date,
          year,
          month,
        },
        { merge: true }
      );
    await this.db
      .doc(`users/${userId}/averagesWeek/${year}年${week}週目カロリー`)
      .set(
        {
          [dayOfWeek]: this.totalCal,
          category: 'cal',
          date,
          year,
          week,
        },
        { merge: true }
      );

    callableOfWeek({
      userId,
      year,
      month,
      week,
      date,
    }).toPromise();
    callableOfMonth({
      userId,
      year,
      month,
      week,
      date,
    }).toPromise();
    return callableOfYear({
      userId,
      year,
      month,
      week,
      date,
    }).toPromise();
  }
}