import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MainShellService } from '../services/main-shell.service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title$: Observable<string> = this.mainShellService.title$;
  titleMeal$: Observable<string> = this.mainShellService.titleMeal$;
  today: string = this.getDate();
  avatarURL: string;
  constructor(
    private datepipe: DatePipe,
    private mainShellService: MainShellService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.userService.getUser(this.authService.uid).subscribe((result) => {
      this.avatarURL = result.avatarURL;
    });
  }

  getDate() {
    const d = new Date();
    return this.datepipe.transform(d, 'yy.MM.dd(E)');
  }
  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
