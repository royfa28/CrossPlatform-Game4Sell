import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Products',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  user:any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private afAuth: AngularFireAuth
    
  ) {
    this.initializeApp();
    this.initiliazeNavigation
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initiliazeNavigation(){
    this.afAuth.authState.subscribe(( user ) => {
      if( user ) {
        this.appPages = [
          {title: 'Products' , url: '/notes', icon: 'home'},
          {title: 'Settings' , url: '/settings', icon: 'settings'}
        ]
        this.user = user;
      }
      else {
        this.appPages = [
          {title: 'Sign In', url: '/signin', icon: 'log-in'}
        ]
        this.user = null;
      }
    })
  }
}
