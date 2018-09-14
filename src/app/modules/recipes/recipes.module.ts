import { PipesSharedModule } from './../../pipes/pipes-shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule, MdCardModule, MdIconModule, MdGridListModule, MdSelectModule } from '@angular/material';
import { MdInputModule, MdMenuModule, MdAutocompleteModule, MdDialogModule, MD_PLACEHOLDER_GLOBAL_OPTIONS } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-rating';

import { RecipesRoutesModule } from './recipes.routes.module';
import { SharedModule } from '../shared/shared.module';

import { RecipeComponent } from './recipe.component/recipe.component';
import { RecipesAllComponent } from './all.recipes.component/all.recipes.component';
import { CreateFormComponent } from './create.recipe.form/create.resipe.form.component';
import { EditRecipeComponent } from './edit.recipe.component/edit.recipe.component';
import { RecipeDialogComponent } from './recipe.dialog.component/recipe.dialog.component';

import { ZoomImageDirective } from './../../directives/zoom-image.directive';

@NgModule({
    imports: [
        CommonModule,
        RecipesRoutesModule,
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
        MdAutocompleteModule,
        RatingModule,
        MdDialogModule,
        PipesSharedModule
    ],
    declarations: [
        RecipeComponent,
        RecipesAllComponent,
        CreateFormComponent,
        EditRecipeComponent,
        RecipeDialogComponent,
    ],
    entryComponents: [RecipeDialogComponent],
    providers: [{ provide: MD_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'always' } }],
})

export class RecipesModule { }
