import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { EscribirPedidosPage } from "../escribir-pedidos/escribir-pedidos";

/**
 * Generated class for the ChatPreguntaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-chat-pregunta",
  templateUrl: "chat-pregunta.html"
})
export class ChatPreguntaPage {
  idUsuario;
  idArticulo;
  conversacion: any;
  User;
  className: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider,
    public events: Events
  ) {
    this.idUsuario = navParams.get("QuienResponde");
    this.idArticulo = navParams.get("ChatSeleccionado");
  }

  ionViewDidLoad() {
    this.events.subscribe("reload", () => {
      this.loadChat();
    });
  }

  ionViewCanLoad() {
    this.loadChat();
  }

  ionViewWillEnter() {
    this.loadChat();
  }

  loadChat() {
    this.restService
      .getChatDePedidos(this.idArticulo, this.idUsuario)
      .then(data => {
        let obj = JSON.parse(JSON.stringify(data));
        this.User = obj[0];
        this.conversacion = data;
      });
  }

  mensaje() {
    this.navCtrl.push(EscribirPedidosPage, {
      QuienPide: this.User.QuienPregunta,
      QuienTiene: this.User.QuienResponde,
      Pedido: this.User.idPedido,
      idUsuario: this.User.idUsuario
    });
  }
}
