import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../Models/User';
import {Restaurant} from '../Models/Restaurant';
import {Client} from '../Models/Client';
import {MenuSection} from '../Models/MenuSection';
import {Meal} from '../Models/Meal';
import {OrderMeal} from '../Models/OrderMeal';
import {ResponseTransfer} from '../Models/ResponseTransfer';

@Injectable({
  providedIn: 'root'
})
export class RestaurantControllerService {

  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  saveMenuSection(menuSection: MenuSection): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>(this.url + '/saveMenuSection', menuSection);
  }

  deleteMenuSection(id: number): Observable<ResponseTransfer> {
    return this.http.delete<ResponseTransfer>(this.url + '/deleteMenuSection' + id);
  }

  saveMeal(meal: Meal): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>(this.url + '/saveMeal', meal);
  }

  deleteMeal(id: number): Observable<ResponseTransfer> {
    return this.http.delete<ResponseTransfer>(this.url + '/deleteMeal' + id);
  }

  saveAvatar(id: number, image: File): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>(this.url + '/saveAvatar', image);
  }

  deleteAvatar(id: number): Observable<ResponseTransfer> {
    return this.http.delete<ResponseTransfer>(this.url + '/deleteAvatar' + id);
  }

  acceptOrderToKitchen(order: OrderMeal): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>(this.url + '/acceptOrderToKitchen', order);
  }

  cancelOrderByRestaurant(id: number, reasonOfCancelation: string): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>
    (this.url + '/reasonOfCancelation', reasonOfCancelation);
  }

  deleteOrderByRestaurant(id: number): Observable<ResponseTransfer> {
    return this.http.delete<ResponseTransfer>(this.url + '/deleteOrderByRestaurant' + id);
  }

  negativeFromRestaurant(id: number, descriptionFromRestaurant: string): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>
    (this.url + '/negativeFromRestaurant' + id, descriptionFromRestaurant);
  }

  positiveFromRestaurant(id: number, descriptionFromRestaurant: string): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>
    (this.url + '/positiveFromRestaurant' + id, descriptionFromRestaurant);
  }
}
