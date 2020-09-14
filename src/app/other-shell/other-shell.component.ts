import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OthreShellService } from '../services/othre-shell.service';
import { AuthService } from '../services/auth.service';
import { BasicInfoService } from '../services/basic-info.service';
import { BasicInfo } from '../interfaces/basic-info';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-other-shell',
  templateUrl: './other-shell.component.html',
  styleUrls: ['./other-shell.component.scss'],
})
export class OtherShellComponent implements OnInit, OnDestroy {
  private prePageTitle: string;
  private prePageSubscription: Subscription;

  title$: Observable<string> = this.othreShellService.title$;
  basicInfo$: Observable<BasicInfo> = this.basicInfoService.getBasicInfo(
    this.authService.uid
  );

  constructor(
    private othreShellService: OthreShellService,
    private authService: AuthService,
    private basicInfoService: BasicInfoService,
    private router: Router
  ) {
    this.prePageSubscription = this.othreShellService.preTitle$.subscribe(
      (preTitle) => {
        return (this.prePageTitle = preTitle);
      }
    );
  }

  backToPage() {
    if (this.prePageTitle === 'TOP') {
      this.router.navigateByUrl('');
    } else {
      this.router.navigateByUrl('/more');
    }
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.prePageSubscription.unsubscribe();
  }
}
