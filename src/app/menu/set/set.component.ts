import { Component, OnInit } from '@angular/core';
import { SetService } from 'src/app/services/set.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Set, FoodInArray } from 'src/app/interfaces/set';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss'],
})
export class SetComponent implements OnInit {
  private setId: string;
  private getNumber = 10;
  private userId = this.authService.uid;
  private lastDoc: QueryDocumentSnapshot<Set>;

  sets: Set[] = new Array();
  loading: boolean;
  isNext: boolean;

  constructor(
    private setService: SetService,
    private router: Router,
    private authService: AuthService
  ) {
    this.getSets();
  }
  forwardbackToForm() {
    this.setId = this.setService.getTentativeRecipeId();
    this.router.navigate(['/set-editor'], {
      queryParams: {
        id: this.setId,
      },
    });
  }
  getSets() {
    this.loading = true;
    this.setService
      .getSets(this.userId, this.getNumber, this.lastDoc)
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
  ngOnInit(): void {}
}
