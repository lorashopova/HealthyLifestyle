import { UploadService } from './../../../services/uploads/shared/upload.service';
import { UserInterface } from './../../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserData } from '../../../services/user-data.service';
import { MdDialog } from '@angular/material';
import { UserDialogType } from '../../../enums/userDialogTypes';
import { UserDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user: UserInterface;
  public userId: string;
  public selectedOption: string;

  constructor(
    private auth: AuthService,
    private userService: UserData,
    private dialog: MdDialog,
    private uploadService: UploadService) { }

  ngOnInit() {
    this.userService
      .getUserByUid(this.auth.currentUserId)
      .subscribe((res) => {
        this.user = res;
        this.userId = this.auth.currentUserId;
      });
  }

  openDialog(buttonText) {
    let dialogType;
    let header: string;

    if (buttonText.includes('email')) {
      dialogType = UserDialogType.ChangeEmail;
      header = 'Reset email';
    } else if (buttonText.includes('password')) {
      dialogType = UserDialogType.ResetPassword;
      header = 'Reset password';
    } else {
      dialogType = UserDialogType.ChangePicture;
      header = 'Change picture';
    }

    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: {
        header: header,
        type: dialogType,
      }
    });

    dialogRef.afterClosed()
      .subscribe(confirmation => {
        if (confirmation) {
          if (dialogType === UserDialogType.ChangePicture) {
            const storagePath = `images/users/${this.userId}`;
            const dbPath = `users/${this.userId}/profileImage`;

            if (this.user.profileImage.name) {
              const oldImage = this.user.profileImage.name;
              this.uploadService.deleteFileStorage(storagePath, oldImage);
            }

            this.uploadService.uploadFile(storagePath, dbPath, dialogRef.componentInstance.upload);
          } else if (dialogType === UserDialogType.ResetPassword) {
            this.auth.resetPassword(this.user.email);
          } else {
            const oldEmail = dialogRef.componentInstance.oldEmail;
            const password = dialogRef.componentInstance.password;
            const newEmail = dialogRef.componentInstance.newEmail;

            this.auth.changeEmail(oldEmail, newEmail, password);
          }
        }
      });
  }
}
