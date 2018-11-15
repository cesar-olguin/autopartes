import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the EscribirPedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-escribir-pedidos",
  templateUrl: "escribir-pedidos.html"
})
export class EscribirPedidosPage {
  Escrito;
  idArticulo: string;
  idUsuario: string;
  QuienPide: string;
  QuienTiene: string;
  Conversacion: string;
  Fecha: string;
  idCliente;
  idQuienPide;
  idPedido;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public restService: UserServiceProvider,
    public events: Events
  ) {
    this.idUsuario = navParams.get("idUsuario");
    this.QuienTiene = navParams.get("QuienTiene");
    this.QuienPide = navParams.get("QuienPide");
    this.idPedido = navParams.get("Pedido");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EscribirPedidosPage");
  }
  escribir() {
    this.storage.get("idUser").then(idLog => {
      let body = {
        idPedido: this.idPedido,
        idUsuario: idLog,
        QuienPregunta: this.QuienPide,
        QuienResponde: this.QuienTiene,
        Chat: this.Escrito,
        Fecha: this.Fecha = new Date().toLocaleDateString("en-GB")
      };
      this.restService.postPedidoChat(body);
      console.log(body);
      this.events.publish("reload");
      this.navCtrl.pop();
    });
  }
}
