import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedFoodsComponent } from './selected-foods.component';

describe('SelectedFoodsComponent', () => {
  let component: SelectedFoodsComponent;
  let fixture: ComponentFixture<SelectedFoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedFoodsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
