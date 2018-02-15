import { ContactDetailsPage } from './../contact-details/contact-details';
import { Contact } from './../../models/contact';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { NewContactPage } from '../new-contact/new-contact';
import { ModalController } from 'ionic-angular/';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts: Contact[] = new Array<Contact>();
  
  strSearch = '';

  constructor(public navCtrl: NavController, public restProvider: RestProvider, 
    private modalCtrl: ModalController) {
    this.getContacts();
  }

  getContacts() {
    this.restProvider.getContacts().subscribe(c => this.contacts = c);
  }

  delete(itemId, contact) {
    this.restProvider.delete(contact.id);
    this.contacts.splice(itemId, 1);
  }

  edit(contact: Contact) {
    this.navCtrl.push(NewContactPage, {contact: contact});
  }

  filter(strSearch) {
    this.restProvider.searchByAllFields(strSearch).subscribe(c => this.contacts = c);
  }

  detail(contact) {
    this.modalCtrl.create(ContactDetailsPage, {contact: contact})
      .present();    
  }

  emptyContactsArray() {
    return this.contacts.length == 0;
  }

}
