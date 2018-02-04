import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'http://192.168.0.7:8000/api/contacts';

  constructor(public http: HttpClient) { }

  getContacts() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/show_all_contacts').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addContact(contact) {
    let header = new HttpHeaders().set('Accept', 'application/json')
                                  .set('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/create_contact', JSON.stringify(contact), {
        headers: header
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(JSON.stringify(err));
          reject(err);
        });
    });
  }

}
