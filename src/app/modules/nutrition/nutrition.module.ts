import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCheckboxModule, MdCardModule, MdIconModule, MdGridListModule, MdSelectModule } from '@angular/material';
import { MdInputModule, MdMenuModule, MdAutocompleteModule, MdDialogModule, MD_PLACEHOLDER_GLOBAL_OPTIONS } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NutritionRoutesModule } from './nutrition.routes.module';
import { SharedModule } from '../shared/shared.module';

import { NutritionComponent } from './nutrition/nutrition.component';
import { CreateArticleComponent } from './create.article/create.article.component';

@NgModule({
  imports: [
    CommonModule,
    NutritionRoutesModule,
    SharedModule,
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdIconModule,
    MdGridListModule,
    MdInputModule,
    FormsModule,
    ReactiveFormsModule,
    MdSelectModule,
    MdMenuModule,
  ],
  declarations: [
    NutritionComponent,
    CreateArticleComponent,
]
})
export class NutritionModule { }
