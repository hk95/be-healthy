import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { SearchService } from 'src/app/services/search.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-set-create',
  templateUrl: './set-create.component.html',
  styleUrls: ['./set-create.component.scss'],
})
export class SetCreateComponent implements OnInit {
  form = this.fb.group({});
  config = this.searchService.config;
  userId = this.authService.uid;
  myRecipes = [];
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private searchService: SearchService,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {
    this.recipeService
      .getMyRecipes(this.userId)
      .pipe(take(1))
      .subscribe((recipes) => {
        this.myRecipes = recipes;
      });
  }

  ngOnInit(): void {}
  addProcess() {}
  submit() {}
  backToMenu() {
    this.location.back();
  }
}
