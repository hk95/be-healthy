import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RecipeUpdateComponent } from '../menu/recipe/recipe-update/recipe-update.component';
import { SetEditorComponent } from '../menu/set/set-editor/set-editor.component';
import { SetService } from '../services/set.service';

@Injectable({
  providedIn: 'root',
})
export class FormGuard
  implements CanDeactivate<RecipeUpdateComponent | SetEditorComponent> {
  constructor(private setService: SetService) {}

  canDeactivate(
    component: RecipeUpdateComponent | SetEditorComponent
  ): Observable<boolean> | boolean {
    if (
      component.form.pristine ||
      component.form.valid ||
      this.setService.submitted
    ) {
      this.setService.submitted = false;
      return true;
    }
    const confirmation = window.confirm(
      '作業中の内容が失われますがよろしいですか？'
    );
    return of(confirmation);
  }
}
