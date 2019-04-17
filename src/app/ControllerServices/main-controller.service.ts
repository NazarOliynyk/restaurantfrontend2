
import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

export class MainControllerService {

  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  saveRestaurant(restaurant: Restaurant): Observable<ResponseTransfer>  {
    return this.http.post<ResponseTransfer>(this.url + '/saveRestaurant', restaurant);
  }

  saveClient(client: Client): Observable<ResponseTransfer>  {
    return this.http.post<ResponseTransfer>(this.url + '/saveClient', client);
  }

  updateRestaurant(restaurant: Restaurant, headersOption: HttpHeaders): Observable<ResponseTransfer>  {
    return this.http.post<ResponseTransfer>(
      this.url + '/updateRestaurant', restaurant, {headers: headersOption});
  }

  updateClient(client: Client, headersOption: HttpHeaders): Observable<ResponseTransfer>  {
    return this.http.post<ResponseTransfer>(
      this.url + '/updateClient', client, {headers: headersOption});
  }

  login(user: User) {
    return this.http.post(this.url + '/login',
      JSON.stringify({username: user.username,
        password: user.password}),
      {observe: 'response'});
  }

  findRestaurant(id: number, headersOption: HttpHeaders): Observable<Restaurant> {
    return this.http.get<Restaurant>
    (this.url + '/findRestaurant/' + id, {headers: headersOption});
  }
  findClient(id: number, headersOption: HttpHeaders): Observable<Client> {
    return this.http.get<Client>
    (this.url + '/findClient/' + id, {headers: headersOption});
  }

  deleteUser(id: number, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.delete<ResponseTransfer>(
      this.url + '/deleteUser/' + id, {headers: headersOption});
  }

  getRestaurants(headersOption: HttpHeaders): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(
      this.url + '/getRestaurants', {headers: headersOption});
  }

  getClients(headersOption: HttpHeaders): Observable<Client[]> {
    return this.http.get<Client[]>(
      this.url + '/getClients', {headers: headersOption});
  }

  // getMenuSections(restaurant: Restaurant, headersOption: HttpHeaders): Observable<MenuSection []> {
  //   return this.http.post<MenuSection[]> (
  //     this.url + '/getMenuSections', restaurant, {headers: headersOption});
  // }

  getMenuSections(restaurant: Restaurant, headersOption: HttpHeaders): Observable<MenuSection []> {
    return this.http.get<MenuSection []> (
      this.url + '/getMenuSections/' + restaurant.id, {headers: headersOption});
  }

  getMeals(restaurant: Restaurant, headersOption: HttpHeaders): Observable<Meal[]> {
    return this.http.post<Meal[]>(
      this.url + '/getMeals', restaurant, {headers: headersOption});
  }

  getClientOrders(client: Client, headersOption: HttpHeaders): Observable<OrderMeal[]> {
    return this.http.post<OrderMeal[]>(
      this.url + '/getClientOrders', client, {headers: headersOption});
  }

  getRestaurantOrders(restaurant: Restaurant, headersOption: HttpHeaders): Observable<OrderMeal[]> {
    return this.http.post<OrderMeal[]>(
      this.url + '/getRestaurantOrders', restaurant, {headers: headersOption});
  }
}
