import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
  standalone: false,
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
