import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OthreShellService } from '../services/othre-shell.service';
import { AuthService } from '../services/auth.service';
import { BasicInfoService } from '../services/basic-info.service';
import { BasicInfo } from '../interfaces/basic-info';
import { Location } from '@angular/common';

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
    private othreShellService: OthreShellService,
    private authService: AuthService,
    private basicInfoService: BasicInfoService,
    private location: Location
  ) {}

  backToPage() {
    this.location.back();
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
