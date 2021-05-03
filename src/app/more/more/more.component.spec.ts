import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MoreModule } from '../more.module';

import { MoreComponent } from './more.component';

describe('MoreComponent', () => {
  let component: MoreTestComponent;
  let fixture: ComponentFixture<MoreTestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MoreModule],
        declarations: [MoreTestComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  template: `<app-more></app-more>`,
})
class MoreTestComponent {
  moreComponent: MoreComponent;
}
