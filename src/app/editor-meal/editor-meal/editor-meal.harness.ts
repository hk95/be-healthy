import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatTabNavBarHarness } from '@angular/material/tabs/testing';
import { MatTabLinkHarness } from '@angular/material/tabs/testing';

export class EditorMealHarness extends ComponentHarness {
  static hostSelector = 'app-editor-meal';

  // private getNavBarEl = this.locatorFor(MatTabNavBarHarness);

  private getSearchButtonEl = this.locatorFor(
    MatTabLinkHarness.with({
      label: '検索',
    })
  );

  // async getActiveTab(): Promise<MatTabLinkHarness> {
  //   const tab = await this.getNavBarEl();
  //   return await tab.getActiveLink();
  // }

  async clickSearchButton() {
    const button = await this.getSearchButtonEl();
    await button?.click();
  }
}
