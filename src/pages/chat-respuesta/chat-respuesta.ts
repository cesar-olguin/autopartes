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
  fotoUsuario;
  fotoResponde;

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
    this.storage.get("foto").then(foto => {
      this.fotoUsuario = foto;
    });
  }

  ionViewDidLoad() {
    this.storage.get("idUser").then(idval => {
      this.usuarioLogeado = idval;
      this.loadChat();
    });
  }

  loadChat() {
    this.restService
      .getChatDePedidos(this.idPedido, this.usuarioLogeado)
      .then(data => {
        let obj = JSON.parse(JSON.stringify(data));
        this.chat = obj[0];
        this.conversacion = data;
        console.log(data);

        this.restService.imagenUsuario(this.chat.QuienPregunta).then(data => {
          let img = JSON.parse(JSON.stringify(data));
          let perfil = img[0];
          this.fotoResponde = perfil.ImagenPerfil;
        });
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
      this.restService.postPedidoChat(body).then(result => {
        console.log(result);
        this.recargar();
        this.events.publish("reload");
        this.cargarMensajeNuevo();
        this.restService
          .getChatDePedidos(this.idPedido, this.usuarioLogeado)
          .then(data => {
            this.conversacion = data;
          });
        this.restService.tokenUsuario(this.chat.QuienPregunta).then(data => {
          let json = JSON.parse(JSON.stringify(data));
          let device = json[0];
          let mensaje = {
            token: device.token,
            mensaje: body.Chat,
            usuario: "Te respondieron en " + this.chat.Titulo
          };
          this.restService.enviarNotificacionMensaje(mensaje);
        });
      });
      console.log(body);
      this.Escrito = "";
    }
    this.recargar();
    this.events.publish("reload");
    this.cargarMensajeNuevo();
  }

  cargarMensajeNuevo() {
    this.events.subscribe("reload", () => {
      this.recargar();
    });
  }

  recargar() {
    this.restService
      .getChatDePedidos(this.idPedido, this.usuarioLogeado)
      .then(data => {
        this.conversacion = data;
      });
  }
}
