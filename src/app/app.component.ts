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

    this.subscription = this.router.events
      .pipe(filter((e: Event): e is Scroll => e instanceof Scroll))
      .subscribe((e) => {
        console.log('run', e);
        if (e.position) {
          console.log('position');
          console.log(e.position);

          // backward navigation
          this.viewportScroller.scrollToPosition(e.position);
        } else if (e.anchor) {
          console.log('anchor');

          // anchor navigation
          console.log(e.anchor);

          this.viewportScroller.scrollToAnchor(e.anchor);
        } else {
          console.log('other');
          console.log(e.position);

          // forward navigation
          this.viewportScroller.scrollToPosition([0, 100]);
        }
      });
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
