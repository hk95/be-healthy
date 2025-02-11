import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateGuard {
  private readonly pattern = /^\d{2}\.\d{2}\.\d{2}\(.\)$/;
  private readonly checkNum = /^\d{2}$/;

  constructor(private datePipe: DatePipe, private router: Router) {}

  private getDate(date) {
    return this.datePipe.transform(date, 'yy.MM.dd(E)');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const paramDate: string = next.queryParams.date;
    const year = paramDate.substr(0, 2).match(this.checkNum)
      ? Number(20 + paramDate.substr(0, 2))
      : 10;
    const month = paramDate.substr(3, 2).match(this.checkNum)
      ? Number(paramDate.substr(3, 2))
      : 10;
    const day = paramDate.substr(6, 2).match(this.checkNum)
      ? Number(paramDate.substr(6, 2))
      : 10;
    const weekStr = this.getDate(new Date(year, month - 1, day)).substr(9, 1);
    const today = this.getDate(new Date());
    const minDate = this.getDate(new Date(2018, 0, 1));

    if (
      today < paramDate ||
      minDate > paramDate ||
      !paramDate.match(this.pattern) ||
      paramDate.substr(9, 1) !== weekStr
    ) {
      return this.router.navigateByUrl('/');
    } else {
      return true;
    }
  }
}
