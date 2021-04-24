import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FavFoodsComponent } from './fav-foods.component';

describe('FavFoodsComponent', () => {
  let component: FavFoodsComponent;
  let fixture: ComponentFixture<FavFoodsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FavFoodsComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FavFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
