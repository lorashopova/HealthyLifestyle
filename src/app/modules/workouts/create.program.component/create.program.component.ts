import { NotificationService } from './../../../services/notification.service';
import { AuthService } from './../../../services/auth.service';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ModelFactory } from './../../../services/factories/model.factory';
import { Routine } from './../../../models/routine';
import { Workout } from './../../../models/workout';
import { WorkoutData } from './../../../services/workouts-data.service';
import { Component, OnInit } from '@angular/core';
import { ScrollToService } from 'ng2-scroll-to-el';
import { Router } from '@angular/router';
import { Difficulty } from '../../../enums/programDifficulty';
import { UploadService } from './../../../services/uploads/shared/upload.service';
import { Upload } from './../../../services/uploads/shared/upload';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-create-program',
  templateUrl: './create.program.component.html',
  styleUrls: ['./create.program.component.css']
})
export class CreateProgramComponent implements OnInit {
  public title: string;
  public difficulty: string;
  public description: string;
  public imageChosen: boolean;
  public days: Array<any>;
  public workouts: Array<any>;
  public currentUpload: Upload;
  public programForm: FormGroup;
  public wokroutForm: FormGroup;
  public selectedFiles: FileList;
  public programTitleControl: AbstractControl;
  public difficultiesFormControl: AbstractControl;
  public descriptionFormControl: AbstractControl;
  public workoutsFormControl: AbstractControl;
  public difficulties: Array<string>;
  public workoutTitle: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private workoutData: WorkoutData,
    private uploadService: UploadService,
    private factory: ModelFactory,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private scrollToService: ScrollToService) {
      this.workouts = new Array<any>();
      this.add = false;
      this.days = new Array<any>();
      this.difficulties = new Array<string>();
      this.imageChosen = false;
  }

  public add: boolean;

  ngOnInit() {
    this.programTitleControl = new FormControl('', [
      Validators.required]);

    this.difficultiesFormControl = new FormControl('', [
      Validators.required]);

    this.descriptionFormControl = new FormControl('', [
      Validators.required]);

    this.programForm = this.formBuilder.group({
      programTitleControl: this.programTitleControl,
      difficultiesFormControl: this.difficultiesFormControl,
      descriptionFormControl: this.descriptionFormControl,
    });

    this.workoutsFormControl = new FormControl('', [
      Validators.required,
    ]);

    this.wokroutForm = this.formBuilder.group({
      workoutsFormControl: this.workoutsFormControl,
    });

    this.workoutData.getAvailableWorkouts().subscribe(items => {
      this.workouts = new Array<any>();
      items.forEach(item => {
        this.workouts.push(item);
      });
    });

    // tslint:disable-next-line:forin
    for (const enumMember in Difficulty) {
       const isValueProperty = parseInt(enumMember, 10) >= 0;
       if (isValueProperty) {
          this.difficulties.push(Difficulty[enumMember]);
       }
    }
  }

  addProgram() {
    const newProgram = {
      title: this.title,
      difficulty: this.difficulty,
      description: this.description,
      createdOn: Date.now(),
      userId: this.auth.currentUserId,
      image: null,
      days: this.days,
      comments: [],
    };
    this.workoutData.add(newProgram).then(key => {
      this.uploadSingle(key);
    }).then(() => {
      this.notificationService.popToast('info', 'Success!', 'Program successfully added!');
      return this.router.navigate(['programs/all']);
    });

  }

  getAddForm(element) {
    this.add = true;
    setTimeout(() => {
      this.scrollToService.scrollTo(element);
    }, 100);
  }

  hideAddForm() {
    this.add = false;
  }

  skipDay() {
    const restDay = {
      checked: false,
    };
    this.days.push(restDay);
    this.add = false;
  }

  removeDay(index) {
    this.days.splice(index, 1);
  }

  addWorkout() {
    let currentWorkout: any;
    this.workoutData.getWorkoutByTitle(this.workoutTitle).subscribe(workouts => {
      currentWorkout = workouts[0];
    });

    const newDay = {
      workout: currentWorkout,
      checked: false,
    };

    this.wokroutForm.reset();
    this.days.push(newDay);
    this.add = false;
  }

  addNewWorkout(title: any) {
    let currentWorkout: any;
    this.workoutData.getWorkoutByTitle(title).subscribe(workouts => {
      currentWorkout = workouts[0];
    });

    const newDay = {
      workout: currentWorkout,
      checked: false,
    };

    this.days.push(newDay);
    this.add = false;
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.imageChosen = true;
  }

  uploadSingle(key: string) {
    let dbPath: string;
    let storagePath: string;
    const file = this.selectedFiles.item(0);

    dbPath = `programs/${key}/image`;
    storagePath = `images/programs/${key}/${file.name}`;
    this.currentUpload = new Upload(file);
    return this.uploadService.uploadFile(storagePath, dbPath, this.currentUpload);
  }

  getDayColor(day) {
    const restDayColor = '#b39cdb';
    const workoutDayColor = '#8f70c9';
    if (day.workout != null) {
      return workoutDayColor;
    } else {
      return restDayColor;
    }
  }
}
