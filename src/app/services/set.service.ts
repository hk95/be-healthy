import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QueryDocumentSnapshot,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Set, FoodInArray } from '../interfaces/set';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
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

  getSets(
    userId: string,
    getNumber: number,
    lastDoc?: QueryDocumentSnapshot<Set>
  ): Observable<
    {
      data: Set;
      nextLastDoc: QueryDocumentSnapshot<Set>;
    }[]
  > {
    const setsDoc$ = this.db
      .collection<Set>(`users/${userId}/sets`, (ref) => {
        let query = ref.orderBy('updatedAt', 'desc').limit(getNumber);
        if (lastDoc) {
          query = query.startAfter(lastDoc).limit(getNumber);
        }
        return query;
      })
      .snapshotChanges();

    let nextLastDoc: QueryDocumentSnapshot<Set>;
    let setsData: Set[];

    return setsDoc$.pipe(
      switchMap((setsDoc: DocumentChangeAction<Set>[]) => {
        if (setsDoc.length > 0) {
          nextLastDoc = setsDoc[setsDoc.length - 1].payload.doc;

          setsData = setsDoc.map((set: DocumentChangeAction<Set>) => {
            return set.payload.doc.data();
          });

          return of(setsData);
        } else {
          return of([]);
        }
      }),
      map((sets: Set[]): {
        data: Set;
        nextLastDoc: QueryDocumentSnapshot<Set>;
      }[] => {
        if (sets.length > 0) {
          return sets.map((set: Set): {
            data: Set;
            nextLastDoc: QueryDocumentSnapshot<Set>;
          } => {
            return {
              data: {
                ...set,
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
  getSetsOfMeal(userId: string, meal: string): Observable<Set[]> {
    return this.db
      .collection<Set>(`users/${userId}/sets`, (ref) =>
        ref.orderBy('updatedAt', 'desc').where(meal, '==', true)
      )
      .valueChanges();
  }

  getSetById(userId: string, setId: string): Observable<Set> {
    return this.db.doc<Set>(`users/${userId}/sets/${setId}`).valueChanges();
  }

  getTentativeRecipeId(): string {
    return this.db.createId();
  }
  updateSet(set: Omit<Set, 'updatedAt'>): Promise<void> {
    const updatedAt = firestore.Timestamp.now();
    return this.db
      .doc(`users/${set.userId}/sets/${set.setId}`)
      .set({
        ...set,
        updatedAt,
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

  async deleteSet(userId: string, setId: string): Promise<void> {
    this.db
      .doc(`users/${userId}/sets/${setId}`)
      .delete()
      .then(() => {
        this.snackBar.open('マイセットを削除しました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/menu/set-list');
      })
      .catch(() => {
        this.snackBar.open('マイセットの削除にしました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/menu/set-list');
      });
  }
}
