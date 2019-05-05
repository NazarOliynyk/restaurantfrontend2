import {MenuSection} from './MenuSection';
import {Restaurant} from './Restaurant';
import {OrderMeal} from './OrderMeal';

export class Meal {

  // constructor(
  //   public id: number = 0,
  //   public name: string = '',
  //   public description: string = '',
  //   public quantity: string = '',
  //   public price: any,
  //   public menuSection: MenuSection = null,
  //   public restaurant: Restaurant = new Restaurant(),
  //   public orders: OrderMeal [] = []
  // ) {}
  public id = 0;
  public name = '';
  public description = '';
  public quantity = '';
  public price: any;
  public menuSection: MenuSection;
  public restaurant: Restaurant = new Restaurant();
  public orders: OrderMeal [] = [];


  constructor() {
  }
}
