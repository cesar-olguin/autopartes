import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the EscribirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escribir',
  templateUrl: 'escribir.html',
})
export class EscribirPage {

  Escrito;
  idArticulo: string;
  idUsuario: string;
  Vendedor: string;
  Cliente: string;
  Conversacion: string;
  Fecha: string;
  idCliente;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public restService: UserServiceProvider) {
    this.idCliente = navParams.get('idCli');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscribirPage');
  }

  escribir() {
    this.storage.get('idUser').then((idLog) => {
      this.storage.get('vend').then((idVend) => {
        this.storage.get('idArt').then((idArt) => {

          let body = {
            idArticulo: idArt,
            idUsuario: idLog,
            Vendedor: idVend,
            Cliente: this.idCliente,
            Conversacion: this.Escrito,
            Fecha: this.Fecha = new Date().toLocaleDateString('en-GB')
          }
          this.restService.postConversacion(body);
          console.log(body);
        });
      });
    });
  }

}
