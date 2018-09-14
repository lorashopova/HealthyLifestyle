import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

const NUMBER_REGEX = /^[0-9]+$/;

@Component({
  selector: 'app-calorie-calculator',
  templateUrl: './calorie.calculator.component.html',
  styleUrls: ['./calorie.calculator.component.css']
})
export class CalorieCalculatorComponent implements OnInit {
  public calculatorForm: FormGroup;
  public age: number;
  public genderValue: string;
  public weight: number;
  public height: number;
  public activenessValue: string;
  result;
  gender = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' }
  ];
  activeness = [
    { value: 'sedentary', viewValue: 'Sedentary' },
    { value: 'lightActive', viewValue: 'Light Active' },
    { value: 'moderatelyActive', viewValue: 'Moderately Active' },
    { value: 'veryActive', viewValue: 'Very Active' },
    { value: 'extraActive', viewValue: 'Extra Active' }];

  public ageFormControl: AbstractControl;
  public genderFormControl: AbstractControl;
  public weightFormControl: AbstractControl;
  public heightFormControl: AbstractControl;
  public activenessFormControl: AbstractControl;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ageFormControl = new FormControl('', [
      Validators.required, Validators.pattern(NUMBER_REGEX)]);

    this.genderFormControl = new FormControl('', [
      Validators.required]);

    this.weightFormControl = new FormControl('', [
      Validators.required, Validators.pattern(NUMBER_REGEX)]);

    this.heightFormControl = new FormControl('', [
      Validators.required, Validators.pattern(NUMBER_REGEX)]);

    this.activenessFormControl = new FormControl('', [
      Validators.required]);

    this.calculatorForm = this.formBuilder.group({
      ageFormControl: this.ageFormControl,
      genderFormControl: this.genderFormControl,
      weightFormControl: this.weightFormControl,
      heightFormControl: this.heightFormControl,
      activenessFormControl: this.activenessFormControl
    });
  }

  calculate(age, genderValue, weight, height, activenessValue) {
    let calorie = 0;
    if (genderValue === 'male') {
      calorie = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
      if (activenessValue === 'sedentary') {
        calorie = calorie * 1.2;
      } else if (activenessValue === 'lightActive') {
        calorie = calorie * 1.375;
      } else if (activenessValue === 'moderatelyActive') {
        calorie = calorie * 1.53;
      } else if (activenessValue === 'veryActive') {
        calorie = calorie * 1.725;
      } else {
        calorie = calorie * 1.9;
      }
    } else {
      calorie = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
      if (activenessValue === 'sedentary') {
        calorie = calorie * 1.2;
      } else if (activenessValue === 'lightActive') {
        calorie = calorie * 1.375;
      } else if (activenessValue === 'moderatelyActive') {
        calorie = calorie * 1.53;
      } else if (activenessValue === 'veryActive') {
        calorie = calorie * 1.725;
      } else {
        calorie = calorie * 1.9;
      }
    }

    this.result = `You need rouhgly ${calorie} calories a day.`;

  }

  clearForm() {
    this.genderValue = ' ';
    this.activenessValue = ' ';
    this.result = '';
  }
}
