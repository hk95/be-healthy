import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private firebase: FirebaseApp,
    private router: Router
  ) {}

  getUser(userId: string) {
    return this.db.doc<User>(`users/${userId}`).valueChanges();
  }
  async deleteUserAccount(): Promise<void> {
    this.snackBar.open('削除中...', null, {
      duration: null,
    });
    return this.firebase
      .auth()
      .currentUser.delete()
      .then(() => {
        this.router.navigateByUrl('/graph');
        this.snackBar.open(
          'アカウントの削除が完了しました。ご利用いただきありがとうございました。',
          null,
          {
            duration: 2000,
          }
        );
      })
      .catch(() => {
        this.snackBar.open(
          'アカウントの削除に失敗しました。お手数ですが、時間をおき再度お願いします。',
          null,
          {
            duration: 2000,
          }
        );
      });
  }
}
