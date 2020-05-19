import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OthreShellService {
  titleSource = new ReplaySubject<string>();
  title$ = this.titleSource.asObservable();

  constructor() {}

  setTitle(title: string) {
    this.titleSource.next(title);
  }
}
