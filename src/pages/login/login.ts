import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, Events } from 'ionic-angular';
import { UserServiceProvider } from './../../providers/user-service/user-service';
import { empty } from 'rxjs/Observer';
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: UserServiceProvider, public alertCtrl: AlertController, private appCtrl: App, private storage: Storage, public events: Events) {
  }

  public Usuario;
  public Password;


  ionViewDidLoad() {
    //this.Usuario = this.getFromStorageAsyncUser();
    //this.Password = this.getFromStorageAsyncPass();
  }

  login() {
    if (this.Usuario == empty || this.Password == empty) {
      this.sinDatos();
    }
    else {
      this.restService.getLoggin(this.Usuario, Md5.hashStr(this.Password)).then(data => {
        console.log(JSON.stringify(data));
        if ((JSON.stringify(data)) == "[]") {
          this.correoError();
        }
        else {
          this.storage.set('user', this.Usuario);
          this.storage.set('pass', this.Password);

          window.localStorage.setItem('user',this.Usuario);
          window.localStorage.setItem('pass',this.Password);

          this.events.publish('user:loggedin');
          this.appCtrl.getRootNav().setRoot(HomePage);
        }
      });
    }
  }

  sinDatos() {
    let alert = this.alertCtrl.create({
      title: 'ERROR',
      subTitle: 'Llena los campos.',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  correoError() {
    let alert = this.alertCtrl.create({
      title: 'ERROR',
      subTitle: 'Error en el usuario y/o contraseña.',
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
