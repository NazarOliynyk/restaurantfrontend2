import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../Models/Restaurant';
import {ActivatedRoute, Router} from '@angular/router';
import {MainControllerService} from '../ControllerServices/main-controller.service';
import {RestaurantControllerService} from '../ControllerServices/restaurant-controller.service';
import {MenuSection} from '../Models/MenuSection';
import {HttpHeaders} from '@angular/common/http';
import {Meal} from '../Models/Meal';

@Component({
  selector: 'app-meal-component',
  templateUrl: './meal-component.component.html',
  styleUrls: ['./meal-component.component.css']
})
export class MealComponentComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  headersOption: HttpHeaders;
  menuSection: MenuSection = new MenuSection();
  menuSections: MenuSection [] = [];

  meal: Meal = new Meal();
  meals: Meal [] = [];

  responseOnSaveMeal = '';
  showListOfMeals = false;
  showUpdateForm = false;
  mealToUpdate: Meal = new Meal();
  responseOnUpdate = '';
  showFormAddMeal = true;
  responseOnDelete = '';
  name: string;

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private restaurantControllerService: RestaurantControllerService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: Restaurant) => {
      this.restaurant = data;
      this.headersOption =
        new HttpHeaders({'Authorization': localStorage.getItem('_token')});
      this.mainControllerService.getMenuSections(this.restaurant, this.headersOption).
      subscribe(menuSections  => this.menuSections = menuSections);
      for (const ms of this.menuSections) {
        console.log(ms.name);
      }
    });

  }

  backToAccount() {
    this.router.navigate(['restaurant'], {queryParams: this.restaurant});
  }

  saveMeal(mealForm: HTMLFormElement) {
    console.log(this.meal);
    console.log(this.menuSection);
    this.meal.menuSection = this.menuSection;
    this.headersOption =
      new HttpHeaders({'Authorization': localStorage.getItem('_token')});
    this.restaurantControllerService.saveMeal(
      this.restaurant.id, this.meal, this.headersOption).
    subscribe(data => {this.responseOnSaveMeal = data.text; },
      error1 => {this.responseOnSaveMeal = 'Failed to save'; });

  }

  selected(name) {
    console.log(name);
  }

  getListOfMeals(restaurant: Restaurant) {
    this.restaurant = restaurant;
    this.headersOption =
      new HttpHeaders({'Authorization': localStorage.getItem('_token')});
      this.mainControllerService.getMeals(this.restaurant.id, this.headersOption).
      subscribe(data => {
        this.meals = data;
        this.showListOfMeals = true;
        this.showFormAddMeal = false;
        this.responseOnSaveMeal = '';
        this.responseOnUpdate = '';
        this.responseOnDelete = '';
      });
  }

  update(meal:  Meal) {
    this.showListOfMeals = false;
    this.showUpdateForm = true;
    this.responseOnDelete = '';
    this.responseOnUpdate = '';
    this.responseOnSaveMeal = '';
    this.meal = meal;
    console.log('meal to update: ' + meal);
  }

  delete(meal:  Meal) {
    this.meal = meal;
    console.log('meal to delete: ' + meal);
    this.restaurantControllerService.deleteMeal(this.meal.id, this.headersOption).
      subscribe(data => {this.responseOnDelete = data.text;
      this.showListOfMeals = false; },
      error1 => {this.responseOnDelete = 'Failed to delete'; });
  }

  updateMeal(formToBeUpdated: HTMLFormElement) {
    this.mealToUpdate.id = this.meal.id;
    this.mealToUpdate.menuSection = this.menuSection;
    if (this.mealToUpdate.name === '') {
      this.mealToUpdate.name = this.meal.name; }
    if (this.mealToUpdate.description === '') {
      this.mealToUpdate.description = this.meal.description; }
    if (this.mealToUpdate.quantity === '') {
      this.mealToUpdate.quantity = this.meal.quantity; }
    if (this.mealToUpdate.price === 0) {
      this.mealToUpdate.price = this.meal.price; }
    this.headersOption =
      new HttpHeaders({'Authorization': localStorage.getItem('_token')});
    this.restaurantControllerService.saveMeal(
      this.restaurant.id, this.mealToUpdate, this.headersOption).
    subscribe(data => {this.responseOnUpdate = data.text;
    this.showUpdateForm = false; },
      error1 => {this.responseOnUpdate = 'Failed to update'; });
  }
}
