import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../Models/User';
import {Restaurant} from '../Models/Restaurant';
import {Client} from '../Models/Client';
import {MenuSection} from '../Models/MenuSection';
import {Meal} from '../Models/Meal';
import {OrderMeal} from '../Models/OrderMeal';

@Injectable({
  providedIn: 'root'
})
export class RestaurantControllerService {

  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  saveMenuSection(menuSection: MenuSection): Observable<string> {
    return this.http.post<string>(this.url + '/saveMenuSection', menuSection);
  }

  deleteMenuSection(id: number): Observable<string> {
    return this.http.delete<string>(this.url + '/deleteMenuSection' + id);
  }

  saveMeal(meal: Meal): Observable<string> {
    return this.http.post<string>(this.url + '/saveMeal', meal);
  }

  deleteMeal(id: number): Observable<string> {
    return this.http.delete<string>(this.url + '/deleteMeal' + id);
  }

  saveAvatar(id: number, image: File): Observable<string> {
    return this.http.post<string>(this.url + '/saveAvatar', image);
  }

  deleteAvatar(id: number): Observable<string> {
    return this.http.delete<string>(this.url + '/deleteAvatar' + id);
  }

  acceptOrderToKitchen(order: OrderMeal): Observable<string> {
    return this.http.post<string>(this.url + '/acceptOrderToKitchen', order);
  }

  cancelOrderByRestaurant(id: number, reasonOfCancelation: string): Observable<string> {
    return this.http.post<string>
    (this.url + '/reasonOfCancelation', reasonOfCancelation);
  }

  deleteOrderByRestaurant(id: number): Observable<string> {
    return this.http.delete<string>(this.url + '/deleteOrderByRestaurant' + id);
  }

  negativeFromRestaurant(id: number, descriptionFromRestaurant: string): Observable<string> {
    return this.http.post<string>
    (this.url + '/negativeFromRestaurant' + id, descriptionFromRestaurant);
  }

  positiveFromRestaurant(id: number, descriptionFromRestaurant: string): Observable<string> {
    return this.http.post<string>
    (this.url + '/positiveFromRestaurant' + id, descriptionFromRestaurant);
  }
}
