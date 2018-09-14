import { FormControl } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from './../../../services/auth.service';
import { ModelFactory } from './../../../services/factories/model.factory';
import { WorkoutData } from './../../../services/workouts-data.service';
import { Component, OnInit } from '@angular/core';
import { Difficulty } from '../../../enums/programDifficulty';

@Component({
  selector: 'app-all.programs',
  templateUrl: './all.programs.component.html',
  styleUrls: ['./all.programs.component.css']
})
export class AllProgramsComponent implements OnInit {

    public programs: Array<any>;
    public path: string;
    public filteredCategories: any;
    public order: number; // 1 asc, -1 desc;
    public searchWord: string;
    public filteredItems: any;
    public categoryCtrl: FormControl;
    public categories = [
        'Beginner',
        'Intermediate',
        'Professional'
      ];

  constructor(
        private workoutDataService: WorkoutData,
        private factory: ModelFactory,
        private auth: AuthService) {
          this.programs = new Array<any>();
        }

  ngOnInit() {
    this.searchWord = '';
    this.categoryCtrl = new FormControl();
    this.workoutDataService.getAvailablePrograms().subscribe(pr => {
      this.programs = new Array<any>();
      pr.forEach(p => {
        if (typeof p.image !== 'undefined') {
          this.programs.push(p);
        }
      });
      this.filteredItems = this.programs;
    });

    this.filteredCategories =
        this.categoryCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterStates(name));
  }

  getDifficultyColor(diff) {
    switch (diff) {
      case Difficulty[Difficulty.Begginer]: return 'green';
      case Difficulty[Difficulty.Intermediate]: return 'orange';
      case Difficulty[Difficulty.Professional]: return 'red';
    }
  }

    dataReceivedByDateAsc(data) {
        this.programs = data;
    }

    dataReceivedByDateDesc(data) {
        this.programs = data;
    }

    dataReceivedByTitleAsc(data) {
        this.programs = data;
    }

    dataReceivedByTitleDesc(data) {
        this.programs = data;
    }

    filterStates(val: string) {
        return val ? this.categories.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
            : this.categories;
    }

    search(): void {
        this.filteredCategories = this.categoryCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterStates(name));

        this.searchWord = this.searchWord.toLowerCase();

        if (this.searchWord) {
            this.programs = this.programs.filter(item => {
                return item.title.toLowerCase().indexOf(this.searchWord) !== -1 ||
                    item.difficulty.toLowerCase().indexOf(this.searchWord) !== -1;
            });
        } else {
            this.programs = this.filteredItems;
        }
    }
    isAuthenticated() {
      return this.auth.isAuthenticated;
    }
}
