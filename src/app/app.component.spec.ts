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
    const tds = compiled.querySelectorAll('table > tbody > tr:first-child td');

    let nameBefore = tds[0].textContent;
    let sellInBefore = parseInt(tds[1].textContent);
    let qualityBefore = parseInt(tds[2].textContent);

    compiled.querySelector('button').click();
    fixture.detectChanges();
    let nameAfter = tds[0].textContent;
    let sellInAfter = parseInt(tds[1].textContent);
    let qualityAfter = parseInt(tds[2].textContent);

    //the product name should not have changed after the button was clicked
    expect(nameBefore).toEqual(nameAfter);
    //for Aged Brie the sellIn should have decreased by 1 after the button is clicked once
    expect(sellInBefore).toEqual(sellInAfter + 1);
    //for Aged Brie the quality should have increased by 1 after the button is clicked once
    expect(qualityBefore).toEqual(qualityAfter - 1);
  }));
});
