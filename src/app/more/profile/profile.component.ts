import { Component, OnDestroy, OnInit } from '@angular/core';
import { OthreShellService } from 'src/app/services/othre-shell.service';
import {
  UntypedFormBuilder,
  Validators,
  UntypedFormControl,
} from '@angular/forms';
import { BasicInfoService } from 'src/app/services/basic-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { BasicInfo } from 'src/app/interfaces/basic-info';
import { MatDialog } from '@angular/material/dialog';
import { AvatarComponent } from 'src/app/dialogs/avatar/avatar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly userId = this.authService.uid;
  private subscription = new Subscription();

  readonly maxLength = 50;
  readonly maxHeight = 250;
  readonly minHeight = 100;
  readonly minWeight = 30;
  readonly maxWeight = 200;
  readonly minFat = 0;
  readonly maxFat = 100;
  readonly minCal = 0;
  readonly maxCal = 10000;
  avatarURL: string;
  basicInfo: BasicInfo;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
    gender: ['', [Validators.pattern(/male|female|other/)]],
    height: [
      '',
      [Validators.min(this.minHeight), Validators.max(this.maxHeight)],
    ],
    goalWeight: [
      '',
      [Validators.min(this.minWeight), Validators.max(this.maxWeight)],
    ],
    goalFat: ['', [Validators.min(this.minFat), Validators.max(this.maxFat)]],
    goalCal: ['', [Validators.min(this.minCal), Validators.max(this.maxCal)]],
  });
  get nameControl(): UntypedFormControl {
    return this.form.get('name') as UntypedFormControl;
  }
  get heigtControl(): UntypedFormControl {
    return this.form.get('height') as UntypedFormControl;
  }
  get weightControl(): UntypedFormControl {
    return this.form.get('goalWeight') as UntypedFormControl;
  }
  get fatControl(): UntypedFormControl {
    return this.form.get('goalFat') as UntypedFormControl;
  }
  get calControl(): UntypedFormControl {
    return this.form.get('goalCal') as UntypedFormControl;
  }
  genderTypes = [
    { viewValue: '未選択', value: 'other' },
    { viewValue: '男性', value: 'male' },
    { viewValue: '女性', value: 'female' },
  ];

  constructor(
    private otherShellService: OthreShellService,
    private basicInfoService: BasicInfoService,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.otherShellService.title = this.otherShellService.PAGE_TITLES.profile;
    this.loadBasicInfo();
  }

  private loadBasicInfo(): void {
    const basicInfoSub = this.basicInfoService
      .getBasicInfo(this.userId)
      .subscribe((basicInfo) => {
        if (basicInfo) {
          this.basicInfo = basicInfo;
          this.form.patchValue(basicInfo);
          this.avatarURL = basicInfo.avatarURL
            ? basicInfo.avatarURL
            : 'assets/images/user-avatar.svg';
        }
      });
    this.subscription.add(basicInfoSub);
  }

  submitForm(): void {
    const formData = this.form.value;
    this.basicInfoService.updateBasicInfo({
      name: formData.name,
      gender: formData.gender,
      height: formData.height,
      goalWeight: formData.goalWeight,
      goalFat: formData.goalFat,
      goalCal: formData.goalCal,
      userId: this.userId,
      avatarURL: this.avatarURL,
    });
  }

  openAvatarDialog(event: any): void {
    const imageFile: File = event.target.files[0];
    if (imageFile) {
      const dialogRef = this.dialog.open(AvatarComponent, {
        width: '80%',
        data: {
          imageFile,
        },
      });
      const dialogSub = dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.avatarURL = result;
        }
      });
      this.subscription.add(dialogSub);
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
