
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

export class MainControllerService {

  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  saveUser(user: User): Observable<string> {
    return this.http.post<string>(this.url + '/saveUser', user);
  }

  deleteUser(id: number): Observable<string> {
    return this.http.delete<string>(this.url + '/deleteUser' + id);
  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url + '/getRestaurants');
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + '/getClients');
  }

  getMenuSections(restaurant: Restaurant): Observable<MenuSection []> {
    return this.http.post<MenuSection[]> (this.url + '/getMenuSections', restaurant);
  }

  getMeals(restaurant: Restaurant): Observable<Meal[]> {
    return this.http.post<Meal[]>(this.url + '/getMeals', restaurant);
  }

  getClientOrders(client: Client): Observable<OrderMeal[]> {
    return this.http.post<OrderMeal[]>(this.url + '/getClientOrders', client);
  }

  getRestaurantOrders(restaurant: Restaurant): Observable<OrderMeal[]> {
    return this.http.post<OrderMeal[]>(this.url + '/getRestaurantOrders', restaurant);
  }
}
