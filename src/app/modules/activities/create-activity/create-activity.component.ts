import { UserData } from './../../../services/user-data.service';
import { ActivityData } from './../../../services/activity-data.service';
import { ActivityInterface } from './../../../interfaces/activity';
import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Activity } from '../../../models/activity';
import { AuthService } from '../../../services/auth.service';
import { Upload } from '../../../services/uploads/shared/upload';
import { UploadService } from '../../../services/uploads/shared/upload.service';
import { ModelFactory } from '../../../services/factories/model.factory';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css'],
})
export class CreateActivityComponent implements OnInit {
  public activityForm: FormGroup;
  public title: string;
  public category: string;
  public description: string;
  public additionalInfo: string;
  public inputLocation;
  public location: string;
  public dateAndTime: string;
  public upload;
  public activityKey: string;
  public activity: ActivityInterface;

  public titleFormControl: AbstractControl;
  public categoryFormControl: AbstractControl;
  public descriptionFormControl: AbstractControl;
  public additionalInfoFormControl: AbstractControl;
  public locationFormControl: AbstractControl;
  public eventDateFormControl: AbstractControl;

  public categories = [
    'Bicycling',
    'Dancing',
    'Music Playing',
    'Running',
    'Educational',
    'Kids',
    'Water Activities',
    'Winter Activities',
    'Volunteer Activities'];

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private uploadService: UploadService,
    private factory: ModelFactory,
    private activityData: ActivityData,
    private notificationService: NotificationService,
    private router: Router,
    private userService: UserData) {
  }

  ngOnInit(): void {
    this.titleFormControl = new FormControl('', [
      Validators.required]);

    this.categoryFormControl = new FormControl('', [
      Validators.required]);

    this.descriptionFormControl = new FormControl('', [
      Validators.required]);

    this.additionalInfoFormControl = new FormControl('', [
      Validators.required]);

    this.locationFormControl = new FormControl('', [
      Validators.required]);

    this.eventDateFormControl = new FormControl('', [
      Validators.required]);

    this.activityForm = this.formBuilder.group({
      titleFormControl: this.titleFormControl,
      categoryFormControl: this.categoryFormControl,
      descriptionFormControl: this.descriptionFormControl,
      additionalInfoFormControl: this.additionalInfoFormControl,
      locationFormControl: this.locationFormControl,
      eventDateFormControl: this.categoryFormControl,
    });
  }

  detectFile(event) {
    this.upload = event.target.files.item(0);
  }

  uploadFile() {
    const userId = this.auth.currentUserId;
    const file = this.upload;

    if (file) {
      const dbPath = `activities/${this.activityKey}/image`;
      const storagePath = `images/activities/${this.activityKey}`;
      this.upload = new Upload(file);
      return this.uploadService.uploadFile(storagePath, dbPath, this.upload);
    }

    return new Promise((resolve, reject) => { resolve(); });
  }

  // getLocation(place: Object) {
  //   this.location.place = place['formatted_address'];
  //   const location = place['geometry']['location'];
  //   this.location.lat = location.lat();
  //   this.location.lng = location.lng();
  // }

  setMoment(dateAndTime: any): any {
    this.dateAndTime = dateAndTime;
  }

  onSubmit() {
    const userId = this.auth.currentUserId;
    const author = this.auth.currentUserDisplayName;

    this.activity = this.factory
      .createActivity(
      userId,
      this.title,
      author,
      this.category,
      this.description,
      this.additionalInfo,
      this.location,
      this.dateAndTime.toString(),
      Date.now(),
      null,
      [],
      []);

    this.activityData
      .add(this.activity)
      .then(activityKey => {
        if (this.upload !== null) {
          this.activityKey = activityKey;
        }
      })
      .then(() => this.uploadFile()
        .then(() => this.router.navigateByUrl('/activities/all')));

    this.notificationService.popToast('success', 'Success!', 'Your activity is added! Redirecting...');
  }
}
