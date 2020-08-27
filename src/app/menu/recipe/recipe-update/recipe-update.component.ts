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

@Component({
  selector: 'app-recipe-update',
  templateUrl: './recipe-update.component.html',
  styleUrls: ['./recipe-update.component.scss'],
})
export class RecipeUpdateComponent implements OnInit {
  thumbnailURL: string = null;
  ProcessURLs = [];
  query: string;
  @ViewChild('thumbnail') thumbnailInput: ElementRef;
  @ViewChild('processImage') processImageInput: ElementRef;
  ingredient = false;
  ingredientQuanity = 0;
  process = false;
  processQuanity = 0;
  public: boolean;

  form = this.fb.group({
    recipeTitle: ['', [Validators.required, Validators.maxLength(50)]],
    recipeDescription: ['', [Validators.maxLength(500)]],
    ingredients: this.fb.array([], [Validators.required]),
    processDetails: this.fb.array([]),
    recipeCal: [''],
    recipeProtein: [''],
    recipeFat: [''],
    recipeTotalCarbohydrate: [''],
    recipeDietaryFiber: [''],
    recipeSugar: [''],
  });
  displayedColumns: string[] = ['name', 'amount'];
  get recipeTitle(): FormControl {
    return this.form.get('recipeTitle') as FormControl;
  }
  get descriptionControl(): FormControl {
    return this.form.get('recipeDescription') as FormControl;
  }
  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  get processDetails(): FormArray {
    return this.form.get('processDetails') as FormArray;
  }
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {
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
              this.ingredientQuanity++;
              this.ingredients.push(ingredientFormGroup);
            });
          }
          if (recipe.processes) {
            recipe.processes.forEach((process) => {
              const processFormGroup = this.fb.group({
                description: process.description,
              });
              this.processQuanity++;
              this.ProcessURLs.push(process.photoURL);
              this.processDetails.push(processFormGroup);
            });
          }
        } else {
          console.log('error');
        }
        this.addIngredinet();
      });
    });
  }

  addIngredinet() {
    const ingredientFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      amountAndUnit: ['', [Validators.required]],
    });
    this.ingredients.push(ingredientFormGroup);
    this.ingredientQuanity++;
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
    this.ingredientQuanity--;
    if (this.ingredientQuanity === 0) {
      this.ingredient = false;
    }
    this.dataSource.next(this.ingredients.controls);
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
  updateRecipe() {
    const formData = this.form.value;
    const sendProcesses = this.ProcessURLs.map((v, index) => {
      return { ...formData.processDetails[index], photoURL: v };
    });
    this.recipeService.updateRecipe(
      {
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
        foods: formData.ingredients,
        public: this.public,
        authorId: this.authService.uid,
      },
      sendProcesses
    );
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
