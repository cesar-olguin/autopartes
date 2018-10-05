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

  // postChat() {
  //   this.storage.get('idUser').then((data) => {
  //     this.IdUser = data;
  //     if (this.IdUser == null){
  //       this.IdUser = "0";
  //       console.log('Usuario: ', this.IdUser);
  //     }
      
  //       let body = {
  //         idArticulo: this.idSelected,
  //         idUsuario: this.IdUser,
  //         Comentario: this.Comentario,
  //       }

  //       console.log('Usuario: ', this.IdUser);
  //       console.log(JSON.stringify(body));
  //       this.restService.postComentario(body).then((result) => {
  //         console.log(result);
  //         this.ionViewDidLoad();
  //         window.location.reload;
  //       }, (err) => {
  //         console.log(err);
  //       });
  //   });
  // }

  loadArt(){
    this.restService.getArticuloById(this.idArticulo).then(data => {
      this.articuloId = data;
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
