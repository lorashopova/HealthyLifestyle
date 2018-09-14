import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Recipe } from '../../../models/recipe';
import { RecipeData } from '../../../services/recipe-data.service';
import { RecipeInterface } from '../../../interfaces/recipe';
import { ModelFactory } from './../../../services/factories/model.factory';
import { ModelFactoryInterface } from './../../../services/factories/interfaces/model.factory';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

const BLANK_INPUT_REGEX = /^\s*\S.*$/;
const IMAGE_REGEX = /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/;

@Component({
  selector: 'app-create.resipe.form',
  templateUrl: './create.resipe.form.component.html',
  styleUrls: ['./create.resipe.form.component.css']
})

export class CreateFormComponent implements OnInit {
  public recipe: RecipeInterface;
  public recipeAddForm: FormGroup;

  public title: string;
  public author: string;
  public userId: string;
  public category: string;
  public createdOn: number;
  public description: string;
  public ingradients: any;
  public step1: string;
  public step2: string;
  public step3: string;
  public image: string;
  public likes: number;
  public userLiked: Array<string>;
  public calories: number;
  public protein: number;
  public fat: number;
  public carbs: number;
  public prepareTime: number;
  public yields: number;
  public comments: any;

  categories = ['breakfast', 'soups', 'salads', 'desserts', 'breads', 'main dishes', 'side dishes'];

  public titleFormControl: AbstractControl;
  public categoryFormControl: AbstractControl;
  public descriptionFormControl: AbstractControl;
  public ingredientsFormControl: AbstractControl;
  public stepFirstFormControl: AbstractControl;
  public stepSecondFormControl: AbstractControl;
  public stepThirdFormControl: AbstractControl;
  public imageFormControl: AbstractControl;
  public caloriesFormControl: AbstractControl;
  public proteinFormControl: AbstractControl;
  public fatFormControl: AbstractControl;
  public carbsFormControl: AbstractControl;
  public prepareTimeFormControl: AbstractControl;
  public yieldsFormControl: AbstractControl;

  constructor(
    private router: Router,
    private recipeDataService: RecipeData,
    private factory: ModelFactory,
    private auth: AuthService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder) {
    this.recipe = new Recipe();
  }

  ngOnInit(): void {
    this.titleFormControl = new FormControl('', [
      Validators.required, Validators.pattern(BLANK_INPUT_REGEX),
      Validators.minLength(10), Validators.maxLength(150)]);

    this.categoryFormControl = new FormControl('', [
      Validators.required]);

    this.descriptionFormControl = new FormControl('', [
      Validators.required, Validators.pattern(BLANK_INPUT_REGEX),
      Validators.minLength(10), Validators.maxLength(300)]);

    this.ingredientsFormControl = new FormControl('', [
      Validators.required]);

    this.stepFirstFormControl = new FormControl('', [
      Validators.required, Validators.pattern(BLANK_INPUT_REGEX),
      Validators.minLength(10)]);

    this.stepSecondFormControl = new FormControl('');

    this.stepThirdFormControl = new FormControl('');

    this.imageFormControl = new FormControl('', [
      Validators.required, Validators.pattern(IMAGE_REGEX)]);

    this.caloriesFormControl = new FormControl('', [
      Validators.required]);

    this.proteinFormControl = new FormControl('', [
      Validators.required]);

    this.fatFormControl = new FormControl('', [
      Validators.required]);

    this.carbsFormControl = new FormControl('', [
      Validators.required]);

    this.prepareTimeFormControl = new FormControl('', [
      Validators.required]);

    this.yieldsFormControl = new FormControl('', [
      Validators.required]);

    this.recipeAddForm = this.formBuilder.group({
      titleFormControl: this.titleFormControl,
      categoryFormControl: this.categoryFormControl,
      descriptionFormControl: this.descriptionFormControl,
      ingredientsFormControl: this.ingredientsFormControl,
      stepFirstFormControl: this.stepFirstFormControl,
      stepSecondFormControl: this.stepSecondFormControl,
      stepThirdFormControl: this.stepThirdFormControl,
      imageFormControl: this.imageFormControl,
      caloriesFormControl: this.caloriesFormControl,
      proteinFormControl: this.proteinFormControl,
      fatFormControl: this.fatFormControl,
      carbsFormControl: this.carbsFormControl,
      prepareTimeFormControl: this.prepareTimeFormControl,
      yieldsFormControl: this.yieldsFormControl
    });
  }

  onSubmit() {
    const author = this.auth.currentUser.displayName;
    const userId = this.auth.currentUser.uid;
    const arrayIngredients = this.ingradients.trim().split(/[,]+/);
    // userLiked = this.recipe.userLiked;
    // comments = this.recipe.comments;

    this.recipe = this.factory
    .createRecipe
      (this.title, author, userId, this.category, Date.now(), this.description,
      arrayIngredients, this.step1, this.step2, this.step3, this.image, this.likes,
      [], this.calories, this.protein, this.fat, this.carbs, this.prepareTime, this.yields, []);

    this.recipeDataService.add(this.recipe);
    this.notificationService.popToast('info', 'Success!', 'Your recipe was created successfully!');

    console.log(this.recipe);

    this.router.navigate(['recipes']);
  }
}
