import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RecipeWithAuthor } from 'src/app/interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/services/auth.service';
import { BasicInfoService } from 'src/app/services/basic-info.service';
import { BasicInfo } from 'src/app/interfaces/basic-info';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  private myRecipeSub: Subscription;
  private publicRecipeSub: Subscription;
  private userId = this.authService.uid;

  loading: boolean;
  basicInfo$: Observable<BasicInfo> = this.basicInfoService.getBasicInfo(
    this.userId
  );
  myRecipes: RecipeWithAuthor[];
  publicRecipes: RecipeWithAuthor[];

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private basicInfoService: BasicInfoService
  ) {
    this.loading = true;
    this.myRecipeSub = this.recipeService
      .getMyRecipes(this.userId)
      .subscribe((value) => {
        if (value && value.length > 0) {
          this.myRecipes = value;
        }
        this.loading = false;
      });
    this.publicRecipeSub = this.recipeService
      .getPublicRecipes(this.userId)
      .subscribe((value) => {
        this.publicRecipes = value;
      });
  }

  forwardbackToForm() {
    this.recipeService.tentativeCreateRecipe();
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.myRecipeSub.unsubscribe();
    this.publicRecipeSub.unsubscribe();
  }
}
