import { NutritionInterface } from '../interfaces/nutrition';
import { Article } from './article';
import { Meal } from './meal';
import { Injectable } from '@angular/core';

@Injectable()
export class Nutrition implements NutritionInterface {
    public article: Array<Article>;
    public meal: Array<Meal>;

    constructor(
        article: Array<Article> = [],
        meal: Array<Meal> = []
    ) {
        this.article = article;
        this.meal = meal;
    }
}
