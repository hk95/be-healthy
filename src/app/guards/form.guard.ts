import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { SetEditorComponent } from '../menu/set/set-editor/set-editor.component';
import { SetService } from '../services/set.service';
import { RecipeEditorComponent } from '../menu/recipe/recipe-editor/recipe-editor.component';

@Injectable({
  providedIn: 'root',
})
export class FormGuard {
  constructor(private setService: SetService) {}

  canDeactivate(
    component: RecipeEditorComponent | SetEditorComponent
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
