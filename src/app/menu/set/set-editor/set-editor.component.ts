import { Component, OnInit, HostListener } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Location } from '@angular/common';
import { SearchService } from 'src/app/services/search.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap, take } from 'rxjs/operators';
import { SetService } from 'src/app/services/set.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmRecipeComponent } from 'src/app/dialogs/confirm-recipe/confirm-recipe.component';
import { FoodInArray, Set } from 'src/app/interfaces/set';

import { Recipe, RecipeWithAuthor } from 'src/app/interfaces/recipe';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Food } from 'src/app/interfaces/food';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-set-editor',
  templateUrl: './set-editor.component.html',
  styleUrls: ['./set-editor.component.scss'],
})
export class SetEditorComponent implements OnInit {
  private readonly userId = this.authService.uid;
  private readonly perDocNum = 10;
  private setId: string;
  private lastMyRecipeDoc: QueryDocumentSnapshot<Recipe>;

  readonly maxTitleLength = 50;
  readonly maxNutritionAmount = 5000;
  readonly minNutritionAmount = 0;
  readonly arrayLimit = 30;
  set$: Observable<Set> = this.route.queryParamMap.pipe(
    switchMap((queryParams) => {
      this.setId = queryParams.get('id');
      return this.setService.getSetById(this.userId, this.setId);
    })
  );
  panelOpenState = true;
  title: string;
  config = this.searchService.config;
  myRecipes: RecipeWithAuthor[] = new Array();
  isNext: boolean;
  currentCal = 0;
  currentProtein = 0;
  currentFat = 0;
  currentTotalCarbohydrate = 0;
  currentSugar = 0;
  currentDietaryFiber = 0;
  preFoods: FoodInArray[] = new Array();
  breakfast = false;
  lunch = false;
  dinner = false;

  form = this.fb.group({
    setTitle: [
      '',
      [Validators.required, Validators.maxLength(this.maxTitleLength)],
    ],
    foodsArray: this.fb.array([]),
    setCal: [
      '',
      [
        Validators.required,
        Validators.min(this.minNutritionAmount),
        Validators.max(this.maxNutritionAmount),
      ],
    ],
    setProtein: [
      '',
      [
        Validators.required,
        Validators.min(this.minNutritionAmount),
        Validators.max(this.maxNutritionAmount),
      ],
    ],
    setFat: [
      '',
      [
        Validators.required,
        Validators.min(this.minNutritionAmount),
        Validators.max(this.maxNutritionAmount),
      ],
    ],
    setTotalCarbohydrate: [
      '',
      [
        Validators.required,
        Validators.min(this.minNutritionAmount),
        Validators.max(this.maxNutritionAmount),
      ],
    ],
    setDietaryFiber: [
      '',
      [
        Validators.required,
        Validators.min(this.minNutritionAmount),
        Validators.max(this.maxNutritionAmount),
      ],
    ],
    setSugar: [
      '',
      [
        Validators.required,
        Validators.min(this.minNutritionAmount),
        Validators.max(this.maxNutritionAmount),
      ],
    ],
  });
  get titleControl(): FormControl {
    return this.form.get('setTitle') as FormControl;
  }
  get setCalControl(): FormControl {
    return this.form.get('setCal') as FormControl;
  }
  get setProteinControl(): FormControl {
    return this.form.get('setProtein') as FormControl;
  }
  get setFatControl(): FormControl {
    return this.form.get('setFat') as FormControl;
  }
  get setTotalCarbohydrateControl(): FormControl {
    return this.form.get('setTotalCarbohydrate') as FormControl;
  }
  get setDietaryFiberControl(): FormControl {
    return this.form.get('setDietaryFiber') as FormControl;
  }
  get setSugarControl(): FormControl {
    return this.form.get('setSugar') as FormControl;
  }
  get foodsArray(): FormArray {
    return this.form.get('foodsArray') as FormArray;
  }
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private searchService: SearchService,
    private recipeService: RecipeService,
    private authService: AuthService,
    private setService: SetService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.set$.pipe(take(1)).subscribe((set) => {
      if (set) {
        this.title = '編集';
        this.form.patchValue(set);
        this.breakfast = set.breakfast;
        this.lunch = set.lunch;
        this.dinner = set.dinner;

        set.foodsArray.forEach((food) => {
          if (food.food) {
            this.addFoodOrRecipeToArray(food.amount, food.food);
          } else {
            this.addFoodOrRecipeToArray(food.amount, null, food.recipe);
          }
        });
      }
    });
    this.loadMyRecipes();
  }

  loadMyRecipes(): void {
    this.recipeService
      .getMyRecipes(this.userId, this.perDocNum, this.lastMyRecipeDoc)
      .pipe(take(1))
      .subscribe(
        (doc: {
          data: RecipeWithAuthor[];
          nextLastDoc: QueryDocumentSnapshot<Recipe>;
        }) => {
          if (doc) {
            this.lastMyRecipeDoc = doc.nextLastDoc;
            if (doc.data && doc.data.length > 0) {
              doc.data.forEach((recipe: RecipeWithAuthor) => {
                this.myRecipes.push(recipe);
                if (doc.data.length >= this.perDocNum) {
                  this.isNext = true;
                } else {
                  this.isNext = false;
                }
              });
            }
          } else {
            this.isNext = false;
          }
        }
      );
  }

  addFoodOrRecipeToArray(
    preAmount: number,
    food?: Food,
    recipe?: Recipe
  ): void {
    const amount = Number(preAmount ? preAmount : 0);
    if (food) {
      this.preFoods.push({
        food: { ...food },
        amount,
      });
      const foodFormGroup = this.fb.group({
        food: {
          foodId: food.foodId,
          foodName: food.foodName,
          unit: food.unit,
          foodCalPerAmount: food.foodCalPerAmount,
          foodProtein: food.foodProtein,
          foodFat: food.foodFat,
          foodTotalCarbohydrate: food.foodTotalCarbohydrate,
          foodSugar: food.foodSugar,
          foodDietaryFiber: food.foodDietaryFiber,
        },
        amount: [amount, [Validators.max(1000)]],
      });
      this.foodsArray.push(foodFormGroup);
    } else {
      this.preFoods.push({
        recipe: { ...recipe },
        amount,
      });
      const foodFormGroup = this.fb.group({
        recipe: {
          recipeId: recipe.recipeId,
          recipeTitle: recipe.recipeTitle,
          recipeCal: recipe.recipeCal,
          recipeProtein: recipe.recipeProtein,
          recipeFat: recipe.recipeFat,
          recipeTotalCarbohydrate: recipe.recipeTotalCarbohydrate,
          recipeSugar: recipe.recipeSugar,
          recipeDietaryFiber: recipe.recipeDietaryFiber,
        },
        amount: [amount, [Validators.max(1000)]],
      });
      this.foodsArray.push(foodFormGroup);
    }
  }

  addFood(preAmount: number, food?: Food, recipe?: Recipe) {
    const amount = Number(preAmount ? preAmount : 0);
    if (food) {
      this.addFoodOrRecipeToArray(preAmount, food);
      this.currentCal =
        Math.round((this.currentCal + food.foodCalPerAmount * amount) * 10) /
        10;
      this.currentProtein =
        Math.round((this.currentProtein + food.foodProtein * amount) * 10) / 10;
      this.currentFat =
        Math.round((this.currentFat + food.foodFat * amount) * 10) / 10;
      this.currentTotalCarbohydrate =
        Math.round(
          (this.currentTotalCarbohydrate +
            food.foodTotalCarbohydrate * amount) *
            10
        ) / 10;
      this.currentSugar =
        Math.round((this.currentSugar + food.foodSugar * amount) * 10) / 10;
      this.currentDietaryFiber =
        Math.round(
          (this.currentDietaryFiber + food.foodDietaryFiber * amount) * 10
        ) / 10;
    } else {
      this.addFoodOrRecipeToArray(preAmount, food, recipe);
      this.currentCal =
        Math.round((this.currentCal + recipe.recipeCal) * 10) / 10;
      this.currentProtein =
        Math.round((this.currentProtein + recipe.recipeProtein) * 10) / 10;
      this.currentFat =
        Math.round((this.currentFat + recipe.recipeFat) * 10) / 10;
      this.currentTotalCarbohydrate =
        Math.round(
          (this.currentTotalCarbohydrate + recipe.recipeTotalCarbohydrate) * 10
        ) / 10;
      this.currentSugar =
        Math.round((this.currentSugar + recipe.recipeSugar) * 10) / 10;
      this.currentDietaryFiber =
        Math.round(
          (this.currentDietaryFiber + recipe.recipeDietaryFiber) * 10
        ) / 10;
    }
    this.snackBar.open('食べ物を追加しました', null, {
      duration: 2000,
    });
  }

  removeFood(index: number, food: FoodInArray): void {
    this.foodsArray.removeAt(index);
    this.preFoods.splice(index, 1);
    if (food.recipe && food.recipe.recipeCal > 0) {
      this.currentCal =
        Math.round((this.currentCal - food.recipe.recipeCal) * 10) / 10;
      this.currentProtein =
        Math.round((this.currentProtein - food.recipe.recipeProtein) * 10) / 10;
      this.currentFat =
        Math.round((this.currentFat - food.recipe.recipeFat) * 10) / 10;
      this.currentTotalCarbohydrate =
        Math.round(
          (this.currentTotalCarbohydrate -
            food.recipe.recipeTotalCarbohydrate) *
            10
        ) / 10;
      this.currentSugar =
        Math.round((this.currentSugar - food.recipe.recipeSugar) * 10) / 10;
      this.currentDietaryFiber =
        Math.round(
          (this.currentDietaryFiber - food.recipe.recipeDietaryFiber) * 10
        ) / 10;
    } else if (food.food.foodCalPerAmount && food.amount > 0) {
      this.currentCal =
        Math.round(
          (this.currentCal - food.food.foodCalPerAmount * food.amount) * 10
        ) / 10;
      this.currentProtein =
        Math.round(
          (this.currentProtein - food.food.foodProtein * food.amount) * 10
        ) / 10;
      this.currentFat =
        Math.round((this.currentFat - food.food.foodFat * food.amount) * 10) /
        10;
      this.currentTotalCarbohydrate =
        Math.round(
          (this.currentTotalCarbohydrate -
            food.food.foodTotalCarbohydrate * food.amount) *
            10
        ) / 10;
      this.currentSugar =
        Math.round(
          (this.currentSugar - food.food.foodSugar * food.amount) * 10
        ) / 10;
      this.currentDietaryFiber =
        Math.round(
          (this.currentDietaryFiber -
            food.food.foodDietaryFiber * food.amount) *
            10
        ) / 10;
    }
  }

  changeMeal(meal: string): void {
    switch (meal) {
      case 'breakfast':
        if (!this.breakfast) {
          this.breakfast = true;
        } else {
          this.breakfast = false;
        }
        break;
      case 'lunch':
        if (!this.lunch) {
          this.lunch = true;
        } else {
          this.lunch = false;
        }
        break;
      case 'dinner':
        if (!this.dinner) {
          this.dinner = true;
        } else {
          this.dinner = false;
        }
        break;
    }
  }

  submitSetForm(): void {
    const formData = this.form.value;
    this.setService.submitted = true;
    if (this.setId) {
      this.setService.updateSet({
        setId: this.setId,
        userId: this.userId,
        setTitle: formData.setTitle,
        breakfast: this.breakfast,
        lunch: this.lunch,
        dinner: this.dinner,
        foodsArray: formData.foodsArray,
        setCal: formData.setCal,
        setProtein: formData.setProtein,
        setFat: formData.setFat,
        setTotalCarbohydrate: formData.setTotalCarbohydrate,
        setDietaryFiber: formData.setDietaryFiber,
        setSugar: formData.setSugar,
      });
    } else {
      this.setService.createSet({
        userId: this.userId,
        setTitle: formData.setTitle,
        breakfast: this.breakfast,
        lunch: this.lunch,
        dinner: this.dinner,
        foodsArray: formData.foodsArray,
        setCal: formData.setCal,
        setProtein: formData.setProtein,
        setFat: formData.setFat,
        setTotalCarbohydrate: formData.setTotalCarbohydrate,
        setDietaryFiber: formData.setDietaryFiber,
        setSugar: formData.setSugar,
      });
    }
    this.setService.addingDailyInfo();
  }

  openRecipeDialog(recipeId: string): void {
    this.dialog.open(ConfirmRecipeComponent, {
      width: '100%',
      data: recipeId,
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = '作業中の内容がありますが、再読み込みしますか？';
    }
  }

  backToMenuPage(): void {
    this.setService.addingDailyInfo();
    this.location.back();
  }
}
