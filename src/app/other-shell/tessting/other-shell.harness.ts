import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

export class OtherShellHarness extends ComponentHarness {
  static hostSelector = 'app-other-shell';

  private readonly getLogoButtonEl = this.locatorForOptional('.logo');
  private readonly getGraphButtonEl = this.locatorForOptional('.graph');

  async clickLogoButton() {
    const button = await this.getLogoButtonEl();
    await (await this.getLogoButtonEl())?.click();
  }
  async clickGraphButton() {
    const button = await this.getGraphButtonEl();
    // await button?.click();
  }
}
