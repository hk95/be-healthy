import { Component, OnInit, Inject } from '@angular/core';
import { AddedFood } from 'src/app/interfaces/added-food';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-confirm-recipe',
  templateUrl: './confirm-recipe.component.html',
  styleUrls: ['./confirm-recipe.component.scss'],
})
export class ConfirmRecipeComponent implements OnInit {
  recipe: AddedFood;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: string,
    private recipeService: RecipeService
  ) {
    this.recipeService
      .getRecipeByRecipeId(this.data)
      .pipe(take(1))
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  ngOnInit(): void {}
}
