import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../Models/Restaurant';
import {ActivatedRoute, Router} from '@angular/router';
import {MainControllerService} from '../ControllerServices/main-controller.service';
import {RestaurantControllerService} from '../ControllerServices/restaurant-controller.service';

@Component({
  selector: 'app-orderforrestaurant-component',
  templateUrl: './orderforrestaurant-component.component.html',
  styleUrls: ['./orderforrestaurant-component.component.css']
})
export class OrderforrestaurantComponentComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private restaurantControllerService: RestaurantControllerService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: Restaurant) => {
      this.restaurant = data;
    });
  }

  backToAccount() {
    this.router.navigate(['restaurant'], {queryParams: this.restaurant});
  }
}
