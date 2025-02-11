import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid: string;
  afUser$: Observable<User> = this.afAuth.user.pipe(
    tap((user: User) => (this.uid = user?.uid))
  );
  isInitialLogin: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login() {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth.signInWithPopup(provider).then((result) => {
      if (result.additionalUserInfo.isNewUser) {
        this.isInitialLogin = true;
      }

      this.snackBar.open('ログインしました', null, {
        duration: 2000,
      });
      this.router.navigateByUrl('');
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.snackBar.open('ログアウトしました', null, {
        duration: 2000,
      });
      this.router.navigateByUrl('/welcome');
    });
  }
}
