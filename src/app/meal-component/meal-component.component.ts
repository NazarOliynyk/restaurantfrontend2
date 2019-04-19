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
  showListOfMenuSections = false;
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
      console.log('oninit works');
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

  }

  selected(name) {
    console.log(name);
  }
}
