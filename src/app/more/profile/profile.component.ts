import { Component, OnInit } from '@angular/core';
import { OthreShellService } from 'src/app/services/othre-shell.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BasicInfoService } from 'src/app/services/basic-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { BasicInfo } from 'src/app/interfaces/basic-info';
import { MatDialog } from '@angular/material/dialog';
import { AvatarComponent } from 'src/app/dialogs/avatar/avatar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private userId = this.authService.uid;

  maxLength = 50;
  maxHeight = 250;
  minHeight = 100;
  minWeight = 30;
  maxWeight = 200;
  minFat = 0;
  maxFat = 100;
  minCal = 0;
  maxCal = 10000;
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
    this.otherShellService.setTitle('ユーザー情報');
    this.basicInfoService.getBasicInfo(this.userId).subscribe((basicInfo) => {
      if (basicInfo) {
        this.basicInfo = basicInfo;
        this.form.patchValue(basicInfo);
        this.avatarURL = basicInfo.avatarURL
          ? basicInfo.avatarURL
          : 'assets/images/user-avatar.svg';
      }
    });
  }

  submit() {
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
  openAvatarDialog(event) {
    const imageFile: File = event.target.files[0];
    if (imageFile) {
      const dialogRef = this.dialog.open(AvatarComponent, {
        width: '80%',
        data: {
          imageFile,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.avatarURL = result;
        }
      });
    }
  }
  ngOnInit(): void {}
}
