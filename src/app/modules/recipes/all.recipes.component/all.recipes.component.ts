import { ModelFactory } from './../../../services/factories/model.factory';
import { ModelFactoryInterface } from './../../../services/factories/interfaces/model.factory';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { RecipeInterface } from '../../../interfaces/recipe';
import { RecipeData } from '../../../services/recipe-data.service';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-recipes',
    templateUrl: './all.recipes.component.html',
    styleUrls: ['./all.recipes.component.css']
})

export class RecipesAllComponent implements OnInit {
    public recipe: RecipeInterface;
    public recipes: Array<RecipeInterface>;

    searchWord: string;
    filteredItems: any;

    categoryCtrl: FormControl;
    filteredCategories: any;

    categories = ['breakfast', 'soups', 'salads', 'desserts', 'breads', 'main dishes', 'side dishes'];

    constructor(
        private recipeDataService: RecipeData,
        private factory: ModelFactory,
        private auth: AuthService) {
        this.searchWord = '';

        this.categoryCtrl = new FormControl();
        this.filteredCategories = this.categoryCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterStates(name));
    }

    ngOnInit() {
        this.recipeDataService.getAllRecipes().subscribe(items => {
            this.recipes = items;
            this.filteredItems = Object.assign([], this.recipes);
        });
    }

    isAuthenticated() {
        return this.auth.isAuthenticated;
    }

    filterStates(val: string) {
        return val ? this.categories.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
            : this.categories;
    }

    search(): void {
        this.searchWord = this.searchWord.toLowerCase();

        if (this.searchWord) {
            this.recipes = this.filteredItems.filter(item => {
                return item.title.toLowerCase().indexOf(this.searchWord) !== -1 ||
                    item.author.toLowerCase().indexOf(this.searchWord) !== -1 ||
                    item.category.toLowerCase().indexOf(this.searchWord) !== -1;
            });
        } else {
            this.recipes = this.filteredItems;
        }
    }

    dataReceivedByDateAsc(data) {
        this.recipes = data;
    }

    dataReceivedByDateDesc(data) {
        this.recipes = data;
    }

    dataReceivedByTitleAsc(data) {
        this.recipes = data;
    }

    dataReceivedByTitleDesc(data) {
        this.recipes = data;
    }
}
