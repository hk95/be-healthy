import { Component, OnInit } from '@angular/core';
import { OthreShellService } from 'src/app/services/othre-shell.service';
import { FormBuilder, Validators } from '@angular/forms';
import { BasicInfoService } from 'src/app/services/basic-info.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form = this.fb.group({
    userName: [''],
    gender: ['', [Validators.pattern(/male|female|other/)]],
    height: [''],
    goalWeight: [''],
    goalFat: [''],
    goalCal: [''],
  });
  constructor(
    private otherShellService: OthreShellService,
    private basicInfoService: BasicInfoService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.otherShellService.setTitle('プロフィール');
    this.basicInfoService
      .getBasicInfo(this.authService.uid)
      .subscribe((basicInfo) => {
        if (basicInfo) {
          this.form.patchValue(basicInfo);
        } else {
          console.log('error');
        }
      });
  }

  ngOnInit(): void {}

  submit() {
    const formData = this.form.value;
    this.basicInfoService.updateBasicInfo({
      name: formData.userName,
      gender: formData.gender,
      height: formData.height,
      goalWeight: formData.goalWeight,
      goalFat: formData.goalFat,
      goalCal: formData.goalCal,
      userId: this.authService.uid,
    });
  }
}
