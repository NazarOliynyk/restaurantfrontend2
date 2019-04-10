import {Client} from './Client';
import {Restaurant} from './Restaurant';
import {Meal} from './Meal';

export class OrderMeal {

  constructor(
    public id: number = 0,
    public date: Date = null,
    public reasonOfCancelation: string = '',
    public descriptionFromClient: string = '',
    public descriptionFromRestaurant: string = '',
    public orderStatus: OrderStatus = null,
    public responseFromClient: ResponseType = null,
    public responseFromRestaurant: ResponseType = null,
    public client: Client = new Client(),
    public restaurant: Restaurant = new Restaurant(),
    public meals: Meal [] = []
  ) { }
}
