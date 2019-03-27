import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { NotificacionesPartesPage } from '../notificaciones-partes/notificaciones-partes';

/**
 * Generated class for the NotificacionesModelosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-notificaciones-modelos",
  templateUrl: "notificaciones-modelos.html"
})
export class NotificacionesModelosPage {
  modeloId: any;
  modelos: any;
  idMarca = this.navParams.get("MarcaSeleccionada");

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider
  ) {}

  ionViewDidLoad() {}

  ionViewCanEnter() {
    this.modeloSelccionado();
  }

  modeloSelccionado() {
    this.restService.getModelo(this.idMarca).then(data => {
      this.modelos = data;
    });
  }

  seleccionarModelo(i) {
    // this.navCtrl.push(NotificacionesPartesPage, {
    //   ModeloSeleccionado: idModelo
    // });
    this.modelos[i].open = !this.modelos[i].open;
  }



}
