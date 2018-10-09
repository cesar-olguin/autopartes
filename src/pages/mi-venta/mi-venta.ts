import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ModificarVentaPage } from '../modificar-venta/modificar-venta';
import { RespuestasPage } from '../respuestas/respuestas';

/**
 * Generated class for the MiVentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mi-venta',
  templateUrl: 'mi-venta.html',
})
export class MiVentaPage {

  articuloId: any;
  idSelected: any[] = [];
  comentarios: any;
  idArticulo;
  idUsuario;
  Comentario;
  IdUser;
  MiID;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public restService: UserServiceProvider) {
    this.idSelected = navParams.get("art");
    this.idArticulo = this.idSelected;
    this.storage.set('idArt', this.idArticulo);
    this.loadArt();
    this.loadChat();
  }

  ionViewDidLoad() {
    this.loadChat();
  }

  hacerPregunta(){
    this.navCtrl.push(RespuestasPage);
  }

  loadArt(){
    this.restService.getArticuloById(this.idArticulo).then(data => {
      this.articuloId = data;
      let obj = JSON.parse(JSON.stringify(data));
      this.MiID = obj[0];
      this.storage.set('miID', this.MiID.idUsuario);
    });
  }

  loadChat(){
    this.restService.getComentarioUsuario(this.idArticulo).then(data => {
      this.comentarios = data;
    });
  }

  editArt(artId) {
    this.navCtrl.push(ModificarVentaPage, {
      art: artId.idArticulo
    });
  }

}
