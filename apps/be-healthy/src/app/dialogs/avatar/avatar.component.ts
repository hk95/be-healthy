import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { AuthService } from 'src/app/services/auth.service';
import { BasicInfoService } from 'src/app/services/basic-info.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  croppedImage: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      imageFile: File;
    },
    private dialogRef: MatDialogRef<AvatarComponent>,
    private authService: AuthService,
    private basicInfoService: BasicInfoService
  ) {}

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  async uploadImage(): Promise<void> {
    const file: Blob = base64ToFile(this.croppedImage);
    const downloadURL: string = await this.basicInfoService.uploadAvatar(
      this.authService.uid,
      file
    );
    this.dialogRef.close(downloadURL);
  }

  ngOnInit(): void {}
}
