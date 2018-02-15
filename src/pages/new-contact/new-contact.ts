import { ContatosService } from './../../../../contatos/src/services/contatos.service';
import { HomePage } from './../home/home';
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
  public contact: Contact = new Contact();
  title = 'Create Contact';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController,
    private restProvider: RestProvider) {
      this.verifyIfEdition();
  }

  ionViewDidLoad() {}

  save() {
    let resp = this.restProvider.saveContact(this.contact);
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
  }

  private verifyIfEdition(): any {
    let contact = this.navParams.get('contact');
    if(contact) {
      this.contact = contact;
      this.title = 'Edit Contact';
    }
  }

}
