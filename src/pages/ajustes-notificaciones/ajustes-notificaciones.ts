import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the AjustesNotificacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajustes-notificaciones',
  templateUrl: 'ajustes-notificaciones.html',
})
export class AjustesNotificacionesPage {
  marcas: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: UserServiceProvider) {
  }

  ionViewCanEnter() {
    this.cargarMarcasAutos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjustesPage');
  }

  cargarMarcasAutos() {
    this.restService.getMarcas().subscribe(
      data => {
        this.marcas = data["records"];
      },
      error => {
        console.log(error);
      }
    );
  }

}