import { Component, OnInit } from '@angular/core';
import { OthreShellService } from 'src/app/services/othre-shell.service';
import { BasicInfo } from 'src/app/interfaces/basic-info';
import { Observable } from 'rxjs';
import { BasicInfoService } from 'src/app/services/basic-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';

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
    private dialog: MatDialog
  ) {
    this.othreShellService.title = this.othreShellService.PAGE_TITLES.account;
  }

  openDeleteDialog(): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '80%',
      maxWidth: '400px',
      data: {
        title: 'アカウント削除',
      },
    });
  }

  ngOnInit(): void {}
}
