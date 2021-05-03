import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SearchService } from 'src/app/services/search.service';

import { EditorMealModule } from '../editor-meal.module';

import { EditorMealComponent } from './editor-meal.component';
import { EditorMealHarness } from './editor-meal.harness';

describe('EditorMealComponent', () => {
  let component: EditorMealTestComponent;
  let fixture: ComponentFixture<EditorMealTestComponent>;
  let loader: HarnessLoader;
  const spy = jest.createMockFromModule('SearchService');

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [EditorMealModule],
        declarations: [EditorMealTestComponent],
        // schemas: [CUSTOM_ELEMENTS_SCHEMA],
        // providers: [SearchService, { provide: SearchService, useValue: spy }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorMealTestComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('最初のタブは検索のはず', async () => {
    const harness = await loader.getHarness(EditorMealHarness);
    // // const activeTab = await harness.getActiveTab();

    // // console.log(activeTab);
    await harness.clickSearchButton();
    // const test = fixture.debugElement.query(By.css('mat-tab-label-meal-a'));
    // console.log(test.nativeElement.textContent);
  });
});

@Component({
  template: `<app-editor-meal></app-editor-meal>`,
})
class EditorMealTestComponent {
  editorMealComponent: EditorMealComponent;
}
