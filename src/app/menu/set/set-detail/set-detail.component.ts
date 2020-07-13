import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetService } from 'src/app/services/set.service';
import { AuthService } from 'src/app/services/auth.service';
import { Set, FoodInArray, Meal } from 'src/app/interfaces/set';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-set-detail',
  templateUrl: './set-detail.component.html',
  styleUrls: ['./set-detail.component.scss'],
})
export class SetDetailComponent implements OnInit {
  setId: string;
  userId: string = this.authService.uid;
  set: Set & { foodsArray: FoodInArray[] };
  mealOfSet: Meal;
  constructor(
    private route: ActivatedRoute,
    private setService: SetService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.route.queryParamMap.subscribe((query) => {
      this.setId = query.get('id');
    });
    this.setService
      .getSetByIdWithFoods(this.userId, this.setId)
      .pipe(take(1))
      .subscribe((set) => {
        this.set = set;
        this.mealOfSet = {
          breakfast: set.breakfast,
          lunch: set.lunch,
          dinner: set.dinner,
        };
      });
  }
  updateMeal(setId: string, meal: string, bool: boolean) {
    this.setService.updateMeal(this.userId, setId, meal, bool);
    if (meal === 'breakfast') {
      this.mealOfSet.breakfast = bool;
      this.setService.updateMeal(this.userId, setId, meal, bool);
    } else if (meal === 'lunch') {
      this.mealOfSet.lunch = bool;
      this.setService.updateMeal(this.userId, setId, meal, bool);
    } else {
      this.mealOfSet.dinner = bool;
      this.setService.updateMeal(this.userId, setId, meal, bool);
    }
  }
  openDeleteDialog(): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '80%',
      data: {
        userId: this.userId,
        setId: this.setId,
        title: 'マイセット',
      },
    });
  }

  ngOnInit(): void {}
}
