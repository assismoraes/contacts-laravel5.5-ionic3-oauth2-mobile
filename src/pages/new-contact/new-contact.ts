import { Contact } from './../../models/contact';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the NewContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-contact',
  templateUrl: 'new-contact.html',
})
export class NewContactPage {

  public contact: Contact = { name: '', email: '', phone: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController,
    private restProvider: RestProvider) {
  }

  ionViewDidLoad() {

  }

  save() {
    console.log(this.contact);
    this.restProvider.addContact(this.contact).then((result) => {
    }, (err) => {
      console.log(err);
    });
  }

}
