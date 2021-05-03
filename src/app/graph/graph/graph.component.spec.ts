import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { GraphModule } from '../graph.module';

describe('GraphComponent', () => {
  let component: GraphTestComponent;
  let fixture: ComponentFixture<GraphTestComponent>;
  let location: Location;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          // { provide: Router },
          GraphModule,
          // { provide: Location, useClass: SpyLocation },
        ],
        declarations: [GraphTestComponent],
        // schemas: [CUSTOM_ELEMENTS_SCHEMA],
      })
        // .overrideModule(GraphModule, {
        //   add: { declarations: [GraphTestComponent] },
        // })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  template: `<app-graph></app-graph>`,
})
class GraphTestComponent {}
