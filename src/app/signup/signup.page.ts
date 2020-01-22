import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private signUpForm:FormGroup;
  constructor( 
    private modal:ModalController, 
    private formBuilder:FormBuilder
    ) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email ] ],
      password: ['', [Validators.required, Validators.minLength(6) ] ]
    });
  }

  submit() {
    this.modal.dismiss({
      email: this.signUpForm.controls.email.value,
      password: this.signUpForm.controls.password.value,
    });
  }

  addUser(){
    let email = this.signUpForm.controls.email.value;
    let deliveryAddress = "";
    let userData = { email: email, deliveryAddress: deliveryAddress };
    this.modal.dismiss( userData );
  }

  close() {
    this.modal.dismiss();
  }
}
