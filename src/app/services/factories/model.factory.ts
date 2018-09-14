import { Activity } from './../../models/activity';
import { Exercise } from './../../models/exercise';
import { Routine } from './../../models/routine';
import { Injectable } from '@angular/core';

import { ModelFactoryInterface } from './interfaces/model.factory';

import { Recipe } from '../../models/recipe';
import { User } from '../../models/user';
import { Workout } from './../../models/workout';
import { Category } from '../../enums/workoutCategories';
import { Article } from '../../models/article';

@Injectable()
export class ModelFactory implements ModelFactoryInterface {
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
        comments?: any) {
        return new Recipe(
            title, author, userId, category, createdOn, description, ingradients,
            step1, step2, step3, image, likes, userLiked, calories, protein, fat, carbs, prepareTime, yields, comments
        );
    }

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
        comments: Array<string>) {
        return new Activity(
            userdId,
            title,
            author,
            category,
            description,
            additionalInfo,
            location,
            eventDate,
            createdOn,
            image,
            participants,
            comments);
    }

    createWorkout(
        title: string,
        author: string,
        createdOn: number,
        category: string,
        routines: Array<Routine>,
        description: string,
        comments: Array<string>) {
        return new Workout(title, author, createdOn, category, routines, description, comments);
    }

    createRoutine(
        exercise: any,
        repeatTimes: number,
        series: number,
        restingTime: number) {
        return new Routine(exercise, repeatTimes, series, restingTime);
    }

    createExercise(name: string, image: string) {
        return new Exercise(name, image);
    }

    createUser(
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        isTrainer: boolean,
        profileImage: any) {
        return new User(username, firstName, lastName, email, isTrainer, profileImage);
    }

    createArticle(
        title: string,
        author: string,
        userId: string,
        createdOn: number,
        description: string,
        image: any) {
        return new Article(title, author, userId, createdOn, description, image);
    }
}
