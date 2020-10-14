import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Set } from 'src/app/interfaces/set';
import { DailyMeal } from 'src/app/interfaces/daily-info';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { SetService } from 'src/app/services/set.service';
import { AverageService } from 'src/app/services/average.service';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MealInputComponent } from 'src/app/bottom-sheet/meal-input/meal-input.component';
import { MainShellService } from 'src/app/services/main-shell.service';

@Component({
  selector: 'app-my-set',
  templateUrl: './my-set.component.html',
  styleUrls: ['./my-set.component.scss'],
})
export class MySetComponent implements OnInit, OnDestroy {
  private lastDoc: QueryDocumentSnapshot<Set>;
  private subscription = new Subscription();
  private date: string;
  private meal: string;
  private count = 0;

  readonly maxSelectNum = 50;
  readonly minAmount = 0;
  readonly maxAmount = 100;
  readonly getNumber = 10;
  selectedMealsNum: number;
  amount = new Array(10).fill(0);
  sets: Set[] = new Array();
  isNext: boolean;
  loading: boolean;

  amountForm = this.fb.group({
    amountArray: this.fb.array([]),
  });
  get amountArray(): FormArray {
    return this.amountForm.get('amountArray') as FormArray;
  }
  constructor(
    private route: ActivatedRoute,
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private setService: SetService,
    private router: Router,
    private averageService: AverageService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private mainShellService: MainShellService
  ) {
    const routeSub = this.route.queryParamMap.subscribe((paramMaps) => {
      this.date = paramMaps.get('date');
      this.meal = paramMaps.get('meal');
      this.getSets();
    });
    const selectedSub = this.getSelectedMeals();
    const routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.averageService.averageTotalCal(this.authService.uid, this.date);
      }
    });
    this.subscription.add(routeSub);
    this.subscription.add(selectedSub);
    this.subscription.add(routerSub);
  }

  private setFormArray(count: number) {
    const minCount = count * 10;
    for (let i = minCount; i < minCount + 10; i++) {
      const amountGroup = this.fb.group({
        [i]: [
          0,
          [Validators.min(this.minAmount), Validators.max(this.maxAmount)],
        ],
      });
      this.amountArray.push(amountGroup);
    }
    this.count++;
  }

  getSets() {
    this.loading = true;
    this.setFormArray(this.count);
    this.setService
      .getSets(this.authService.uid, this.getNumber, this.lastDoc, this.meal)
      .pipe(take(1))
      .subscribe((sets) => {
        if (sets && sets.length > 0) {
          sets.forEach(
            (set: { data: Set; nextLastDoc: QueryDocumentSnapshot<Set> }) => {
              this.sets.push(set.data);
              this.lastDoc = set.nextLastDoc;
            }
          );
          sets.length >= this.getNumber
            ? (this.isNext = true)
            : (this.isNext = false);
        } else {
          this.isNext = false;
        }
        this.loading = false;
      });
  }

  addSet(amount: number, set: Set) {
    if (amount >= 0) {
      const meal: DailyMeal = { mealId: '', set, amount };
      this.dailyInfoService.addMeal(
        meal,
        this.authService.uid,
        this.date,
        'set'
      );
    }
  }

  outSet(setId: string, index: number) {
    this.setService.updateMeal(this.authService.uid, setId, this.meal, false);
    this.sets.splice(index, 1);
  }

  goToSetPage() {
    this.dailyInfoService.goToSetPage(this.date, this.meal);
    this.setService.addingDailyInfo();
  }

  openBottomSheet(set: Set): void {
    this.bottomSheet.open(MealInputComponent, {
      data: {
        userId: this.authService.uid,
        date: this.date,
        maxAmount: this.maxAmount,
        minAmount: this.minAmount,
        set,
      },
    });
  }

  private getSelectedMeals() {
    this.mainShellService.selectedMeals.subscribe((v) => {
      this.selectedMealsNum = v?.length;
    });
  }

  ngOnInit(): void {
    const changeMealSub = this.dailyInfoService.whichMeal$.subscribe(
      (whichMeal) => {
        if (whichMeal !== 'notChange') {
          this.lastDoc = null;
          this.meal = whichMeal;
          this.sets = new Array();
        }
      }
    );
    this.subscription.add(changeMealSub);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
