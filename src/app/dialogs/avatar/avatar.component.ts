import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { base64ToFile } from 'src/app/image-cropper/image-cropper.component';
import { AuthService } from 'src/app/services/auth.service';
import { BasicInfoService } from 'src/app/services/basic-info.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: false,
})
export class AvatarComponent implements OnInit {
  croppedImage: string = '';

  private cropper: Cropper;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      imageFile: File;
    },
    private dialogRef: MatDialogRef<AvatarComponent>,
    private authService: AuthService,
    private basicInfoService: BasicInfoService
  ) {}

  cropImage(): void {
    if (this.cropper) {
      const canvas = this.cropper.getCroppedCanvas({
        width: 400, // 必要なサイズを指定
        height: 400,
        fillColor: '#fff',
      });
      this.croppedImage = canvas.toDataURL('image/png');
    }
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
