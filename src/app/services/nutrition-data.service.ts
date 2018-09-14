import { ArticleInterface } from './../interfaces/article';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NotificationService } from './notification.service';

@Injectable()
export class NutritionData {
    private db: AngularFireDatabase;
    private firebaseCollection: FirebaseListObservable<any[]>;
    public items;

    constructor(db: AngularFireDatabase, private notificationService: NotificationService) {
        this.db = db;
        this.firebaseCollection = this.db.list('/nutrition');
    }

    getAllArticles() {
        return this.db.list('/nutrition/articles');
    }

    addArticle(article: ArticleInterface) {
        return this.db.list('/nutrition/articles').push(article)
        .then(_ => {
            return _.key;
        })
        .catch((error) => this.notificationService.popToast('error', 'Ooops!', error.message));
    }
}
