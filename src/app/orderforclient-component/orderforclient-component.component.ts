import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../Models/Restaurant';
import {ActivatedRoute, Router} from '@angular/router';
import {MainControllerService} from '../ControllerServices/main-controller.service';
import {RestaurantControllerService} from '../ControllerServices/restaurant-controller.service';
import {Client} from '../Models/Client';
import {HttpHeaders} from '@angular/common/http';
import {Meal} from '../Models/Meal';
import {OrderMeal} from '../Models/OrderMeal';
import {ClientControllerService} from '../ControllerServices/client-controller.service';
import {Avatar} from '../Models/Avatar';
import {MenuSection} from '../Models/MenuSection';

@Component({
  selector: 'app-orderforclient-component',
  templateUrl: './orderforclient-component.component.html',
  styleUrls: ['./orderforclient-component.component.css']
})
export class OrderforclientComponentComponent implements OnInit {

  client: Client = new Client();
  showRestaurantList = true;
  restaurants: Restaurant[] = [];
  restaurant: Restaurant;
  headersOption: HttpHeaders;
  meal: Meal = new Meal();
  meals: Meal[] = [];
  menuSections: MenuSection [] = [];
  mealsOfMenuSection: Meal [] = [];
  mealsOfOrder: Meal[] = [];
  mealsToBeAdded: Meal[] = [];
  order: OrderMeal = new OrderMeal();
  orders: OrderMeal[] = [];
  avatars: Avatar [] = [];
  showMeals = false;
  showPreliminaryMenu = false;
  ids: number[] = [];
  showOrderList = false;
  responseOnAction = '';
  showMealsOfOrder = false;
  reasonOfCancelationInput = false;
  reasonOfCancelation = '';
  responsePositiveString = '';
  responsePositiveInput = false;
  responseNegativeInput = false;
  responseNegativeString = '';
  responseCreateOrder = '';
  showAvatars = false;
  showMenuSections = false;
  showMealsOfMenuSection = false;

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private restaurantControllerService: RestaurantControllerService,
              private clientControllerService: ClientControllerService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: Client) => {
      this.client = data;
      this.headersOption =
        new HttpHeaders({'Authorization': localStorage.getItem('_token')});
      this.mainControllerService.getRestaurants(this.headersOption).
      subscribe(restaurants => {this.restaurants = restaurants; });

    });
  }

  backToAccount() {
    this.router.navigate(['client'], {queryParams: this.client});
  }

  goToThisRestaurant(restaurant: Restaurant) {
    this.showAvatars = false;
    this.restaurant = restaurant;
    this.mainControllerService.getMeals(this.restaurant.id, this.headersOption).
    subscribe(meals => {this.meals = meals;
                              this.showMeals = true;
                              this.showRestaurantList = false; });
    this.mainControllerService.getMenuSections(this.restaurant, this.headersOption).
      subscribe(value => {this.menuSections = value;
                              this.showMenuSections = true; });
  }

  addToMenu(m: Meal) {
    console.log(m.menuSection);
    this.mealsToBeAdded.push(m);
    this.showPreliminaryMenu = true;
  }

  removeFromPreliminary(m: Meal) {
    const index = this.mealsToBeAdded.indexOf(m);
    this.mealsToBeAdded.splice(index, 1);
    for (const meal of this.mealsToBeAdded) {
      console.log(meal.name);
    }
  }


  createOrder() {
    this.showAvatars = false;
    this.showPreliminaryMenu = false;
    for (const meal of this.mealsToBeAdded) {
      this.ids.push(meal.id);
    }
    this.clientControllerService.saveOrder(this.client.id, this.ids, this.headersOption).
    subscribe(data => {this.responseCreateOrder = data.text; },
      error1 => this.responseCreateOrder = 'Failed to crete order');

  }

  watchAllOrders() {
    this.showAvatars = false;
    this.showOrderList = true;
    this.showPreliminaryMenu = false;
    this.showRestaurantList = false;
    this.showMeals = false;
    this.responseOnAction = '';
    this.showMealsOfOrder = false;
    this.reasonOfCancelationInput = false;
    this.responsePositiveInput = false;
    this.responseNegativeInput = false;
    this.showMealsOfMenuSection = false;
    this.showMenuSections = false;
    this.mainControllerService.getClientOrders(this.client.id, this.headersOption).
    subscribe(orders => {this.orders = orders; });
  }

  getOrderMeals(o: OrderMeal) {
    this.showAvatars = false;
      this.showMealsOfOrder = true;
      this.showRestaurantList = false;
      this.showOrderList = false;
      this.clientControllerService.getMealsOfOrder(o.id, this.headersOption).
        subscribe(mealsList => {this.mealsOfOrder = mealsList; } );
  }

  deleteOrder(o: OrderMeal) {
    this.clientControllerService.deleteOrder(o.id, this.headersOption).
    subscribe(data => {this.responseOnAction = data.text; },
      error1 => {this.responseOnAction = 'Failed to delete'; });
  }

  cancelOrder(o: OrderMeal) {
    this.order = o;
    this.reasonOfCancelationInput = true;
  }

  cancellTotally(reasonOfCancelationForm: HTMLFormElement) {
    this.clientControllerService.cancelOrderByClient(
      this.order.id, this.reasonOfCancelation, this.headersOption).
    subscribe(cancelation => {this.responseOnAction = cancelation.text; },
      error1 => this.responseOnAction = 'ERROR: Failed to change status');
  }

  orderServed(o: OrderMeal) {
    this.order = o;
    console.log(this.order);
    this.clientControllerService.confirmOrderServed(this.order.id, 'Posted to served', this.headersOption).
      subscribe(value => {this.responseOnAction = value.text; },
      error1 => this.responseOnAction = 'ERROR: Failed to change status');
  }


  positiveResponse(o: OrderMeal) {
    this.order = o;
    this.responsePositiveInput = true;
  }

  makePositiveResponse(responsePositiveForm: HTMLFormElement) {
    this.clientControllerService.positiveFromClient(
      this.order.id, this.responsePositiveString, this.headersOption).
      subscribe(res => {this.responseOnAction = res.text; },
      error1 => this.responseOnAction = 'ERROR: Failed to change status');
  }

  negativeResponse(o: OrderMeal) {
    this.order = o;
    this.responseNegativeInput = true;
  }

  makeNegativeResponse(responseNegativeForm: HTMLFormElement) {
    this.clientControllerService.negativeFromClient(
      this.order.id, this.responseNegativeString, this.headersOption).
    subscribe(res => {this.responseOnAction = res.text; },
      error1 => this.responseOnAction = 'ERROR: Failed to change status');
  }

  showResponses(restaurant: Restaurant, client: Client) {
    this.showAvatars = false;
    this.restaurant = restaurant;
    this.client = client;
    this.router.navigate(['responses'], {
      queryParams: {classType: 'client', r: this.restaurant.id, c: this.client.id}});
  }

  getImages(r: Restaurant) {
    this.showAvatars = true;
    this.restaurant = r;
    this.mainControllerService.getAvatars(this.restaurant, this.headersOption).
    subscribe(avatars => {this.avatars = avatars;
      console.log('this.avatars.length: ' + this.avatars.length); });
  }

  goToMenuSection(ms: MenuSection) {
    this.mealsOfMenuSection = [];
    console.log(ms.name);
    this.showMealsOfMenuSection = true;
    for (const meal of this.meals) {
      if (meal.menuSection.name === ms.name) {
        this.mealsOfMenuSection.push(meal);
      }
    }

  }
}
