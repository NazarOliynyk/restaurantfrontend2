import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../Models/Restaurant';
import {ActivatedRoute, Router} from '@angular/router';
import {MainControllerService} from '../ControllerServices/main-controller.service';
import {RestaurantControllerService} from '../ControllerServices/restaurant-controller.service';
import {HttpHeaders} from '@angular/common/http';
import {Client} from '../Models/Client';
import {Meal} from '../Models/Meal';
import {OrderMeal} from '../Models/OrderMeal';
import {ClientControllerService} from '../ControllerServices/client-controller.service';

@Component({
  selector: 'app-orderforrestaurant-component',
  templateUrl: './orderforrestaurant-component.component.html',
  styleUrls: ['./orderforrestaurant-component.component.css']
})
export class OrderforrestaurantComponentComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  client: Client = new Client();
  showRestaurantList = true;
  headersOption: HttpHeaders;
  meal: Meal = new Meal();
  mealsOfOrder: Meal[] = [];
  order: OrderMeal = new OrderMeal();
  orders: OrderMeal[] = [];
  showOrderList = true;
  responseOnAction = '';
  showMealsOfOrder = false;
  reasonOfCancelationInput = false;
  reasonOfCancelation = '';
  responsePositiveString = '';
  responsePositiveInput = false;
  responseNegativeInput = false;
  responseNegativeString = '';
    showClientInfo = false;

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private restaurantControllerService: RestaurantControllerService,
              private clientControllerService: ClientControllerService,
              private router: Router) { }

  ngOnInit() {
    this.headersOption =
      new HttpHeaders({'Authorization': localStorage.getItem('_token')});
    this.activatedRoute.queryParams.subscribe((data: Restaurant) => {
      this.restaurant = data;
    });
    this.mainControllerService.getRestaurantOrders(this.restaurant.id, this.headersOption).
    subscribe(orders => {this.orders = orders; });
  }

  backToAccount() {
    this.router.navigate(['restaurant'], {queryParams: this.restaurant});
  }

  getOrderMeals(o: OrderMeal) {
    this.order = o;
    this.showMealsOfOrder = true;
    this.showRestaurantList = false;
    this.showOrderList = false;
    this.clientControllerService.getMealsOfOrder(o.id, this.headersOption).
    subscribe(mealsList => {this.mealsOfOrder = mealsList; } );
  }

  getInfoAboutClient(order: OrderMeal) {
    this.showClientInfo = true;
    this.restaurantControllerService.findClientByOrderId(order.id, this.headersOption).
      subscribe(client => {this.client = client; });
  }

  deleteOrder(order: OrderMeal) {
    this.restaurantControllerService.deleteOrderByRestaurant(
      order.id, this.headersOption).
    subscribe(res => {this.responseOnAction = res.text; },
      error1 => this.responseOnAction = 'Failed to delete');
  }

  cancelOrder(order: OrderMeal) {
    this.order = order;
    this.reasonOfCancelationInput = true;
  }

  cancellTotally(reasonOfCancelationForm: HTMLFormElement) {
    this.restaurantControllerService.cancelOrderByRestaurant(
      this.order.id, this.reasonOfCancelation, this.headersOption).
    subscribe(res => {this.responseOnAction = res.text; },
      error1 => this.responseOnAction = 'ERROR: Failed to cancel order');
  }

  positiveResponse(order: OrderMeal) {
    this.order = order;
    this.responsePositiveInput = true;
  }

  makePositiveResponse(responsePositiveForm: HTMLFormElement) {
    this.restaurantControllerService.positiveFromRestaurant(
      this.order.id, this.responsePositiveString, this.headersOption).
    subscribe(res => {this.responseOnAction = res.text; },
      error1 => this.responseOnAction = 'ERROR: Failed to change status');
  }

  negativeResponse(order: OrderMeal) {
    this.order = order;
    this.responseNegativeInput = true;
  }

  makeNegativeResponse(responseNegativeForm: HTMLFormElement) {
    this.restaurantControllerService.negativeFromRestaurant(
      this.order.id, this.responseNegativeString, this.headersOption).
    subscribe(res => {this.responseOnAction = res.text; },
      error1 => this.responseOnAction = 'ERROR: Failed to change status');
  }

  showResponses(restaurant: Restaurant, client: Client) {
    this.restaurant = restaurant;
    this.client = client;
    this.router.navigate(['responses'], {
      queryParams: {classType: 'restaurant', r: this.restaurant.id, c: this.client.id}});
  }

}
