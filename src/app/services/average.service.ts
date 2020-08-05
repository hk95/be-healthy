import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import * as moment from 'moment';
import { DailyInfoService } from './daily-info.service';
import { take } from 'rxjs/operators';
import { DailyInfo } from '../interfaces/daily-info';

@Injectable({
  providedIn: 'root',
})
export class AverageService {
  year: number;
  month: number;
  week: number;
  dayOfYear: number;
  dayOfMonth: number;
  dayOfWeek: number;
  allDataOfDate: string;
  date: string;
  totalCal = 0;
  constructor(
    private db: AngularFirestore,
    private fns: AngularFireFunctions,
    private dailyInfoService: DailyInfoService
  ) {}

  // getAverages(userId:string){
  //   this.db.doc(`users/${userId}/weekAverages/${}`)
  // }
  async averageTotalCal(userId: string, date: string) {
    const callableOfYear = this.fns.httpsCallable('calOfYear');
    const callableOfMonth = this.fns.httpsCallable('calOfMonth');
    const callableOfWeek = this.fns.httpsCallable('calOfWeek');

    this.allDataOfDate = await date
      .replace(/^/, '20')
      .replace(/\./g, '-')
      .replace(/\(/, '')
      .replace(/\)/, '')
      .replace(/日|月|火|水|木|金|土/, '');
    await this.db
      .doc(`users/${userId}/dailyInfos/${date}`)
      .valueChanges()
      .pipe(take(5))
      .subscribe(async (dailyInfo: DailyInfo) => {
        if (dailyInfo && dailyInfo.totalCal) {
          this.totalCal = await dailyInfo.totalCal;
        } else {
          this.totalCal = await 0;
        }
      });
    this.year = await moment(this.allDataOfDate).year();
    this.month = (await moment(this.allDataOfDate).month()) + 1;
    this.week = await moment(this.allDataOfDate).week();
    this.dayOfYear = await moment(this.allDataOfDate).dayOfYear();
    this.dayOfMonth = await moment(this.allDataOfDate).date();
    this.dayOfWeek = await moment(this.allDataOfDate).weekday();
    console.log(this.year, this.month, this.week);
    console.log(this.totalCal);

    await this.db.doc(`users/${userId}/averagesYear/${this.year}年`).set(
      {
        [this.dayOfYear]: this.totalCal,
      },
      { merge: true }
    );
    this.db
      .doc(`users/${userId}/averagesMonth/${this.year}年${this.month}月`)
      .set(
        {
          [this.dayOfMonth]: this.totalCal,
        },
        { merge: true }
      );
    await this.db
      .doc(`users/${userId}/averagesWeek/${this.year}年${this.week}週目`)
      .set(
        {
          [this.dayOfWeek]: this.totalCal,
        },
        { merge: true }
      );

    callableOfWeek({
      userId,
      year: this.year,
      month: this.month,
      week: this.week,
      date,
    }).toPromise();
    callableOfMonth({
      userId,
      year: this.year,
      month: this.month,
      week: this.week,
      date,
    }).toPromise();
    return callableOfMonth({
      userId,
      year: this.year,
      month: this.month,
      week: this.week,
      date,
    }).toPromise();
  }
}
