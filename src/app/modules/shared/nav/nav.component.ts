import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserData } from '../../../services/user-data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  public userProfileImageUrl;
  public isAuthenticated: boolean;

  constructor(private auth: AuthService, private userService: UserData) {
  }

  ngOnInit() {
    this.auth.authUpdated
      .subscribe((res) => {
        this.isAuthenticated = res;
        if (this.isAuthenticated) {
          this.userService.getUserByUid(this.auth.currentUserId).
            subscribe((user) =>
              this.userProfileImageUrl = user.profileImage.url);
        }
      });
  }

  getCurrentUserDisplayName() {
    return this.auth.currentUserDisplayName;
  }

  signOut() {
    this.auth.signOut();
  }
}
