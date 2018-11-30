import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the ConversacionClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-conversacion-cliente",
  templateUrl: "conversacion-cliente.html"
})
export class ConversacionClientePage {
  Cliente;
  idArticulo;
  conversacion: any;
  User;
  className: string = "";
  Fecha;
  Escrito;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider,
    public storage: Storage,
    public events: Events
  ) {
    this.Cliente = navParams.get("idCli");
    this.idArticulo = navParams.get("idArt");
    this.loadChat();
  }

  ionViewCanEnter() {
    this.loadChat();
  }

  ionViewDidLoad() {
    this.loadChat();
  }

  ionViewWillEnter(){
    this.events.subscribe("reload", () => {
      this.loadChat();
    });
  }

  loadChat() {
    this.restService
      .getComentarioUsuarioVendedor(this.idArticulo, this.Cliente)
      .then(data => {
        this.conversacion = data;
        let obj = JSON.parse(JSON.stringify(data));
        this.User = obj[0];
      });
  }

  preguntar() {
    this.storage.get("idUser").then(idLog => {
      let body = {
        idArticulo: this.idArticulo,
        idUsuario: idLog,
        Vendedor: this.User.Vendedor,
        Cliente: idLog,
        Conversacion: this.Escrito,
        Fecha: this.Fecha = new Date().toLocaleDateString("en-GB")
      };
      this.restService.postConversacion(body);
      console.log(body);
      this.events.publish("reload");
      this.cargarMensajeNuevo();
      this.Escrito = "";
    });

    // this.navCtrl.push(EscribirPage, {
    //   idCli: this.User.Cliente,
    //   idVen: this.User.Vendedor
    // });
  }

  cargarMensajeNuevo() {
    this.events.subscribe("reload", () => {
      this.loadChat();
    });
  }
}
