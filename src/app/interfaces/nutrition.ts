import { Article } from '../models/article';
import { Meal } from '../models/meal';

export interface NutritionInterface {
    article: Array<Article>;
    meal: Array<Meal>;
}
