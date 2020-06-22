import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  title = this.data.title;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      recipeId: string;
      title: string;
    },

    private recipeService: RecipeService
  ) {}

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.data.recipeId);
  }
  ngOnInit(): void {}
}
