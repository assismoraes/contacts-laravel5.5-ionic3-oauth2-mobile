import { Utils } from './../../utils/utils';
import { Contact } from './../../models/contact';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: HttpClient, private toastCtrl: ToastController) { }

  public delete(id) {
    this.http.delete(Utils.urlDeleteContact + '/' + id, { headers: Utils.headerPost })
    .subscribe(
      data => {
      }
    );
  }

  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(Utils.urlShowAllContacts);
  }

  public saveContact(contact): Promise<{}> {
    let url = Utils.urlCreateContact;
    let method = 'POST';
    if (contact.id) {
      url = Utils.urlEditContact;
      method = 'PUT';
    }
    const resp = this.http.request(method, url, {
      params: contact,
      responseType: 'json',
      headers: Utils.headerPost
    });

    return new Promise((resolve, reject) => {
      resp.subscribe(
        res => {
          resolve(res);
        },
        (err) => {
          reject(err);
        });
    });
  }

  public searchByAllFields(strSearch): Observable<Contact[]> {
    return this.http.get<Contact[]>(Utils.urlSearchByAll + '/' + strSearch);
  }
  
  public showMessage(message) {
    this.toastCtrl.create({
      message: message,
      duration: 2500,
      position: 'top'
    })
    .present();
  }

}
