import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<TutorialComponent>,
    private router: Router
  ) {}

  goToUsage() {
    this.authService.isInitialLogin = false;
    this.dialogRef.close();
    this.router.navigateByUrl('/more/usage/top');
  }

  ngOnInit(): void {}
}
