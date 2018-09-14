import { Routine } from './../models/routine';
import { Category } from '../enums/workoutCategories';

export interface WorkoutInterface {
    title: string;
    author: string;
    createdOn: number;
    category: string;
    routines: Array<Routine>;
    description: string;
    comments: Array<string>;
}
