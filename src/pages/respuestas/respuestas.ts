import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { ConversacionVendedorPage } from '../conversacion-vendedor/conversacion-vendedor';
import { EscribirRespuestaPage } from '../escribir-respuesta/escribir-respuesta';

/**
 * Generated class for the RespuestasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-respuestas',
  templateUrl: 'respuestas.html',
})
export class RespuestasPage {

  idSelected: any[] = [];
  idArticulo;
  comentarios: any;
  Correo;
  Password;

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
    this.restService.getComentarioUsuario(this.idArticulo).then(data => {
      this.comentarios = data;
    });
  }

  hacerPregunta(){
    this.storage.get('user').then((uval) => {
      this.storage.get('pass').then((pval) => {
        this.Correo = uval;
        this.Password = pval;
        if(uval == null && pval == null){

        }
        else if (uval != null && pval != null){
          this.navCtrl.push(EscribirRespuestaPage);
        }
      });
    });
  }

  verConversacion(preg){
    this.storage.get('user').then((uval) => {
      this.storage.get('pass').then((pval) => {
        this.Correo = uval;
        this.Password = pval;
        if(uval == null && pval == null){

        }
        else if (uval != null && pval != null){
          this.navCtrl.push(ConversacionVendedorPage, {
            idUsr: preg.idUsuario,
            idArt: preg.idArticulo
          });
        }
      });
    });
  }

}

