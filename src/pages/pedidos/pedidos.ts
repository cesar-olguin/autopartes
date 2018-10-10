import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HacerPedidoPage } from '../hacer-pedido/hacer-pedido';

/**
 * Generated class for the PedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  selectedItem: any;
  pedidos;
  items;
  displayedImages;

  constructor(public navCtrl: NavController, public restService: UserServiceProvider, public events: Events) {
  }

  ionViewDidLoad() {

    if (window.localStorage.getItem("user") != null && window.localStorage.getItem("pass") != null) {
      //Hay una sesión iniciada
      //Dirige a la pantalla principal ya logueada.
      this.events.publish('user:loggedin');
    } else {
      //Manda la pantalla de inicio de sesión o autentificación
      this.events.publish('user:loggedout');
    }
    this.load();
  }
  
  ionViewCanEnter() {
    window.location.reload;
    this.load();
  }

  ionViewWillEnter() {
    window.location.reload;
    this.load();
  }

  pushPage() {
    this.navCtrl.push(HacerPedidoPage);
  }

  load() {
    this.restService.getPedidos().subscribe(
      data => {
        // Success
        this.pedidos = data;
        //this.items = data;
        // console.log(data);
        this.items = data;
      },
      error => {
        console.error(error);
      }
    );
  }
}