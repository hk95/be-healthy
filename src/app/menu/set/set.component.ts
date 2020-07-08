import { Component, OnInit } from '@angular/core';
import { SetService } from 'src/app/services/set.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Set, Meal } from 'src/app/interfaces/set';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss'],
})
export class SetComponent implements OnInit {
  setId: string;
  userId = this.authService.uid;
  sets$: Observable<Set[]> = this.setService.getSets(this.userId).pipe(take(1));
  sets: Set[];
  mealOfAllSets: Meal[];
  constructor(
    private setService: SetService,
    private router: Router,
    private authService: AuthService
  ) {
    this.setService
      .getSets(this.authService.uid)
      .pipe(take(1))
      .subscribe((sets) => {
        this.sets = sets;
        this.mealOfAllSets = sets.map((set) => {
          return {
            breakfast: set.breakfast,
            lunch: set.lunch,
            dinner: set.dinner,
          };
        });
      });
  }
  forwardbackToForm() {
    this.setId = this.setService.getTentativeRecipeId();
    this.router.navigate(['/set-editor'], {
      queryParams: {
        id: this.setId,
      },
    });
  }
  updateMeal(setId: string, meal: string, bool: boolean, index: number) {
    this.setService.updateMeal(this.userId, setId, meal, bool);
    if (meal === 'breakfast') {
      this.mealOfAllSets[index].breakfast = bool;
      this.setService.updateMeal(this.userId, setId, meal, bool);
    } else if (meal === 'lunch') {
      this.mealOfAllSets[index].lunch = bool;
      this.setService.updateMeal(this.userId, setId, meal, bool);
    } else {
      this.mealOfAllSets[index].dinner = bool;
      this.setService.updateMeal(this.userId, setId, meal, bool);
    }
  }
  ngOnInit(): void {}
}
