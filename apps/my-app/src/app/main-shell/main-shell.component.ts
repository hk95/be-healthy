import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.scss'],
})
export class MainShellComponent implements OnInit {
  user$ = this.authService.afUser$;

  constructor(private authService: AuthService) {}
  title = 'my-app';

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
