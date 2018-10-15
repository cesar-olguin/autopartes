import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the HacerVentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hacer-venta',
  templateUrl: 'hacer-venta.html',
})
export class HacerVentaPage {

  image: string = null;
  date: string;
  Titulo: string;
  Descripcion: string;
  Precio: string;
  Fecha_alta: string;
  Foto_Principal: string;
  foto;
  Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: UserServiceProvider, private camera: Camera, private storage: Storage, public events: Events) {
  }

  getPicture() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture(options)
      .then(imageData => {
        this.image = `data:image/jpeg;base64,${imageData}`;
        this.foto = this.image;
      })
      .catch(error => {
        console.error(error);
      });
  }

  addArticle() {
    this.storage.get('idUser').then((val) => {
      this.Usuario = val;
      if (this.foto == null) {
        this.foto = '../../assets/imgs/sin-foto.png'
      }
  
      let body = {
        Titulo: this.Titulo,
        Descripcion: this.Descripcion,
        Precio: this.Precio,
        idUsuario: this.Usuario,
        Cantidad: "1",
        Ubicacion: "Manzanillo,Colima,Mexico",
        Fecha_alta: this.date = new Date().toLocaleDateString('en-GB'),
        Fecha_modificacion: this.date = new Date().toLocaleDateString('en-GB'),
        Foto_Principal: this.foto,
      }
  
      console.log(JSON.stringify(body));
      console.log(this.foto);
      this.restService.postArticulo(body).then((result) => {
        console.log(result);
      }, (err) => {
        console.log(err);
      });
      this.events.publish('reload');
      this.navCtrl.pop();
    });
  }

}
