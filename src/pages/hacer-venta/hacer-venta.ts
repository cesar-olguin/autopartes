import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { CamaraVentasPage } from '../camara-ventas/camara-ventas';
import { ImagePicker } from '@ionic-native/image-picker';

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
  marcas: any[] = [];
  marcaId;
  modelos;
  NombreMarca;
  NombreModelo;
  idArticuloAgregado;

  arrayImagenes;
  photos: any[];
  cropService;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: UserServiceProvider, private camera: Camera, private storage: Storage, public events: Events, public imagePicker: ImagePicker) {

    this.restService.getMarcas()
      .subscribe(
        (data) => {
          this.marcas = data['records'];
        },
        (error) => {
          console.log(error);
        }
      )
    this.photos = new Array<string>();
  }

  abrirGaleria() {
    let options = {
      maximumImagesCount: 5,
    }
    // this.photos = new Array<string>();
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.photos.push(results[i]);
      }
    }, (err) => {
      console.log(err);
    });
  }

  tomarFoto() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 400,
      targetHeight: 600,
      quality: 100,
      correctOrientation: true
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


  // camara(){
  //   let options: CameraOptions = {
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     targetWidth: 600,
  //     targetHeight: 1000,
  //     quality: 100
  //   }
  //   this.camera.getPicture(options).then(imageData => {
  //     this.image = `data:image/jpeg;base64,${imageData}`;
  //     this.foto = this.image;
  //   }).catch(error => {
  //     console.error(error);
  //   });

   

  //   for (let pet of array) {
  //     console.log(pet);
  //     this.arrayImagenes = pet;
  //   }
  // }

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
        Foto_Principal: this.foto[0],
        Marca: this.NombreMarca,
        Modelo: this.NombreModelo
      }

      this.restService.postArticulo(body).then((result) => {
        console.log("ID Articulo -> " + result);

        let array = ['https://developer.android.com/guide/practices/ui_guidelines/images/NB_Icon_Mask_Shapes_Ext_02.gif',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6XWZyRXNLb8t5_cp9aBpp_Z5jlL1rhfNC1zSv5YjhjFnETY-1',
        'https://is3-ssl.mzstatic.com/image/thumb/Purple128/v4/c8/a2/1f/c8a21ffb-301d-92e7-de0d-ce1eb580e1e5/Icon.png/246x0w.png'];

        this.idArticuloAgregado = result;

        for (var i = 0; i < this.photos.length; i++) {
          let foto = {
            idArticulo: this.idArticuloAgregado,
            idUsuario: this.Usuario,
            Foto: this.foto[i]
          }
          this.restService.postFoto(foto);
        }

      }, (err) => {
        console.log(err);
      });
      // this.navCtrl.push(CamaraVentasPage, {
      //   art: this.idArticuloAgregado
      // });
      this.events.publish('reload');
      this.navCtrl.pop();
    });
  }

  marcaSeleccionada(idMarca, Marca) {
    this.marcaId = idMarca;
    this.NombreMarca = Marca;
    this.restService.getModelo(idMarca).then(data => {
      this.modelos = data
    });
  }

  modeloSelccionado(Modelo) {
    this.NombreModelo = Modelo;
  }

}
