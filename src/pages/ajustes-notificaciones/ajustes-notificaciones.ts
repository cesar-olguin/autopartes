import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { Storage } from "@ionic/storage";

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
  notificacionEditar: any;
  notificacionesUsuario: any;
  Check: any;

  partes = [
    { Parte: 'Mecanica', Titulo:'Mecanica', Checked:'false' },
    { Parte: 'MecanicaOferta', Titulo: 'Oferta de Mecanica', Checked: 'false' },
    { Parte: 'Electronica', Titulo: 'Electronica', Checked: 'false' },
    { Parte: 'ElectronicaOferta', Titulo: 'Oferta de Electronica', Checked: 'false' },
    { Parte: 'Suspension', Titulo: 'Suspension', Checked: 'false' },
    { Parte: 'SuspensionOferta', Titulo: 'Oferta de Suspension', Checked: 'false' },
    { Parte: 'Interiores', Titulo: 'Interiores', Checked: 'false' },
    { Parte: 'InterioresOferta', Titulo: 'Oferta de Interiores', Checked: 'false' }
  ]

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
      });
      this.restService.getNotificacionesdelUsuario(idUsuario).then(resultado => {
        console.log(resultado);
        this.notificacionesUsuario = resultado;

        // let obj = JSON.parse(JSON.stringify(resultado));
        // for (let index = 0; index < obj.length; index++) {
        //   this.notificacionesUsuario = obj[index];

        //   if (this.notificacionesUsuario.Checked == "1") {
        //     this.Check = true;
        //   } else {
        //     this.Check = false;
        //   }
        //   console.log(this.Check);
        // }
      });
        // let obj = JSON.parse(JSON.stringify(this.marcas));
        // for (let index = 0; index < obj.length; index++) {
        //   this.restService.getModelo(obj[index].idMarca).then(model => {
        //     this.modelos = model;
        //   });
        // }
   
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
    this.restService.getModelo(idMarca).then(data => {
      this.marcas[i].open = !this.marcas[i].open;
      this.modelos = data;
    });
  }

  seleccionarModelo(i) {
    this.modelos[i].open = !this.modelos[i].open;
  }

  guardarNotificaciones(valorToggle, Oferta, idModelo, idMarca, Modelo, Marca, Check) {
    console.log(valorToggle.checked);
    console.log(Oferta);

    this.storage.get("idUser").then(idUsuario => {
      this.restService
        .getNotificacionesUsuario(idUsuario, idMarca, idModelo, Check)
        .then(datos => {
          console.log(datos);
    
          let obj = JSON.parse(JSON.stringify(datos));
          this.notificacionEditar = obj[0];

          if (JSON.stringify(datos) == "[]") {
            let body = {
              idUsuario: idUsuario,
              idMarca: idMarca,
              Marca: Marca,
              idModelo: idModelo,
              Modelo: Modelo,
              Oferta: Oferta,
              Checked: valorToggle.checked
            };
            this.restService.postNotificacionesMarcas(body);
          } else {
            let body = {
              Checked: valorToggle.checked
            };
            this.restService
              .putNotificaciones(
                this.notificacionEditar.idNotificacion,
                body
              )
              .then(resultado => {
                console.log(resultado);
              });
          }
        });
    });
  }
}
