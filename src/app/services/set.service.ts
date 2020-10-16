import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QueryDocumentSnapshot,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Set } from '../interfaces/set';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SetService {
  submitted: boolean;
  querySetParam: boolean;

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  addingDailyInfo(): boolean {
    return (this.querySetParam = this.querySetParam ? false : true);
  }

  getSets(
    userId: string,
    getNumber: number,
    lastDoc?: QueryDocumentSnapshot<Set>,
    meal?: string
  ): Observable<
    {
      data: Set;
      nextLastDoc: QueryDocumentSnapshot<Set>;
    }[]
  > {
    const setsDoc$ = this.db
      .collection<Set>(`users/${userId}/sets`, (ref) => {
        let query = ref.orderBy('updatedAt', 'desc').limit(getNumber);
        if (lastDoc && !meal) {
          query = query.startAfter(lastDoc).limit(getNumber);
        } else if (!lastDoc && meal) {
          query = query.where(meal, '==', true).limit(getNumber);
        } else if (lastDoc && meal) {
          query = query
            .where(meal, '==', true)
            .startAfter(lastDoc)
            .limit(getNumber);
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

  getSetById(userId: string, setId: string): Observable<Set> {
    return this.db.doc<Set>(`users/${userId}/sets/${setId}`).valueChanges();
  }

  async createSet(set: Omit<Set, 'setId' | 'updatedAt'>): Promise<void> {
    const setId = this.db.createId();
    const updatedAt = firestore.Timestamp.now();
    return this.db
      .doc<Set>(`users/${set.userId}/sets/${setId}`)
      .set({
        ...set,
        setId,
        updatedAt,
      })
      .then(() => {
        this.snackBar.open('マイセットを作成しました', null, {
          duration: 2000,
        });
      });
  }

  async updateMeal(
    userId: string,
    setId: string,
    meal: string,
    bool: boolean
  ): Promise<void> {
    if (meal === 'breakfast') {
      return this.db
        .doc(`users/${userId}/sets/${setId}`)
        .update({ breakfast: bool });
    } else if (meal === 'lunch') {
      return this.db
        .doc(`users/${userId}/sets/${setId}`)
        .update({ lunch: bool });
    } else {
      return this.db
        .doc(`users/${userId}/sets/${setId}`)
        .update({ dinner: bool });
    }
  }

  async updateSet(set: Omit<Set, 'updatedAt'>): Promise<void> {
    const updatedAt = firestore.Timestamp.now();
    return this.db
      .doc(`users/${set.userId}/sets/${set.setId}`)
      .update({
        ...set,
        updatedAt,
      })
      .then(() => {
        this.snackBar.open('マイセットを更新しました', null, {
          duration: 2000,
        });
      });
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
