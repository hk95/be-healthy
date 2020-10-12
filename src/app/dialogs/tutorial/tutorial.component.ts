import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<TutorialComponent>,
    private router: Router
  ) {}

  goToUsage() {
    this.dialogRef.close();
    this.router.navigateByUrl('/more/usage/top');
  }

  ngOnInit(): void {}
}
