import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { base64ToFile } from 'src/app/image-cropper/image-cropper.component';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-process-image',
  templateUrl: './recipe-process-image.component.html',
  styleUrls: ['./recipe-process-image.component.scss'],
  standalone: false,
})
export class RecipeProcessImageComponent implements OnInit {
  croppedImage: string;
  userId: string = this.authSerrvice.uid;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      imageFile: File;
      processImageURL: string;
      recipeId: string;
    },
    private authSerrvice: AuthService,
    private recipeService: RecipeService,
    private dialogRef: MatDialogRef<RecipeProcessImageComponent>
  ) {}

  async uploadImage(): Promise<void> {
    const file: Blob = base64ToFile(this.croppedImage);
    const downloadURL: string = await this.recipeService.uploadProcessImage(
      this.userId,
      this.data.recipeId,
      file
    );
    this.dialogRef.close(downloadURL);
  }
  cancel() {
    this.dialogRef.close(this.data.processImageURL);
  }
  deleteImage() {
    this.dialogRef.close(null);
  }

  ngOnInit(): void {}
}
