import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Set } from '../../interfaces/set';
import { SetService } from '../../services/set.service';
import { AuthService } from '../../services/auth.service';
import { DailyInfoService } from '../../services/daily-info.service';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss'],
})
export class SetComponent implements OnInit {
  private readonly editorMealPageQueryParams = this.dailyInfoService
    .editorMealPageQueryParams;
  private readonly isQuerySetParam = this.setService.isEditingEditorMeal;
  private readonly perDocNum = 10;
  private readonly userId: string = this.authService.uid;
  private lastDoc: QueryDocumentSnapshot<Set>;

  sets: Set[] = [];
  loading = true;
  isNext: boolean;

  constructor(
    private setService: SetService,
    private router: Router,
    private authService: AuthService,
    private dailyInfoService: DailyInfoService
  ) {
    this.loadSets();
  }

  loadSets(): void {
    this.setService
      .getSets(this.userId, this.perDocNum, this.lastDoc)
      .pipe(take(1))
      .subscribe((sets) => {
        if (sets?.length > 0) {
          sets.forEach(
            (set: { data: Set; nextLastDoc: QueryDocumentSnapshot<Set> }) => {
              this.sets.push(set.data);
              this.lastDoc = set.nextLastDoc;
            }
          );
          if (sets.length >= this.perDocNum) {
            this.isNext = true;
          }
        } else {
          if (this.editorMealPageQueryParams && this.isQuerySetParam) {
            this.router.navigateByUrl('/set-editor');
          }
          this.isNext = false;
        }
        this.loading = false;
      });
  }

  ngOnInit(): void {}
}
