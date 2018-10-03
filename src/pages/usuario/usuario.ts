import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Md5 } from 'ts-md5';

/**
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  public Correo;
  public Password;
  Usuario: any;
  public user;
  objectKeys = Object.keys;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public appCtrl: App, public restService: UserServiceProvider, public events: Events) {
    this.storage.get('user').then((uval) => {
      this.storage.get('pass').then((pval) => {
        this.Correo = uval;
        this.Password = pval;

        this.restService.getLoggin(this.Correo, Md5.hashStr(this.Password)).then(data => {
          this.Usuario = data;

          console.log(data);

          let obj = JSON.parse(JSON.stringify(data));
          this.user = obj[0];
          //alert("JSON Parse -> " + this.user.idUsuario);
          this.storage.set('idUser', this.user.idUsuario);

        });
      });
    });
  }

  ionViewDidLoad() {

  }

  close() {
    window.localStorage.clear();
    this.events.publish('user:loggedout');
    this.appCtrl.getRootNav().setRoot(HomePage);
  }

}
