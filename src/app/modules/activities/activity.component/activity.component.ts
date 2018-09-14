import { ActivatedRoute, Router, Data } from '@angular/router';
import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

import { ActivityInterface } from '../../../interfaces/activity';
import { AuthService } from '../../../services/auth.service';
import { ActivityData } from '../../../services/activity-data.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.css']
})

export class ActivityComponent implements OnInit {
    @Input()
    public activity;

    @Input()
    public activityId: string;

    public userId: string;
    public type: string;
    public commentsLength: number;
    public participantsCount = 0;
    public activityLoaded: Promise<boolean>;
    private isLiked: any;
    private starsCount: number;

    constructor(
        private router: Router,
        private auth: AuthService,
        private route: ActivatedRoute,
        private activitiesDataService: ActivityData,
        private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.userId = localStorage.getItem('authkey');

        this.route.data
            .subscribe((data) => {
                this.type = data.type;
            });

        this.route.params
            .subscribe(params => {
                if (params.id) {
                    this.activitiesDataService
                        .getActivityById(params.id)
                        .subscribe((activity) => {
                            if (activity.$value === null) {
                                this.notificationService.popToast('error', 'Error!', 'This activity does not exists!');
                                return this.router.navigate(['/activities']);
                            }
                            this.activity = activity;
                            this.activityId = activity.$key;
                            this.starsCount = activity.likes;
                            this.activity.userLiked = activity.userLiked || [];

                            this.isLiked = activity.userLiked
                                .find(like => like === this.userId);

                            if (activity.participants) {
                                this.participantsCount = activity.participants.length;
                            }
                            if (activity.comments) {
                                this.commentsLength = this.activity.comments.length;
                            }

                            this.activityLoaded = Promise.resolve(true);
                        });
                }
            });
    }

    isAuthenticated() {
        return this.auth.isAuthenticated;
    }

    isAuthor(authorId: string) {
        if (this.userId === authorId) {
            return true;
        }

        return false;
    }

    isParticipating() {
        if (this.activity.participants) {
            if (this.activity.participants.indexOf(this.userId) === -1) {
                return false;
            }
            return true;
        }
        return false;
    }

    participate() {
        this.activity.participants = this.activity.participants || [];
        this.activity.participants.push(this.userId);
        this.activitiesDataService.editActivity(this.activityId, this.activity);
    }

    leave() {
        const index = this.activity.participants.indexOf(this.userId);
        if (index !== -1) {
            this.participantsCount--;
            this.activity.participants.splice(index, 1);
            this.activitiesDataService.editActivity(this.activityId, this.activity);
        }
    }

    rateActivity(activityId) {
        if (!this.isLiked) {
            this.notificationService.popToast('info', 'Success!', 'Your like was already added!');
        } else {
            if (!this.activity.likes) {
                this.activity.likes = 0;
            }
            this.activity.likes += 0.5;
            this.activity.userLiked = this.activity.userLiked || [];
            this.activity.userLiked.push(this.userId);

            this.activitiesDataService.editActivity(this.activityId, this.activity);
            this.notificationService.popToast('info', 'Success!', 'Your like was added successfully!');
        }
    }

    navigateToEdit() {
        this.router.navigate([`/activities/${this.activityId}/edit`]);
    }

    delete() {
        this.activitiesDataService.delete(this.activityId);
    }
}
