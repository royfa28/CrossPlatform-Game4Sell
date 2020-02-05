import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.initializeApp();
    this.initializeNavigation();
  }

  user:any;

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initializeNavigation() {
    this.afAuth.authState.subscribe(( user ) => {
      if( user ) {
        this.appPages = [
          {title: 'Profile' , url: '/profile', icon: 'home'},
          {title: 'Homepage' , url: '/homepage', icon: 'home'},
          {title: 'History' , url: '/history', icon: 'settings'},
          {title: 'Sell with us', url: '/sell-product'}
        ]
        this.user = user;
      }
      else {
        this.appPages = [
          {title: 'Profile' , url: '/profile', icon: 'home'},
          {title: 'Homepage' , url: '/homepage', icon: 'home'},
          {title: 'History' , url: '/history', icon: 'settings'}
        ]
        this.user = null;
      }
    })
  }

  signOut(){
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/homepage']);
    })
  }
  
  signIn(){
    this.router.navigate(['/signin']);
  }
}
