import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSnackComponent } from './login-snack.component';

describe('LoginSnackComponent', () => {
  let component: LoginSnackComponent;
  let fixture: ComponentFixture<LoginSnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSnackComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
