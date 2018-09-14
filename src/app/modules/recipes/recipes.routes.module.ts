import { RecipeAuthorGuard } from './../../guards/recipe.author.guard';
import { AuthGuard } from './../../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesAllComponent } from './all.recipes.component/all.recipes.component';
import { CreateFormComponent } from './create.recipe.form/create.resipe.form.component';
import { RecipeComponent } from './recipe.component/recipe.component';
import { EditRecipeComponent } from './edit.recipe.component/edit.recipe.component';


const routes: Routes = [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: RecipesAllComponent },
    { path: 'create', component: CreateFormComponent, canActivate: [AuthGuard]  },
    { path: ':id', component: RecipeComponent },
    { path: ':id/edit', component: EditRecipeComponent, canActivate: [RecipeAuthorGuard]},
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RecipesRoutesModule { }
