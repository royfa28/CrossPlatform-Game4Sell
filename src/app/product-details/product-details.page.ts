import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  @Input() name: string;

  private detailForm: FormGroup;
  constructor(
    private modal: ModalController, 
    private formBuilder: FormBuilder, 
    private data: DataService,
    private alert: AlertController,
    private route: ActivatedRoute,
    private router: Router
  ) {
   }

  ngOnInit() {
  }
}
