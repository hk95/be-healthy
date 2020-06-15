import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RecipeCreateComponent } from '../menu/recipe/recipe-create/recipe-create.component';

@Injectable({
  providedIn: 'root',
})
export class RecipeFormGuard implements CanDeactivate<RecipeCreateComponent> {
  canDeactivate(
    component: RecipeCreateComponent // 対象コンポーネント
  ): Observable<boolean> | boolean {
    if (component.form.pristine || component.form.valid) {
      return true;
    }
    const confirmation = window.confirm(
      '作業中の内容が失われますがよろしいですか？'
    );
    return of(confirmation);
  }
}
