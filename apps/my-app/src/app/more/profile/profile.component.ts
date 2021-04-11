import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AvatarComponent } from '../../dialogs/avatar/avatar.component';
import { BasicInfo } from '../../interfaces/basic-info';
import { AuthService } from '../../services/auth.service';
import { BasicInfoService } from '../../services/basic-info.service';
import { OthreShellService } from '../../services/othre-shell.service';

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
  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get heigtControl(): FormControl {
    return this.form.get('height') as FormControl;
  }
  get weightControl(): FormControl {
    return this.form.get('goalWeight') as FormControl;
  }
  get fatControl(): FormControl {
    return this.form.get('goalFat') as FormControl;
  }
  get calControl(): FormControl {
    return this.form.get('goalCal') as FormControl;
  }
  genderTypes = [
    { viewValue: '未選択', value: 'other' },
    { viewValue: '男性', value: 'male' },
    { viewValue: '女性', value: 'female' },
  ];

  constructor(
    private otherShellService: OthreShellService,
    private basicInfoService: BasicInfoService,
    private fb: FormBuilder,
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
