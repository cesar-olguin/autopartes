import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the CamaraVentasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camara-ventas',
  templateUrl: 'camara-ventas.html',
})
export class CamaraVentasPage {

  IDarticuloAgregado;
  imagen;
  foto;
  Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: UserServiceProvider, private camera: Camera, public events: Events) {
    this.IDarticuloAgregado = navParams.get("art");
  }

  getPicture() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      //targetWidth: 600,
      //targetHeight: 600,
      quality: 80,
      sourceType: 1
    }
    this.camera.getPicture(options).then(imageData => {
      this.imagen = `data:image/jpeg;base64,${imageData}`;
    }).catch(error => {
      console.error(error);
    });
  }

  // guardarFoto() {
  //   this.storage.get('idUser').then((val) => {
  //     this.Usuario = val;
  //     if (this.foto == null) {
  //       this.foto = '../../assets/imgs/sin-foto.png'
  //     }
  //     let foto = {
  //       idArticulo: this.IDarticuloAgregado,
  //       idUsuario: this.Usuario,
  //       Foto: this.foto
  //     }
  //     this.restService.postFoto(foto);
  //     this.events.publish('reload');
  //     this.navCtrl.pop();
  //   });
  // }

}
