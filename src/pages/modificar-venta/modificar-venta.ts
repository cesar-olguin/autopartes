import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { CameraOptions, Camera } from '@ionic-native/camera';

/**
 * Generated class for the ModificarVentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificar-venta',
  templateUrl: 'modificar-venta.html',
})
export class ModificarVentaPage {

  idSelected: any[] = [];
  idArticulo;
  articuloId;
  Titulo;
  Descripcion;
  Precio;
  date: string;
  Foto_Principal;
  fotosArt;
  image;
  photos: any[];
  foto;
  arrayFotos;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: UserServiceProvider, public storage: Storage, public events: Events, private camera: Camera) {
    this.idSelected = navParams.get("art");
    this.idArticulo = this.idSelected;
    this.Titulo = this.idArticulo.Titulo;
  }

  ionViewDidLoad() {
    this.loadArt();
    this.cargarFotos();
  }

  loadArt() {
    this.restService.getArticuloById(this.idArticulo).then(data => {
      this.articuloId = data;
      console.log(this.articuloId);

    });
  }

  modificarArticulo() {

    let body = {
      Titulo: this.Titulo,
      Descripcion: this.Descripcion,
      Precio: this.Precio,
      Ubicacion: "Manzanillo,Colima,Mexico",
      Fecha_modificacion: this.date = new Date().toLocaleDateString('en-GB'),
      Marca: "123",
      Modelo: "123"
    }

    this.restService.putArticulo(this.idSelected, body).then(data => {
      this.articuloId = data;


      for (var i = 0; i < this.photos.length; i++) {
        this.foto.slice(0, 5);
        let foto = {
          NumeroFoto: i,
          Foto: this.foto[i]
        }
        let obj = JSON.parse(JSON.stringify(this.fotosArt));
        this.arrayFotos = obj[i];


      }

    });

    this.events.publish('reload');
    this.navCtrl.pop();
  }

  cargarFotos() {
    this.restService.getFotosIdArticulo(this.idArticulo).then(data => {
      this.fotosArt = data;
    });
  }


  abrirGaleria() {


    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      correctOrientation: true,
      sourceType: 2,
      mediaType: 0,
    }
    //this.photos = new Array<string>();
    this.camera.getPicture(options).then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
      this.fotosArt.push(this.image);
      this.foto = this.fotosArt;
    }).catch(error => {
      console.error(error);
    });

  }

  tomarFoto() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 720,
      targetHeight: 1280,
      quality: 100,
      sourceType: 1,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
    }
    //this.photos = new Array<string>();
    this.camera.getPicture(options).then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
      this.photos.push(this.image);
      this.foto = this.photos;
    }).catch(error => {
      console.error(error);
    });
  }

  borrarFoto(foto) {
    for (var i = 0; i < this.photos.length; i++) {
      if (foto == this.photos[i]) {
        this.photos.splice(i, 1); // i = foto a eliminar -------- 1 = cantidad de elementos a borrar desde la posicion de la foto
      }
    }
  }

  eliminarFoto(numeroFoto) {
    // console.log(numeroFoto);
    this.fotosArt.splice(numeroFoto, 1);
    this.restService.deleteFotos(numeroFoto);
  }

}
