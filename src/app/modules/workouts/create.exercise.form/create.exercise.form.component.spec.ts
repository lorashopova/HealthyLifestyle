/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateExerciseFform } from './create.exercise.form.component';

describe('CreateExerciseFform', () => {
  let component: CreateExerciseFform;
  let fixture: ComponentFixture<CreateExerciseFform>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExerciseFform ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExerciseFform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
