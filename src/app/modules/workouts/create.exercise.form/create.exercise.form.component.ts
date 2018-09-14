import { NotificationService } from './../../../services/notification.service';
import { UploadService } from './../../../services/uploads/shared/upload.service';
import { Upload } from './../../../services/uploads/shared/upload';
import { WorkoutData } from './../../../services/workouts-data.service';
import { ModelFactory } from './../../../services/factories/model.factory';
import { AuthService } from './../../../services/auth.service';
import { Exercise } from './../../../models/exercise';
import { FormGroup, AbstractControl, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create.exercise.form.component.html',
  styleUrls: ['./create.exercise.form.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class CreateExerciseFform implements OnInit {

  @Output()
  public name: string;
  public image;
  public hideExerciseForm: EventEmitter<boolean>;
  public exercise: Exercise;
  public currentUpload: Upload;
  public imageChosen: boolean;
  public selectedFiles: FileList;
  public exerciseForm: FormGroup;
  public nameFormControl: AbstractControl;
  public imageFormControl: AbstractControl;

   constructor(
    private workoutDataService: WorkoutData,
    private factory: ModelFactory,
    private auth: AuthService,
    private uploadService: UploadService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {
      this.exercise = new Exercise();
      this.hideExerciseForm = new EventEmitter<boolean>();
      this.imageChosen = false;
}

  ngOnInit() {
    this.nameFormControl = new FormControl('', [
      Validators.required]);

    this.exerciseForm = this.formBuilder.group({
      nameFormControl: this.nameFormControl,
    });
  }
  onSubmit() {
      this.exercise = this.factory.createExercise(this.name, this.image);
      this.workoutDataService.addExercise(this.exercise);
      this.uploadSingle(name);
      this.notificationService.popToast('info', 'Success!', 'Exercise successfully added!');
      this.hideExerciseForm.emit(true);
  }

  onClose() {
    this.hideExerciseForm.emit(true);
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.imageChosen = true;
  }

  uploadSingle(name: string) {
    const exerciseKey = this.workoutDataService.getExerciseSnapshot(name).key;
    const file = this.selectedFiles.item(0);
    const dbPath = `exercises/${exerciseKey}/image`;
    const storagePath = `images/exercises/${exerciseKey}/${file.name}`;
    this.exercise.image = storagePath;

    this.currentUpload = new Upload(file);
    this.uploadService.uploadFile(storagePath, dbPath, this.currentUpload);
  }
}
