import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  getUser(userId: string) {
    return this.db.doc<User>(`users/${userId}`).valueChanges();
  }
}
