import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ModificarVentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificar-venta',
  templateUrl: 'modificar-venta.html',
})
export class ModificarVentaPage {

  idSelected: any[] = [];
  idArticulo;
  articuloId;
  Titulo;
  Descripcion;
  Precio;
  date: string;
  Foto_Principal;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: UserServiceProvider, public storage: Storage) {
    this.idSelected = navParams.get("art");
    this.idArticulo = this.idSelected;
    this.Titulo = this.idArticulo.Titulo;
  }

  ionViewDidLoad() {
    this.loadArt();
  }

  loadArt() {
    this.restService.getArticuloById(this.idArticulo).then(data => {
      this.articuloId = data;
      console.log(this.articuloId);

    });
  }

  modificarArticulo() {

    let body = {
      Titulo: this.Titulo,
      Descripcion: this.Descripcion,
      Precio: this.Precio,
      Ubicacion: "Manzanillo,Colima,Mexico",
      Fecha_modificacion: this.date = new Date().toLocaleDateString('en-GB'),
      Marca: "123",
      Modelo: "123"
    }

    this.restService.putArticulo(this.idSelected,body).then(data => {
      this.articuloId = data;
      console.log(this.articuloId);
    });
  }

}
