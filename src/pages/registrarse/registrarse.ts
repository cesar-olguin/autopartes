import { Md5 } from 'ts-md5/dist/md5';
import { UserServiceProvider } from './../../providers/user-service/user-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegistrarsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrarse',
  templateUrl: 'registrarse.html',
})
export class RegistrarsePage {
 
  date: string;
  Nombre: string;
  ApellidoP: string;
  ApellidoM: string;
  Correo: string;
  Cell: string;
  Contrasena: string;
  Confirmar: string;
  Fecha_nac: string;
  Genero: string;
  Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: UserServiceProvider, public alertCtrl: AlertController, public viewCtrl: ViewController,
      public appCtrl: App) {
  }

  ionViewDidLoad() {

  }

  addUser() {
      if (this.Contrasena != this.Confirmar) {
          this.noCoinciden();
      }
      else if (this.Nombre == null || this.ApellidoP == null || this.ApellidoM == null || this.Correo == null || this.Cell == null || this.Fecha_nac == null) {
          this.camposVacios();
      }
      else {
          if (this.Genero != 'H') {
              this.Genero = 'M';
          }
          let body = {
              Nombre: this.Nombre,
              ApellidoP: this.ApellidoP,
              ApellidoM: this.ApellidoM,
              Correo: this.Correo,
              Cell: this.Cell,
              Contrasena: Md5.hashStr(this.Contrasena),
              Confirmar: Md5.hashStr(this.Confirmar),
              Fecha_nac: this.Fecha_nac = new Date().toLocaleDateString('en-GB'),
              Genero: this.Genero,
              Fecha_alta: this.date = new Date().toLocaleDateString('en-GB')
          }
          this.restService.checkEmail(this.Correo).then(data => {
              this.Usuario = JSON.stringify(data);
              if (this.Usuario == "[]") {
                  console.log(JSON.stringify(body));
                  this.restService.postRegistro(body)
                      .then((result) => {
                          console.log(result);
                      }, (err) => {
                          console.log(err);
                      });
                  this.userAdded();
                  this.navCtrl.push(LoginPage);
              }
              else {
                  this.userCheck();
              }
          });
      }
  }

  noCoinciden() {
      let alert = this.alertCtrl.create({
          title: 'ERROR',
          subTitle: 'Las contraseñas no coinciden',
          buttons: ['Cerrar']
      });
      alert.present();
  }

  camposVacios() {
      let alert = this.alertCtrl.create({
          title: 'ERROR',
          subTitle: 'Algunos campos están vacíos.',
          buttons: ['Cerrar']
      });
      alert.present();
  }

  userAdded() {
      let alert = this.alertCtrl.create({
          title: 'BIEN',
          subTitle: 'Tu usuario fue registrado.',
          buttons: ['Aceptar'],
      });
      alert.present();
  }

  userCheck() {
      let alert = this.alertCtrl.create({
          title: 'ERROR',
          subTitle: 'El usuario ya existe.',
          buttons: ['Aceptar'],
      });
      alert.present();
  }

}