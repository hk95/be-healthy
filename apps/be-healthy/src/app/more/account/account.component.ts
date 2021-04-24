import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { take } from 'rxjs/operators';
import { BasicInfo } from '../../interfaces/basic-info';
import { OthreShellService } from '../../services/othre-shell.service';
import { BasicInfoService } from '../../services/basic-info.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  private readonly userId = this.authService.uid;

  basicInfo$: Observable<BasicInfo> = this.basicInfoService.getBasicInfo(
    this.userId
  );

  constructor(
    private othreShellService: OthreShellService,
    private basicInfoService: BasicInfoService,
    private authService: AuthService,
    private dialog: MatDialog,
    private userService: UserService
  ) {
    this.othreShellService.title = this.othreShellService.PAGE_TITLES.account;
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '80%',
      maxWidth: '400px',
      data: {
        title: 'アカウント削除',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((res: boolean) => {
        if (res) {
          this.userService.deleteUserAccount();
        }
      });
  }

  ngOnInit(): void {}
}
