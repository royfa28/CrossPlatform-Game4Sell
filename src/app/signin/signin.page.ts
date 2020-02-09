import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SignupPage } from '../signup/signup.page';
import { DataService } from '../data/data.service';
import * as firebase from 'firebase';
import { AlertService } from '../data/alert.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  signInForm: FormGroup;

  constructor(
    private modal: ModalController,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private data: DataService,
    private alertController: AlertController,
    private alertService: AlertService
  ) { 
  }

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
        this.alertService.wrongPassword(error.message);
      })
  }

  async signUp() {
    const signUpModal = await this.modal.create({
      component: SignupPage
    });
    signUpModal.onDidDismiss().then((response) => {
      if (response.data) {
        //handle signup response
        const email = response.data.email;
        const password = response.data.password;
        const userDetails = response.data.userData;
        this.auth.signUp(email, password)
          .then((userData) => {
            // sign up successful
            this.data.addUser(userDetails);
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

  async forgotPassword(){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Forgot your password? <br> Enter your email below to reset',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Your email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: (data) => {
            this.auth.resetPassword(data.email).then( () =>{
              this.alertService.passResetSuccess();
            }).catch( (error) =>{
              this.alertService.resetPass(error.message);
            })
            console.log(data);
          }
        }
      ]
    });
    await alert.present();
  }
}