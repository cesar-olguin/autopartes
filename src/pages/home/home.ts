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
  public usuarioLog;
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

  ionViewCanEnter() {
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
      this.usuarioLog = idval;
      console.log(this.usuarioLog);
      this.cargarPedidos();
    });
    this.cargarMarcasAutos();
  }

  cargarPedidos() {
    if (this.usuarioLog != null) {
      console.log("Usuario");
      this.restService
        .getPedidosDiferentesUsuarios(this.usuarioLog)
        .then(data => {
          this.pedidos = data;
          console.log(data);
          this.items = data;
        });
    } else {
      console.log("Sin Usuario");
      this.restService.getPedidos().subscribe(
        data => {
          this.items = data;
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  ionViewDidLoad() {}

  itemTapped(artId) {
    this.navCtrl.push(VentaPage, {
      art: artId.idArticulo
    });
  }

  cargarMarcasAutos() {
    this.restService.getMarcas().subscribe(
      data => {
        this.marcas = data["records"];
      },
      error => {
        console.log(error);
      }
    );
  }

  marcaSeleccionada(idMarca, Marca) {
    this.marcaId = idMarca;

    this.restService.getModelo(idMarca).then(data => {
      this.modelos = data;
    });
    return (this.marcaName = Marca);
  }

  modeloSelccionado(idMarca, Modelo) {
    this.modeloId = idMarca;
    return (this.modeloName = Modelo);
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

  buscarModeloMarca() {
    console.log(this.marcaName);
    console.log(this.modeloName);
    if (this.marcaName != undefined) {
      this.pedidos = [];
      this.items = [];
      if (this.modeloName != undefined) {
        this.pedidos = [];
        this.items = [];
        this.restService
          .getBuscarPedidoMarcaModelo(
            this.marcaName,
            this.modeloName,
            this.usuarioLog
          )
          .then(data => {
            this.pedidos = [];
            this.items = [];
            this.pedidos = data;
            console.log(data);
            this.items = data;
          });
      } else {
        this.pedidos = [];
        this.items = [];
        this.restService
          .getBuscarPedidoMarca(this.marcaName, this.usuarioLog)
          .then(data => {
            this.pedidos = [];
            this.items = [];
            this.pedidos = data;
            console.log(data);
            this.items = data;
          });
      }
    }
  }

  mostrarTodos() {
    this.pedidos = [];
    this.items = [];
    this.cargarPedidos();
  }
}
