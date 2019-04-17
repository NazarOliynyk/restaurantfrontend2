import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderMeal} from '../Models/OrderMeal';
import {ResponseTransfer} from '../Models/ResponseTransfer';

@Injectable({
  providedIn: 'root'
})
export class ClientControllerService {

  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  saveOrder(order: OrderMeal): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>(this.url + '/saveOrder', order);
  }

  deleteOrder(id: number): Observable<ResponseTransfer> {
    return this.http.delete<ResponseTransfer>(this.url + '/deleteOrder' + id);
  }

  cancelOrderByClient(id: number, reasonOfCancelation: string): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>
    (this.url + '/cancelOrderByClient' + id, reasonOfCancelation);
  }

  confirmOrderServed(order: OrderMeal): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>(this.url + '/confirmOrderServed', order);
  }

  negativeFromClient(id: number, descriptionFromClient: string): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>
    (this.url + '/negativeFromClient' + id, descriptionFromClient);
  }

  positiveFromClient(id: number, descriptionFromClient: string): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>
    (this.url + '/positiveFromClient' + id, descriptionFromClient);
  }
}
