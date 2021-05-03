import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { OtherShellHarness } from './tessting/other-shell.harness';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';

describe('OtherShellComponent', () => {
  let component: OtherShellTestComponent;
  let fixture: ComponentFixture<OtherShellTestComponent>;
  let router: Router;
  let location: Location;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OtherShellTestComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          { provide: Router },
          { provide: Location, useClass: SpyLocation },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherShellTestComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('戻るボタンが推されるべき', async () => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      OtherShellHarness
    );

    await harness.clickLogoButton();

    expect(location.path()).toBe('');
  });

  it('グラフボタンが推されるべき', async () => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      OtherShellHarness
    );

    await harness.clickGraphButton();
    console.log(location.path());

    expect(location.path()).toBe('graph');
  });

  it('test ', () => {
    const aaa = 2;
    expect(aaa).toBe(2);
  });
});

@Component({
  template: `<app-other-shell></app-other-shell>`,
})
class OtherShellTestComponent {}
