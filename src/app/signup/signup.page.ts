import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public signUpForm:FormGroup;
  constructor( 
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private data: DataService
    ) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email ] ],
      password: ['', [Validators.required, Validators.minLength(6) ]],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  submit() {
    let email = this.signUpForm.controls.email.value;
    let deliveryAddress = "";
    let fullName = this.signUpForm.controls.name.value;
    let userData = { email: email, deliveryAddress: deliveryAddress, fullName: fullName };
    //this.data.addUser( userData );

    this.modal.dismiss({
      email: this.signUpForm.controls.email.value,
      password: this.signUpForm.controls.password.value,
      userData
    });
  }

  close() {
    this.modal.dismiss();
  }
}
