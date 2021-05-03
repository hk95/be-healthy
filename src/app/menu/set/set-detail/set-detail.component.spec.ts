import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { SetDetailComponent } from './set-detail.component';
import { SetDetailModule } from './set-detail.module';

describe('SetDetailComponent', () => {
  let component: SetDetailTestComponent;
  let fixture: ComponentFixture<SetDetailTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetDetailModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDetailTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ', () => {
    const aaa = 2;
    expect(aaa).toBe(2);
  });
});

@Component({
  template: `<app-set-detail></app-set-detail>`,
})
class SetDetailTestComponent {}
