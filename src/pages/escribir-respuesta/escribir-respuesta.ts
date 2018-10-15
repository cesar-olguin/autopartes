import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the EscribirRespuestaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escribir-respuesta',
  templateUrl: 'escribir-respuesta.html',
})
export class EscribirRespuestaPage {

  
  Escrito;
  idArticulo: string;
  idUsuario: string;
  Vendedor: string;
  Cliente: string;
  Conversacion: string;
  Fecha: string;
  idCliente;
  idVendedor;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public restService: UserServiceProvider, public events: Events) {
    this.idCliente = navParams.get('idCli');
    this.idVendedor = navParams.get('idVen')
  }

  ionViewDidLoad() {
    document.getElementById("respuestaInp").focus();
  }

  escribir() {
    this.storage.get('idUser').then((idLog) => {
      this.storage.get('idArt').then((idArt) => {
        this.storage.get('miID').then((idVen) => {

          let body = {
            idArticulo: idArt,
            idUsuario: idLog,
            Vendedor: this.idVendedor,
            Cliente: this.idCliente,
            Conversacion: this.Escrito,
            Fecha: this.Fecha = new Date().toLocaleDateString('en-GB')
          }
          this.restService.postConversacion(body);
          console.log(body);
          this.events.publish('reload');
          this.navCtrl.pop();
        });
      });
    });
  }

}

