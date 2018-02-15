import { ViewController } from 'ionic-angular/';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../models/contact';

@IonicPage()
@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html',
})
export class ContactDetailsPage {

  contact: Contact = new Contact();

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.contact = this.navParams.get('contact');
  }

  ionViewDidLoad() {}

  dismiss() {
    this.viewCtrl.dismiss();
  }



}
