import { Routine } from './routine';
import { WorkoutInterface } from './../interfaces/workout';
import { Injectable } from '@angular/core';
import { Category } from '../enums/workoutCategories';

@Injectable()
export class Workout implements WorkoutInterface {
    public title: string;
    public author: string;
    public createdOn: number;
    public category: string;
    public routines: Array<Routine>;
    public description: string;
    public comments: string[];

    constructor(
        title: string = '',
        author: string = '',
        createdOn: number = 0,
        category: string = null,
        routines: Array<Routine> = null,
        description: string = '',
        comments: Array<string> = null,
    ) {
        this.title = title;
        this.author = author;
        this.createdOn = createdOn;
        this.category = category;
        this.routines = routines;
        this.description = description;
        this.comments = comments;
    }
}
