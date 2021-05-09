import { ComponentHarness } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

export class ProfileHarness extends ComponentHarness {
  static hostSelector = 'app-profile';

  private readonly getNameInput = this.locatorFor(
    MatInputHarness.with({
      selector: '#name',
    })
  );

  private readonly getHeightInput = this.locatorFor(
    MatInputHarness.with({
      selector: '#height',
    })
  );

  private readonly getWeightInput = this.locatorFor(
    MatInputHarness.with({
      selector: '#weight',
    })
  );

  private readonly getFatInput = this.locatorFor(
    MatInputHarness.with({
      selector: '#fat',
    })
  );

  private readonly getCalInput = this.locatorFor(
    MatInputHarness.with({
      selector: '#cal',
    })
  );

  private readonly getSubmitButton = this.locatorFor(
    MatButtonHarness.with({
      selector: '#submit',
    })
  );

  async getName(): Promise<string> {
    const input = await this.getNameInput();
    return await input.getValue();
  }

  async getHeight(): Promise<string> {
    const input = await this.getHeightInput();
    return await input.getValue();
  }

  async getWeight(): Promise<string> {
    const input = await this.getWeightInput();
    return await input.getValue();
  }

  async getFat(): Promise<string> {
    const input = await this.getFatInput();
    return await input.getValue();
  }

  async getCal(): Promise<string> {
    const input = await this.getCalInput();
    return await input.getValue();
  }

  async setName(value: string): Promise<void> {
    const input = await this.getNameInput();
    await input.setValue(value);
  }

  async setHeight(value: string): Promise<void> {
    const input = await this.getHeightInput();
    await input.setValue(value);
  }

  async setWeight(value: string): Promise<void> {
    const input = await this.getWeightInput();
    await input.setValue(value);
  }

  async setFat(value: string): Promise<void> {
    const input = await this.getFatInput();
    await input.setValue(value);
  }

  async setCal(value: string): Promise<void> {
    const input = await this.getCalInput();
    await input.setValue(value);
  }

  async clickSubmitButton(): Promise<void> {
    const button = await this.getSubmitButton();
    await button.click();
  }

  async isDisabledSubmitButton(): Promise<boolean> {
    const button = await this.getSubmitButton();
    return await button.isDisabled();
  }
}
