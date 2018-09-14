import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

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
  selector: 'app-edit.recipe',
  templateUrl: './edit.recipe.component.html',
  styleUrls: ['./edit.recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  public recipeKey: string;
  public recipe: RecipeInterface;

  public recipeForm: FormGroup;

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

  constructor(private route: ActivatedRoute,
    private router: Router,
    private recipeDataService: RecipeData,
    private auth: AuthService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder) {
    this.recipe = new Recipe();
  }

  ngOnInit() {
    this.recipeKey = this.route.snapshot.params['id'];
    this.recipeDataService.getRecipeById(this.recipeKey).subscribe((result) => this.recipe = result);
    console.log(this.recipeKey);

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

    this.stepSecondFormControl = new FormControl();

    this.stepThirdFormControl = new FormControl();

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

    this.recipeForm = this.formBuilder.group({
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
    this.recipeDataService.editRecipe(this.recipeKey, this.recipe);
    this.notificationService.popToast('info', 'Success!', 'Your recipe was updated successfully!');

    this.router.navigate(['recipes']);
  }
}
