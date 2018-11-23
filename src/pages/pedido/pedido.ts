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
  Escrito;
  comparar;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider,
    public storage: Storage
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

  escribir() {
    this.storage.get("idUser").then(idLog => {
      let body = {
        idPedido: this.idPedido,
        idUsuario: idLog,
        QuienPregunta: this.chat.idUsuario,
        QuienResponde: idLog,
        Chat: this.Escrito,
        Fecha: this.Fecha = new Date().toLocaleDateString("en-GB")
      };
      this.restService.postPedidoChat(body);
      console.log(body);
      this.navCtrl.push(ChatRespuestaPage, {
        PedidoSeleccionado: this.chat.idPedido
      });
    });
  }

  hacerPregunta() {
    this.storage.get("idUser").then(idLog => {
      this.restService.getChatDePedidos(this.idPedido, idLog).then(data => {
        console.log(JSON.stringify(data));
        this.comparar = JSON.stringify(data);
        if (this.comparar == "[]") {
          this.escribir();
        } else {
          this.navCtrl.push(ChatRespuestaPage, {
            PedidoSeleccionado: this.chat.idPedido
          });
        }
      });
    });
  }
}
