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
import { take } from 'rxjs/operators';
import { SetService } from 'src/app/services/set.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmRecipeComponent } from 'src/app/dialogs/confirm-recipe/confirm-recipe.component';
import { FoodOrRecipe } from 'src/app/interfaces/set';

@Component({
  selector: 'app-set-editor',
  templateUrl: './set-editor.component.html',
  styleUrls: ['./set-editor.component.scss'],
})
export class SetEditorComponent implements OnInit {
  title: string;
  config = this.searchService.config;
  query: string;
  userId = this.authService.uid;
  myRecipes = [];
  currentCal = 0;
  currentProtein = 0;
  currentFat = 0;
  currentTotalCarbohydrate = 0;
  currentSugar = 0;
  currentDietaryFiber = 0;
  preFoods = [];
  breakfast = false;
  lunch = false;
  dinner = false;

  form = this.fb.group({
    setTitle: ['', [Validators.required, Validators.maxLength(50)]],
    foodsArray: this.fb.array([]),
    setCal: [
      '',
      [Validators.required, Validators.min(0), Validators.max(5000)],
    ],
    setProtein: [
      '',
      [Validators.required, Validators.min(0), Validators.max(5000)],
    ],
    setFat: [
      '',
      [Validators.required, Validators.min(0), Validators.max(5000)],
    ],
    setTotalCarbohydrate: [
      '',
      [Validators.required, Validators.min(0), Validators.max(5000)],
    ],
    setDietaryFiber: [
      '',
      [Validators.required, Validators.min(0), Validators.max(5000)],
    ],
    setSugar: [
      '',
      [Validators.required, Validators.min(0), Validators.max(5000)],
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
    private dialog: MatDialog
  ) {
    this.route.queryParamMap.subscribe((setId) => {
      this.query = setId.get('id');
      this.setService
        .getSetByIdWithFoods(this.userId, this.query)
        .pipe(take(1))
        .subscribe((set) => {
          if (set) {
            this.title = '編集';
            this.form.patchValue(set);
            this.breakfast = set.breakfast;
            this.lunch = set.lunch;
            this.dinner = set.dinner;
            this.preFoods = [...set.foodsArray];
          }
        });
    });
    this.recipeService
      .getMyRecipes(this.userId)
      .pipe(take(1))
      .subscribe((recipes) => {
        this.myRecipes = recipes;
      });
  }

  addFood(food: FoodOrRecipe, preAmount: number) {
    const amount = Number(preAmount);
    this.preFoods.push({
      ...food,
      amount,
    });
    if (food.foodId) {
      const foodFormGroup = this.fb.group({
        foodId: food.foodId,
        foodName: food.foodName,
        unit: food.unit,
        foodCalPerAmount: food.foodCalPerAmount,
        foodProtein: food.foodProtein,
        foodFat: food.foodFat,
        foodTotalCarbohydrate: food.foodTotalCarbohydrate,
        foodSugar: food.foodSugar,
        foodDietaryFiber: food.foodDietaryFiber,
        amount: [amount, [Validators.max(1000)]],
      });
      this.foodsArray.push(foodFormGroup);
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
      const foodFormGroup = this.fb.group({
        recipeId: food.recipeId,
        foodName: food.recipeTitle,
        recipeCal: food.recipeCal,
        recipeProtein: food.recipeProtein,
        recipeFat: food.recipeFat,
        recipeTotalCarbohydrate: food.recipeTotalCarbohydrate,
        recipeSugar: food.recipeSugar,
        recipeDietaryFiber: food.recipeDietaryFiber,
        amount,
      });
      this.foodsArray.push(foodFormGroup);
      this.currentCal =
        Math.round((this.currentCal + food.recipeCal) * 10) / 10;
      this.currentProtein =
        Math.round((this.currentProtein + food.recipeProtein) * 10) / 10;
      this.currentFat =
        Math.round((this.currentFat + food.recipeFat) * 10) / 10;
      this.currentTotalCarbohydrate =
        Math.round(
          (this.currentTotalCarbohydrate + food.recipeTotalCarbohydrate) * 10
        ) / 10;
      this.currentSugar =
        Math.round((this.currentSugar + food.recipeSugar) * 10) / 10;
      this.currentDietaryFiber =
        Math.round((this.currentDietaryFiber + food.recipeDietaryFiber) * 10) /
        10;
    }
  }
  removeFood(index: number, food) {
    this.setService.deleteFoodOfSet(this.userId, this.query, food.setId);
    this.foodsArray.removeAt(index);
    this.preFoods.splice(index, 1);
    if (food.recipeCal) {
      this.currentCal =
        Math.round((this.currentCal - food.recipeCal) * 10) / 10;
      this.currentProtein =
        Math.round((this.currentProtein - food.recipeProtein) * 10) / 10;
      this.currentFat =
        Math.round((this.currentFat - food.recipeFat) * 10) / 10;
      this.currentTotalCarbohydrate =
        Math.round(
          (this.currentTotalCarbohydrate - food.recipeTotalCarbohydrate) * 10
        ) / 10;
      this.currentSugar =
        Math.round((this.currentSugar - food.recipeSugar) * 10) / 10;
      this.currentDietaryFiber =
        Math.round((this.currentDietaryFiber - food.recipeDietaryFiber) * 10) /
        10;
    } else {
      this.currentCal =
        Math.round(
          (this.currentCal - food.foodCalPerAmount * food.amount) * 10
        ) / 10;
      this.currentProtein =
        Math.round(
          (this.currentProtein - food.foodProtein * food.amount) * 10
        ) / 10;
      this.currentFat =
        Math.round((this.currentFat - food.foodFat * food.amount) * 10) / 10;
      this.currentTotalCarbohydrate =
        Math.round(
          (this.currentTotalCarbohydrate -
            food.foodTotalCarbohydrate * food.amount) *
            10
        ) / 10;
      this.currentSugar =
        Math.round((this.currentSugar - food.foodSugar * food.amount) * 10) /
        10;
      this.currentDietaryFiber =
        Math.round(
          (this.currentDietaryFiber - food.foodDietaryFiber * food.amount) * 10
        ) / 10;
    }
  }

  ngOnInit(): void {}
  changeMeal(meal: string) {
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

  submit() {
    const formData = this.form.value;
    this.setService.submitted = true;
    this.setService.createSet({
      setId: this.query,
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
  openRecipe(recipeId: string): void {
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
  backToMenu() {
    this.location.back();
  }
}
