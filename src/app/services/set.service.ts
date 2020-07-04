import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Set } from '../interfaces/set';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SetService {
  constructor(
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  getSets(userId: string): Observable<Set[]> {
    return this.db
      .collection<Set>(`users/${userId}/sets`, (ref) =>
        ref.orderBy('updatedAt', 'desc')
      )
      .valueChanges()
      .pipe(
        switchMap((sets: Set[]) => {
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
        })
      );
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
            const foodArrayId = this.db.createId();
            this.db
              .doc(
                `users/${set.userId}/sets/${set.setId}/foodsArray/${foodArrayId}`
              )
              .set({
                food,
                setId: set.setId,
              });
          });
        }
      })
      .then(() => {
        this.snackBar.open('マイセットを追加しました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/menu');
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
}
