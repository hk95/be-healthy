import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Observable } from 'rxjs';
import { AddedFood } from 'src/app/interfaces/added-food';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe$: Observable<AddedFood>;
  myRecipe = false;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {
    this.route.queryParamMap.subscribe((recipeId) => {
      this.recipe$ = this.recipeService.getRecipeByRecipeId(recipeId.get('id'));
    });
    this.recipe$.subscribe((recipe) => {
      if (recipe.authorId === this.authService.uid) {
        this.myRecipe = true;
      }
    });
  }

  ngOnInit(): void {}
}
