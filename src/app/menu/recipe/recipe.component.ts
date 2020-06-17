import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeWithAuthor } from 'src/app/interfaces/added-food';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  myRecipes$: Observable<RecipeWithAuthor[]>;
  publicRecipes$: Observable<RecipeWithAuthor[]>;
  constructor(private recipeService: RecipeService) {
    this.myRecipes$ = this.recipeService.getMyRecipes();
    this.publicRecipes$ = this.recipeService.getPublicRecipes();
  }

  forwardbackToForm() {
    this.recipeService.tentativeCreateRecipe();
  }
  ngOnInit(): void {}
}
