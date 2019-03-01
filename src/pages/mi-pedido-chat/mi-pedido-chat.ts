import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { ChatPreguntaPage } from "../chat-pregunta/chat-pregunta";

/**
 * Generated class for the MiPedidoChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-mi-pedido-chat",
  templateUrl: "mi-pedido-chat.html"
})
export class MiPedidoChatPage {
  idPedido;
  comentarios: any;
  titulo: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider
  ) {
    this.idPedido = navParams.get("mensajesPedido");
    this.titulo = navParams.get("tituloPedido");
    console.log(this.idPedido);
  }

  chatsPedido() {
    this.restService.getPedidosChats(this.idPedido).then(data => {
      this.comentarios = data;
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MiPedidoChatPage");
    this.chatsPedido();
  }

  verConversacion(coment){
    this.navCtrl.push(ChatPreguntaPage, {
      ChatSeleccionado: coment.idPedido,
      QuienResponde: coment.QuienResponde,
      TituloPedido: this.titulo
    });
  }
}
