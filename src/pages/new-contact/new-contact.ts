import { HomePage } from './../home/home';
import { Contact } from './../../models/contact';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AuthData } from '../../models/authData';
import { Storage } from '@ionic/storage/dist/storage';

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
  public contact: Contact = new Contact();
  title = 'Create Contact';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private restProvider: RestProvider, private storage: Storage) {
      this.verifyIfEdition();
  }

  ionViewDidLoad() {}

  save() {
    this.storage.get('authData')
    .then(data => {
      let authData: AuthData = data;
      let resp = this.restProvider.saveContact(this.contact, authData);

      resp
      .then((result) => {
      }, (err) => {
        if (err.error.text !== undefined) {
          this.restProvider.showMessage('Contact saved successfully!');
          this.navCtrl.setRoot(HomePage);
        } else {
          for (const erro in err.error.errors) {
            if (true) {
              this.restProvider.showMessage(err.error.errors[erro][0]);
              break;
            }
          }
        }
      });

    });
    

  }

  private verifyIfEdition(): any {
    let contact = this.navParams.get('contact');
    if(contact) {
      this.contact = contact;
      this.title = 'Edit Contact';
    }
  }

}
