import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the PedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {

  idPedido;
  PedidoDatos;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: UserServiceProvider) {
    this.idPedido = navParams.get('idPed');
  }

  ionViewDidLoad() {
    this.loadPedido();
  }

  loadPedido(){
    this.restService.getPedidoById(this.idPedido).then(data => {
      this.PedidoDatos = data;
      console.log(JSON.stringify(data));
    })
  }

}
