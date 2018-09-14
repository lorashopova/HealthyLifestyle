import { AuthGuard } from './../../guards/auth.guard';
import { CreateArticleComponent } from './create.article/create.article.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NutritionComponent } from './nutrition/nutrition.component';

const routes: Routes = [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: NutritionComponent },
    { path: 'create', component: CreateArticleComponent, canActivate: [AuthGuard]  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class NutritionRoutesModule { }
