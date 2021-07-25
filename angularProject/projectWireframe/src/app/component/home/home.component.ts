import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common-service.service';
import { ApiServiceService } from '../../service/api-service.service';

@Component({
  selector: 'app-home',
  // templateUrl: './home.component.html',
  template: `<p>Home page works! Sesssion {{commonService.loggedInUser.value ? 'Set. Now you can access About Us page.' : 'Unset. Select active user button to access About us page.'}}</p>
    <button (click)="activateUser()">Active User</button>
    <button (click)="deactivateUser()">Deactive User</button>===<pre>{{user | json}}</pre>====`,
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public user: any;

  constructor(public commonService: CommonService,
              public apiServiceService: ApiServiceService) { }

  ngOnInit(): void {
    this.apiServiceService.getUserDetails().subscribe(userResponse => {
      this.user = userResponse.user;
    });
  }

  public activateUser() {
    this.commonService.loggedInUser.next('Hello');
  }

  public deactivateUser() {
    this.commonService.loggedInUser.next(null);
  }

}
