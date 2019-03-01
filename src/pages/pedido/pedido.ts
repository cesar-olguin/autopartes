import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { ChatRespuestaPage } from "../chat-respuesta/chat-respuesta";
import { Storage } from "@ionic/storage";
import { PushOptions, PushObject, Push } from "@ionic-native/push";
import { LocalNotifications } from "@ionic-native/local-notifications";

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
  Fecha;
  Escrito: string = "";
  comparar;
  public usuarioLogeado;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider,
    public storage: Storage,
    public push: Push,
    public localNotifications: LocalNotifications
  ) {
    this.idPedido = navParams.get("idPed");
  }

  ionViewCanEnter() {
    this.storage.get("idUser").then(idLog => {
      this.usuarioLogeado = idLog;
    });
    this.loadPedido();
  }

  ionViewDidLoad() {}

  loadPedido() {
    this.restService.getPedidoById(this.idPedido).then(data => {
      this.PedidoDatos = data;
      let obj = JSON.parse(JSON.stringify(data));
      this.chat = obj[0];
      console.log(data);
    });
  }

  escribir() {

    const options: PushOptions = {
      android: {
        senderID: "398680118616"
      },
      ios: {
        alert: "true",
        badge: "true",
        sound: "true"
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on("notification").subscribe((notification: any) => {
      console.log("Notificaciones Consola -> ", notification);
      this.localNotifications.schedule({
        // id: 1,
        // text: "Notificacion Simple",
        data: { secret: pushObject },
        icon: "res://assets/icon/favicon.icon"
      });
    });

    let body = {
      idPedido: this.idPedido,
      idUsuario: this.usuarioLogeado,
      QuienPregunta: this.chat.idUsuario,
      QuienResponde: this.usuarioLogeado,
      Chat: this.Escrito,
      Fecha: new Date().toLocaleString()
    };
    console.log(body);
    
      this.restService.tokenUsuario(this.chat.idUsuario).then(data => {
        let json = JSON.parse(JSON.stringify(data));
        let device = json[0];
        let mensaje = {
          token: device.token,
          mensaje: body.Chat,
          usuario: "Te respondieron en " + this.chat.Titulo
        };
        this.restService.postPedidoChat(body);
        this.restService.enviarNotificacionMensaje(mensaje);
      });
  }

  hacerPregunta() {
    this.storage.get("idUser").then(idLog => {
      this.restService.getChatDePedidos(this.idPedido, idLog).then(data => {
        if (JSON.stringify(data) == "[]") {
          if (this.Escrito != "") {
            this.escribir();
            this.Escrito = "";
            this.pasarAlChat();
          }
        } else {
          if (this.Escrito != "") {
            this.escribir();
            this.Escrito = "";
            this.pasarAlChat();
          } else {
            this.pasarAlChat();
          }
        }
        console.log(data);
      });
    });
  }

  pasarAlChat() {
    this.navCtrl.push(ChatRespuestaPage, {
      PedidoSeleccionado: this.chat.idPedido
    });
  }
}
