import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OriginalFood } from '../interfaces/original-food';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap, mergeAll } from 'rxjs/operators';
import { FavFood } from '../interfaces/fav-food';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  OriginalFoods$: Observable<FavFood[]> = this.db
    .collection<FavFood>(`foods`)
    .valueChanges();
  constructor(private db: AngularFirestore) {}

  getOriginalFoods(userId: string): Observable<OriginalFood[]> {
    const favFoodIds$: Observable<string[]> = this.db
      .collection<FavFood>(`users/${userId}/favFoods`)
      .valueChanges()
      .pipe(
        map((favFoods: FavFood[]) => {
          return favFoods.map((favFood: FavFood) => favFood.foodId);
        })
      );

    const originalFoods$: Observable<OriginalFood[]> = this.db
      .collection<OriginalFood>('foods')
      .valueChanges();

    return combineLatest([originalFoods$, favFoodIds$]).pipe(
      map(([originalFoods, favFoodIds]) => {
        return originalFoods.map((food) => {
          return {
            ...food,
            isLiked: favFoodIds.includes(food.foodId),
          };
        });
      })
    );
  }

  likeFavFood(userId: string, foodId: string): Promise<void> {
    return this.db.doc(`users/${userId}/favFoods/${foodId}`).set({ foodId });
  }
  unLikeFavFood(userId: string, foodId: string): Promise<void> {
    return this.db.doc(`users/${userId}/favFoods/${foodId}`).delete();
  }

  getFavFoods(userId: string): Observable<OriginalFood[]> {
    return this.db
      .collection<FavFood>(`users/${userId}/favFoods`)
      .valueChanges()
      .pipe(
        switchMap((favFoods: FavFood[]) => {
          if (favFoods.length) {
            return combineLatest(
              favFoods.map((favFood: FavFood) =>
                this.db
                  .doc<OriginalFood>(`foods/${favFood.foodId}`)
                  .valueChanges()
              )
            );
          } else {
            return of([]);
          }
        })
      );
  }
}
