import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable()
export class InventoryService {
  MIN = 0;        //min value for sellIn
  MAX = 50;       //max value for sellIn
  MIN_QUALITY = 0;
  MAX_QUALITY = 50;

  items = ['Aged Brie', 'Sulfarus the Legendary Sword', 'Backstage Pass',  'Conjured Shield', 'Regular Shield'];
  inventory = [];

  constructor() { }

  getItems(): String[] {
    return this.items;
  }

  getInventory(): Item[] {
    for (let item of this.items) {
      let sellIn = this.getRandomNumber(this.MIN, this.MAX);
      let quantity = this.getRandomNumber(this.MIN_QUALITY, this.MAX_QUALITY);

      this.inventory.push(new Item(item, sellIn, quantity));
    }
    return this.inventory;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
