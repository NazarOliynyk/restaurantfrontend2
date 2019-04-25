import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MainControllerService} from '../ControllerServices/main-controller.service';
import {RestaurantControllerService} from '../ControllerServices/restaurant-controller.service';
import {ClientControllerService} from '../ControllerServices/client-controller.service';
import {Restaurant} from '../Models/Restaurant';
import {Client} from '../Models/Client';
import {OrderMeal} from '../Models/OrderMeal';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  client: Client = new Client();
  classType = '';
  rId: number;
  cId: number;
  responsesOfClient = false;
  responsesOfRestaurant = false;
  orders: OrderMeal [] = [];
  headersOption: HttpHeaders;

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private restaurantControllerService: RestaurantControllerService,
              private clientControllerService: ClientControllerService,
              private router: Router) { }

  ngOnInit() {
    this.headersOption =
      new HttpHeaders({'Authorization': localStorage.getItem('_token')});
    this.activatedRoute.queryParams.subscribe((data: [Restaurant, Client]) => {
      this.classType = data['classType'];
      this.rId = data['r'];
      this.cId = data['c'];
      console.log(this.classType);
      console.log(this.rId);
      console.log(this.cId);
      if (this.classType === 'restaurant') {
        this.responsesOfClient = true;
        this.mainControllerService.findRestaurant(this.rId, this.headersOption).
        subscribe(restaurant => {this.restaurant = restaurant; });
        this.mainControllerService.findClient(this.cId, this.headersOption).
        subscribe(client => {this.client = client; });
        this.mainControllerService.getClientOrders(this.cId, this.headersOption).
        subscribe(orders => {this.orders = orders; });
      } else if (this.classType === 'client') {
        this.responsesOfRestaurant = true;
        this.mainControllerService.findRestaurant(this.rId, this.headersOption).
        subscribe(restaurant => {this.restaurant = restaurant; });
        this.mainControllerService.findClient(this.cId, this.headersOption).
        subscribe(client => {this.client = client; });
        this.mainControllerService.getRestaurantOrders(this.rId, this.headersOption).
        subscribe(orders => {this.orders = orders; });
      }
    });
  }

  backToRestaurantOrders() {
    this.router.navigate(['restaurantOrder'], {queryParams: this.restaurant});
  }

  backToClientOrders() {
    this.router.navigate(['clientOrder'], {queryParams: this.client});
  }
}
