import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/interfaces/recipe';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  readonly userId = this.authService.uid;

  recipe$: Observable<Recipe> = this.route.queryParamMap.pipe(
    switchMap((queryParams) =>
      this.recipeService.getRecipeByRecipeId(queryParams.get('id'))
    )
  );

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  openDeleteDialog(recipeId: string): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '80%',
      maxWidth: '400px',
      data: {
        recipeId,
        title: 'レシピ',
      },
    });
  }

  ngOnInit(): void {}
}
