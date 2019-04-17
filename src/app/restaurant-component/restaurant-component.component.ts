import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Restaurant} from '../Models/Restaurant';
import {MainControllerService} from '../ControllerServices/main-controller.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-restaurant-component',
  templateUrl: './restaurant-component.component.html',
  styleUrls: ['./restaurant-component.component.css']
})
export class RestaurantComponentComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  restaurantToUpdate: Restaurant = new Restaurant();
  showUpdateForm = false;
  responseOnUpdate = '';
  showUpdateButton = true;
  showInitialInfo = true;
  showReset = false;
  showGoToOptions = true;
  headersOption: HttpHeaders;

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: Restaurant) => {
      this.restaurant = data;
    });
  }

  showUpdate() {
    this.showUpdateButton = false;
    this.showInitialInfo = false;
    this.showGoToOptions = false;
    this.showUpdateForm = true;
  }

  updateRestaurant(formToBeUpdated: HTMLFormElement) {
    this.headersOption =
      new HttpHeaders({'Authorization': localStorage.getItem('_token')});
    this.restaurantToUpdate.id = this.restaurant.id;
    this.restaurantToUpdate.username = this.restaurant.username;
    this.restaurantToUpdate.password = this.restaurant.password;

    if (this.restaurantToUpdate.name === '') {
        this.restaurantToUpdate.name = this.restaurant.name;
    }
    if (this.restaurantToUpdate.address === '') {
       this.restaurantToUpdate.address = this.restaurant.address;
    }
    if (this.restaurantToUpdate.email === '') {
        this.restaurantToUpdate.email = this.restaurant.email;
    }
    if (this.restaurantToUpdate.phoneNumber === '') {
       this.restaurantToUpdate.phoneNumber = this.restaurant.phoneNumber;
    }
    if (this.restaurantToUpdate.additionalInfo === '') {
       this.restaurantToUpdate.additionalInfo = this.restaurant.additionalInfo ;
    }
    this.mainControllerService.updateRestaurant(
      this.restaurantToUpdate, this.headersOption).
      subscribe(u => {
        this.responseOnUpdate = u.text;
        console.log(u.text); } );
    this.showUpdateForm = false;
    this.showReset = true;
    this.showGoToOptions = true;
  }

  resetInitialData() {
    this.showInitialInfo = true;
    this.mainControllerService.findRestaurant(
      this.restaurantToUpdate.id, this.headersOption).
    subscribe(data => {this.restaurant = data; },
      err => {console.log('err: ' + err.toString());
        this.responseOnUpdate = 'Failed to update!'; } ) ;
    this.showReset = false;
    this.showUpdateButton = true;
  }

  goToMenuSections() {
    this.router.navigate(['menuSection'], {queryParams: this.restaurant});   }

  goToAvatars() {
    this.router.navigate(['avatar'], {queryParams: this.restaurant});
  }

  goToMeals() {
    this.router.navigate(['meal'], {queryParams: this.restaurant});
  }

  goToOrders() {
    this.router.navigate(['restaurantOrder'], {queryParams: this.restaurant});
  }
}
