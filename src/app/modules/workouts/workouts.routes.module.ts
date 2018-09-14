import { AuthGuard } from './../../guards/auth.guard';
import { AllProgramsComponent } from './all.programs.component/all.programs.component';
import { CreateProgramComponent } from './create.program.component/create.program.component';
import { ProgramComponent } from './program.component/program.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutsComponent } from './workouts.component/workouts.component';
import { CreateWorkoutFormComponent } from './create.workout.form/create.workout.form.component';

const routes: Routes = [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: AllProgramsComponent },
    { path: 'create', component: CreateProgramComponent, canActivate: [AuthGuard] },
    { path: 'workouts/:title', component: WorkoutsComponent },
    { path: ':title', component: ProgramComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class WorkoutsRoutesModule { }