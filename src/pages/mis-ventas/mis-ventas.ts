import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MiVentaPage } from '../mi-venta/mi-venta';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { HacerVentaPage } from '../hacer-venta/hacer-venta';

/**
 * Generated class for the MisVentasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-ventas',
  templateUrl: 'mis-ventas.html',
})
export class MisVentasPage {

  selectedItem: any;
  articulos: any;
  Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public restService: UserServiceProvider, public loadingCtrl: LoadingController) {
    window.location.reload;
    this.load();
  }

  ionViewDidLoad() {
    window.location.reload;
    this.load();
  }


  // ionViewCanEnter() {
  //   window.location.reload;
  //   this.load();
  // }

  // ionViewWillEnter() {
  //   window.location.reload;
  //   this.load();
  // }

  load() {
    let loader = this.loadingCtrl.create({
      //spinner: 'hide',
      //content: `<img src="assets/imgs/llanta1.png" />`,
    });
    loader.present().then(() => {
      this.storage.get("idUser").then(val => {
        this.Usuario = val;
        this.restService.getArticuloByUser(this.Usuario).then(data => {
          this.articulos = data;
          loader.dismiss();
        });
      });
    });
  }

  itemTapped(artId) {
    this.navCtrl.push(MiVentaPage, {
      art: artId.idArticulo,
    });
  }

  addArticle(/*marcaId,modeloId*/) {
    this.navCtrl.push(HacerVentaPage, {});
  }
}
