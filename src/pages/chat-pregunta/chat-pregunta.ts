import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { Storage } from "@ionic/storage";

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
  Escrito: string = "";
  idPedido;
  usuarioLogeado;
  Titulo: any;
  fotoUsuario;
  fotoResponde;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider,
    public events: Events,
    public storage: Storage
  ) {
    this.idUsuario = navParams.get("QuienResponde");
    this.idPedido = navParams.get("ChatSeleccionado");
    this.Titulo = navParams.get("TituloPedido");
  }

  ionViewCanEnter() {
    this.storage.get("idUser").then(idval => {
      this.usuarioLogeado = idval;
      console.log(idval);
      this.loadChat();
    });
    this.storage.get("foto").then(foto => {
      this.fotoUsuario = foto;
    });
    this.restService.imagenUsuario(this.idUsuario).then(data => {
      let img = JSON.parse(JSON.stringify(data));
      let perfil = img[0];
      this.fotoResponde = perfil.ImagenPerfil;
    });
  }

  ionViewDidLoad() {
    // this.storage.get("idUser").then(idval => {
    //   this.usuarioLogeado = idval;
    //   this.loadChat();
    // });
  }

  loadChat() {
    console.log(this.idArticulo);
    this.restService
      .getChatDePedidos(this.idPedido, this.idUsuario)
      .then(data => {
        let obj = JSON.parse(JSON.stringify(data));
        this.User = obj[0];
        this.conversacion = data;
        console.log(data);
      });
  }

  mensaje() {
    console.log(this.idPedido);
    if (this.Escrito == "") {
    } else {
      let body = {
        idPedido: this.idPedido,
        idUsuario: this.usuarioLogeado,
        QuienPregunta: this.usuarioLogeado,
        QuienResponde: this.User.QuienResponde,
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
      });
      this.restService.tokenUsuario(this.User.QuienResponde).then(data => {
        let json = JSON.parse(JSON.stringify(data));
        let device = json[0];
        let mensaje = {
          token: device.token,
          mensaje: body.Chat,
          usuario: "Te respondieron en " + this.Titulo 
        };
        this.restService.enviarNotificacionMensaje(mensaje);
      });
      console.log(body);
      this.Escrito = "";
    }
    this.recargar();
    this.events.publish("reload");
    this.cargarMensajeNuevo();
  }
  
  recargar() {
    this.restService
      .getChatDePedidos(this.idPedido, this.usuarioLogeado)
      .then(data => {
        this.conversacion = data;
      });
  }
  
  cargarMensajeNuevo() {
    this.events.subscribe("reload", () => {
      this.recargar();
    });
  }
}
