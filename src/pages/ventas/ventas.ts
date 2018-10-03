import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { VentaPage } from '../venta/venta';

/**
 * Generated class for the VentasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ventas',
  templateUrl: 'ventas.html',
})
export class VentasPage {

  selectedItem: any;
  articulos: any[] = [];
  modelos: any;
  marcas: any[] = [];
  selectModelo: any;
  selectMarca: any;
  public marcaId;
  public modeloId;
  public marcaName;
  public modeloName;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    this.restService.getArticulos()
    .subscribe(
      (data) => { // Success
        this.articulos = data['records'];
      },
      (error) => {
        console.error(error);
      }
    )

  this.restService.getMarcas()
    .subscribe(
      (data) => {
        this.marcas = data['records'];
      },
      (error) => {
        console.log(error);
      }
    )
  }

  itemTapped(artId) {
    this.navCtrl.push(VentaPage, {
      art: artId.idArticulo
    });
  }

  marcaTapped(idMarca,Marca) {
    this.marcaId = idMarca;
    this.marcaName = Marca;
    this.restService.getModelo(idMarca).then(data => {
      this.modelos = data
    });
  }

  modeloTapped(idMarca,Modelo) {
   this.modeloId = idMarca;
   this.modeloName = Modelo;
  }

  // buscarModeloMarca(/*marcaId,modeloId*/) {
  //   this.navCtrl.push(CarcoincidencePage, {
  //     marId: this.marcaId,
  //     marName: this.marcaName,
  //     modId: this.modeloId,
  //     modName: this.modeloName
  //   });
  // }

}
