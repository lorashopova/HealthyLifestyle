import { ActivityData } from './../services/activity-data.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ActivityAuthorGuard implements CanActivate {
    public userId;

    constructor(private router: Router, private data: ActivityData, private afAuth: AngularFireAuth) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const id = route.params['id'];
        let result: boolean;

        if (id) {
            this.data.getActivityById(id)
                .subscribe((activity) => {
                    this.userId = this.afAuth.auth.currentUser.uid;
                    if (activity.userId === this.userId) {
                        result = true;
                    } else {
                        this.router.navigate(['/activities']);
                    }
                });
        } else {
            this.router.navigate(['/activities']);
        }

        return result;
    }
}
