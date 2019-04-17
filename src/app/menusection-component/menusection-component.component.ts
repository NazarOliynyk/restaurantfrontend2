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
    });
  }

  backToAccount() {
    this.router.navigate(['restaurant'], {queryParams: this.restaurant});
  }

  deleteMenuSection(menuSection: MenuSection) {

  }
}
