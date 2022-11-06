import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookPageComponent } from './view-book-page.component';

describe('ViewBookPageComponent', () => {
  let component: ViewBookPageComponent;
  let fixture: ComponentFixture<ViewBookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBookPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
