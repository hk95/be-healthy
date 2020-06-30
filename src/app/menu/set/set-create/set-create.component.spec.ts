import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCreateComponent } from './set-create.component';

describe('SetCreateComponent', () => {
  let component: SetCreateComponent;
  let fixture: ComponentFixture<SetCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SetCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
