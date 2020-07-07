import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';
import { SetService } from 'src/app/services/set.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  title = this.data.title;
  recipeId = this.data.recipeId;
  setId = this.data.setId;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      recipeId?: string;
      userId?: string;
      setId?: string;
      title: string;
    },

    private recipeService: RecipeService,
    private setService: SetService
  ) {}

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.data.recipeId);
  }
  deleteSet() {
    this.setService.deleteSet(this.data.userId, this.setId);
  }
  ngOnInit(): void {}
}
