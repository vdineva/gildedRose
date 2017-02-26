import { Component } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  MIN = 0;
  MAX = 50;

  title = 'Store inventory';
  items = ['Aged Brie', 'Sulfarus the Legendary Sword', 'Backstage Pass',  'Conjured Shield', 'Regular Shield'];
  inventory = [];

  constructor() {
    for (let item of this.items) {
      var sellIn = this.getRandomNumber(this.MIN, this.MAX);
      var quantity = this.getRandomNumber(this.MIN, this.MAX);

      this.inventory.push(new Item(item, sellIn, quantity));
    }
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
