import { Component, OnInit, OnDestroy } from '@angular/core';
import { SetService } from 'src/app/services/set.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Set, Meal } from 'src/app/interfaces/set';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss'],
})
export class SetComponent implements OnInit, OnDestroy {
  setId: string;
  userId = this.authService.uid;
  sets: Set[];
  mealOfAllSets: Meal[];
  loading: boolean;
  setSub: Subscription;
  constructor(
    private setService: SetService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loading = true;
    this.setSub = this.setService
      .getSets(this.authService.uid)
      .subscribe((sets?) => {
        if (sets && sets.length > 0) {
          this.sets = sets;
          this.mealOfAllSets = sets.map((set) => {
            return {
              breakfast: set.breakfast,
              lunch: set.lunch,
              dinner: set.dinner,
            };
          });
        }
        this.loading = false;
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

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.setSub.unsubscribe();
  }
}
