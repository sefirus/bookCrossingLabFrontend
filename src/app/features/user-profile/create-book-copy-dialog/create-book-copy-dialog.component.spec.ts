import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookCopyDialogComponent } from './create-book-copy-dialog.component';

describe('CreateBookCopyDialogComponent', () => {
  let component: CreateBookCopyDialogComponent;
  let fixture: ComponentFixture<CreateBookCopyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBookCopyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBookCopyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
