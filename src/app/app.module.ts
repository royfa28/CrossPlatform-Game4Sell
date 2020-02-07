import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx'

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { SignupPageModule } from './signup/signup.module';
import { DataService } from './data/data.service';
import { ProductDetailsPageModule } from './product-details/product-details.module';
import { ShoppingCartService } from './data/shopping-cart.service';
import { ShoppingCartPageModule } from './shopping-cart/shopping-cart.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    SignupPageModule,
    ProductDetailsPageModule,
    ShoppingCartPageModule
  ],
  providers: [
    { provide: StorageBucket, useValue: 'gs://games-4-sell.appspot.com/' },
    DataService,
    ShoppingCartService,
    StatusBar,
    SplashScreen,
    FingerprintAIO,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
