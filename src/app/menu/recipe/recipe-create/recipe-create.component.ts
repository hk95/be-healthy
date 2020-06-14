import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeThumbnailComponent } from 'src/app/dialogs/recipe-thumbnail/recipe-thumbnail.component';
import { RecipeProcessImageComponent } from 'src/app/dialogs/recipe-process-image/recipe-process-image.component';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss'],
})
export class RecipeCreateComponent implements OnInit {
  thumbnailURL: string;
  ProcessURLs = [];
  @ViewChild('thumbnail') thumbnailInput: ElementRef;
  @ViewChild('processImage') processImageInput: ElementRef;
  ingredient = false;
  ingredientQuanity = 0;
  process = false;
  processQuanity = 0;
  public = false;

  form = this.fb.group({
    recipeTitle: ['', [Validators.required]],
    recipeDescription: [''],
    ingredientDetails: this.fb.array(
      [],
      [Validators.required, Validators.minLength(1)]
    ),
    processDetails: this.fb.array([]),
    recipelCal: [''],
    recipeProtein: [''],
    recipeFat: [''],
    recipeTotalCarbohydrate: [''],
    recipeDietaryFiber: [''],
    recipeSugar: [''],
  });

  get ingredientDetails(): FormArray {
    return this.form.get('ingredientDetails') as FormArray;
  }
  get processDetails(): FormArray {
    return this.form.get('processDetails') as FormArray;
  }
  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    console.log(this.ProcessURLs);
  }

  addIngredinet() {
    const ingredientFormGroup = this.fb.group({
      name: ['', [Validators.required]],
      amountAndUnit: ['', [Validators.required]],
    });
    this.ingredientDetails.push(ingredientFormGroup);
    this.ingredientQuanity++;
  }
  editIngredient() {
    if (!this.ingredient) {
      this.ingredient = true;
    } else {
      this.ingredient = false;
    }
  }
  removeIngredinet(index: number) {
    this.ingredientDetails.removeAt(index);
    this.ingredientQuanity--;
    if (this.ingredientQuanity === 0) {
      this.ingredient = false;
    }
  }

  addProcess() {
    const processFormGroup = this.fb.group({
      photoURL: [''],
      description: [''],
    });
    this.processDetails.push(processFormGroup);
    this.processQuanity++;
    this.ProcessURLs.push(undefined);
  }
  editProcess() {
    if (!this.process) {
      this.process = true;
    } else {
      this.process = false;
    }
  }
  removeProcess(index: number) {
    this.processDetails.removeAt(index);
    this.processQuanity--;
    this.ProcessURLs.splice(index, 1);
    if (this.processQuanity === 0) {
      this.process = false;
    }
  }

  // ダイアログ
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
  processImageDialog(event, index) {
    const imageFile: File = event.target.files[0];
    if (imageFile) {
      const dialogRef = this.dialog.open(RecipeProcessImageComponent, {
        width: '80%',
        data: { imageFile, processImageURL: this.ProcessURLs[index] },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.ProcessURLs.splice(index, 1, result);
        console.log(this.ProcessURLs);
      });
    }
    this.processImageInput.nativeElement.value = '';
  }

  submit() {}
  ngOnInit(): void {}
}
