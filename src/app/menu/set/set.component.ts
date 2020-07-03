import { Component, OnInit } from '@angular/core';
import { SetService } from 'src/app/services/set.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Set } from 'src/app/interfaces/set';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss'],
})
export class SetComponent implements OnInit {
  setId: string;
  sets$: Observable<Set[]> = this.setService
    .getSets(this.authService.uid)
    .pipe(take(1));

  constructor(
    private setService: SetService,
    private router: Router,
    private authService: AuthService
  ) {
    this.setService
      .getSets(this.authService.uid)
      .pipe(take(1))
      .subscribe((v) => {
        return v.map((s) => console.log(s));
      });
  }
  forwardbackToForm() {
    this.setId = this.setService.getTentativeRecipeId();
    this.router.navigate(['/set-create'], {
      queryParams: {
        id: this.setId,
      },
    });
  }
  ngOnInit(): void {}
}
