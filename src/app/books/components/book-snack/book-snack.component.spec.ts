import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSnackComponent } from './book-snack.component';

describe('BookSnackComponent', () => {
  let component: BookSnackComponent;
  let fixture: ComponentFixture<BookSnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookSnackComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
