import { ArticleInterface } from './../../../interfaces/article';
import { ActivityInterface } from './../../../interfaces/activity';
import { ExerciseInterface } from './../../../interfaces/exercise';
import { Routine } from './../../../models/routine';
import { UserInterface } from './../../../interfaces/user';
import { RecipeInterface } from './../../../interfaces/recipe';
import { WorkoutInterface } from '../../../interfaces/workout';
import { Category } from '../../../enums/workoutCategories';

export interface ModelFactoryInterface {
    createRecipe(
        title: string,
        author: string,
        userId: string,
        category: string,
        createdOn: number,
        description: string,
        ingradients: any,
        step1: string,
        step2: string,
        step3: string,
        image: string,
        likes: number,
        userLiked: Array<string>,
        calories: number,
        protein: number,
        fat: number,
        carbs: number,
        prepareTime: number,
        yields: number,
        comments?: any): RecipeInterface;

    createActivity(
        userdId: string,
        title: string,
        author: string,
        category: string,
        description: string,
        additionalInfo: string,
        location: string,
        eventDate: string,
        createdOn: number,
        image: any,
        participants: Array<any>,
        comments: Array<string>): ActivityInterface;

    createWorkout(
        title: string,
        author: string,
        createdOn: number,
        category: string,
        routines: Array<Routine>,
        description: string,
        comments: Array<string>): WorkoutInterface;

    createUser(
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        isTrainer: boolean,
        profileImage: any): UserInterface;

    createExercise(name: string, image: string): ExerciseInterface;

    createArticle(
        title: string,
        author: string,
        userId: string,
        createdOn: number,
        description: string,
        image: any): ArticleInterface;
}
