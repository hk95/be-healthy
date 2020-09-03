import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Set } from 'src/app/interfaces/set';
import { DailyMeal } from 'src/app/interfaces/daily-info';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { SetService } from 'src/app/services/set.service';
import { AverageService } from 'src/app/services/average.service';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-my-set',
  templateUrl: './my-set.component.html',
  styleUrls: ['./my-set.component.scss'],
})
export class MySetComponent implements OnInit, OnDestroy {
  private lastDoc: QueryDocumentSnapshot<Set>;

  amount = [].fill(0);
  date: string;
  meal: string;
  sets: Set[] = new Array();
  subscription = new Subscription();
  minAmount = 0;
  maxAmount = 100;
  getNumber = 10;
  isNext: boolean;
  loading: boolean;

  amountForm = this.fb.group({
    amount: [
      0,
      [Validators.min(this.minAmount), Validators.max(this.maxAmount)],
    ],
  });
  get amountControl(): FormControl {
    return this.amountForm.get('amount') as FormControl;
  }
  constructor(
    private route: ActivatedRoute,
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private setService: SetService,
    private router: Router,
    private averageService: AverageService,
    private fb: FormBuilder
  ) {
    this.route.queryParamMap.subscribe((paramMaps) => {
      this.date = paramMaps.get('date');
      this.meal = paramMaps.get('meal');
    });
    this.getSets();
    const routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.averageService.averageTotalCal(this.authService.uid, this.date);
      }
    });
    this.subscription.add(routerSub);
  }
  getSets() {
    this.loading = true;
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
          if (sets.length >= this.getNumber) {
            this.isNext = true;
          }
        } else {
          this.isNext = false;
        }
        this.loading = false;
      });
  }
  addSet(amount: number, set: Set) {
    const meal: DailyMeal = { mealId: '', set, amount };
    this.dailyInfoService.addMeal(meal, this.authService.uid, this.date, 'set');
  }

  outSet(setId: string, index: number) {
    this.setService.updateMeal(this.authService.uid, setId, this.meal, false);
    this.sets.splice(index, 1);
  }

  goToSetPage() {
    this.dailyInfoService.goToSetPage(this.date, this.meal);
  }

  ngOnInit(): void {
    const changeMealSub = this.dailyInfoService.whichMeal$.subscribe(
      (whichMeal) => {
        if (whichMeal !== 'notChange') {
          this.lastDoc = null;
          this.meal = whichMeal;
          this.sets = new Array();
          this.getSets();
        }
      }
    );
    this.subscription.add(changeMealSub);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
