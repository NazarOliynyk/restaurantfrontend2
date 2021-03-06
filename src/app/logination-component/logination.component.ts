import { Component, OnInit } from '@angular/core';
import {User} from '../Models/User';
import {HttpClient} from '@angular/common/http';
import {Restaurant} from '../Models/Restaurant';
import {MainControllerService} from '../ControllerServices/main-controller.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../Models/Client';
import {iterateListLike} from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-logination',
  templateUrl: './logination.component.html',
  styleUrls: ['./logination.component.css']
})
export class LoginationComponent implements OnInit {

  user: User = new User();
  restaurant: Restaurant = new Restaurant();
  client: Client = new Client();
  responseLogination = '';
  emailToRestorePass = '';
  hideLoginForm = false;
  hideEmailForm = false;
  forgotPasswordForm = false;
  responseChangePass = '';

  constructor(
    private mainControllerService: MainControllerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data) => {
      localStorage.clear();
      this.user = new User();
    });
  }

  useLogin() {
    this.hideLoginForm = true;
    this.hideEmailForm = false;
  }

  useEmail() {
    this.hideEmailForm = true;
    this.hideLoginForm = false;
  }

  loginL(formLoginL: HTMLFormElement) {
    localStorage.clear();
    console.log(this.user.username);
    console.log(this.user.password);
    this.mainControllerService.login(this.user).
    subscribe(
      value => {
        const token = value.headers.get('Authorization');
        const userLogged = value.headers.get('UserLogged');
        const userClass = value.headers.get('UserClass');

        localStorage.setItem('_token', token);
        console.log('token: ' + token);

        this.user = JSON.parse(userLogged);

        console.log('userClass: ' + userClass);
        this.router.navigate(['app'], {queryParams: this.user});
        if (userClass === 'class oktenweb.models.Restaurant') {

          this.restaurant = JSON.parse(userLogged);
          this.router.navigate(['restaurant'], {queryParams: this.restaurant});
        } else if (userClass === 'class oktenweb.models.Client') {

          this.client = JSON.parse(userLogged);
          this.router.navigate(['client'], {queryParams: this.client});
        }
        this.responseLogination = 'Access successful!'; },
      err => {console.log('err: ' + err.toString());
        this.hideLoginForm = true;
        this.responseLogination = 'Access denied!'; }
    );

  }
  loginE(formLoginE: HTMLFormElement) {
    const email = this.user.email;
    console.log('email: ' + email);
    localStorage.clear();

   this.mainControllerService.getLogins().
   subscribe(loginsList => {
     for (const u of loginsList) {
       if (u.email === this.user.email) {
         this.user.username = u.username;
       }
     }
     this.mainControllerService.login(this.user).
     subscribe(
       value => {
         const token = value.headers.get('Authorization');
         const userLogged = value.headers.get('UserLogged');
         const userClass = value.headers.get('UserClass');

         localStorage.setItem('_token', token);
         console.log('token: ' + token);

         this.user = JSON.parse(userLogged);

         console.log('userClass: ' + userClass);
         this.router.navigate(['app'], {queryParams: this.user});
         if (userClass === 'class oktenweb.models.Restaurant') {

           this.restaurant = JSON.parse(userLogged);
           this.router.navigate(['restaurant'], {queryParams: this.restaurant});
         } else if (userClass === 'class oktenweb.models.Client') {

           this.client = JSON.parse(userLogged);
           this.router.navigate(['client'], {queryParams: this.client});
         }
         this.responseLogination = 'Access successful!'; },
       err => {console.log('err: ' + err.toString());
         this.hideLoginForm = true;
         this.responseLogination = 'Access denied!'; }
     );
   });
  }

  forgotPassword() {
    this.forgotPasswordForm = true;
  }

  sendRequestNewPass(emailToRestorePass: string) {
    this.forgotPasswordForm = false;
    console.log(this.emailToRestorePass);
    this.mainControllerService.getLogins().
    subscribe(loginsList => {
      for (const u of loginsList) {
        if (u.email === this.emailToRestorePass) {
          this.user.id = u.id;
          this.mainControllerService.forgotPassword(this.user).
          subscribe(res => {
            console.log(res.text);
          this.responseChangePass = res.text; });
        } else { this.responseChangePass = 'Looking for your account...'; }
      }
      });
  }
}
