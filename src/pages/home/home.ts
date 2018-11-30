import { Component } from "@angular/core";
import { NavController, Events, LoadingController } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { Storage } from "@ionic/storage";
import { VentaPage } from "../venta/venta";
import { PedidoPage } from "../pedido/pedido";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  selectedItem: any;
  pedidos;
  items;

  users;

  articulos: any;
  modelos: any;
  marcas: any[] = [];
  selectModelo: any;
  selectMarca: any;
  public marcaId;
  public modeloId;
  public marcaName;
  public modeloName;

  constructor(
    public navCtrl: NavController,
    public restService: UserServiceProvider,
    public events: Events,
    public storage: Storage,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    if (
      window.localStorage.getItem("user") != null &&
      window.localStorage.getItem("pass") != null
    ) {
      //Hay una sesión iniciada
      //Dirige a la pantalla principal ya logueada.
      this.events.publish("user:loggedin");
    } else {
      //Manda la pantalla de inicio de sesión o autentificación
      this.events.publish("user:loggedout");
    }
    //this.load();

    this.storage.get("idUser").then(idval => {
      console.log(idval);
      if (idval != null) {
        console.log("Usuario");

        this.restService.getPedidosDiferentesUsuarios(idval).then(data => {
          this.pedidos = data;
          console.log(data);
          this.items = data;
        });
      } else {
        console.log("Sin Usuario");
        this.restService.getPedidos().subscribe(
          data => {
            // Success
            //this.pedidos = data;
            //this.items = data;
            // console.log(data);
            this.items = data;
          },
          error => {
            console.error(error);
          }
        );
      }
    });

    this.restService.getMarcas().subscribe(
      data => {
        this.marcas = data["records"];
      },
      error => {
        console.log(error);
      }
    );
  }

  itemTapped(artId) {
    this.navCtrl.push(VentaPage, {
      art: artId.idArticulo
    });
  }

  marcaTapped(idMarca, Marca) {
    this.marcaId = idMarca;
    this.marcaName = Marca;
    this.restService.getModelo(idMarca).then(data => {
      this.modelos = data;
    });
  }

  modeloTapped(idMarca, Modelo) {
    this.modeloId = idMarca;
    this.modeloName = Modelo;
  }

  load() {
    this.storage.get("idUser").then(idval => {
      console.log(idval);
      if (idval == null) {
        console.log("BIEN");
      } else {
        console.log("MAL");
      }
    });
  }

  pedidoN(item) {
    this.navCtrl.push(PedidoPage, {
      idPed: item.idPedido
    });
  }
}
