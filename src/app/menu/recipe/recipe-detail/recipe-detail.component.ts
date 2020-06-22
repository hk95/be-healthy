import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Observable } from 'rxjs';
import { AddedFood } from 'src/app/interfaces/added-food';
import { AuthService } from 'src/app/services/auth.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe$: Observable<AddedFood>;
  myRecipe = false;
  query: string;
  userId = this.authService.uid;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.route.queryParamMap.subscribe((recipeId) => {
      this.query = recipeId.get('id');
      this.recipe$ = this.recipeService.getRecipeByRecipeId(this.query);
    });
    this.recipe$.subscribe((recipe) => {
      if (recipe) {
        if (recipe.authorId === this.userId) {
          this.myRecipe = true;
        }
      }
    });
  }
  openDeleteDialog(): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '80%',
      data: {
        recipeId: this.query,
        title: 'レシピ',
      },
    });
  }

  ngOnInit(): void {}
}
