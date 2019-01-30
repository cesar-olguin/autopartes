import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  AlertController
} from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { Storage } from "@ionic/storage";
import { CameraOptions, Camera } from "@ionic-native/camera";
import {
  FileTransferObject,
  FileUploadOptions,
  FileTransfer
} from "@ionic-native/file-transfer";
/**
 * Generated class for the ModificarVentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-modificar-venta",
  templateUrl: "modificar-venta.html"
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
  imagenDireccion;
  photos: any[];
  foto;
  arrayFotos: any[];
  marcaId: any;
  NombreMarca: any;
  modelos: {};
  NombreModelo: any;
  datosModificar: any;
  idUsuario: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider,
    public storage: Storage,
    public events: Events,
    private camera: Camera,
    private transfer: FileTransfer,
    private alertCtrl: AlertController
  ) {
    this.idSelected = navParams.get("art");
    this.idArticulo = this.idSelected;
    this.idUsuario = navParams.get("idUsuario");
    this.Titulo = this.idArticulo.Titulo;
    this.arrayFotos = new Array<string>();
    this.camera.cleanup();
  }

  ionViewDidLoad() {
    this.loadArt();
    this.cargarFotos();
    console.log(this.idArticulo);
  }

  loadArt() {
    this.restService.getArticuloById(this.idArticulo).then(data => {
      this.articuloId = data;
      console.log(this.articuloId);
      let obj = JSON.parse(JSON.stringify(data));
      this.datosModificar = obj[0];
      this.Precio = this.datosModificar.Precio;
      this.Titulo = this.datosModificar.Titulo;
      this.Descripcion = this.datosModificar.Descripcion;
      this.NombreMarca = this.datosModificar.Marca;
      this.NombreModelo = this.datosModificar.Modelo;
    });
  }

  marcaSeleccionada(idMarca, Marca) {
    this.marcaId = idMarca;
    this.NombreMarca = Marca;
    this.restService.getModelo(idMarca).then(data => {
      this.modelos = data;
    });
  }

  modeloSelccionado(Modelo) {
    this.NombreModelo = Modelo;
  }

  modificarArticulo() {
    let body = {
      Titulo: this.Titulo,
      Descripcion: this.Descripcion,
      Precio: this.Precio,
      Ubicacion: "Manzanillo,Colima,Mexico",
      Fecha_modificacion: this.date = new Date().toLocaleString(),
      Marca: this.NombreMarca,
      Modelo: this.NombreModelo
    };

    const fileTransfer: FileTransferObject = this.transfer.create();
    for (var i = 0; i < this.foto.length; i++) {
      var random = Math.floor(Math.random() * 1000000);
      var nombre_foto =
        "Foto" +
        random +
        "-Venta" +
        this.idSelected +
        "-Usuario" +
        this.idUsuario +
        ".jpg";
      let options: FileUploadOptions = {
        fileKey: "foto",
        fileName: nombre_foto,
        chunkedMode: false,
        httpMethod: "post",
        mimeType: "image/jpeg",
        headers: {}
      };
      fileTransfer
        .upload(
          this.foto[i],
          "http://solucionesgp.com/autopartes/SubirImagenesVENTAS.php",
          options
        )
        .then(data => {
          console.log(data);
        });
    }
    // this.restService.putArticulo(this.idSelected, body).then(data => {
    //   this.articuloId = data;

    //   let obj = JSON.parse(JSON.stringify(this.fotosArt));
    //   this.arrayFotos = obj[i];

    //   for (var i = 0; i < this.photos.length; i++) {
    //     this.foto.slice(0, 5);
    // let foto = {
    //   idArticulo: this.idArticulo,
    //   idUsuario: this.arrayFotos.idUsuario,
    //   NumeroFoto: i,
    //   Foto: this.foto[i]
    // }
    //   }
    // });

    this.events.publish("reload");
    this.navCtrl.pop();
  }

  cargarFotos() {
    this.restService.getFotosIdArticulo(this.idArticulo).then(data => {
      this.fotosArt = data;
    });
  }

  abrirGaleria() {
    // let options = {
    //   outputType: 1,
    //   maximumImagesCount: 5,
    // }
    // this.photos = new Array<string>();
    // this.imagePicker.getPictures(options).then((results) => {
    //   for (var i = 0; i < results.length; i++) {
    //     this.photos.push(results[i]);
    //     this.base64.encodeFile(results[i]).then((base64File: string) => {
    //      // this.photos.push(base64File[i]);
    //     }, (err) => {
    //       console.log(err);
    //     });
    //   }
    // }, (err) => {
    //   console.log(err);
    // });

    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      correctOrientation: true,
      sourceType: 2,
      mediaType: 0
    };
    //this.photos = new Array<string>();
    this.camera
      .getPicture(options)
      .then(imageData => {
        this.imagenDireccion = `data:image/jpeg;base64,${imageData}`;
        this.arrayFotos.push(this.imagenDireccion);
        this.foto = this.arrayFotos;
      })
      .catch(error => {
        console.error(error);
      });
    let alert = this.alertCtrl.create({
      title: "Falta una Imagen!",
      subTitle: this.foto,
      buttons: ["OK"]
    });
    alert.present();
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
      saveToPhotoAlbum: true
    };
    //this.photos = new Array<string>();
    this.camera
      .getPicture(options)
      .then(imageData => {
        this.imagenDireccion = `data:image/jpeg;base64,${imageData}`;
        this.arrayFotos.push(this.imagenDireccion);
        this.foto = this.arrayFotos;
      })
      .catch(error => {
        console.error(error);
      });
  }

  borrarFoto(foto) {
    for (var i = 0; i < this.arrayFotos.length; i++) {
      if (foto == this.arrayFotos[i]) {
        this.arrayFotos.splice(i, 1); // i = foto a eliminar -------- 1 = cantidad de elementos a borrar desde la posicion de la foto
      }
    }
  }

  eliminarFoto(numeroFoto) {
    // console.log(numeroFoto);
    this.fotosArt.splice(numeroFoto, 1);
    this.restService.deleteFotos(numeroFoto);
  }
}
