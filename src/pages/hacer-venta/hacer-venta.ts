import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { CamaraVentasPage } from '../camara-ventas/camara-ventas';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: UserServiceProvider, private camera: Camera, private storage: Storage, public events: Events) {

    this.restService.getMarcas()
      .subscribe(
        (data) => {
          this.marcas = data['records'];
        },
        (error) => {
          console.log(error);
        }
      )

  }

  getPicture() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 600,
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
        Marca: this.NombreMarca,
        Modelo: this.NombreModelo
      }
      
      this.restService.postArticulo(body).then((result) => {
        console.log("ID Articulo -> "+result);

        this.idArticuloAgregado = result;

        let foto = {
          idArticulo: result,
          Foto: this.foto
        }

        this.restService.postFoto(foto);

      }, (err) => {
        //console.log(err);
      });
      this.navCtrl.push(CamaraVentasPage,{
        art: this.idArticuloAgregado
      });
      //this.events.publish('reload');
      //this.navCtrl.pop();
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
