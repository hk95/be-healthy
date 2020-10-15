import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Observable, Subscription } from 'rxjs';
import { Recipe } from 'src/app/interfaces/recipe';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  readonly userId = this.authService.uid;
  recipe$: Observable<Recipe>;
  query: string;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.getRecipe();
  }

  private getRecipe() {
    const recipeSub = this.route.queryParamMap.subscribe((recipeId) => {
      this.query = recipeId.get('id');
      this.recipe$ = this.recipeService.getRecipeByRecipeId(this.query);
    });
    this.subscription.add(recipeSub);
  }

  openDeleteDialog(): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '80%',
      maxWidth: '400px',
      data: {
        recipeId: this.query,
        title: 'レシピ',
      },
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
