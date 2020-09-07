import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';
import { SetService } from 'src/app/services/set.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  title = this.data.title;
  recipeId = this.data.recipeId;
  setId = this.data.setId;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      title: string;
      userId?: string;
      recipeId?: string;
      setId?: string;
    },

    private recipeService: RecipeService,
    private setService: SetService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.authService.uid, this.data.recipeId);
  }
  deleteSet() {
    this.setService.deleteSet(this.data.userId, this.setId);
  }
  deleteUserAccount() {
    this.userService.deleteUserAccount();
  }
  ngOnInit(): void {}
}
