import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { MiPedidoChatPage } from "../mi-pedido-chat/mi-pedido-chat";
import { ModificarPedidoPage } from "../modificar-pedido/modificar-pedido";

/**
 * Generated class for the MiPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-mi-pedido",
  templateUrl: "mi-pedido.html"
})
export class MiPedidoPage {
  idPedido;
  PedidoDatos;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider
  ) {
    this.idPedido = navParams.get("idPed");
  }

  ionViewCanEnter() {
    this.loadPedido();
  }

  ionViewDidLoad() {}

  loadPedido() {
    this.restService.getPedidoById(this.idPedido).then(data => {
      this.PedidoDatos = data;
      console.log(JSON.stringify(data));
    });
  }
  verChatsPedido(idPedido, titulo) {
    this.navCtrl.push(MiPedidoChatPage, { mensajesPedido: idPedido,
    tituloPedido: titulo });
  }

  modificarPedido(idPedido,idUsuario) {
    this.navCtrl.push(ModificarPedidoPage, {
      PedidoEditar: idPedido,
      PedidoModificadoUsuario: idUsuario
    });
  }
}
