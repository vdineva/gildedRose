import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable()
export class InventoryService {
  MIN = 0;        // min value for sellIn
  MAX = 50;       // max value for sellIn
  MIN_QUALITY = 0;
  MAX_QUALITY = 50;

  items = ['Aged Brie', 'Sulfarus the Legendary Sword', 'Backstage Pass',  'Conjured Shield', 'Regular Shield'];
  inventory = [];

  constructor() { }

  getItems(): String[] {
    return this.items;
  }

  getInventory(): Item[] {
    for (const item of this.items) {
      const sellIn = this.getRandomNumber(this.MIN, this.MAX);
      const quantity = this.getRandomNumber(this.MIN_QUALITY, this.MAX_QUALITY);

      this.inventory.push(new Item(item, sellIn, quantity));
    }
    return this.inventory;
  }

  updateInventory() {
    for (const item of this.inventory) {
      if (this.isAgedBrie(item)) {
        this.increaseQuality(item, 1);
      } else if (this.isBackstagePass(item)) {
        if (item.sellIn === 0) {
          item.quality = this.MIN_QUALITY;
        } else if (item.sellIn <= 5) {
          this.increaseQuality(item, 3);
        } else if (item.sellIn <= 10) {
          this.increaseQuality(item, 2);
        } else {
          this.increaseQuality(item, 1);
        }
      } else if (!this.isSulfuras(item)) {
        let decreaseBy = 1;
        if (this.isConjured(item) || item.sellIn === 0) {
          decreaseBy = 2;
        }

        this.decreaseQuality(item, decreaseBy);
      }

      if (!this.isSulfuras(item)) {
        this.decreaseSellIn(item);
      }
    }
  }

  decreaseSellIn(item) {
    item.sellIn--;
    if (item.sellIn <= this.MIN) {
      item.sellIn = this.MIN;
    }
  }

  decreaseQuality(item, decreaseBy = 1) {
    item.quality -= decreaseBy;
    if (item.quality < this.MIN_QUALITY) {
      item.quality = this.MIN_QUALITY;
    }
  }

  increaseQuality(item, increaseBy = 1) {
    item.quality += increaseBy;
    if (item.quality > this.MAX_QUALITY) {
      item.quality = this.MAX_QUALITY;
    }
  }

  isAgedBrie(item) {
    return item.name === this.items[0];
  }

  isSulfuras(item) {
    return item.name === this.items[1];
  }

  isBackstagePass(item) {
    return item.name === this.items[2];
  }

  isConjured(item) {
    return item.name === this.items[3];
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
