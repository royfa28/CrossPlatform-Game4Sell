import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SignupPage } from '../signup/signup.page';
import { DataService } from '../data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  signInForm: FormGroup;

  constructor(
    private data: DataService,
    private modal: ModalController,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  signIn() {
    const email = this.signInForm.controls.email.value;
    const password = this.signInForm.controls.password.value;
    this.auth.signIn(email, password)
      .then((response) => {
        this.signInForm.reset();
        this.router.navigate(['/homepage']);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async signUp( user ) {
    const signUpModal = await this.modal.create({
      component: SignupPage
    });
    signUpModal.onDidDismiss().then((response) => {
      if (response.data) {
        //handle signup response
        const email = response.data.email;
        const password = response.data.password;
        this.data.addUser(response.data.userData);
        this.auth.signUp(email, password)
          .then((userData) => {
            // sign up successful
            this.router.navigate(['/homepage']);
          })
          .catch((error) => {
            // handle errors
            console.log(error);
          })
      }
    })
    await signUpModal.present();
  }
}