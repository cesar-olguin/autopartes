import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { Storage } from "@ionic/storage";
import { NotificacionesModelosPage } from "../notificaciones-modelos/notificaciones-modelos";
/**
 * Generated class for the AjustesNotificacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-ajustes-notificaciones",
  templateUrl: "ajustes-notificaciones.html"
})
export class AjustesNotificacionesPage {
  marcas: any;
  arrayNotificacionesMarcas: any;
  modelos: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider,
    public storage: Storage
  ) {}

  ionViewCanEnter() {
    this.cargarMarcasAutos();
  }

  ionViewDidLoad() {}

  cargarMarcasAutos() {
    this.storage.get("idUser").then(idUsuario => {
      this.restService.getMarcas().subscribe(data => {
        this.marcas = data["records"];
        let obj = JSON.parse(JSON.stringify(this.marcas));
        for (let index = 0; index < obj.length; index++) {
          //console.log(obj[index].idMarca);
          this.restService.getModelo(obj[index].idMarca).then(model => {
            this.modelos = model;
          });
        }
      });
      // this.restService.getNotificacionesdelUsuario(idUsuario).then(datos => {
      //   this.marcas = datos;
      //   if(JSON.stringify(datos)=="[]"){
      //     this.restService.getMarcas().subscribe(
      //       data => {
      //         this.marcas = data["records"];
      //         let obj = JSON.parse(JSON.stringify(this.marcas));
      //         for (let index = 0; index < obj.length; index++) {
      //           let body = {
      //             idUsuario: idUsuario,
      //             idMarca: obj[index].idMarca,
      //             Marca: obj[index].Marca,
      //             Checked: "false"
      //           };
      //           this.restService.postNotificacionesMarcas(body);
      //         }
      //       },
      //       error => {
      //         console.log(error);
      //       }
      //     );
      //   }
      // });
    });
  }

  seleccionarMarca(i,idMarca) {
    // this.navCtrl.push(NotificacionesModelosPage, {
    //   MarcaSeleccionada: idModelo
    // });
    // this.restService.getModelo(idMarca).then(data => {
    //   this.modelos = data;
    // });
    this.marcas[i].open = !this.marcas[i].open;
  }

  seleccionarModelo(i) {
    this.modelos[i].open = !this.modelos[i].open;
  }

  guardarNotificaciones(valorToggle, marcaSeleccionada) {
    console.log(valorToggle);
    this.storage.get("idUser").then(idUsuario => {
      this.restService
        .getNotificacionesUsuario(idUsuario, marcaSeleccionada.idMarca)
        .then(datos => {
          console.log(datos);

          if (valorToggle == true) {
            let body = {
              idUsuario: idUsuario,
              idMarca: marcaSeleccionada.idMarca,
              Marca: marcaSeleccionada.Marca,
              Checked: "true"
            };
            this.restService
              .putNotificaciones(marcaSeleccionada.idNotificacion, body)
              .then(resultado => {
                console.log(resultado);
              });
          }

          if (valorToggle == false) {
            let body = {
              idUsuario: idUsuario,
              idMarca: marcaSeleccionada.idMarca,
              Marca: marcaSeleccionada.Marca,
              Checked: "false"
            };
            this.restService
              .putNotificaciones(marcaSeleccionada.idNotificacion, body)
              .then(resultado => {
                console.log(resultado);
              });
          }
        });

      //console.log(body);
    });
  }
}
