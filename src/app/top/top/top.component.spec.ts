import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FullCalendarModule } from '@fullcalendar/angular';

describe('TopComponent', () => {
  let component: TopTestComponent;
  let fixture: ComponentFixture<TopTestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TopTestComponent],
        imports: [FullCalendarModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `<app-top></app-top>`,
})
class TopTestComponent {}
