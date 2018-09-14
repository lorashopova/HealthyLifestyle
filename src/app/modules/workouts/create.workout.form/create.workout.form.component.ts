import { NotificationService } from './../../../services/notification.service';
import { CreateRoutineFormComponent } from './../create.routine.form/create.routine.form.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Exercise } from './../../../models/exercise';
import { Routine } from './../../../models/routine';
import { Workout } from './../../../models/workout';
import { WorkoutInterface } from './../../../interfaces/workout';
import { ModelFactory } from './../../../services/factories/model.factory';
import { WorkoutData } from './../../../services/workouts-data.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Category } from '../../../enums/workoutCategories';

@Component({
  selector: 'app-create-workout',
   providers: [
    WorkoutData
  ],
  templateUrl: './create.workout.form.component.html',
  styleUrls: ['./create.workout.form.component.css']
})
export class CreateWorkoutFormComponent implements OnInit {
  @Output() onCreate: EventEmitter<any>;
  @Output() onHide: EventEmitter<any>;
  public selectedOption: string;
  public workout: WorkoutInterface;
  public title: string;
  public createdOn: number;
  public showRoutineForm: boolean;
  public routines: Array<Routine>;
  public userId: any;
  public categories: Array<string>;
  public workoutForm: FormGroup;
  public titleFormControl: AbstractControl;
  public routinesFormControl: AbstractControl;
  public categoriesFormControl: AbstractControl;

   constructor(
    private dialog: MdDialog,
    private workoutDataService: WorkoutData,
    private factory: ModelFactory,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {
      this.workout = new Workout();
      this.routines = new Array<Routine>();
      this.showRoutineForm = false;
      this.categories = new Array<string>();
      this.onCreate = new EventEmitter<any>();
      this.onHide = new EventEmitter<any>();
}

  ngOnInit(): void {
      this.titleFormControl = new FormControl('', [
      Validators.required]);

    this.routinesFormControl = new FormControl('', [
      Validators.required]);

    this.categoriesFormControl = new FormControl('', [
      Validators.required,
    ]);

    this.workoutForm = this.formBuilder.group({
      titleFormControl: this.titleFormControl,
      routinesFormControl: this.routinesFormControl,
      categoriesFormControl: this.categoriesFormControl,
    });

    this.routines = new Array<Routine>();
    this.workoutDataService.getAvailableRoutines().subscribe(items => {
      this.routines = new Array<Routine>();
      items.forEach(item => {
        const newRoutine = new Routine(item.exercise, item.repeatTimes, item.seriesCount, item.restingTime);
        this.routines.push(newRoutine);
      });
    });

    // tslint:disable-next-line:forin
    for (const enumMember in Category) {
       const isValueProperty = parseInt(enumMember, 10) >= 0;
       if (isValueProperty) {
          this.categories.push(Category[enumMember]);
       }
    }
  }

  showCreateRoutineForm(permission) {
    this.showRoutineForm = permission;
  }

    openDialog() {
    const dialogRef = this.dialog.open(CreateRoutineFormComponent,
    {
        height: '90%',
        width: '40%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  hideForm() {
    this.onHide.emit('');
  }
  onSubmit() {
          const title = this.workout.title;
          const author = this.auth.currentUserDisplayName;
          const routines = this.workout.routines;
          const category = this.workout.category.toString();
          const createdOn = Date.now();
          const description = this.workout.description;
          const comments = this.workout.comments;
          this.userId = this.auth.currentUser.uid;

      this.workout = this.factory
      .createWorkout(title, author, createdOn, category, routines, description, comments);
      return this.workoutDataService.addWorkout(this.workout)
        .then(() => {
          this.workoutForm.reset();
          this.notificationService.popToast('info', 'Success!', 'Workout successfully added!');
          return this.onCreate.emit(title);
        });
  }
}
