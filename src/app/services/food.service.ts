import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OriginalFood } from '../interfaces/original-food';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private db: AngularFirestore) {}

  getOriginalFoods(): Observable<OriginalFood[]> {
    return this.db.collection<OriginalFood>('foods').valueChanges();
  }
  getFavFoods(authorId): Observable<OriginalFood[]> {
    return this.db
      .collection<OriginalFood>(`users/${authorId}/favFoods`)
      .valueChanges();
  }
}
