import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { ChatRespuestaPage } from "../chat-respuesta/chat-respuesta";
import { Storage } from "@ionic/storage";

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
  Escrito = "";
  comparar;
  public usuarioLogeado;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider,
    public storage: Storage,
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
    let body = {
      idPedido: this.idPedido,
      idUsuario: this.usuarioLogeado,
      QuienPregunta: this.chat.idUsuario,
      QuienResponde: this.usuarioLogeado,
      Chat: this.Escrito,
      Fecha: new Date().toLocaleString()
    };
    this.restService.postPedidoChat(body);
    console.log(body);
  }

  hacerPregunta() {
    this.storage.get("idUser").then(idLog => {
      this.restService.getChatDePedidos(this.idPedido, idLog).then(data => {
        if (JSON.stringify(data) == "[]") {
         if(this.Escrito != ""){
           this.escribir();
           this.Escrito = "";
           this.pasarAlChat();
         }
        } else {
          if (this.Escrito != "") {
            this.escribir();
            this.Escrito = "";
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
