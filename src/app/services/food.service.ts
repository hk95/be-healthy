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
  constructor(private db: AngularFirestore) {}

  likeFavFood(userId: string, foodId: string): Promise<void> {
    return this.db.doc(`users/${userId}/favFoods/${foodId}`).set({ foodId });
  }
  unLikeFavFood(userId: string, foodId: string): Promise<void> {
    return this.db.doc(`users/${userId}/favFoods/${foodId}`).delete();
  }
  getfavFoodslist(userId: string): Observable<FavFood[]> {
    return this.db
      .collection<FavFood>(`users/${userId}/favFoods`)
      .valueChanges();
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
