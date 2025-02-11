import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/interfaces/recipe';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  standalone: false,
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
    private dialog: MatDialog,
    private router: Router
  ) {}

  openDeleteDialog(recipeId: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '80%',
      maxWidth: '400px',
      data: {
        recipeId,
        title: 'レシピ',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((res: boolean) => {
        if (res) {
          this.recipeService.deleteRecipe(this.authService.uid, recipeId);
          this.router.navigateByUrl('menu/recipe-list');
        }
      });
  }

  ngOnInit(): void {}
}
