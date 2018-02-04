import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
    this.getContacts();
  }

  getContacts() {
    this.restProvider.getContacts()
      .then(data => {
        this.contacts = data;
      });
  }

}
