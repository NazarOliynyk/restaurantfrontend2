import {Restaurant} from './Restaurant';

export class Avatar {

  constructor(
    public id: number = 0,
    public image: string = '',
    public restaurant: Restaurant = null
  ) {  }
}
