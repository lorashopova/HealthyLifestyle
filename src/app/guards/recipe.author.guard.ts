import { RecipeData } from './../services/recipe-data.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class RecipeAuthorGuard implements CanActivate {
    public userId;

    constructor(private router: Router, private afAuth: AngularFireAuth, private data: RecipeData) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const id = route.params['id'];
        let result: boolean;

        if (id) {
            this.data.getRecipeById(id)
                .subscribe((recipe) => {
                    this.userId = this.afAuth.auth.currentUser.uid;
                    if (recipe.userId === this.userId) {
                        result = true;
                    } else {
                        this.router.navigate(['/recipes']);
                    }
                });
        } else {
            this.router.navigate(['/recipes']);
        }

        return result;
    }
}
