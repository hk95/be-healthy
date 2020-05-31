import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { OriginalFood } from '../interfaces/original-food';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';

import { map, take, tap, switchMap } from 'rxjs/operators';
import {
  DailyInfo,
  Breakfast,
  BreakfastWithMeal,
} from '../interfaces/daily-info';

@Injectable({
  providedIn: 'root',
})
export class DailyInfoService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  getDailyInfos(authorId: string): Observable<DailyInfo[]> {
    return this.db
      .collection<DailyInfo>(`users/${authorId}/dailyInfos`, (ref) =>
        ref.orderBy('date', 'desc').limit(7)
      )
      .valueChanges();
  }
  getDailyInfo(authorId: string, date: string): Observable<DailyInfo> {
    return this.db
      .doc<DailyInfo>(`users/${authorId}/dailyInfos/${date}`)
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
        console.log('empty');
        const dailyId = this.db.createId();
        return this.db
          .doc(`users/${dailyInfo.authorId}/dailyInfos/${dailyInfo.date}`)
          .set({
            dailyId,
            ...dailyInfo,
          })
          .then(() => {
            this.router.navigateByUrl('editor-list');
          });
      } else {
        console.log('isdoc');
        this.router.navigateByUrl('editor-list');
      }
    });
  }

  updateDailyInfoBody(
    dailyInfo: Omit<DailyInfo, 'dailyId' | 'breakfast' | 'lunch' | 'dinner'>
  ): Promise<void> {
    console.log(dailyInfo.authorId);
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
  addDailyInfoBreakfast(
    dailyInfo: Omit<
      DailyInfo,
      | 'dailyId'
      | 'currentWeight'
      | 'currentFat'
      | 'lunch'
      | 'dinner'
      | 'dailyMemo'
    >
  ): Promise<void> {
    dailyInfo.breakfast.breakfastId = this.db.createId();
    return this.db
      .doc(
        `users/${dailyInfo.authorId}/dailyInfos/${dailyInfo.date}/breakfast/${dailyInfo.breakfast.breakfastId}`
      )
      .set(dailyInfo.breakfast, {
        merge: true,
      })
      .then(() => {
        this.snackBar.open('追加しました', null, {
          duration: 2000,
        });
      });
  }

  getDailyInfoBreakfast(
    userId: string,
    date: string
  ): Observable<BreakfastWithMeal[]> {
    let meal: Breakfast[];
    console.log(date);

    return this.db
      .collection<Breakfast>(`users/${userId}/dailyInfos/${date}/breakfast`)
      .valueChanges()
      .pipe(
        switchMap((mealdocs: Breakfast[]) => {
          meal = mealdocs;

          if (meal.length) {
            const foodIds: string[] = meal
              .filter((breakfast, index, self) => {
                return (
                  self.findIndex((item) => breakfast.foodId === item.foodId) ===
                  index
                );
              })
              .map((breakfast) => breakfast.foodId);

            return combineLatest(
              foodIds.map((foodId) => {
                return this.db
                  .doc<OriginalFood>(`foods/${foodId}`)
                  .valueChanges();
              })
            );
          } else {
            return of([]);
          }
        }),
        map((foods: OriginalFood[]) => {
          return meal.map((breakfast) => {
            const result: BreakfastWithMeal = {
              ...breakfast,
              meal: foods.find((food) => food.foodId === breakfast.foodId),
            };
            return result;
          });
        })
      );
  }
  deleteDailyInfoFood(
    userId: string,
    date: string,
    breakfastId: string
  ): Promise<void> {
    return this.db
      .doc(`users/${userId}/dailyInfos/${date}/breakfast/${breakfastId}`)
      .delete();
  }
}
