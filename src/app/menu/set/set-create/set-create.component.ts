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

@Component({
  selector: 'app-set-create',
  templateUrl: './set-create.component.html',
  styleUrls: ['./set-create.component.scss'],
})
export class SetCreateComponent implements OnInit {
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

  form = this.fb.group({
    setTitle: ['', [Validators.required, Validators.maxLength(50)]],
    meal: this.fb.group({
      breakfast: [false],
      lunch: [false],
      dinner: [false],
    }),
    foodsArray: this.fb.array([], [Validators.required]),
    setCal: [''],
    setProtein: [''],
    setFat: [''],
    setTotalCarbohydrate: [''],
    setDietaryFiber: [''],
    setSugar: [''],
  });
  get titleControle() {
    return this.form.get('setTitle') as FormControl;
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
    });
    this.recipeService
      .getMyRecipes(this.userId)
      .pipe(take(1))
      .subscribe((recipes) => {
        this.myRecipes = recipes;
      });
  }

  addFood(food, preAmount: number) {
    const amount = Number(preAmount);
    this.preFoods.push({
      ...food,
      amount,
    });
    if (food.foodId) {
      const foodFormGroup = this.fb.group({
        foodId: food.foodId,
        amount,
      });
      this.foodsArray.push(foodFormGroup);
      this.currentCal =
        Math.round((this.currentCal + food.calPerAmount * amount) * 10) / 10;
      this.currentProtein =
        Math.round((this.currentProtein + food.protein * amount) * 10) / 10;
      this.currentFat =
        Math.round((this.currentFat + food.foodFat * amount) * 10) / 10;
      this.currentTotalCarbohydrate =
        Math.round(
          (this.currentTotalCarbohydrate + food.totalCarbohydrate * amount) * 10
        ) / 10;
      this.currentSugar =
        Math.round((this.currentSugar + food.sugar * amount) * 10) / 10;
      this.currentDietaryFiber =
        Math.round(
          (this.currentDietaryFiber + food.dietaryFiber * amount) * 10
        ) / 10;
    } else {
      const foodFormGroup = this.fb.group({
        foodId: food.recipeId,
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
        Math.round((this.currentCal - food.calPerAmount * food.amount) * 10) /
        10;
      this.currentProtein =
        Math.round((this.currentProtein - food.protein * food.amount) * 10) /
        10;
      this.currentFat =
        Math.round((this.currentFat - food.foodFat * food.amount) * 10) / 10;
      this.currentTotalCarbohydrate =
        Math.round(
          (this.currentTotalCarbohydrate -
            food.totalCarbohydrate * food.amount) *
            10
        ) / 10;
      this.currentSugar =
        Math.round((this.currentSugar - food.sugar * food.amount) * 10) / 10;
      this.currentDietaryFiber =
        Math.round(
          (this.currentDietaryFiber - food.dietaryFiber * food.amount) * 10
        ) / 10;
    }
  }

  ngOnInit(): void {}
  changeBreakfast() {
    if (!this.form.value.meal.breakfast) {
      this.form.value.meal.breakfast = true;
    } else {
      this.form.value.meal.breakfast = false;
    }
  }
  changeLunch() {
    if (!this.form.value.meal.lunch) {
      this.form.value.meal.lunch = true;
    } else {
      this.form.value.meal.lunch = false;
    }
  }
  changeDinner() {
    if (!this.form.value.meal.dinner) {
      this.form.value.meal.dinner = true;
    } else {
      this.form.value.meal.dinner = false;
    }
  }
  submit() {
    const formData = this.form.value;
    this.setService.createSet({
      setId: this.query,
      userId: this.userId,
      setTitle: formData.setTitle,
      meal: {
        breakfast: formData.meal.breakfast,
        lunch: formData.meal.lunch,
        dinner: formData.meal.dinner,
      },
      foodsArray: formData.foodsArray,
      setCal: formData.setCal,
      setProtein: formData.setProtein,
      setFat: formData.setFat,
      setTotalCarbohydrate: formData.setTotalCarbohydrate,
      setDietaryFiber: formData.setDietaryFiber,
      setSugar: formData.setSugar,
    });
  }
  openRecipe(recipeId): void {
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
