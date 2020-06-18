import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RecipeThumbnailComponent } from 'src/app/dialogs/recipe-thumbnail/recipe-thumbnail.component';
import { RecipeProcessImageComponent } from 'src/app/dialogs/recipe-process-image/recipe-process-image.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-update',
  templateUrl: './recipe-update.component.html',
  styleUrls: ['./recipe-update.component.scss'],
})
export class RecipeUpdateComponent implements OnInit {
  thumbnailURL: string = null;
  ProcessURLs = [];
  query;
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
  get recipeTitle(): FormControl {
    return this.form.get('recipeTitle') as FormControl;
  }

  get ingredientDetails(): FormArray {
    return this.form.get('ingredientDetails') as FormArray;
  }
  get processDetails(): FormArray {
    return this.form.get('processDetails') as FormArray;
  }
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe((recipeId) => {
      this.query = recipeId.get('id');
    });
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
      description: ['', [Validators.required]],
    });
    this.processDetails.push(processFormGroup);
    this.processQuanity++;
    this.ProcessURLs.push(null);
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

  thumbnailDialog(event) {
    const imageFile: File = event.target.files[0];
    if (imageFile) {
      const dialogRef = this.dialog.open(RecipeThumbnailComponent, {
        width: '80%',
        data: {
          imageFile,
          thumbnailURL: this.thumbnailURL,
          recipeId: this.query,
        },
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
        data: {
          imageFile,
          processImageURL: this.ProcessURLs[index],
          recipeId: this.query,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.ProcessURLs.splice(index, 1, result);
      });
    }
    this.processImageInput.nativeElement.value = '';
  }
  back(): void {
    this.location.back();
  }
  ngOnInit(): void {}
}
