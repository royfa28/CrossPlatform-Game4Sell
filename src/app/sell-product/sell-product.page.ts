import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.page.html',
  styleUrls: ['./sell-product.page.scss'],
})
export class SellProductPage implements OnInit {

  public form = [
      { val: 'PS4', isChecked: true },
      { val: 'PC', isChecked: false },
      { val: 'XBOX ONE', isChecked: false }
    ];

  constructor() { }

  ngOnInit() {
  }

}
