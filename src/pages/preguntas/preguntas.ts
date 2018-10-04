import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ResponderPage } from '../responder/responder';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PreguntasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preguntas',
  templateUrl: 'preguntas.html',
})
export class PreguntasPage {

  idSelected: any[] = [];
  idArticulo;
  comentarios: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: UserServiceProvider, public storage: Storage) {
    this.storage.get('idArt').then((val) => {
      this.idArticulo = val;
      console.log(this.idArticulo);
      this.loadChat();
    });
  
  }

  ionViewDidLoad() {
    
  }

  loadChat(){
    this.restService.getComentarios(this.idArticulo).then(data => {
      this.comentarios = data;
      console.log(JSON.stringify(data));
    });
  }

  hacerPregunta(){
    this.navCtrl.push(ResponderPage);
  }

}
