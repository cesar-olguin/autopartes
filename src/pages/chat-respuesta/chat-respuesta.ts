import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { EscribirPedidosPage } from '../escribir-pedidos/escribir-pedidos';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChatRespuestaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-respuesta',
  templateUrl: 'chat-respuesta.html',
})
export class ChatRespuestaPage {

  idUsuario;
  idArticulo;
  conversacion: any;
  User;
  className: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider,
    public events: Events,
    public storage: Storage
  ) {
    this.storage.get('idUser').then((idval) => {
      this.idUsuario = idval;
      this.idArticulo = navParams.get("PedidoSeleccionado");
      console.log(this.idUsuario);
      console.log(this.idArticulo);
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
      .getChatDePedidos(this.idArticulo, this.idUsuario)
      .then(data => {
        let obj = JSON.parse(JSON.stringify(data));
        this.User = obj[0];
        this.conversacion = data;
      });
  }

  mensaje() {
    this.navCtrl.push(EscribirPedidosPage, {
      idCli: this.User.QuienPregunta,
      idVen: this.User.QuienResponde
    });
  }
}
