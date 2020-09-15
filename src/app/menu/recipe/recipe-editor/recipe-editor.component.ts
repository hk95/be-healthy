import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';

import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RecipeThumbnailComponent } from 'src/app/dialogs/recipe-thumbnail/recipe-thumbnail.component';
import { RecipeProcessImageComponent } from 'src/app/dialogs/recipe-process-image/recipe-process-image.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { ProcessOfRecipe } from 'src/app/interfaces/recipe';
@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss'],
})
export class RecipeEditorComponent implements OnInit {
  @ViewChild('thumbnail') thumbnailInput: ElementRef;
  @ViewChild('processImage') processImageInput: ElementRef;

  private readonly userId = this.authService.uid;

  thumbnailURL: string = null;
  processURLs = [];
  query: string;
  ingredient = false;
  process = false;
  public = false;
  loading: boolean;
  isCreating: boolean;
  maxTitleLength = 50;
  maxRecipeDescriptionLength = 500;
  maxIngredinetNameLength = 50;
  maxIngredinetUnitLength = 20;
  limitIngredientArray = 100;
  limitProcessArray = 30;
  maxNutritionAmount = 5000;
  minNutritionAmount = 0;

  form = this.fb.group({
    recipeTitle: [
      '',
      [Validators.required, Validators.maxLength(this.maxTitleLength)],
    ],
    recipeDescription: [
      '',
      [Validators.maxLength(this.maxRecipeDescriptionLength)],
    ],
    ingredients: this.fb.array([], [Validators.required]),
    processes: this.fb.array([]),
    recipeCal: [
      '',
      [
        Validators.required,
        Validators.min(this.minNutritionAmount),
        Validators.max(this.maxNutritionAmount),
      ],
    ],
    recipeProtein: [
      '',
      [
        Validators.required,
        Validators.min(this.minNutritionAmount),
        Validators.max(this.maxNutritionAmount),
      ],
    ],
    recipeFat: [
      '',
      [
        Validators.required,
        Validators.min(this.minNutritionAmount),
        Validators.max(this.maxNutritionAmount),
      ],
    ],
    recipeTotalCarbohydrate: [
      '',
      [
        Validators.required,
        Validators.min(this.minNutritionAmount),
        Validators.max(this.maxNutritionAmount),
      ],
    ],
    recipeDietaryFiber: [
      '',
      [
        Validators.required,
        Validators.min(this.minNutritionAmount),
        Validators.max(this.maxNutritionAmount),
      ],
    ],
    recipeSugar: [
      '',
      [
        Validators.required,
        Validators.min(this.minNutritionAmount),
        Validators.max(this.maxNutritionAmount),
      ],
    ],
  });
  displayedColumns: string[] = ['name', 'amount'];
  displayedColumnsProcess: string[] = ['index', 'image', 'description'];
  get recipeTitle(): FormControl {
    return this.form.get('recipeTitle') as FormControl;
  }
  get descriptionControl(): FormControl {
    return this.form.get('recipeDescription') as FormControl;
  }
  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }
  get processes(): FormArray {
    return this.form.get('processes') as FormArray;
  }
  get recipeCalControl(): FormControl {
    return this.form.get('recipeCal') as FormControl;
  }
  get recipeProteinControl(): FormControl {
    return this.form.get('recipeProtein') as FormControl;
  }
  get recipeFatControl(): FormControl {
    return this.form.get('recipeFat') as FormControl;
  }
  get recipeTotalCarbohydrateControl(): FormControl {
    return this.form.get('recipeTotalCarbohydrate') as FormControl;
  }
  get recipeDietaryFiberControl(): FormControl {
    return this.form.get('recipeDietaryFiber') as FormControl;
  }
  get recipeSugarControl(): FormControl {
    return this.form.get('recipeSugar') as FormControl;
  }
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  processSource = new BehaviorSubject<AbstractControl[]>([]);

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {
    this.loading = true;
    this.route.queryParamMap.subscribe((recipeId) => {
      this.query = recipeId.get('id');
      this.recipeService.getRecipeByRecipeId(this.query).subscribe((recipe) => {
        if (recipe) {
          this.form.patchValue(recipe);
          this.thumbnailURL = recipe.recipeThumbnailURL;
          this.public = recipe.public;
          if (recipe.foods) {
            recipe.foods.forEach((food) => {
              const ingredientFormGroup = this.fb.group({
                name: food.name,
                amountAndUnit: food.amountAndUnit,
              });
              this.ingredients.push(ingredientFormGroup);
              this.dataSource.next(this.ingredients.controls);
            });
          }
          if (recipe.processes) {
            recipe.processes.forEach((process) => {
              const processFormGroup = this.fb.group({
                description: process.description,
              });
              this.processURLs.push(process.photoURL);
              this.processes.push(processFormGroup);
              this.processSource.next(this.processes.controls);
            });
          }
        } else {
          this.isCreating = true;
          this.addIngredinet();
        }
        this.loading = false;
      });
    });
  }

  addIngredinet() {
    const ingredientFormGroup = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.maxIngredinetNameLength),
        ],
      ],
      amountAndUnit: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.maxIngredinetUnitLength),
        ],
      ],
    });
    this.ingredients.push(ingredientFormGroup);
    this.dataSource.next(this.ingredients.controls);
  }
  editIngredient() {
    if (!this.ingredient) {
      this.ingredient = true;
      this.displayedColumns.push('delete');
    } else {
      this.ingredient = false;
      this.displayedColumns.pop();
    }
  }
  removeIngredinet(index: number) {
    this.ingredients.removeAt(index);
    if (this.ingredients.length === 0) {
      this.ingredient = false;
      this.displayedColumns.pop();
    }
    this.dataSource.next(this.ingredients.controls);
  }

  addProcess() {
    const processFormGroup = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(500)]],
    });
    this.processes.push(processFormGroup);
    this.processURLs.push(null);
    this.processSource.next(this.processes.controls);
  }
  editProcess() {
    if (!this.process) {
      this.process = true;
      this.displayedColumnsProcess.push('delete');
    } else {
      this.process = false;
      this.displayedColumnsProcess.pop();
    }
  }
  removeProcess(index: number) {
    this.processes.removeAt(index);
    this.processURLs.splice(index, 1);
    if (this.processes.length === 0) {
      this.process = false;
      this.displayedColumnsProcess.pop();
    }
    this.processSource.next(this.processes.controls);
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
          processImageURL: this.processURLs[index],
          recipeId: this.query,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.processURLs.splice(index, 1, result);
      });
    }
    this.processImageInput.nativeElement.value = '';
  }
  back(): void {
    if (this.isCreating) {
      this.deleteImage();
    }
    this.location.back();
  }
  changePublic() {
    if (this.public) {
      this.public = false;
    } else {
      this.public = true;
    }
  }
  updateRecipe() {
    const formData = this.form.value;
    const sendProcesses: ProcessOfRecipe[] = this.processURLs.map(
      (v, index) => {
        return { ...formData.processes[index], photoURL: v };
      }
    );
    this.recipeService.updateRecipe({
      recipeId: this.query,
      recipeTitle: formData.recipeTitle,
      recipeThumbnailURL: this.thumbnailURL,
      recipeDescription: formData.recipeDescription,
      recipeCal: formData.recipeCal,
      recipeProtein: formData.recipeProtein,
      recipeFat: formData.recipeFat,
      recipeTotalCarbohydrate: formData.recipeTotalCarbohydrate,
      recipeDietaryFiber: formData.recipeDietaryFiber,
      recipeSugar: formData.recipeSugar,
      public: this.public,
      authorId: this.userId,
      foods: formData.ingredients,
      processes: sendProcesses,
    });
  }
  deleteImage() {
    this.recipeService.deleteUpdatedImage(this.userId, this.query);
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = '作業中の内容がありますが、再読み込みしますか？';
    }
  }
  ngOnInit(): void {}
}
