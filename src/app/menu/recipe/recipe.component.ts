import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeWithAuthor } from 'src/app/interfaces/added-food';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  myRecipes$: Observable<RecipeWithAuthor[]>;
  publicRecipes$: Observable<RecipeWithAuthor[]>;
  userId = this.authService.uid;
  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) {
    this.myRecipes$ = this.recipeService.getMyRecipes(this.userId);
    this.publicRecipes$ = this.recipeService.getPublicRecipes(this.userId);
  }

  forwardbackToForm() {
    this.recipeService.tentativeCreateRecipe();
  }
  ngOnInit(): void {}
}
