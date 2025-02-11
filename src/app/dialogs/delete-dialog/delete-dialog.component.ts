import { Component, OnInit, Inject } from '@angular/core';
import {
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  standalone: false,
})
export class DeleteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      userId?: string;
      recipeId?: string;
      setId?: string;
    },
    private dialogRef: MatDialogRef<DeleteDialogComponent>
  ) {}

  deleteAction(): void {
    this.dialogRef.close(true);
  }

  ngOnInit(): void {}
}
