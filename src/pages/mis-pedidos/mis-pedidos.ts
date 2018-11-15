import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  Events,
  LoadingController
} from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { HacerPedidoPage } from "../hacer-pedido/hacer-pedido";
import { MiPedidoPage } from "../mi-pedido/mi-pedido";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the MisPedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-mis-pedidos",
  templateUrl: "mis-pedidos.html"
})
export class MisPedidosPage {
  selectedItem: any;
  pedidos;
  items;
  displayedImages;

  constructor(
    public navCtrl: NavController,
    public restService: UserServiceProvider,
    public events: Events,
    public loadingCtrl: LoadingController,
    public storage: Storage
  ) {}

  ionViewDidLoad() {
    this.load();
  }

  ionViewCanEnter() {
    this.load();
  }

  // ionViewWillEnter() {
  //   this.load();
  // }

  pushPage() {
    this.navCtrl.push(HacerPedidoPage);
  }

  load() {
    this.storage.get("idUser").then(idval => {
      console.log(idval);
      
      this.restService.getPedidosUsuario(idval).then(data => {
        this.pedidos = data;
        this.items = data;
      });
    });
  }

  pedidoN(item) {
    this.navCtrl.push(MiPedidoPage, {
      idPed: item.idPedido
    });
  }
}
