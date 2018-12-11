import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { CameraOptions, Camera } from "@ionic-native/camera";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { Storage } from "@ionic/storage";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";

/**
 * Generated class for the HacerPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-hacer-pedido",
  templateUrl: "hacer-pedido.html"
})
export class HacerPedidoPage {
  imagenDireccion: string = null;
  date: string;
  Titulo: string;
  Descripcion: string;
  Fecha_alta: string;
  Foto_Principal: string;
  foto;
  IdUser;
  marcaId;
  modelos;
  NombreMarca;
  NombreModelo;
  marcas;
  imagenSubida: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private restService: UserServiceProvider,
    public storage: Storage,
    public transfer: FileTransfer,
    public file: File,
    private loadingCtrl: LoadingController
  ) {}

  ionViewCanEnter() {
    this.restService.getMarcas().subscribe(
      data => {
        this.marcas = data["records"];
      },
      error => {
        console.log(error);
      }
    );
    this.camera.cleanup();
  }

  getPicture() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      targetWidth: 720,
      targetHeight: 1280,
      correctOrientation: true
    };
    this.camera
      .getPicture(options)
      .then(imageData => {
        this.imagenDireccion = `data:image/jpeg;base64,${imageData}`;
        this.foto = this.imagenDireccion;
      })
      .catch(error => {
        console.error(error);
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
      quality: 100,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 720,
      targetHeight: 1280,
      correctOrientation: true
    };
    //this.photos = new Array<string>();
    this.camera
      .getPicture(options)
      .then(imageData => {
        //this.image = `data:image/jpeg;base64,${imageData}`;
        this.imagenDireccion = imageData;
        this.foto = this.imagenDireccion;
      })
      .catch(error => {
        console.error(error);
      });
  }

  addAsk() {
    let loader = this.loadingCtrl.create({
      content: "Guardando pedido..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    var random = Math.floor(Math.random() * 100);
    let options: FileUploadOptions = {
      fileKey: "foto",
      fileName: "foto_" + random + ".jpg",
      chunkedMode: false,
      httpMethod: "post",
      mimeType: "image/jpeg",
      headers: {}
    };

    fileTransfer
      .upload(
        this.imagenDireccion,
        "http://solucionesgp.com/autopartes/subirImagenes.php",
        options
      )
      .then(data => {
        console.log(data);
        // this.imagenSubida =
        //   "http://192.168.0.7:8080/static/images/ionicfile.jpg";

        this.storage.get("idUser").then(val => {
          this.IdUser = val;
          if (this.foto == null) {
            this.foto = "../../assets/imgs/sin-foto.png";
          }

          let body = {
            idUsuario: this.IdUser,
            Titulo: this.Titulo,
            Descripcion: this.Descripcion,
            Fecha_alta: new Date().toLocaleString(),
            Fecha_modificacion: new Date().toLocaleString(),
            Foto_Principal: this.foto,
            Marca: this.NombreMarca,
            Modelo: this.NombreModelo
          };

          console.log(body);

          this.restService.postPedido(body).then(
            result => {
              console.log(result);
            },
            err => {
              console.log(err);
            }
          );
          loader.dismiss();
          this.navCtrl.pop();
        });
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
}
