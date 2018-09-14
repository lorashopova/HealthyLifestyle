import { ActivityComponent } from './../activities/activity.component/activity.component';
import { UserDialogComponent } from './user-profile-dialog/user-profile-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInFormComponent } from './signIn-form/signIn-form.component';
import { SignUpFormComponent } from './signUp-form/signUp-form.component';
import { UserCollectionComponent } from './user-collection/user-collection.component';
import { UserRoutesModule } from './user.routes.module';
import { ActivitiesModule } from '../activities/activities.module';

import {
  MdIconModule, MaterialModule,
  MD_ERROR_GLOBAL_OPTIONS,
  showOnDirtyErrorStateMatcher,
  MD_PLACEHOLDER_GLOBAL_OPTIONS,
  MdDialogModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutesModule,
    MdIconModule,
    MaterialModule,
    MdDialogModule,
    ActivitiesModule
  ],
  declarations: [
    SignInFormComponent,
    SignUpFormComponent,
    UserProfileComponent,
    UserDialogComponent,
    UserCollectionComponent
  ],
  entryComponents: [
    UserDialogComponent,
  ],
  providers: [
    { provide: MD_ERROR_GLOBAL_OPTIONS, useValue: { errorStateMatcher: showOnDirtyErrorStateMatcher } },
    { provide: MD_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'always' } }
  ],
})
export class UserModule { }
