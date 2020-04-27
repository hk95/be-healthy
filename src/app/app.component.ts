import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$ = this.authService.afUser$;

  constructor(
    private authService: AuthService
  ){}
  title = 'my-app';

  logout() {
    this.authService.logout();
  }
}
