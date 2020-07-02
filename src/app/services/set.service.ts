import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Set } from '../interfaces/set';

@Injectable({
  providedIn: 'root',
})
export class SetService {
  constructor(
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  getTentativeRecipeId(): string {
    return this.db.createId();
  }
  createSet(set: Omit<Set, 'updatedAt'>): Promise<void> {
    return this.db
      .doc(`users/${set.userId}/sets/${set.setId}`)
      .set({
        setId: set.setId,
        breakfast: set.meal.breakfast,
        lunch: set.meal.lunch,
        dinner: set.meal.dinner,
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
                `users/${set.userId}/sets/${set.setId}/formArray/${foodArrayId}`
              )
              .set({
                food,
                foodArrayId,
              });
          });
        }
      })
      .then(() => {
        this.snackBar.open('マイセットを登録しました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/menu');
      });
  }
}
