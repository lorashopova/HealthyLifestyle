import { AuthService } from './../../../services/auth.service';
import { firebaseConfig } from './../../../../environments/firebaseConfig';
import { RouterModule } from '@angular/router';
import { AppModule } from './../../../app.module';
import { CoreModule } from './../../core/core.module';
import { UserModule } from './../user.module';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignInFormComponent } from './signIn-form.component';
import { UserRoutesModule } from '../user.routes.module';
import { MdDialogModule, MaterialModule, MdIconModule } from '@angular/material';
import { ActivitiesModule } from '../../activities/activities.module';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../../../models/user';

fdescribe('SignInFormComponent', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppModule,
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
    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  fit('should be created', () => {
    expect(component).toBeTruthy();
  });

  fit('form invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  fit('should contains emailFormControl', () => {
    expect(component.emailFormControl).toBeDefined();
  });

  fit('should contains passwordFormControl', () => {
    expect(component.passwordFormControl).toBeDefined();
  });

  fdescribe('emailFormControl', () => {
    fit('emailFormControl should NOT be valid if empty', () => {
      const emailCtr = component.userForm.controls['emailFormControl'];
      expect(emailCtr.valid).toBeFalsy();
    });

    fit('email field validation should throw "required" error if no value is passed', () => {
      let errors = {};
      const emailCtr = component.userForm.controls['emailFormControl'];
      errors = emailCtr.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    fit('email field validation should throw if invalid value is passed', () => {
      const emailCtr = component.userForm.controls['emailFormControl'];
      emailCtr.setValue('#test!');
      expect(emailCtr.valid).toBeFalsy();
    });

    fit('email field validation should NOT throw error if valid value is passed', () => {
      const emailCtr = component.userForm.controls['emailFormControl'];
      emailCtr.setValue('test@abv.bg');
      expect(emailCtr.valid).toBeTruthy();
    });
  });

  fdescribe('passwordFormControl', () => {
    fit('passwordFormControl should NOT be valid if empty', () => {
      const passwordCtr = component.userForm.controls['passwordFormControl'];
      expect(passwordCtr.valid).toBeFalsy();
    });

    fit('password field validation should throw "required" error if no value is passed', () => {
      let errors = {};
      const passwordCtr = component.userForm.controls['passwordFormControl'];
      errors = passwordCtr.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    fit('password field validation should throw if invalid value is passed', () => {
      const passwordCtr = component.userForm.controls['passwordFormControl'];
      passwordCtr.setValue('#test!');
      expect(passwordCtr.valid).toBeFalsy();
    });

    fit('password field validation should NOT throw error if valid value is passed', () => {
      const passwordCtr = component.userForm.controls['passwordFormControl'];
      passwordCtr.setValue('test1test2');
      expect(passwordCtr.valid).toBeTruthy();
    });
  });

  fdescribe('user signIn()', () => {
    fit('should call AuthService emailLogin()', () => {
      const authServiceMock = fixture.debugElement.injector.get(AuthService);
      const spy = spyOn(authServiceMock, 'emailLogin');

      const emailCtr = component.userForm.controls['emailFormControl'];
      emailCtr.setValue('test@abv.bg');

      const passwordCtr = component.userForm.controls['passwordFormControl'];
      passwordCtr.setValue('test1test2');

      component.signIn();
      expect(spy).toHaveBeenCalled();
    });
  });
});
