import { ActivityInterface } from './../../../interfaces/activity';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivityData } from '../../../services/activity-data.service';
import { NutritionData } from './../../../services/nutrition-data.service';
import { RecipeData } from './../../../services/recipe-data.service';

@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.css']
})
export class UserCollectionComponent implements OnInit {

  public userId;
  public activities;
  public joinedActivities;
  public createdActivities;
  public createdArticles;
  public createdRecipes;

  constructor(
    private auth: AuthService,
    private activitiesDataService: ActivityData,
    private articleDataService: NutritionData,
    private recipeDataService: RecipeData) { }

  ngOnInit() {
    this.userId = localStorage.getItem('authkey');

    this.activitiesDataService
      .getAllActivities()
      .subscribe(items => {
        this.createdActivities =
          items.filter(item => item.userId === this.userId);

        this.joinedActivities =
          items.filter(item => {
            if (item.participants) {
              return item.participants.indexOf(this.userId) !== -1;
            }
          });
      });

    this.articleDataService
      .getAllArticles()
      .subscribe(items => {
        this.createdArticles =
          items.filter(item => item.userId === this.userId);
      });

    this.recipeDataService
      .getAllRecipes()
      .subscribe(items => {
        this.createdRecipes =
          items.filter(item => item.userId === this.userId);
      });
  }
}
