import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShelfPageComponent } from './view-shelf-page.component';

describe('ViewShelfPageComponent', () => {
  let component: ViewShelfPageComponent;
  let fixture: ComponentFixture<ViewShelfPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewShelfPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewShelfPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
