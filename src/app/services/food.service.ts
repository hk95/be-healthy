import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Food } from '../interfaces/food';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { FavFood } from '../interfaces/fav-food';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private db: AngularFirestore) {}

  likeFavFood(userId: string, foodId: string): Promise<void> {
    return this.db.doc(`users/${userId}/favFoods/${foodId}`).set({ foodId });
  }
  unLikeFavFood(userId: string, foodId: string): Promise<void> {
    return this.db.doc(`users/${userId}/favFoods/${foodId}`).delete();
  }

  getFoodByFoodId(foodId: string): Observable<Food> {
    return this.db.doc<Food>(`foods/${foodId}`).valueChanges().pipe(take(1));
  }
  getFavFoods(userId: string): Observable<Food[]> {
    return this.db
      .collection<FavFood>(`users/${userId}/favFoods`)
      .valueChanges()
      .pipe(
        switchMap((favFoods: FavFood[]) => {
          if (favFoods.length) {
            return combineLatest(
              favFoods.map((favFood: FavFood) =>
                this.db.doc<Food>(`foods/${favFood.foodId}`).valueChanges()
              )
            );
          } else {
            return of([]);
          }
        })
      );
  }
}
