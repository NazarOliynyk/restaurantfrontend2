import { Component, OnInit } from '@angular/core';
import {MainControllerService} from '../ControllerServices/main-controller.service';
import {Restaurant} from '../Models/Restaurant';
import {Client} from '../Models/Client';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // formRegisterRestaurant = {
  //   username: '',
  //   password: '',
  //   name: '',
  //   address: '',
  //   email: '',
  //   phoneNumber: '',
  //   additionalInfo: ''
  // };
  // formRegisterClient = {
  //   username: '',
  //   password: '',
  //   email: ''
  // };

  restaurant: Restaurant = new Restaurant();
  client: Client = new Client();
  responseRegistration = '';
  chooseFormRestaurant = false;
  chooseFormClient = false;

  constructor(
    private mainControllerService: MainControllerService
  ) { }

  ngOnInit() {
  }

  regRest() {
    this.chooseFormRestaurant = true;
    this.chooseFormClient = false;
  }

  regClient() {
    this.chooseFormClient = true;
    this.chooseFormRestaurant = false;
  }


  registerRestaurant(formRegisterR: HTMLFormElement) {
    console.log(this.restaurant.username);
    console.log(this.restaurant.password);
    console.log(this.restaurant.email);

    this.mainControllerService.saveRestaurant(this.restaurant)
      .subscribe(u => {
        this.responseRegistration = u.text;
        console.log(u.text); },
        error1 => { console.log(error1);
        this.responseRegistration = 'Registration Failed'; } );

  }

  registerClient(formRegisterC: HTMLFormElement) {
    console.log(this.client.username);
    console.log(this.client.username);
    console.log(this.client.email);

    this.mainControllerService.saveClient(this.client)
      .subscribe(u => {
        this.responseRegistration = u.text;
        console.log(u.text); },
        error1 => { console.log(error1);
          this.responseRegistration = 'Registration Failed'; } );
  }
}
