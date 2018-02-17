import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage/dist/storage';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
import { AuthData } from '../../models/authData';

@IonicPage()
@Component({
  selector: 'page-my-info',
  templateUrl: 'my-info.html',
})
export class MyInfoPage {

  user: User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private restProvider: RestProvider) {
      this.searchMyInfo();
  }

  resetMyInfo() {
    this.storage.clear();
    this.navCtrl.setRoot(HomePage);
  }

  searchMyInfo() {
    this.storage.get('authData')
      .then(data => {
        let authData: AuthData = data;
        this.restProvider.getCurrentUser(authData).subscribe(u => this.user = u);
      });
  }

}
