import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { ChatRespuestaPage } from "../chat-respuesta/chat-respuesta";

/**
 * Generated class for the PedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-pedido",
  templateUrl: "pedido.html"
})
export class PedidoPage {
  idPedido;
  PedidoDatos;
  chat;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider
  ) {
    this.idPedido = navParams.get("idPed");
  }

  ionViewDidLoad() {
    this.loadPedido();
  }

  loadPedido() {
    this.restService.getPedidoById(this.idPedido).then(data => {
      this.PedidoDatos = data;
      let obj = JSON.parse(JSON.stringify(data));
      this.chat = obj[0];
      console.log(data);
    });
  }
  hacerPregunta() {
    this.navCtrl.push(ChatRespuestaPage,{
      PedidoSeleccionado: this.chat.idPedido,
    });
  }
}
