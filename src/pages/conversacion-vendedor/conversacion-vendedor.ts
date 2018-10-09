import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { EscribirRespuestaPage } from '../escribir-respuesta/escribir-respuesta';
/**
 * Generated class for the ConversacionVendedorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversacion-vendedor',
  templateUrl: 'conversacion-vendedor.html',
})

export class ConversacionVendedorPage {

  idUsuario;
  idArticulo;
  conversacion: any;
  User;
  className: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: UserServiceProvider, public storage: Storage) {
    this.idUsuario = navParams.get("idUsr");
    this.idArticulo = navParams.get("idArt");
    this.loadChat();
  }

  ionViewDidLoad() {
    this.loadChat();
  }

  ionViewCanLoad(){
    this.loadChat();
  } 
  
  ionViewWillEnter(){
    this.loadChat();
  }


 async loadChat(){
    this.restService.getComentarioUsuarioVendedor(this.idArticulo,this.idUsuario).then(data => {
      
      
      let obj = JSON.parse(JSON.stringify(data));
      this.User = obj[0];
      this.conversacion = data;
     
    });
  }

  responder(){
    this.navCtrl.push(EscribirRespuestaPage,{
      idCli: this.User.Cliente,
      idVen: this.User.Vendedor
    });
  }

}
