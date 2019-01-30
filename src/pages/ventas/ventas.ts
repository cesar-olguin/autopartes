import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { VentaPage } from "../venta/venta";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the VentasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-ventas",
  templateUrl: "ventas.html"
})
export class VentasPage {
  selectedItem: any;
  articulos: any;
  modelos: any;
  marcas: any[] = [];
  selectModelo: any;
  selectMarca: any;
  usuarioLogeado: any;
  public marcaId: any;
  public modeloId: any;
  public NombreMarca: any;
  public NombreModelo: any;
  busqueda: any;
  ArticuloBuscado: string = "";
  ArticulosFiltrados;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController
  ) {}

  ionViewCanEnter() {
    this.storage.get("idUser").then(idval => {
      this.usuarioLogeado = idval;
      console.log(idval);
      this.cargarArticulos();
    });
    this.cargarMarcas();
  }

  ionViewDidLoad() {}

  cargarMarcas() {
    this.restService.getMarcas().subscribe(
      data => {
        this.marcas = data["records"];
      },
      error => {
        console.log(error);
      }
    );
  }

  cargarArticulos() {
    if(this.usuarioLogeado != null) {
      this.restService
        .getArticulosDiferentes(this.usuarioLogeado)
        .then(data => {
          this.articulos = data;
          console.log(this.articulos);
        });
    }
    else {
      console.log("Sin usuario");
      
      this.restService.getArticulos().subscribe(
        data => {
          this.articulos = data;
        },
        error => {
          console.error(error);
        }
      );
    } 
  }

  // filtrar() {
  //   console.log("Todos -> " + JSON.stringify(this.articulos));
  //   let item = JSON.parse(JSON.stringify(this.articulos));
  //   for (var i = 0; i < this.articulos.length; i++) {
  //     this.busqueda = item[i];
  //     console.log(this.busqueda.Titulo.toLowerCase());
  //     console.log(this.ArticuloBuscado.toLocaleLowerCase());
  //     console.log(
  //       this.busqueda.Titulo.toLowerCase().indexOf(
  //         this.ArticuloBuscado.toLowerCase()
  //       ) > -1
  //     );
  //     this.ArticulosFiltrados =
  //       this.busqueda.Titulo.toLowerCase().indexOf(
  //         this.ArticuloBuscado.toLowerCase()
  //       ) > -1;
  //     if (this.ArticulosFiltrados == true) {
  //       //this.articulos = JSON.parse(JSON.stringify(this.busqueda));
  //       console.log("Filtrado-> " + JSON.parse(JSON.stringify(this.busqueda)));
  //       Object.keys(JSON.parse(JSON.stringify(this.busqueda))).forEach(function(key){
  //         this.articulos.push(this.busqueda[key]);
  //       });
  //     }
  //     //console.log(this.articulos);
  //   }
  // }

  filtrar() {
    var item = JSON.parse(this.articulos);
    for (var i = 0; i < item.length; i++) {
      this.articulos = item.Titulo[i];
      this.ArticulosFiltrados = item.Titulo.toLowerCase().indexOf(this.ArticuloBuscado.toLowerCase()) > -1;
      if (this.ArticulosFiltrados == true) {
        this.articulos = item[i];
        console.log(JSON.parse(JSON.stringify(this.busqueda)));
      }
    }
  }

  itemTapped(artId) {
    this.navCtrl.push(VentaPage, {
      art: artId.idArticulo
    });
  }

  marcaSeleccionada(idMarca, Marca) {
    this.marcaId = idMarca;
    this.restService.getModelo(idMarca).then(data => {
      this.modelos = data;
    });
    return (this.NombreMarca = Marca);
  }

  modeloSelccionado(Modelo) {
    return (this.NombreModelo = Modelo);
  }

  // buscarModeloMarca(/*marcaId,modeloId*/) {
  //   this.navCtrl.push(CarcoincidencePage, {
  //     marId: this.marcaId,
  //     marName: this.marcaName,
  //     modId: this.modeloId,
  //     modName: this.modeloName
  //   });
  // }

  buscarModeloMarca() {
    console.log(this.NombreMarca);
    console.log(this.NombreModelo);
    if (this.NombreMarca != undefined) {
      if (this.NombreModelo == undefined) {
        this.articulos = [];
        this.restService
          .getBuscarArticuloMarca(this.NombreMarca, this.usuarioLogeado)
          .then(data => {
            this.articulos = data;
            console.log(data);
          });
      } else {
        this.articulos = [];
        this.restService
          .getBuscarArticuloMarcaModelo(
            this.NombreMarca,
            this.NombreModelo,
            this.usuarioLogeado
          )
          .then(data => {
            this.articulos = data;
            console.log(data);
          });
      }
    }
  }

  mostrarTodos() {
    this.articulos = [];
    this.cargarArticulos();
  }
}
