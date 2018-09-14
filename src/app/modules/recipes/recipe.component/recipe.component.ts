import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { RecipeData } from '../../../services/recipe-data.service';
import { RecipeInterface } from '../../../interfaces/recipe';
import { AppComponent } from '../../../app.component';
import { AuthService } from '../../../services/auth.service';
import { RecipeDialogComponent } from '../recipe.dialog.component/recipe.dialog.component';
import { NotificationService } from '../../../services/notification.service';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css']
})

export class RecipeComponent implements OnInit {
    public recipe: RecipeInterface;
    public userId: string;

    recipeKey: string;
    commentsLength: number;
    starsCount: number;
    isLiked: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private recipeDataService: RecipeData,
        private auth: AuthService,
        private notificationService: NotificationService,
        public dialog: MdDialog) {
    }

    ngOnInit() {
        this.userId = localStorage.getItem('authkey');
        this.route.params
            .subscribe(params => {
                this.recipeDataService.getRecipeById(params.id)
                    .subscribe(recipe => {
                        if (recipe.$value === null) {
                            this.notificationService.popToast('error', 'Error', 'This activity does not exists!');
                            return this.router.navigate(['/']);
                        }
                        this.recipe = recipe;
                        this.recipeKey = recipe.$key;
                        this.starsCount = recipe.likes;
                        recipe.userLiked = recipe.userLiked || [];
                        this.isLiked = recipe.userLiked.find(like => like === this.userId);
                        if (recipe.comments) {
                            this.commentsLength = this.recipe.comments.length;
                        }
                    });
            });
    }

    isAuthenticated() {
        return this.auth.isAuthenticated;
    }

    isAuthor(authorId: string) {
        if (this.auth.currentUserId === authorId) {
            return true;
        }

        return false;
    }

    openDialog() {
        this.dialog.open(RecipeDialogComponent, { width: '50%' });
    }

    remove() {
        const recipeKey = this.route.snapshot.params['id'];
        this.recipeDataService.removeRecipe(recipeKey);

        this.notificationService.popToast('info', 'Success!', 'Your recipe was removed successfully!');

        this.router.navigate(['recipes']);
    }

    rateRecipe(recipeKey) {
        this.recipe.likes = this.recipe.likes + 0.5;
        this.recipe.userLiked.push(this.userId);
        if (this.isLiked) {
            this.notificationService.popToast('info', 'Success!', 'Your like was already added!');
        } else {
            this.recipeDataService.editRecipe(recipeKey, this.recipe);
            this.notificationService.popToast('info', 'Success!', 'Your like was added successfully!');
        }

        this.router.navigate(['recipes/' + recipeKey]);
    }
}
