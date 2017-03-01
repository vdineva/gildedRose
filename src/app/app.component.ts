import { Component, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [InventoryService]
})


export class AppComponent implements OnInit {
  title = 'Store Inventory';
  inventory = [];

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.getInventory();
  }

  getInventory(): void {
    this.inventory = this.inventoryService.getInventory();
  }

  updateInventory() {
    this.inventoryService.updateInventory();
  }
}
