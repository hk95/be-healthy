import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Event, Router, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    @Inject(DOCUMENT) private rootDocument: HTMLDocument
  ) {
    if (!environment.production) {
      this.rootDocument
        .querySelector('[rel=icon]')
        .setAttribute('href', 'favicon-dev.svg');
    }
    this.scrollPage();
  }

  scrollPage() {
    this.subscription = this.router.events
      .pipe(filter((e: Event): e is Scroll => e instanceof Scroll))
      .subscribe((e) => {
        setTimeout(() => {
          if (e.position) {
            this.viewportScroller.scrollToPosition(e.position);
          } else if (e.anchor) {
            this.viewportScroller.scrollToAnchor(e.anchor);
          } else {
            this.viewportScroller.scrollToPosition([0, 0]);
          }
        }, 200);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
