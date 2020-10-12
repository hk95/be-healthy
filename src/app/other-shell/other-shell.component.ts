import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OthreShellService } from '../services/othre-shell.service';
import { AuthService } from '../services/auth.service';
import { BasicInfoService } from '../services/basic-info.service';
import { BasicInfo } from '../interfaces/basic-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other-shell',
  templateUrl: './other-shell.component.html',
  styleUrls: ['./other-shell.component.scss'],
})
export class OtherShellComponent implements OnInit {
  title$: Observable<string> = this.othreShellService.title$;
  basicInfo$: Observable<BasicInfo> = this.basicInfoService.getBasicInfo(
    this.authService.uid
  );

  constructor(
    public othreShellService: OthreShellService,
    private authService: AuthService,
    private basicInfoService: BasicInfoService,
    private router: Router
  ) {}

  backToPage(): Promise<boolean> {
    if (this.authService.isInitialLogin) {
      this.authService.isInitialLogin = false;
      return this.router.navigateByUrl('');
    } else {
      return this.router.navigateByUrl('/more');
    }
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
