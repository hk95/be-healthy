import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SetService {
  constructor(private db: AngularFirestore, private router: Router) {}
  getTentativeRecipeId(): string {
    return this.db.createId();
  }
}
