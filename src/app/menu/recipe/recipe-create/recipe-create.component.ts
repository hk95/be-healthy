import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeThumbnailComponent } from 'src/app/dialogs/recipe-thumbnail/recipe-thumbnail.component';
import { RecipeProcessImageComponent } from 'src/app/dialogs/recipe-process-image/recipe-process-image.component';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss'],
})
export class RecipeCreateComponent implements OnInit {
  thumbnailURL: string;
  processImageURL: string;
  @ViewChild('thumbnail') thumbnailInput: ElementRef;
  @ViewChild('processImage') processImageInput: ElementRef;

  constructor(private dialog: MatDialog) {}

  thumbnailDialog(event) {
    const imageFile: File = event.target.files[0];
    if (imageFile) {
      const dialogRef = this.dialog.open(RecipeThumbnailComponent, {
        width: '80%',
        data: { imageFile, thumbnailURL: this.thumbnailURL },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.thumbnailURL = result;
      });
    }
    this.thumbnailInput.nativeElement.value = '';
  }
  processImageDialog(event) {
    const imageFile: File = event.target.files[0];
    if (imageFile) {
      const dialogRef = this.dialog.open(RecipeProcessImageComponent, {
        width: '80%',
        data: { imageFile, processImageURL: this.processImageURL },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.processImageURL = result;
      });
    }
    this.processImageInput.nativeElement.value = '';
  }

  ngOnInit(): void {}
}
