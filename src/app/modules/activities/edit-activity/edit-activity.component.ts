import { ActivityInterface } from './../../../interfaces/activity';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ActivityData } from '../../../services/activity-data.service';
import { AbstractControl, FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';
import { UploadService } from '../../../services/uploads/shared/upload.service';
import { Upload } from '../../../services/uploads/shared/upload';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {

  public userId: string;
  public activityKey: string;
  public activityFormGroup: FormGroup;
  public activity;
  public activityLoaded: Promise<boolean>;

  public location: string;
  public dateAndTime: string;
  public upload;

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
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private activitiesDataService: ActivityData,
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('authkey');

    this.route.params
      .subscribe(params => {
        if (params.id) {
          this.activitiesDataService
            .getActivityById(params.id)
            .subscribe((activity) => {
              this.activityKey = params.id;
              this.activity = activity;

              this.titleFormControl = new FormControl({ value: this.activity.title, disabled: true });
              this.categoryFormControl = new FormControl({ value: this.activity.category, disabled: true });
              this.descriptionFormControl = new FormControl({ value: this.activity.description, disabled: true });
              this.additionalInfoFormControl = new FormControl({ value: this.activity.additionalInfo, disabled: true });
              this.locationFormControl = new FormControl({ value: this.activity.location.place, disabled: true });
              this.eventDateFormControl = new FormControl({ value: new Date(this.activity.evenDate), disabled: true });

              this.activityFormGroup = this.formBuilder.group({
                titleFormControl: this.titleFormControl,
                categoryFormControl: this.categoryFormControl,
                descriptionFormControl: this.descriptionFormControl,
                additionalInfoFormControl: this.additionalInfoFormControl,
                locationFormControl: this.locationFormControl,
                eventDateFormControl: this.eventDateFormControl,
              });

              this.activityLoaded = Promise.resolve(true);
            });
        }
      });
  }

  removeDisable(formControlName): void {
    const controlForm = this.activityFormGroup.get(formControlName);
    controlForm.enabled ? controlForm.disable() : controlForm.enable();
  }

  detectFile(event): void {
    this.upload = event.target.files.item(0);
  }

  uploadFile(): Promise<any> {
    const userId = this.auth.currentUserId;
    const file = this.upload;
    const dbPath = `activities/${this.activityKey}/image`;
    const storagePath = `images/activities/${this.activityKey}`;

    this.upload = new Upload(file);
    if (this.activity.image) {
      const oldImage = this.activity.image.name;
      this.uploadService.deleteFileStorage(storagePath, oldImage);
    }
    return this.uploadService.uploadFile(storagePath, dbPath, this.upload);
  }

  // getLocation(place: Object): void {
  //   this.activity.location.place = place['formatted_address'];
  //   const location = place['geometry']['location'];
  //   if (location.lat() && location.lng()) {
  //     this.activity.location.lat = location.lat();
  //     this.activity.location.lng = location.lng();
  //   }
  // }

  setMoment(dateAndTime: any): void {
    this.activity.eventDate = dateAndTime;
  }

  onSubmit(): void {
    const userId = this.auth.currentUserId;
    const author = this.auth.currentUserDisplayName;

    this.activitiesDataService
      .editActivity(this.activityKey, this.activity)
      .then(() => {
        if (this.upload) {
          this.uploadFile();
        }
      })
      .then(() => this.router.navigateByUrl('/activities/all'));

    this.notificationService.popToast('success', 'Success!', 'Your activity is updated! Redirecting...');
  }
}
