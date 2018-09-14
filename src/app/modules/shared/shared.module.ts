import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule, MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MdButtonModule, MdCheckboxModule, MdCardModule, MdGridListModule, MdSelectModule } from '@angular/material';
import { MdInputModule, MdMenuModule, MdAutocompleteModule, MD_PLACEHOLDER_GLOBAL_OPTIONS } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PageNotFoundComponent } from './page.not.found/page.not.found.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { CommentsComponent } from './comments.component/comments.component';
import { CalorieCalculatorComponent } from './calorie.calculator/calorie.calculator.component';
import { SortComponent } from './sort/sort.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MdIconModule,
        MaterialModule,
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
    ],
    declarations: [
        NavComponent,
        PageNotFoundComponent,
        FooterComponent,
        CommentsComponent,
        CalorieCalculatorComponent,
        SortComponent
    ],
    exports: [
        NavComponent,
        PageNotFoundComponent,
        FooterComponent,
        CommentsComponent,
        CalorieCalculatorComponent,
        SortComponent
    ]
})
export class SharedModule { }
