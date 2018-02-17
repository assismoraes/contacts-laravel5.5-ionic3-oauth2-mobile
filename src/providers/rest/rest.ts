import { User } from './../../models/user';
import { AuthData } from './../../models/authData';
import { Utils } from './../../utils/utils';
import { Contact } from './../../models/contact';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';


@Injectable()
export class RestProvider {

  constructor(public http: HttpClient, private toastCtrl: ToastController) { }

  public delete(id, authData: AuthData): Promise<{}> {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + authData.access_token);
    return this.http.delete<any>(Utils.urlDeleteContact + '/' + id, { headers: header }).toPromise();
  }

  public getContacts(authData: AuthData): Observable<Contact[]> {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + authData.access_token);
    return this.http.get<Contact[]>(Utils.urlShowAllContacts, { headers: header });
  }

  public saveContact(contact, authData: AuthData): Promise<{}> {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + authData.access_token);
    let url = Utils.urlCreateContact;
    let method = 'POST';
    if (contact.id) {
      url = Utils.urlEditContact;
      method = 'PUT';
    }
    const resp = this.http.request(method, url, {
      params: contact,
      responseType: 'json',
      headers: header
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

  public searchByAllFields(strSearch, authData: AuthData): Observable<Contact[]> {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + authData.access_token);
    return this.http.get<Contact[]>(Utils.urlSearchByAll + '/' + strSearch, { headers: header });
  }

  public showMessage(message) {
    this.toastCtrl.create({
      message: message,
      duration: 2500,
      position: 'top'
    })
      .present();
  }

  public login(user: User): Observable<AuthData> {
    const params = {
      client_id: '2',
      client_secret: '7gYmdtXDrU0Y4qW9FoHm1jYEFIoxhgVUBb4v9pqJ',
      grant_type: 'password',
      username: user.username,
      password: user.password,
      scope: '*'
    };
    return this.http.post<AuthData>(Utils.urlLogin, params, { responseType: 'json' });
  }
  
  public getCurrentUser(authData: AuthData): Observable<User> {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + authData.access_token);
    return this.http.get<User>(Utils.urlCurrentUser, { headers: header });
  }

}
