import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../Models/Restaurant';
import {ActivatedRoute, Router} from '@angular/router';
import {MainControllerService} from '../ControllerServices/main-controller.service';
import {RestaurantControllerService} from '../ControllerServices/restaurant-controller.service';
import {Client} from '../Models/Client';

@Component({
  selector: 'app-orderforclient-component',
  templateUrl: './orderforclient-component.component.html',
  styleUrls: ['./orderforclient-component.component.css']
})
export class OrderforclientComponentComponent implements OnInit {

  client: Client = new Client();

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private restaurantControllerService: RestaurantControllerService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: Client) => {
      this.client = data;
    });
  }

  backToAccount() {
    this.router.navigate(['client'], {queryParams: this.client});
  }

}
