import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SignupPage } from '../signup/signup.page';
import { DataService } from '../data/data.service';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  signInForm: FormGroup;
  fingerprintOptions: FingerprintOptions;

  constructor(
    private modal: ModalController,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private data: DataService,
    private platform: Platform,
    private fingerprint: FingerprintAIO
  ) { 
    this.fingerprintOptions = {
      title: 'Log in with fingerprint',
      description: 'Please put your finger into the fingerprint scanner',
      disableBackup: true
    }
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

    this.showFingerprintDialog();
  }

  async showFingerprintDialog(){
    try{
      await this.platform.ready();
      const available = await this.fingerprint.isAvailable();
      console.log(available);
      if(available == "OK" ){
        const result = await this.fingerprint.show(this.fingerprintOptions);
        console.log(result);
      }
    }
    catch(e){
      console.error(e);
    }

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
}