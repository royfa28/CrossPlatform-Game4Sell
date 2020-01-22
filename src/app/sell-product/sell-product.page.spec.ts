import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SellProductPage } from './sell-product.page';

describe('SellProductPage', () => {
  let component: SellProductPage;
  let fixture: ComponentFixture<SellProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SellProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
