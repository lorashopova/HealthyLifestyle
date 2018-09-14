import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { PageNotFoundComponent } from './modules/shared/page.not.found/page.not.found.component';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'activities', loadChildren: './modules/activities/activities.module#ActivitiesModule' },
    { path: 'recipes', loadChildren: './modules/recipes/recipes.module#RecipesModule' },
    { path: 'user', loadChildren: './modules/user/user.module#UserModule' },
    { path: 'programs', loadChildren: './modules/workouts/workouts.module#WorkoutsModule' },
    { path: 'nutrition', loadChildren: './modules/nutrition/nutrition.module#NutritionModule' },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutesModule { }
