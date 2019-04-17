import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from './Models/User';
import {MainControllerService} from './ControllerServices/main-controller.service';
import {HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Restaurant-Client';
  user: User = new User();
  greeting = false;
  responseOnDelete = '';
  headersOption: HttpHeaders;
  showSignInButton = true;

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: User) => {
      this.user = data;
      if (this.user.id > 0 ) {
        this.greeting = true; this.showSignInButton = false; }
    });
  }

  logOut() {
     this.router.navigate(['login']);
    this.greeting = false;
    this.showSignInButton = true;
  }

  deleteAccount(user: User) {
    this.headersOption =
      new HttpHeaders({'Authorization': localStorage.getItem('_token')});
    this.mainControllerService.deleteUser(user.id, this.headersOption).
    subscribe(data => {
    this.greeting = false;
    this.responseOnDelete = data.text;
    this.router.navigate(['register']); },
      err => {console.log('err: ' + err.toString());
        this.responseOnDelete = 'Failed to delete!'; } );
  }
}
