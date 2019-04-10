import {MenuSection} from './MenuSection';
import {Restaurant} from './Restaurant';
import {OrderMeal} from './OrderMeal';

export class Meal {

  constructor(
    public id: number = 0,
    public name: string = '',
    public description: string = '',
    public quantity: string = '',
    public price: number = 0,
    public menuSection: MenuSection = null,
    public restaurant: Restaurant = new Restaurant(),
    public orders: OrderMeal [] = []
  ) {}
}
