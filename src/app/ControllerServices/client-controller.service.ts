import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderMeal} from '../Models/OrderMeal';

@Injectable({
  providedIn: 'root'
})
export class ClientControllerService {

  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  saveOrder(order: OrderMeal): Observable<string> {
    return this.http.post<string>(this.url + '/saveOrder', order);
  }

  deleteOrder(id: number): Observable<string> {
    return this.http.delete<string>(this.url + '/deleteOrder' + id);
  }

  cancelOrderByClient(id: number, reasonOfCancelation: string): Observable<string> {
    return this.http.post<string>
    (this.url + '/cancelOrderByClient' + id, reasonOfCancelation);
  }

  confirmOrderServed(order: OrderMeal): Observable<string> {
    return this.http.post<string>(this.url + '/confirmOrderServed', order);
  }

  negativeFromClient(id: number, descriptionFromClient: string): Observable<string> {
    return this.http.post<string>
    (this.url + '/negativeFromClient' + id, descriptionFromClient);
  }

  positiveFromClient(id: number, descriptionFromClient: string): Observable<string> {
    return this.http.post<string>
    (this.url + '/positiveFromClient' + id, descriptionFromClient);
  }
}
