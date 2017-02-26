import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();


    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Store Inventory');
  }));

  it('should update sellIn and quality for the Aged Brie according to specs', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    let nameBefore = compiled.querySelector('table > tbody > tr:first-child td:nth-child(1)').textContent;
    let sellInBefore = compiled.querySelector('table > tbody > tr:first-child td:nth-child(2)').textContent;
    let qualityBefore = compiled.querySelector('table > tbody > tr:first-child td:nth-child(3)').textContent;

    compiled.querySelector('button').click();
    fixture.detectChanges();
    let nameAfter = compiled.querySelector('table > tbody > tr:first-child td:nth-child(1)').textContent;
    let sellInAfter = compiled.querySelector('table > tbody > tr:first-child td:nth-child(2)').textContent;
    let qualityAfter = compiled.querySelector('table > tbody > tr:first-child td:nth-child(3)').textContent;

    //the product name shuold not have changed after the button was clicked
    expect(nameBefore).toEqual(nameAfter);
    //for Aged Brie the sellIn should have decreased by 1 after the button is clicked once
    expect(sellInBefore).toEqual((parseInt(sellInAfter) + 1).toString());
    //for Aged Brie the quality should have increased by 1 after the button is clicked once
    expect(qualityBefore).toEqual((qualityAfter - 1).toString());
  }));
});
