import { Component } from '@angular/core';
import { IonicPage, NavController, Events, LoadingController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HacerPedidoPage } from '../hacer-pedido/hacer-pedido';
import { PedidoPage } from '../pedido/pedido';

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

  constructor(public navCtrl: NavController, public restService: UserServiceProvider, public events: Events, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.load();
  }

  ionViewCanEnter() {
    this.load();
  }

  // ionViewWillEnter() {
  //   this.load();
  // }

  pushPage() {
    this.navCtrl.push(HacerPedidoPage);
  }

  load() {
    let loader = this.loadingCtrl.create({
      //spinner: 'hide',
      //content: `<img src="assets/imgs/llanta1.png" />`,
    });
    //loader.present().then(() => {
      this.restService.getPedidos().subscribe(
        data => {
          this.pedidos = data;
          this.items = data;
          loader.dismiss();
        },
        error => {
          console.error(error);
        }
      );
    //});
  }

  pedidoN(item) {
    this.navCtrl.push(PedidoPage, {
      idPed: item.idPedido
    });
  }
}