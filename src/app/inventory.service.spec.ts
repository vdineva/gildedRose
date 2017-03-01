import { TestBed, inject } from '@angular/core/testing';

import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryService]
    });
  });

  it('should be truthy', inject([InventoryService], (service: InventoryService) => {
    expect(service).toBeTruthy();
  }));

  it('getItems should return 5 items', inject([InventoryService], (service: InventoryService) => {
    const items = service.getItems();
    expect(items.length).toBe(5);
    expect(typeof items[0]).toBe('string');
  }));

  it('getInventory should return 5 items', inject([InventoryService], (service: InventoryService) => {
    const items = service.getInventory();
    expect(items.length).toBe(5);
    expect(typeof items[0]).toBe('object');
  }));

  it('getRandomNumber should return a number', inject([InventoryService], (service: InventoryService) => {
    const number = service.getRandomNumber(1, 20);
    expect(number).toMatch(/\d+/);
  }));
});
