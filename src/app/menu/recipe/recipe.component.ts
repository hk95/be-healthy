import { Component, OnInit } from '@angular/core';
import { RecipeWithAuthor, Recipe } from 'src/app/interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/services/auth.service';

import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  private readonly userId = this.authService.uid;
  private readonly perDocNum = 10;
  private lastMyRecipeDoc: QueryDocumentSnapshot<Recipe>;
  private lastPublicRecipeDoc: QueryDocumentSnapshot<Recipe>;

  myRecipeloading = true;
  publicRecipeloading = true;
  myRecipes: RecipeWithAuthor[] = new Array();
  publicRecipes: RecipeWithAuthor[] = new Array();
  isMyRecipeNext: boolean;
  isPublicRecipeNext: boolean;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  loadMyRecipes(): void {
    this.recipeService
      .getMyRecipes(this.userId, this.perDocNum, this.lastMyRecipeDoc)
      .pipe(take(1))
      .subscribe(
        (doc: {
          data: RecipeWithAuthor[];
          nextLastDoc: QueryDocumentSnapshot<Recipe>;
        }) => {
          if (doc) {
            this.lastMyRecipeDoc = doc.nextLastDoc;
            if (doc.data && doc.data.length > 0) {
              doc.data.forEach((recipe: RecipeWithAuthor) => {
                this.myRecipes.push(recipe);
                if (doc.data.length >= this.perDocNum) {
                  this.isMyRecipeNext = true;
                } else {
                  this.isMyRecipeNext = false;
                }
              });
            }
          } else {
            this.isMyRecipeNext = false;
          }
          this.myRecipeloading = false;
        }
      );
  }

  loadPublicRecipes(): void {
    this.recipeService
      .getPublicRecipes(this.perDocNum, this.lastPublicRecipeDoc)
      .pipe(take(1))
      .subscribe(
        (doc: {
          data: RecipeWithAuthor[];
          nextLastDoc: QueryDocumentSnapshot<Recipe>;
        }) => {
          if (doc) {
            this.lastPublicRecipeDoc = doc.nextLastDoc;
            if (doc.data && doc.data.length > 0) {
              doc.data.forEach((recipe: RecipeWithAuthor) => {
                this.publicRecipes.push(recipe);
                if (doc.data.length >= this.perDocNum) {
                  this.isPublicRecipeNext = true;
                }
              });
            }
          } else {
            this.isPublicRecipeNext = false;
          }
          this.publicRecipeloading = false;
        }
      );
  }

  ngOnInit(): void {
    this.loadMyRecipes();
    this.loadPublicRecipes();
  }
}
