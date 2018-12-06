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
  public usuarioLogeado;
  idPedido;
  conversacion: any;
  chat;
  className: string = "";
  Escrito = "";
  MensajeNuevo;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider,
    public events: Events,
    public storage: Storage
  ) {
    this.idPedido = this.navParams.get("PedidoSeleccionado");
  }

  ionViewCanEnter() {
    this.storage.get("idUser").then(idval => {
      this.usuarioLogeado = idval;
      this.loadChat();
    });
  }

  ionViewDidLoad() {
    // this.events.subscribe("reload", () => {
    //   this.loadChat();
    // });
  }

  loadChat() {
    this.restService
      .getChatDePedidos(this.idPedido, this.usuarioLogeado)
      .then(data => {
        let obj = JSON.parse(JSON.stringify(data));
        this.chat = obj[0];
        this.conversacion = data;
        console.log(data);
      });
  }

  enviarMensaje() {
    if (this.Escrito == "") {
    } else {
      let body = {
        idPedido: this.idPedido,
        idUsuario: this.usuarioLogeado,
        QuienPregunta: this.chat.QuienPregunta,
        QuienResponde: this.usuarioLogeado,
        Chat: this.Escrito,
        Fecha: new Date().toLocaleString()
      };
      this.restService.postPedidoChat(body);
      console.log(body);
      this.Escrito = "";
    }
    this.recargar();
    //this.events.publish("reload");
    this.cargarMensajeNuevo();
  }

  cargarMensajeNuevo() {
    // this.events.subscribe("reload", () => {
    //   this.recargar();
    // });
  }

  recargar() {
    this.restService
      .getChatDePedidos(this.idPedido, this.usuarioLogeado)
      .then(data => {
        this.conversacion = data;
      });
  }
}
