import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomImageDirective } from '../directives/zoom-image.directive';
import { GramsPipe } from './grams.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ZoomImageDirective,
        GramsPipe
    ],
    exports: [
        ZoomImageDirective,
        GramsPipe
    ]
})
export class PipesSharedModule { }
