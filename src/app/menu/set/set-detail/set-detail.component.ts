import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetService } from 'src/app/services/set.service';
import { AuthService } from 'src/app/services/auth.service';
import { Set } from 'src/app/interfaces/set';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-set-detail',
  templateUrl: './set-detail.component.html',
  styleUrls: ['./set-detail.component.scss'],
})
export class SetDetailComponent implements OnInit, OnDestroy {
  private readonly userId: string = this.authService.uid;
  private subscription: Subscription;

  set: Set;
  setId: string;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private setService: SetService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.subscription = this.route.queryParamMap.subscribe((query) => {
      this.setId = query.get('id');
    });
    this.setService
      .getSetById(this.userId, this.setId)
      .pipe(take(1))
      .subscribe((set) => {
        this.set = set;
        this.loading = false;
      });
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
