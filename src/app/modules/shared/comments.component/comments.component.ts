import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../../../services/auth.service';
import { UserInterface } from './../../../interfaces/user';
import { UserData } from '../../../services/user-data.service';
import { NotificationService } from '../../../services/notification.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public user: UserInterface;
  public userId: string;
  public userFullName: string;
  public userImageUrl;
  public date: number;
  public textComment: string;
  private firebaseCollection: any;
  public item: any;

  constructor(
    private notificationService: NotificationService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    public userService: UserData,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase) {
    this.textComment = '';
  }

  ngOnInit() {
    this.userId = localStorage.getItem('authkey');
    this.date = Date.now();

    this.userService.getUserByUid(this.userId).subscribe((res) => {
      this.userImageUrl = res.profileImage;
      this.userFullName = res.firstName + ' ' + res.lastName;
    });

    const pathname = window.location.pathname;
    this.route.params.subscribe(params => {
      this.firebaseCollection = this.db.object(pathname).subscribe((data) => {
        this.item = data;
      });
    });
  }

  onSubmit() {
    const comment = {
      username: this.userFullName,
      date: this.date,
      profileImage: this.userImageUrl,
      textComment: this.textComment
    };

    this.item.comments = this.item.comments || [];
    this.item.comments.push(comment);

    const pathname = window.location.pathname;
    this.db.object(pathname)
      .update(this.item)
      .then((data) => this.notificationService.popToast('info', 'Success!', 'Your comment was added successfully!'))
      .catch((error) => this.notificationService.popToast('error', 'Ooops!', error.message));

    this.textComment = '';

    this.router.navigate([pathname]);
  }

  isAuthenticated() {
    return this.auth.isAuthenticated;
  }

}
