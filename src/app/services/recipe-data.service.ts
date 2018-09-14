import { RecipeInterface } from '../interfaces/recipe';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NotificationService } from './notification.service';

@Injectable()
export class RecipeData {
    private db: AngularFireDatabase;
    private firebaseCollection: FirebaseListObservable<any[]>;
    public items;

    constructor(db: AngularFireDatabase, private notificationService: NotificationService) {
        this.db = db;
        this.firebaseCollection = this.db.list('/recipes');
    }

    getAllRecipes() {
        return this.db.list('/recipes');
    }

    getRecipeById(recipeKey: string) {
        return this.db.object(`/recipes/${recipeKey}`);
    }

    add(recipe: RecipeInterface) {
        return this.db.list('/recipes').push(recipe)
            .then(_ => console.log('recipe added'))
            .catch((error) => this.notificationService.popToast('error', 'Ooops!', error.message));
    }

    editRecipe(recipeKey: string, recipe: object) {
        this.db.object(`/recipes/${recipeKey}`).update(recipe)
        .then((data) => console.log(data))
        .catch((error) => this.notificationService.popToast('error', 'Ooops!', error.message));
    }

    removeRecipe(recipeKey: string) {
        this.db.object(`/recipes/${recipeKey}`).remove().then((data) => console.log(data))
        .catch((error) => this.notificationService.popToast('error', 'Ooops!', error.message));
    }
}
