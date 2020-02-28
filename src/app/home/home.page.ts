import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';

import { FirebaseX } from "@ionic-native/firebase-x/ngx";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  togglePoint = false;
  myVariable: string = 'The force is with me!';
  myToken:any;
  
  constructor(private firebase: FirebaseX) { }

  updateMyValue() {
    this.togglePoint = !this.togglePoint;
    if(this.togglePoint) this.myVariable = 'Now the force is even stronger!';
    else this.myVariable = 'The force is with me!';

    this.firebaseX.getToken()
      .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
      .catch(error => console.error('Error getting token', error));

    this.firebaseX.onMessageReceived()
      .subscribe(data => console.log(`User opened a notification ${data}`));

    this.firebaseX.onTokenRefresh()
      .subscribe((token: string) => console.log(`Got a new token ${token}`));
  }

}
