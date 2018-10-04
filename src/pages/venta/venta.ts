import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { PreguntaPage } from '../pregunta/pregunta';

/**
 * Generated class for the VentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-venta',
  templateUrl: 'venta.html',
})
export class VentaPage {

  articuloId: any;
  idSelected: any[] = [];
  comentarios: any;
  idArticulo;
  idUsuario;
  Comentario;
  IdUser;

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
    this.navCtrl.push(PreguntaPage);
  }

  loadArt(){
    this.restService.getArticuloById(this.idArticulo).then(data => {
      this.articuloId = data;
    });
  }

  loadChat(){
    this.restService.getComentarios(this.idArticulo).then(data => {
      this.comentarios = data;
    })
  }

}
