import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
//import { EscribirPedidosPage } from '../escribir-pedidos/escribir-pedidos';
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the ChatRespuestaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-chat-respuesta",
  templateUrl: "chat-respuesta.html"
})
export class ChatRespuestaPage {
  idUsuario;
  idPedido;
  conversacion: any;
  chat;
  className: string = "";
  Escrito = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider,
    public events: Events,
    public storage: Storage
  ) {}

  ionViewCanEnter() {
    this.storage.get("idUser").then(idval => {
      this.idUsuario = idval;
      this.idPedido = this.navParams.get("PedidoSeleccionado");
      this.loadChat();
    });
  }

  ionViewDidLoad() {
    this.events.subscribe("reload", () => {
      this.loadChat();
    });
  }

  loadChat() {
    this.restService
      .getChatDePedidos(this.idPedido, this.idUsuario)
      .then(data => {
        let obj = JSON.parse(JSON.stringify(data));
        this.chat = obj[0];
        this.conversacion = data;
      });
  }

  enviarMensaje() {
    if (
      this.Escrito == null ||
      this.Escrito == "" ||
      this.Escrito == undefined
    ) {
      this.events.publish("reload");
      this.cargarMensajeNuevo();
    } else {
      this.storage.get("idUser").then(idLog => {
        let body = {
          idPedido: this.idPedido,
          idUsuario: idLog,
          QuienPregunta: this.chat.idUsuario,
          QuienResponde: idLog,
          Chat: this.Escrito,
          Fecha: new Date().toLocaleString()
        };
        this.restService.postPedidoChat(body);
        console.log(body);
        this.events.publish("reload");
        this.cargarMensajeNuevo();
        this.Escrito = "";
      });
    }
  }

  cargarMensajeNuevo() {
    this.events.subscribe("reload", () => {
      this.loadChat();
    });
  }
}
