import { GoogleMapDialogComponent } from './../google-map-dialog/google-map-dialog.component';
import { ActivityInterface } from './../../../interfaces/activity';
import { ActivityData } from './../../../services/activity-data.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { WorkoutInterface } from '../../../interfaces/workout';
import { FirebaseListObservable } from 'angularfire2/database';
import { FormControl } from '@angular/forms';
import { MdDialog } from '@angular/material';

@Component({
    selector: 'app-activities',
    templateUrl: './all.activities.component.html',
    styleUrls: ['./all.activities.component.css']
})

export class ActivitiesAllComponent implements OnInit {
    public path: string;
    public order: number;
    public activities;
    public searchWord: string;
    public categoryCtrl: FormControl;
    public filteredCategories: any;
    public filteredItems: any;

    public categories = [
        'Bicycling',
        'Dancing',
        'Music Playing',
        'Running',
        'Educational',
        'Kids',
        'Water Activities',
        'Winter Activities',
        'Volunteer Activities'];

    public locationMarkers = [];

    constructor(
        private auth: AuthService,
        private activitiesDataService: ActivityData,
        private dialog: MdDialog) { }

    ngOnInit() {
        this.categoryCtrl = new FormControl();
        this.searchWord = '';

        this.activitiesDataService.getAllActivities()
            .subscribe(items => {
                this.activities = items;
                this.filteredItems = Object.assign([], this.activities);
                items.map(item => {
                    const activityId = item.$key;
                    const location = item.location;
                    const activityTitle = item.title;
                    const imageUrl = item.image ? item.image.url : '';
                    this.getActivitiesLocation(location, activityId, activityTitle, imageUrl);
                });
            });
    }

    getActivitiesLocation(location, activityId, title, imageUrl) {
        const marker = {
            id: activityId,
            title: title,
            imageUrl: imageUrl,
            // lat: location.lat,
            // lng: location.lng,
            location: location,
            openInfoWindow: true,
            markerClickable: true
        };
        this.locationMarkers.push(marker);
    }

    openDialog() {
        const dialogRef = this.dialog.open(GoogleMapDialogComponent, {
            data: {
                markers: this.locationMarkers,
            }
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
        this.filteredCategories = this.categoryCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterStates(name));

        this.searchWord = this.searchWord.toLowerCase();

        if (this.searchWord) {
            this.activities = this.filteredItems.filter(item => {
                return item.title.toLowerCase().indexOf(this.searchWord) !== -1 ||
                    item.author.toLowerCase().indexOf(this.searchWord) !== -1 ||
                    item.category.toLowerCase().indexOf(this.searchWord) !== -1;
            });
        } else {
            this.activities = this.filteredItems;
        }
    }

    dataReceivedByDateAsc(data) {
        this.activities = data;
    }

    dataReceivedByDateDesc(data) {
        this.activities = data;
    }

    dataReceivedByTitleAsc(data) {
        this.activities = data;
    }

    dataReceivedByTitleDesc(data) {
        this.activities = data;
    }
}
