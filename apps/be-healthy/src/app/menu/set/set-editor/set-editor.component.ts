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
  isBreakfast = false;
  isLunch = false;
  isDinner = false;

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
        this.isBreakfast = set.breakfast;
        this.isLunch = set.lunch;
        this.isDinner = set.dinner;

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

  private addFoodOrRecipeToArray(
    amount: number,
    food?: Food,
    recipe?: Recipe
  ): void {
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

  /**
   * 小数第一位まで取得
   * @param num 計算元の数字
   */
  private getRoundNumber(num: number): number {
    return Math.round(num * 10) / 10;
  }

  addFoodOrRecipe(amount: number, food?: Food, recipe?: Recipe): void {
    if (food) {
      this.addFoodOrRecipeToArray(amount, food);
      this.currentCal = this.getRoundNumber(
        this.currentCal + food.foodCalPerAmount * amount
      );
      this.currentProtein = this.getRoundNumber(
        this.currentProtein + food.foodProtein * amount
      );
      this.currentFat = this.getRoundNumber(
        this.currentFat + food.foodFat * amount
      );
      this.currentTotalCarbohydrate = this.getRoundNumber(
        this.currentTotalCarbohydrate + food.foodTotalCarbohydrate * amount
      );
      this.currentSugar = this.getRoundNumber(
        this.currentSugar + food.foodSugar * amount
      );
      this.currentDietaryFiber = this.getRoundNumber(
        this.currentDietaryFiber + food.foodDietaryFiber * amount
      );
    } else {
      this.addFoodOrRecipeToArray(amount, null, recipe);
      this.currentCal = this.getRoundNumber(this.currentCal + recipe.recipeCal);
      this.currentProtein = this.getRoundNumber(
        this.currentProtein + recipe.recipeProtein
      );
      this.currentFat = this.getRoundNumber(this.currentFat + recipe.recipeFat);
      this.currentTotalCarbohydrate = this.getRoundNumber(
        this.currentTotalCarbohydrate + recipe.recipeTotalCarbohydrate
      );
      this.currentSugar = this.getRoundNumber(
        this.currentSugar + recipe.recipeSugar
      );
      this.currentDietaryFiber = this.getRoundNumber(
        this.currentDietaryFiber + recipe.recipeDietaryFiber
      );
    }
    this.snackBar.open('食べ物を追加しました', null, {
      duration: 2000,
    });
  }

  removeFood(index: number, food: FoodInArray): void {
    this.foodsArray.removeAt(index);
    this.preFoods.splice(index, 1);
    if (food.recipe && food.recipe.recipeCal > 0) {
      this.currentCal = this.getRoundNumber(
        this.currentCal - food.recipe.recipeCal
      );
      this.currentProtein = this.getRoundNumber(
        this.currentProtein - food.recipe.recipeProtein
      );
      this.currentFat = this.getRoundNumber(
        this.currentFat - food.recipe.recipeFat
      );
      this.currentTotalCarbohydrate = this.getRoundNumber(
        this.currentTotalCarbohydrate - food.recipe.recipeTotalCarbohydrate
      );
      this.currentSugar = this.getRoundNumber(
        this.currentSugar - food.recipe.recipeSugar
      );
      this.currentDietaryFiber = this.getRoundNumber(
        this.currentDietaryFiber - food.recipe.recipeDietaryFiber
      );
    } else if (food.food.foodCalPerAmount && food.amount > 0) {
      this.currentCal = this.getRoundNumber(
        this.currentCal - food.food.foodCalPerAmount * food.amount
      );
      this.currentProtein = this.getRoundNumber(
        this.currentProtein - food.food.foodProtein * food.amount
      );
      this.currentFat = this.getRoundNumber(
        this.currentFat - food.food.foodFat * food.amount
      );
      this.currentTotalCarbohydrate = this.getRoundNumber(
        this.currentTotalCarbohydrate -
          food.food.foodTotalCarbohydrate * food.amount
      );
      this.currentSugar = this.getRoundNumber(
        this.currentSugar - food.food.foodSugar * food.amount
      );
      this.currentDietaryFiber = this.getRoundNumber(
        this.currentDietaryFiber - food.food.foodDietaryFiber * food.amount
      );
    }
  }

  changeMeal(meal: string): void {
    switch (meal) {
      case 'breakfast':
        this.isBreakfast = !this.isBreakfast ? true : false;
        break;
      case 'lunch':
        this.isLunch = !this.isLunch ? true : false;
        break;
      case 'dinner':
        this.isDinner = !this.isDinner ? true : false;
        break;
    }
  }

  submitSetForm(): void {
    const formData = this.form.value;
    this.setService.submitted = true;
    const setDataExcludeRecipeId = {
      userId: this.userId,
      setTitle: formData.setTitle,
      breakfast: this.isBreakfast,
      lunch: this.isLunch,
      dinner: this.isDinner,
      foodsArray: formData.foodsArray,
      setCal: formData.setCal,
      setProtein: formData.setProtein,
      setFat: formData.setFat,
      setTotalCarbohydrate: formData.setTotalCarbohydrate,
      setDietaryFiber: formData.setDietaryFiber,
      setSugar: formData.setSugar,
    };
    if (this.setId) {
      this.setService.updateSet({
        setId: this.setId,
        ...setDataExcludeRecipeId,
      });
    } else {
      this.setService.createSet({
        ...setDataExcludeRecipeId,
      });
    }
    this.location.back();
    this.setService.changeEditingDailyInfo();
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
    this.setService.changeEditingDailyInfo();
    this.location.back();
  }
}
