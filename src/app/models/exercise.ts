import { ExerciseInterface } from './../interfaces/exercise';
import { Category } from '../enums/workoutCategories';

export class Exercise implements ExerciseInterface {
    public name: string;
    public image: string;

    constructor(name: string = '', image: string = '') {
        this.name = name;
        this.image = image;
    }
}
