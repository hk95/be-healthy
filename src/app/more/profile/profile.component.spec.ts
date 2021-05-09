import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { MoreModule } from '../more.module';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ProfileHarness } from './profile.harness';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileTestComponent;
  let fixture: ComponentFixture<ProfileTestComponent>;
  let loader: HarnessLoader;

  const firestoreStub = {
    doc: jest.fn().mockImplementation(() => {
      return { valueChanges: () => new BehaviorSubject({ basicInfo: '' }) };
    }),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          MoreModule,
          AngularFireModule.initializeApp(environment.firebase),
          MatSnackBarModule,
          RouterTestingModule,
          NoopAnimationsModule,
        ],
        providers: [{ provide: AngularFirestore, useValue: firestoreStub }],
      })
        .overrideModule(MoreModule, {
          add: { declarations: [ProfileTestComponent] },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTestComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('フォームの条件が満たされた状態でクリックされたら submit されるべき', async () => {
    const submitSpy = jest.spyOn(component.profileComponent, 'submitForm');

    const harness = await loader.getHarness(ProfileHarness);

    let isDisabled = await harness.isDisabledSubmitButton();
    expect(isDisabled).toBe(true);
    await harness.setName('taro');
    await harness.setHeight('170');
    await harness.setWeight('60');
    await harness.setFat('10');
    await harness.setCal('2200');
    const name = await harness.getName();
    const height = await harness.getHeight();
    const weight = await harness.getWeight();
    const fat = await harness.getFat();
    const cal = await harness.getCal();
    isDisabled = await harness.isDisabledSubmitButton();
    await harness.clickSubmitButton();

    expect(name).toBe('taro');
    expect(height).toBe('170');
    expect(weight).toBe('60');
    expect(fat).toBe('10');
    expect(cal).toBe('2200');
    fixture.detectChanges();
    expect(isDisabled).toBe(false);
    expect(submitSpy).toBeCalled();
  });
});

@Component({
  template: `<app-profile></app-profile>`,
})
class ProfileTestComponent {
  @ViewChild(ProfileComponent)
  profileComponent: ProfileComponent;
}
