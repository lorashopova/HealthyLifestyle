import { UserRoutesModule } from './../user.routes.module';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SignUpFormComponent } from './signUp-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppModule } from '../../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        AppModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [

      ],
      providers: [
        { provide: AuthService, useClass: AuthService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('registerForm should be invalid if empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  fit('registerForm should be invalid if different values for passwords are passed', () => {
    const emailCtr = component.registerForm.controls['emailFormControl'];
    emailCtr.setValue('test@abv.bg');
    const usernameCtr = component.registerForm.controls['usernameFormControl'];
    usernameCtr.setValue('test');
    const firstNameCtr = component.registerForm.controls['firstNameFormControl'];
    firstNameCtr.setValue('test');
    const lastNameCtr = component.registerForm.controls['lastNameFormControl'];
    lastNameCtr.setValue('test');

    const passwordCtr = component.registerForm.controls['passwordFormControl'];
    passwordCtr.setValue('test123');
    const confirmPasswordCtr = component.registerForm.controls['confirmPasswordControl'];
    confirmPasswordCtr.setValue('test321');

    expect(component.registerForm.valid).toBeFalsy();
  });

  fit('registerForm should be valid if same values for passwords are passed', () => {
    const emailCtr = component.registerForm.controls['emailFormControl'];
    emailCtr.setValue('test@abv.bg');
    const usernameCtr = component.registerForm.controls['usernameFormControl'];
    usernameCtr.setValue('test');
    const firstNameCtr = component.registerForm.controls['firstNameFormControl'];
    firstNameCtr.setValue('test');
    const lastNameCtr = component.registerForm.controls['lastNameFormControl'];
    lastNameCtr.setValue('test');

    const passwordCtr = component.registerForm.controls['passwordFormControl'];
    passwordCtr.setValue('test123');
    const confirmPasswordCtr = component.registerForm.controls['confirmPasswordControl'];
    confirmPasswordCtr.setValue('test123');

    expect(component.registerForm.valid).toBeTruthy();
  });

  fit('should contains usernameFormControl', () => {
    expect(component.usernameFormControl).toBeDefined();
  });

  fit('should contains firstNameFormControl', () => {
    expect(component.firstNameFormControl).toBeDefined();
  });

  fit('should contains lastNameFormControl', () => {
    expect(component.lastNameFormControl).toBeDefined();
  });

  fit('should contains emailFormControl', () => {
    expect(component.emailFormControl).toBeDefined();
  });

  fit('should contains passwordFormControl', () => {
    expect(component.passwordFormControl).toBeDefined();
  });

  fit('should contains confirmPasswordControl', () => {
    expect(component.confirmPasswordControl).toBeDefined();
  });

  fdescribe('emailFormControl', () => {
    fit('emailFormControl should NOT be valid if empty', () => {
      const emailCtr = component.registerForm.controls['emailFormControl'];
      expect(emailCtr.valid).toBeFalsy();
    });

    fit('email field validation should throw "required" error if no value is passed', () => {
      let errors = {};
      const emailCtr = component.registerForm.controls['emailFormControl'];
      errors = emailCtr.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    fit('email field validation should throw if invalid value is passed', () => {
      const emailCtr = component.registerForm.controls['emailFormControl'];
      emailCtr.setValue('#test!');
      expect(emailCtr.valid).toBeFalsy();
    });

    fit('email field validation should NOT throw error if valid value is passed', () => {
      const emailCtr = component.registerForm.controls['emailFormControl'];
      emailCtr.setValue('test@abv.bg');
      expect(emailCtr.valid).toBeTruthy();
    });
  });

  fdescribe('passwordFormControl', () => {
    fit('passwordFormControl should NOT be valid if empty', () => {
      const passwordCtr = component.registerForm.controls['passwordFormControl'];
      expect(passwordCtr.valid).toBeFalsy();
    });

    fit('password field validation should throw "required" error if no value is passed', () => {
      let errors = {};
      const passwordCtr = component.registerForm.controls['passwordFormControl'];
      errors = passwordCtr.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    fit('password field validation should throw if invalid value is passed', () => {
      const passwordCtr = component.registerForm.controls['passwordFormControl'];
      passwordCtr.setValue('#test!');
      expect(passwordCtr.valid).toBeFalsy();
    });

    fit('password field validation should NOT throw error if valid value is passed', () => {
      const passwordCtr = component.registerForm.controls['passwordFormControl'];
      passwordCtr.setValue('test1test2');
      expect(passwordCtr.valid).toBeTruthy();
    });
  });

  fdescribe('user signUp()', () => {
    fit('should call AuthService emailSignUp()', () => {
      const authServiceMock = fixture.debugElement.injector.get(AuthService);
      const spy = spyOn(authServiceMock, 'emailSignUp').and.callFake(() => {
        return Promise.resolve();
      });

      component.signUp();
      expect(spy).toHaveBeenCalled();
    });
  });
});
