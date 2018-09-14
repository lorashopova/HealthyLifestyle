import { RecipeInterface } from './../interfaces/recipe';
import { Injectable } from '@angular/core';

@Injectable()
export class Recipe implements RecipeInterface {
    public title: string;
    public author: string;
    public userId: string;
    public category: string;
    public createdOn: number;
    public description: string;
    public ingradients: string;
    public step1: string;
    public step2: string;
    public step3: string;
    public image: string;
    public likes: number;
    public userLiked: Array<string>;
    public calories: number;
    public protein: number;
    public fat: number;
    public carbs: number;
    public prepareTime: number;
    public yields: number;
    public comments: any;

    constructor(
        title: string = '',
        author: string = '',
        userId: string = '',
        category: string = '',
        createdOn: number = null,
        description: string = '',
        ingradients: any = null,
        step1: string = '',
        step2: string = '',
        step3: string = '',
        image: string = '',
        likes: number = 0,
        userLiked: Array<string> = [],
        calories: number = null,
        protein: number = null,
        fat: number = null,
        carbs: number = null,
        prepareTime: number = null,
        yields: number = null,
        comments: any = null,
    ) {
        this.title = title;
        this.author = author;
        this.userId = userId;
        this.category = category;
        this.createdOn = createdOn;
        this.description = description;
        this.ingradients = ingradients;
        this.step1 = step1;
        this.step2 = step2;
        this.step3 = step3;
        this.image = image;
        this.likes = likes;
        this.userLiked = userLiked;
        this.calories = calories;
        this.protein = protein;
        this.fat = fat;
        this.carbs = carbs;
        this.prepareTime = prepareTime;
        this.yields = yields;
        this.comments = comments;
    }
}
