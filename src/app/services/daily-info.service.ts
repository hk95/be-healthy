import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';

import { map, switchMap } from 'rxjs/operators';
import {
  DailyInfo,
  DailyMeal,
  DailyMealWithSet,
} from '../interfaces/daily-info';
import { Set } from '../interfaces/set';
import { SetService } from './set.service';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root',
})
export class DailyInfoService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router,
    private setService: SetService,
    private foodService: FoodService
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
  async addFood(
    mealContet: Omit<DailyMeal, 'mealId'>,
    userId: string,
    date: string,
    whitchMeal: string
  ): Promise<void> {
    const mealId = this.db.createId();
    return this.db
      .doc(`users/${userId}/dailyInfos/${date}/${whitchMeal}(food)/${mealId}`)
      .set({ ...mealContet, mealId })
      .then(() => {
        this.snackBar.open('追加しました', null, {
          duration: 2000,
        });
      });
  }
  async addSet(
    mealContet: Omit<DailyMeal, 'mealId'>,
    userId: string,
    date: string,
    whitchMeal: string
  ): Promise<void> {
    const mealId = this.db.createId();
    return this.db
      .doc(`users/${userId}/dailyInfos/${date}/${whitchMeal}(set)/${mealId}`)
      .set({ ...mealContet, mealId })
      .then(() => {
        this.snackBar.open('追加しました', null, {
          duration: 2000,
        });
      });
  }

  getSelectedFoods(
    userId: string,
    date: string,
    whitchMeal: string
  ): Observable<DailyMeal[]> {
    return this.db
      .collection<DailyMeal>(
        `users/${userId}/dailyInfos/${date}/${whitchMeal}(food)`
      )
      .valueChanges();
  }
  getSelectedSets(
    userId: string,
    date: string,
    whitchMeal: string
  ): Observable<DailyMealWithSet[]> {
    return this.db
      .collection<DailyMeal>(
        `users/${userId}/dailyInfos/${date}/${whitchMeal}(set)`
      )
      .valueChanges()
      .pipe(
        switchMap((meals: DailyMeal[]) => {
          const setIds: string[] = [
            ...new Set(
              meals
                .filter((meal: DailyMeal) => {
                  return meal.setId !== undefined;
                })
                .map((set) => set.setId)
            ),
          ];
          const sets$: Observable<Set[]> = combineLatest(
            setIds.map((setid: string) =>
              this.setService.getSetById(userId, setid)
            )
          );

          return combineLatest([of(meals), sets$]);
        }),
        map(([meals, sets]) => {
          return meals.map((meal) => {
            return {
              ...meal,
              set: sets.find((set) => set.setId === meal.setId),
            };
          });
        })
      );
  }
  deleteMeal(
    userId: string,
    date: string,
    mealId: string,
    whitchMeal: string,
    foodOrSet: string
  ): Promise<void> {
    return this.db
      .doc(
        `users/${userId}/dailyInfos/${date}/${whitchMeal}(${foodOrSet})/${mealId}`
      )
      .delete();
  }
}
