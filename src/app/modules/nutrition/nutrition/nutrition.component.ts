import { Component, OnInit } from '@angular/core';

import { NutritionInterface } from '../../../interfaces/nutrition';
import { NutritionData } from '../../../services/nutrition-data.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent implements OnInit {
  public nutrition: Array<NutritionInterface>;
  public meal;
  public articles;

  searchWord: string;
  filteredItems: any;

  constructor(public nutritonDataService: NutritionData, public auth: AuthService) {
    this.searchWord = '';
  }

  ngOnInit() {
    this.nutritonDataService.getAllArticles().subscribe(items => {
      this.articles = items;
      this.filteredItems = Object.assign([], this.articles);
    });
  }

  isAuthenticated() {
    return this.auth.isAuthenticated;
  }

  search(): void {
    this.searchWord = this.searchWord.toLowerCase();

      if (this.searchWord) {
        this.articles = this.filteredItems.filter(item => {
          return item.title.toLowerCase().indexOf(this.searchWord) !== -1;
        });
      } else {
        this.articles = this.filteredItems;
      }
  }

  dataReceivedByDateAsc(data) {
    this.articles = data;
  }

  dataReceivedByDateDesc(data) {
    this.articles = data;
  }

  dataReceivedByTitleAsc(data) {
    this.articles = data;
  }

  dataReceivedByTitleDesc(data) {
    this.articles = data;
  }
}

