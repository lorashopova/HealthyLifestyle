import { NotificationService } from './../../../services/notification.service';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { UploadService } from './../../../services/uploads/shared/upload.service';
import { Upload } from './../../../services/uploads/shared/upload';
import { Exercise } from './../../../models/exercise';
import { AbstractControl, FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { WorkoutData } from './../../../services/workouts-data.service';
import { ModelFactory } from './../../../services/factories/model.factory';
import { Routine } from './../../../models/routine';
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create.routine.form.component.html',
  styleUrls: ['./create.routine.form.component.css']
})
export class CreateRoutineFormComponent implements OnInit {
  public series;
  public repeats;
  public resting;
  public routine: Routine;
  public routineForm: FormGroup;
  public exercises: Array<Exercise>;
  public exerciseName: string;
  public showExerciseForm: boolean;
  public exerciseFormControl: AbstractControl;
  public seriesFormControl: AbstractControl;
  public repeatsFormControl: AbstractControl;
  public restingFormControl: AbstractControl;

   constructor(
    @Inject(MD_DIALOG_DATA) public data: WorkoutData,
    private dialog: MdDialog,
    private workoutDataService: WorkoutData,
    private factory: ModelFactory,
    private auth: AuthService,
    public dialogRef: MdDialogRef<CreateRoutineFormComponent>,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService ) {
      this.routine = new Routine();
      this.routine.exercise = new Exercise();
      this.exercises = new Array<Exercise>();
      this.showExerciseForm = false;
}


  ngOnInit(): void {
      this.exerciseFormControl = new FormControl('', [
      Validators.required]);

    this.seriesFormControl = new FormControl('', [
      Validators.required]);

    this.repeatsFormControl = new FormControl('', [
      Validators.required]);

    this.restingFormControl = new FormControl('', [
      Validators.required]);

    this.routineForm = this.formBuilder.group({
      exerciseFormControl: this.exerciseFormControl,
      seriesFormControl: this.seriesFormControl,
      repeatsFormControl: this.repeatsFormControl,
      restingFormControl: this.restingFormControl
    });

    this.workoutDataService.getAvailableExercises().subscribe(items => {
      this.exercises = new Array<Exercise>();
        items.forEach(item => {
          const newExercise = new Exercise(item.name);
          this.exercises.push(newExercise);
        });
    });
  }

  addExercise(option) {
    const addExerciseString = 'showForm';
    if (option.value === addExerciseString) {
      this.showExerciseForm = true;
    } else {
      this.showExerciseForm = false;
    }
  }
  hideExerciseForm() {
    this.showExerciseForm = false;
    this.routineForm.reset();
  }
  onSubmit() {
        const exercise = this.workoutDataService.getExerciseByName(this.exerciseName);

      this.routine = this.factory
      .createRoutine(exercise, this.repeats, this.series, this.resting);
      this.workoutDataService.addRoutine(this.routine);
      this.notificationService.popToast('info', 'Success!', 'Routine successfully added!');
      this.dialogRef.close();
  }
}
