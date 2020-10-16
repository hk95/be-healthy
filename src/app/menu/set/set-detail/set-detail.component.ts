import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetService } from 'src/app/services/set.service';
import { AuthService } from 'src/app/services/auth.service';
import { Set } from 'src/app/interfaces/set';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-set-detail',
  templateUrl: './set-detail.component.html',
  styleUrls: ['./set-detail.component.scss'],
})
export class SetDetailComponent implements OnInit {
  private readonly userId: string = this.authService.uid;

  set$: Observable<Set> = this.route.queryParamMap.pipe(
    switchMap((queryParams) => {
      return this.setService.getSetById(this.userId, queryParams.get('id'));
    })
  );

  constructor(
    private route: ActivatedRoute,
    private setService: SetService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  openDeleteDialog(setId: string): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '80%',
      maxWidth: '400px',
      data: {
        userId: this.userId,
        setId,
        title: 'マイセット',
      },
    });
  }

  ngOnInit(): void {}
}
