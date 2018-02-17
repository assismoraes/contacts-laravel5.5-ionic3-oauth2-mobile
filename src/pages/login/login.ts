import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user: User = new User();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private restProvider: RestProvider,
    private toastCtrl: ToastController,
    private storage: Storage) {
  }

  ionViewDidLoad() {
  }

  private dismiss() {
    this.viewCtrl.dismiss();
  }

  login() {
    this.restProvider.login(this.user)
      .toPromise()
      .then(res => {
        this.storage.set('authData', res);
        this.dismiss();
        this.loginMessage('Login successfully!');
      })
      .catch(err => {
        this.loginMessage('Incorrect login or password. Try again.');
      });

    ;
  }

  loginMessage(message) {
    this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: 2500
    }).present();
  }

}
