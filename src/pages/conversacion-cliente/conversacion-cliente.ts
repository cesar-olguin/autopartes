import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { EscribirPage } from '../escribir/escribir';

/**
 * Generated class for the ConversacionClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversacion-cliente',
  templateUrl: 'conversacion-cliente.html',
})
export class ConversacionClientePage {

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
  
  }

  loadChat(){
    this.restService.getComentarioUsuarioVendedor(this.idArticulo,this.idUsuario).then(data => {
      
      
      let obj = JSON.parse(JSON.stringify(data));
      this.User = obj[0];

      console.log("ID Vendedor -> " + this.User.Vendedor);
      console.log("Cliente -> "+ this.User.Cliente);
      


      // if(this.User.Cliente == this.idUsuario)
      // {
      //   console.log("Pregunta");
      //   this.className = "pregunta-bubble";
      //   this.conversacion = data;
      // }
      // else if (this.User.idVendedor == this.idUsuario){
      //   console.log("Respuesta");
      //   this.className = "respuesta-bubble";
      //   this.conversacion = data;
      // }
      this.conversacion = data;
     
    });
  }

  preguntar(){
    this.navCtrl.push(EscribirPage,{
      idCli: this.User.Cliente,
      idVen: this.User.Vendedor
    });
  }

}
