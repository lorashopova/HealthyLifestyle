/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './../../core/core.module';

import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Article } from '../../../models/article';
import { NutritionData } from '../../../services/nutrition-data.service';
import { AuthService } from '../../../services/auth.service';
import { firebaseConfig } from './../../../../environments/firebaseConfig';

import { NutritionComponent } from '../nutrition/nutrition.component';
import { CalorieCalculatorComponent } from './../../shared/calorie.calculator/calorie.calculator.component';
import { SortComponent } from './../../shared/sort/sort.component';

import { NutritionRoutesModule } from '../../nutrition/nutrition.routes.module';
import { SharedModule } from '../../shared/shared.module';

import { CreateArticleComponent } from './create.article.component';
import { AppModule } from '../../../app.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateArticleComponent', () => {
  let component: CreateArticleComponent;
  let fixture: ComponentFixture<CreateArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        // NutritionComponent,
        // CalorieCalculatorComponent,
        // SortComponent,
        // CreateArticleComponent
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: AuthService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArticleComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.articleForm.valid).toBeFalsy();
  });

  it('should contains titleFormControl', () => {
    expect(component.titleFormControl).toBeDefined();
  });

  it('should contains descriptionFormControl', () => {
    expect(component.descriptionFormControl).toBeDefined();
  });

  it('title field validity', () => {
    const errors = {};
    const title = component.articleForm.controls['titleFormControl'];
    expect(title.valid).toBeFalsy();
  });

  it('description field validity', () => {
    const errors = {};
    const description = component.articleForm.controls['descriptionFormControl'];
    expect(description.valid).toBeFalsy();
  });

  it('title field required', () => {
    let errors = {};
    const title = component.articleForm.controls['titleFormControl'];
    errors = title.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('description field required', () => {
    let errors = {};
    const description = component.articleForm.controls['descriptionFormControl'];
    errors = description.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('title field should throw if invalid value is passed', () => {
    let errors = {};
    const title = component.articleForm.controls['titleFormControl'];
    errors = title.errors || {};
    title.setValue('Title');
    expect(title.valid).toBeFalsy();
  });

  it('description field should throw if invalid value is passed', () => {
    let errors = {};
    const description = component.articleForm.controls['descriptionFormControl'];
    errors = description.errors || {};
    description.setValue('Description');
    expect(description.valid).toBeFalsy();
  });

  it('title field should not throw if valid value is passed', () => {
    let errors = {};
    const title = component.articleForm.controls['titleFormControl'];
    errors = title.errors || {};
    title.setValue('Title title');
    expect(errors['required']).toBeTruthy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('description field should not throw if valid value is passed', () => {
    let errors = {};
    const description = component.articleForm.controls['descriptionFormControl'];
    errors = description.errors || {};
    description
    .setValue('Description, description,description, description, description, description description, description, description');
    expect(errors['required']).toBeTruthy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('submitting a form emits an article', () => {
    expect(component.articleForm.valid).toBeFalsy();
    component.articleForm.controls['titleFormControl'].setValue('Title title');
    component
    .articleForm
    .controls['descriptionFormControl']
    .setValue('Description, description, description, description, description, description description, description, description');
    expect(component.articleForm.valid).toBeTruthy();
  });

});
