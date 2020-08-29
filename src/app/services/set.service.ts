import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Set, FoodInArray } from '../interfaces/set';
import { combineLatest, Observable, of, observable } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SetService {
  submitted: boolean;
  constructor(
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar,
    private fns: AngularFireFunctions,
    private location: Location
  ) {}

  getSets(userId: string): Observable<Set[]> | Observable<null> {
    return this.db
      .collection<Set>(`users/${userId}/sets`, (ref) =>
        ref.orderBy('updatedAt', 'desc')
      )
      .valueChanges()
      .pipe(
        switchMap((sets: Set[]) => {
          if (sets && sets.length > 0) {
            const allSets = sets.map((set) => {
              return this.db
                .collection<Set>(`users/${userId}/sets/${set.setId}/foodsArray`)
                .valueChanges()
                .pipe(
                  map((foodsArray: Set[]) => {
                    return Object.assign(set, { foodsArray });
                  })
                );
            });
            return combineLatest([...allSets]);
          } else {
            return of(null);
          }
        })
      );
  }
  getSetsOfMeal(userId: string, meal: string): Observable<Set[]> {
    return this.db
      .collection<Set>(`users/${userId}/sets`, (ref) =>
        ref.orderBy('updatedAt', 'desc').where(meal, '==', true)
      )
      .valueChanges()
      .pipe(
        switchMap((sets: Set[]) => {
          if (sets.length) {
            const allSets = sets.map((set) => {
              return this.db
                .collection<Set>(`users/${userId}/sets/${set.setId}/foodsArray`)
                .valueChanges()
                .pipe(
                  map((foodsArray: Set[]) => {
                    return Object.assign(set, { foodsArray });
                  })
                );
            });
            return combineLatest([...allSets]);
          } else {
            return of([]);
          }
        })
      );
  }
  getSetByIdWithFoods(
    userId: string,
    setId: string
  ): Observable<Set & { foodsArray: FoodInArray[] }> {
    return this.db
      .doc<Set>(`users/${userId}/sets/${setId}`)
      .valueChanges()
      .pipe(
        switchMap((set: Set) => {
          const setWithArray$: Observable<
            Set & { foodsArray: FoodInArray[] }
          > = this.db
            .collection<FoodInArray>(`users/${userId}/sets/${setId}/foodsArray`)
            .valueChanges()
            .pipe(
              map((foodsArray: FoodInArray[]) => {
                if (foodsArray.length > 0) {
                  return Object.assign(set, { foodsArray });
                }
              })
            );
          return setWithArray$;
        })
      );
  }
  getSetById(userId: string, setId: string): Observable<Set> {
    return this.db.doc<Set>(`users/${userId}/sets/${setId}`).valueChanges();
  }

  getTentativeRecipeId(): string {
    return this.db.createId();
  }
  createSet(set: Omit<Set, 'updatedAt'>): Promise<void> {
    return this.db
      .doc(`users/${set.userId}/sets/${set.setId}`)
      .set({
        setId: set.setId,
        setTitle: set.setTitle,
        breakfast: set.breakfast,
        lunch: set.lunch,
        dinner: set.dinner,
        setCal: set.setCal,
        setProtein: set.setProtein,
        setFat: set.setFat,
        setTotalCarbohydrate: set.setTotalCarbohydrate,
        setDietaryFiber: set.setDietaryFiber,
        setSugar: set.setSugar,
        updatedAt: firestore.Timestamp.now(),
      })
      .then(() => {
        if (set.foodsArray.length) {
          set.foodsArray.forEach((food) => {
            const foodsArrayId = this.db.createId();
            this.db
              .doc(
                `users/${set.userId}/sets/${set.setId}/foodsArray/${foodsArrayId}`
              )
              .set({
                ...food,
                setId: foodsArrayId,
              });
          });
        }
      })
      .then(() => {
        this.snackBar.open('マイセットを保存しました', null, {
          duration: 2000,
        });
        this.location.back();
      });
  }
  updateMeal(userId: string, setId: string, meal: string, bool: boolean) {
    if (meal === 'breakfast') {
      this.db.doc(`users/${userId}/sets/${setId}`).update({ breakfast: bool });
    } else if (meal === 'lunch') {
      this.db.doc(`users/${userId}/sets/${setId}`).update({ lunch: bool });
    } else {
      this.db.doc(`users/${userId}/sets/${setId}`).update({ dinner: bool });
    }
  }
  deleteFoodOfSet(userId: string, setId: string, foodsArrayId: string) {
    return this.db
      .doc(`users/${userId}/sets/${setId}/foodsArray/${foodsArrayId}`)
      .delete();
  }
  async deleteSet(userId: string, setId: string): Promise<void> {
    const callable = this.fns.httpsCallable('deleteSet');

    return await callable({ userId, setId })
      .toPromise()
      .then(() => {
        this.snackBar.open('マイセットを削除しました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/menu/set-list');
      })
      .catch((err) => {
        console.log('failes', err);
      });
  }
}
