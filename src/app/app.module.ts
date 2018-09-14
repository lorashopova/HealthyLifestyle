import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { ModelFactoryInterface } from './services/factories/interfaces/model.factory';
import { ModelFactory } from './services/factories/model.factory';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import 'hammerjs';

import { AppRoutesModule } from './routes.module';

import { RecipesModule } from './modules/recipes/recipes.module';
import { UserModule } from './modules/user/user.module';
import { UserDialogComponent } from './modules/user/user-profile-dialog/user-profile-dialog.component';
import { ActivitiesModule } from './modules/activities/activities.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { NutritionModule } from './modules/nutrition/nutrition.module';

import { firebaseConfig } from '../environments/firebaseConfig';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserData } from './services/user-data.service';
import { NotificationService } from './services/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutesModule,
    CoreModule,
    SharedModule,
    RecipesModule,
    ActivitiesModule,
    UserModule,
    NutritionModule,
    MaterialModule,
    ToasterModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {

}
