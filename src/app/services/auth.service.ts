import { NotificationService } from './notification.service';
import { UserInterface } from './../interfaces/user';
import { UserData } from './user-data.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { LOCALSTORAGE_AUTH_KEY_NAME, LOCALSTORAGE_EMAIL_KEY_NAME } from '../common/constants';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

@Injectable()
export class AuthService {
    authState: any = null;
    public authUpdated: Subject<boolean> = new Subject<boolean>();

    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFireDatabase,
        private router: Router,
        private userData: UserData,
        private notificationService: NotificationService) {

        this.afAuth.authState.subscribe((auth) => {
            this.authState = auth;
            this.authUpdated.next(this.authState);
        });
    }

    get isAuthenticated(): boolean {
        return this.authState !== null;
    }

    get currentUser(): any {
        return this.isAuthenticated ? this.authState : null;
    }

    get currentUserId(): string {
        return this.isAuthenticated ? this.authState.uid : '';
    }

    get currentUserAnonymous(): boolean {
        return this.isAuthenticated ? this.authState.isAnonymous : false;
    }

    get currentUserDisplayName(): string {
        if (!this.authState) {
            return 'Guest';
        } else if (this.currentUserAnonymous) {
            return 'Anonymous';
        } else {
            return this.authState['displayName'] || 'User without a Name';
        }
    }

    emailSignUp(email: string, password: string, model: UserInterface) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                user.updateProfile({ displayName: `${model.firstName} ${model.lastName}` });
                localStorage.setItem(LOCALSTORAGE_AUTH_KEY_NAME, user.uid);
                localStorage.setItem(LOCALSTORAGE_EMAIL_KEY_NAME, user.email);
                this.authState = user;
            })
            .then(() => {
                this.userData.add(this.currentUserId, model);
            })
            .catch((error) => this.notificationService.popToast('error', 'Ooops!', error.message));
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user;
                localStorage.setItem(LOCALSTORAGE_AUTH_KEY_NAME, user.uid);
                localStorage.setItem(LOCALSTORAGE_EMAIL_KEY_NAME, user.email);
                this.notificationService.popToast('success', 'Success!', 'You have logged successfully!');
                this.router.navigateByUrl('/user/profile');
            })
            .catch((error) => {
                this.notificationService.popToast('error', 'Ooops!', error.message);
            });
    }

    resetPassword(email: string) {
        const fbAuth = firebase.auth();

        return fbAuth.sendPasswordResetEmail(email)
            .then(() => {
                this.notificationService.popToast('success', 'Success!', 'Email with verification was send to your email!');
                this.signOut();
            })
            .catch((error) => this.notificationService.popToast('error', 'Ooops!', error.message));
    }

    changeEmail(oldEmail: string, newEmail: string, password: string) {
        this.afAuth.auth.signInWithEmailAndPassword(oldEmail, password)
            .then((user) => {
                user.updateEmail(newEmail);
                this.userData.update(this.currentUserId, { email: newEmail });
                this.notificationService.popToast('success', 'Success!', 'Your email was changed!');
            })
            .catch((error) => this.notificationService.popToast('error', 'Ooops!', error.message));

    }

    signOut(): void {
        this.afAuth.auth.signOut()
            .then(() => {
                localStorage.removeItem(LOCALSTORAGE_AUTH_KEY_NAME);
                localStorage.removeItem(LOCALSTORAGE_EMAIL_KEY_NAME);
                this.notificationService.popToast('info', 'Success!', 'You have logged out! Cya!');
                this.router.navigate(['/']);
            });
    }
}
