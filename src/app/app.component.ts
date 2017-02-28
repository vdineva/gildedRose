import { Component, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [InventoryService]
})



export class AppComponent implements OnInit {
  MIN = 0;        //min value for sellIn
  MIN_QUALITY = 0;
  MAX_QUALITY = 50;

  title = 'Store Inventory';
  inventory = [];
  items = [];

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.getItems();
    this.getInventory();
  }

  getItems(): void {
    this.items = this.inventoryService.getItems();
  }

  getInventory(): void {
    this.inventory = this.inventoryService.getInventory();
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
}
