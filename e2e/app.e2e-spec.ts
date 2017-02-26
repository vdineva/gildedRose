import { GildedRosePage } from './app.po';

describe('gilded-rose App', () => {
  let page: GildedRosePage;

  beforeEach(() => {
    page = new GildedRosePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Store Inventory');
  });
});
