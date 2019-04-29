import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../Models/Restaurant';
import {ActivatedRoute, Router} from '@angular/router';
import {MainControllerService} from '../ControllerServices/main-controller.service';
import {RestaurantControllerService} from '../ControllerServices/restaurant-controller.service';
import {MenuSection} from '../Models/MenuSection';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-menusection-component',
  templateUrl: './menusection-component.component.html',
  styleUrls: ['./menusection-component.component.css']
})
export class MenusectionComponentComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  menuSections: MenuSection [] = [];
  headersOption: HttpHeaders;
  menuSection: MenuSection = new MenuSection();
  responseOnSaveMenuSection = '';
  showListOfMenuSections = false;
  showUpdateForm = false;
  menuSectionToUpdate: MenuSection = new MenuSection();
  responseOnUpdate = '';
  showFormAddMenuSection = true;
  responseOnDelete = '';

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private restaurantControllerService: RestaurantControllerService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: Restaurant) => {
      this.restaurant = data;
    });
    this.headersOption =
      new HttpHeaders({'Authorization': localStorage.getItem('_token')});
  }

  backToAccount() {
    this.router.navigate(['restaurant'], {queryParams: this.restaurant});
  }

  saveMenuSection(menuSectionForm: HTMLFormElement) {
    console.log(this.menuSection.name);
    this.restaurantControllerService.saveMenuSection(
      this.restaurant.id, this.menuSection, this.headersOption).
    subscribe(data => {this.responseOnSaveMenuSection = data.text;
    this.menuSection = new MenuSection(); },
      error1 => this.responseOnSaveMenuSection = 'Failed to save!');
  }

  getListOfMenuSections(restaurant: Restaurant) {
    this.responseOnDelete = '';
    this.responseOnSaveMenuSection = '';
    this.responseOnUpdate = '';
    this.mainControllerService.getMenuSections(this.restaurant, this.headersOption).
    subscribe(menuSections  => this.menuSections = menuSections);
    this.showListOfMenuSections = true;
  }

  update(menuSection: MenuSection) {
    this.showListOfMenuSections = false;
    this.showUpdateForm = true;
    this.menuSection = menuSection;
    this.showFormAddMenuSection = false;
  }

  updateMenuSection(formToBeUpdated: HTMLFormElement) {
    this.menuSectionToUpdate.id = this.menuSection.id;
    this.restaurantControllerService.saveMenuSection(
      this.restaurant.id, this.menuSectionToUpdate, this.headersOption).
    subscribe(data => {this.responseOnSaveMenuSection = data.text;
        this.showUpdateForm = false;
        this.showFormAddMenuSection = true;
        this.menuSection = new MenuSection(); },
      error1 => this.responseOnSaveMenuSection = 'Failed to update!');

  }


  delete(menuSection: MenuSection) {
    this.menuSection = menuSection;
    this.restaurantControllerService.deleteMenuSection(this.menuSection.id, this.headersOption).
    subscribe(data => { this.responseOnDelete = data.text;
      this.showUpdateForm = false;
      this.showFormAddMenuSection = true;
      this.menuSection = new MenuSection(); },
        error1 => this.responseOnDelete = 'Failed To Delete' );
  }
}
