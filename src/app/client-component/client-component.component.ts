import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../Models/Client';
import {MainControllerService} from '../ControllerServices/main-controller.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-client-component',
  templateUrl: './client-component.component.html',
  styleUrls: ['./client-component.component.css']
})
export class ClientComponentComponent implements OnInit {

  client: Client = new Client();
  clientToUpdate: Client = new Client();
  showUpdateButton = true;
  showInitialInfo = true;
  showUpdateForm = false;
  responseOnUpdate = '';
  showReset = false;
  showGoToOptions = true;
  headersOption: HttpHeaders;
  checkPassword = false;
  oldPassword: string;
  newPassword: string;
  resultCheckPassword: string;

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private router: Router) { }

  ngOnInit() {
    this.headersOption =
      new HttpHeaders({'Authorization': localStorage.getItem('_token')});
    this.activatedRoute.queryParams.subscribe((data: Client) => {
      this.client = data;
      console.log(this.client.username);
    });
  }

  showUpdate() {
    this.showUpdateButton = false;
    this.showInitialInfo = false;
    this.showUpdateForm = true;
    this.resultCheckPassword = '';
  }

  updateClient(formToBeUpdated: HTMLFormElement) {
    this.resultCheckPassword = '';
    this.clientToUpdate.id = this.client.id;
    this.clientToUpdate.username = this.client.username;
    this.clientToUpdate.password = this.client.password;

    if (this.clientToUpdate.email === '') {
      this.clientToUpdate.email = this.client.email;
    }

    this.mainControllerService.updateClient(
      this.clientToUpdate, this.headersOption).
      subscribe(u => {
        this.responseOnUpdate = u.text;
        console.log(u.text); },
        err => {console.log('err: ' + err.toString());
          this.responseOnUpdate = 'Failed to update!'; } );
    this.showUpdateForm = false;
    this.showReset = true;
  }

  resetInitialData() {
    this.resultCheckPassword = '';
    this.showInitialInfo = true;
    this.mainControllerService.findClient(
      this.clientToUpdate.id, this.headersOption).
    subscribe(data => {this.client = data; } ) ;
    this.showReset = false;
    this.showUpdateButton = true;
  }

  goToOrders() {
    this.resultCheckPassword = '';
    this.router.navigate(['clientOrder'], {queryParams: this.client});  }

  changePassword(client: Client) {
    this.resultCheckPassword = '';
    console.log(client.username);
    this.client = client;
    this.checkPassword = true;
    // window.open('http://localhost:8080/changePassword', '_blank');
  }

  sendPassword(changePasswordForm: HTMLFormElement) {
    console.log(this.oldPassword);
    console.log(this.newPassword);
    this.mainControllerService.checkPassword(
      this.client.id, this.oldPassword, this.headersOption).
    subscribe(res => { this.resultCheckPassword = res.text;
    if (this.resultCheckPassword === 'PASSWORD MATCHES') {
      this.clientToUpdate.id = this.client.id;
      this.clientToUpdate.username = this.client.username;
      this.clientToUpdate.email = this.client.email;
      this.clientToUpdate.password = this.newPassword;
      this.mainControllerService.changePasswordClient(this.clientToUpdate, this.headersOption).
      subscribe(u => {this.responseOnUpdate = u.text; },
        err => {console.log('err: ' + err.toString());
          this.responseOnUpdate = 'Failed to update!'; } );
      this.showUpdateForm = false;
      this.checkPassword = false;
      this.showReset = true;
    } else {
      this.resultCheckPassword = 'FAILED to update - PASSWORD DOES NOT MATCH';
    }
    });
  }
}
