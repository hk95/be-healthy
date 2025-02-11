import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QueryDocumentSnapshot,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { Food } from '../interfaces/food';
import { Observable, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { firestore } from 'firebase/compat';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private db: AngularFirestore) {}

  likeFavFood(userId: string, food: Food): Promise<void> {
    const updatedAt = firestore.Timestamp.now();
    return this.db
      .doc(`users/${userId}/favFoods/${food.foodId}`)
      .set({ ...food, updatedAt });
  }
  unLikeFavFood(userId: string, foodId: string): Promise<void> {
    return this.db.doc(`users/${userId}/favFoods/${foodId}`).delete();
  }

  getFoodByFoodId(foodId: string): Observable<Food> {
    return this.db.doc<Food>(`foods/${foodId}`).valueChanges().pipe(take(1));
  }
  getFavFoods(
    userId: string,
    getNumber: number,
    lastDoc?: QueryDocumentSnapshot<Food>
  ): Observable<
    {
      data: Food;
      nextLastDoc: QueryDocumentSnapshot<Food>;
    }[]
  > {
    const foodsDoc$ = this.db
      .collection<Food>(`users/${userId}/favFoods`, (ref) => {
        let query = ref.orderBy('updatedAt', 'desc').limit(getNumber);
        if (lastDoc) {
          query = query.startAfter(lastDoc).limit(getNumber);
        }
        return query;
      })
      .snapshotChanges();
    let nextLastDoc: QueryDocumentSnapshot<Food>;
    let foodsData: Food[];
    return foodsDoc$.pipe(
      switchMap((foodsDoc: DocumentChangeAction<Food>[]) => {
        if (foodsDoc.length > 0) {
          nextLastDoc = foodsDoc[foodsDoc.length - 1].payload.doc;
          foodsData = foodsDoc.map((foodDoc) => foodDoc.payload.doc.data());
          return of(foodsData);
        } else {
          return of([]);
        }
      }),
      map((foods: Food[]) => {
        if (foods.length > 0) {
          return foods.map((food: Food) => {
            return {
              data: {
                ...food,
              },
              nextLastDoc,
            };
          });
        } else {
          return null;
        }
      })
    );
  }
}
