import { TestBed, inject } from '@angular/core/testing';
import { Item } from './item';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let item;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryService]
    });

    item = new Item('test', 2, 3);
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

  it('getRandomNumber should return a number between 1 and 20', inject([InventoryService], (service: InventoryService) => {
    const number = service.getRandomNumber(1, 20);
    expect(number).toMatch(/\d+/);

    expect(number).toBeLessThan(21);
    expect(number).not.toBeLessThan(1);

    expect(number).toBeGreaterThan(0);
    expect(number).not.toBeGreaterThan(20);
  }));

  it('decreaseSellIn should decrease the value of sellIn', inject([InventoryService], (service: InventoryService) => {
    expect(item.sellIn).toBe(2);
    service.decreaseSellIn(item);
    expect(item.sellIn).toBe(1);
    service.decreaseSellIn(item);
    expect(item.sellIn).toBe(0);
    service.decreaseSellIn(item);
    expect(item.sellIn).toBe(0);
  }));

  it('decreaseQuality should decrease the value of quality', inject([InventoryService], (service: InventoryService) => {
    expect(item.quality).toBe(3);
    service.decreaseQuality(item);
    expect(item.quality).toBe(2);
    service.decreaseQuality(item, 1);
    expect(item.quality).toBe(1);
    service.decreaseQuality(item, 10);
    expect(item.quality).toBe(0);
  }));

  it('increaseQuality should increase the value of quality', inject([InventoryService], (service: InventoryService) => {
    expect(item.quality).toBe(3);
    service.increaseQuality(item);
    expect(item.quality).toBe(4);
    service.increaseQuality(item, 1);
    expect(item.quality).toBe(5);
    service.increaseQuality(item, 10);
    expect(item.quality).toBe(15);
    service.increaseQuality(item, 60);
    expect(item.quality).toBe(50);
  }));

  it('isAgedBrie should return false if the name of an item is not `Aged Brie`', inject([InventoryService], (service: InventoryService) => {
    const result = service.isAgedBrie(item);
    expect(result).toBeFalsy();
  }));

  it('isSulfuras should return false if the name of an item is not `Sulfarus the Legendary Sword`', inject([InventoryService], (service: InventoryService) => {
    const result = service.isSulfuras(item);
    expect(result).toBeFalsy();
  }));

  it('isBackstagePass should return false if the name of an item is not `Backstage Pass`', inject([InventoryService], (service: InventoryService) => {
    const result = service.isBackstagePass(item);
    expect(result).toBeFalsy();
  }));

  it('isConjured should return false if the name of an item is not `Conjured Shield`', inject([InventoryService], (service: InventoryService) => {
    const result = service.isConjured(item);
    expect(result).toBeFalsy();
  }));
});
