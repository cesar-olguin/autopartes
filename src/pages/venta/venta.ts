import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { PreguntasPage } from '../preguntas/preguntas';

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
  vendedor;
  fotosArt;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public restService: UserServiceProvider) {
    this.idSelected = navParams.get("art");
    this.idArticulo = this.idSelected;
    this.storage.set('idArt', this.idArticulo);
    this.loadArt();
    this.loadChat();
    this.cargarFotos();
  }

  ionViewDidLoad() {
    this.loadChat();
  }

  hacerPregunta(){
    this.navCtrl.push(PreguntasPage);
  }

  loadArt(){
    this.storage.remove('vend');
    this.restService.getArticuloById(this.idArticulo).then(data => {
      this.articuloId = data;
      let obj = JSON.parse(JSON.stringify(data));
      this.vendedor = obj[0];
      console.log("ID vendedor -> ",this.vendedor.idUsuario);
      this.storage.set('miID', this.vendedor.idUsuario); 
    });
  }

  loadChat(){
    this.restService.getComentarios(this.idArticulo).then(data => {
      this.comentarios = data;
    })
  }

  
  cargarFotos(){
    this.restService.getFotosIdArticulo(this.idArticulo).then(data =>{
      this.fotosArt = data;
    });
  }

}
