import { Component } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  MIN = 0;        //min value forsellIn
  MAX = 50;       //max value for sellIn
  MIN_QUALITY = 0;
  MAX_QUALITY = 50;

  title = 'Store Inventory';
  items = ['Aged Brie', 'Sulfarus the Legendary Sword', 'Backstage Pass',  'Conjured Shield', 'Regular Shield'];
  inventory = [];

  constructor() {
    for (let item of this.items) {
      var sellIn = this.getRandomNumber(this.MIN, this.MAX);
      var quantity = this.getRandomNumber(this.MIN_QUALITY, this.MAX_QUALITY);

      this.inventory.push(new Item(item, sellIn, quantity));
    }
  }

  updateInventory(event) {
    for (let item of this.inventory) {
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
        this.decreaseQuality(item);
      }

      if (!this.isSulfuras(item)) {
        this.decreaseSellIn(item);
      }
    }
  }

  decreaseSellIn(item) {
    if (item.sellIn === this.MIN) {
      return;
    }

    item.sellIn--;
  }

  decreaseQuality(item, decreaseBy = 1) {
    if (item.quality === this.MIN_QUALITY) {
      return;
    } else if (this.isConjured(item) || item.sellIn === 0) {
      decreaseBy = 2;
    }

    item.quality -= decreaseBy;
    if (item.quality < this.MIN_QUALITY) {
      item.quality = this.MIN_QUALITY;
    }
  }

  increaseQuality(item, increaseBy = 1) {
    if (item.quality === this.MAX_QUALITY) {
      return;
    }

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
