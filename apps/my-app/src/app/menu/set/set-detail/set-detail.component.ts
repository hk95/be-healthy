import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Set } from '../../../interfaces/set';
import { AuthService } from '../../../services/auth.service';
import { SetService } from '../../../services/set.service';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';

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
    private dialog: MatDialog,
    private router: Router
  ) {}

  openDeleteDialog(setId: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '80%',
      maxWidth: '400px',
      data: {
        userId: this.userId,
        setId,
        title: 'マイセット',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((res: boolean) => {
        if (res) {
          this.setService.deleteSet(this.userId, setId);
          this.router.navigateByUrl('/menu/set-list');
        }
      });
  }

  ngOnInit(): void {}
}
