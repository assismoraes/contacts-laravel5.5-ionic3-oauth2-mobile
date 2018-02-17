import { LoginPage } from './../login/login';
import { ContactDetailsPage } from './../contact-details/contact-details';
import { Contact } from './../../models/contact';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { NewContactPage } from '../new-contact/new-contact';
import { ModalController } from 'ionic-angular/';
import { Storage } from '@ionic/storage/dist/storage';
import { AuthData } from '../../models/authData';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts: Contact[] = new Array<Contact>();

  strSearch = '';

  constructor(public navCtrl: NavController, public restProvider: RestProvider,
    private modalCtrl: ModalController, private storage: Storage) {
    this.verifyUserLogin();
  }

  getContacts() {
    this.storage.get('authData')
      .then(data => {
        let authData: AuthData = data;
        this.restProvider.getContacts(authData).subscribe(c => this.contacts = c);
      });
  }

  delete(itemId, contact) {
    this.storage.get('authData')
      .then(data => {
        let authData: AuthData = data;
        let resp = this.restProvider.delete(contact.id, authData);
        resp
          .then((result) => {
          }, (err) => {
            if (err.error.text !== undefined) {
              this.restProvider.showMessage('Contact deleted successfully!');
            } else {
              for (const erro in err.error.errors) {
                if (true) {
                  this.restProvider.showMessage(err.error.errors[erro][0]);
                  break;
                }
              }
            }
          });

        this.contacts.splice(itemId, 1);
      });
  }

  edit(contact: Contact) {
    this.navCtrl.push(NewContactPage, { contact: contact });
  }

  filter(strSearch) {
    this.storage.get('authData')
      .then(data => {
        let authData: AuthData = data;
        this.restProvider.searchByAllFields(strSearch, authData).subscribe(c => this.contacts = c);
      });
  }

  detail(contact) {
    this.modalCtrl.create(ContactDetailsPage, { contact: contact })
      .present();
  }

  emptyContactsArray() {
    return this.contacts.length == 0;
  }

  verifyUserLogin() {
    this.storage.get('authData')
      .then((data) => {
        if (data == undefined) {
          this.showModalLogin();
        } else {
          this.getContacts();
        }
      });
  }

  private showModalLogin() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(() => {
      this.getContacts();
    });
    modal.present();
  }

}
