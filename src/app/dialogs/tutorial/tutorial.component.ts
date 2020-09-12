import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OthreShellService } from 'src/app/services/othre-shell.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<TutorialComponent>,
    private router: Router,
    private otherShellService: OthreShellService
  ) {}

  goToUsage() {
    this.authService.isInitialLogin = false;
    this.otherShellService.setPreTitle('TOP');
    this.dialogRef.close();
    this.router.navigateByUrl('/more/usage/top');
  }

  ngOnInit(): void {}
}
