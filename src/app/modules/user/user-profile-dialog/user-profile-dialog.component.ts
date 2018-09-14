import { Component, Inject, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { UserDialogType } from '../../../enums/userDialogTypes';
import { EMAIL_REGEX } from '../../../common/constants';
import { Upload } from '../../../services/uploads/shared/upload';

@Component({
  selector: 'app-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  public header: string;
  public type: string;

  public oldEmail: string;
  public newEmail: string;
  public password: string;
  public upload;
  public fileName;

  public changeEmailForm: FormGroup;
  public oldEmailFormControl: AbstractControl;
  public passwordFormControl: AbstractControl;
  public newEmailFormControl: AbstractControl;

  public changePictureForm: FormGroup;
  public pictureFormControl: AbstractControl;

  constructor(
    private dialogRef: MdDialogRef<UserDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MD_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.header = this.data.header;
    this.type = this.data.type;

    this.setupDialog(this.type);
  }

  setupDialog(type) {
    if (type === UserDialogType.ChangeEmail) {
      this.createChangeEmailForm();
    } else if (type === UserDialogType.ChangePicture) {
      this.createChangePictureForm();
    }
  }

  createChangeEmailForm() {
    this.oldEmailFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)]);

    this.passwordFormControl = new FormControl('', [
      Validators.required]);

    this.newEmailFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)]);

    this.changeEmailForm = this.formBuilder.group({
      oldEmailFormControl: this.oldEmailFormControl,
      passwordFormControl: this.passwordFormControl,
      newEmailFormControl: this.newEmailFormControl,
    });
  }

  createChangePictureForm() {
    this.pictureFormControl = new FormControl('', [
      Validators.required]);

    this.changePictureForm = this.formBuilder.group({
      pictureFormControl: this.pictureFormControl,
    });
  }

  detectFile(event) {
    this.upload = event.target.files.item(0);
    this.fileName = this.upload.name;
    this.upload = new Upload(this.upload);
  }
}
