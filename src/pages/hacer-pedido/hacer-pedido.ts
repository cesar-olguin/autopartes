import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  Events
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
  date: string = "";
  Titulo: string = "";
  Descripcion: string = "";
  Fecha_alta: string = "";
  Foto_Principal: string = "";
  foto: string = "";
  IdUser;
  marcaId;
  modelos;
  NombreMarca: string = "";
  NombreModelo: string = "";
  marcas;
  imagenSubida: any;
  base64;
  ImagenesGaleria;
  faltante: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private restService: UserServiceProvider,
    public storage: Storage,
    public transfer: FileTransfer,
    public file: File,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private events: Events
  ) {
    this.storage.get("idUser").then(val => {
      return (this.IdUser = val);
    });
  }

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
    // let options = { outputType: 1, maximumImagesCount: 1 };
    // this.ImagenesGaleria = new Array<string>();
    // this.imagenSubida.getPictures(options).then(
    //   results => {
    //     for (var i = 0; i < results.length; i++) {
    //       this.ImagenesGaleria.push(results[i]);
    //       this.base64.encodeFile(results[i]).then(
    //         (base64File: string) => {
    //           this.ImagenesGaleria.push(base64File[i]);
    //         },
    //         err => {
    //           console.log(err);
    //         }
    //       );
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );

    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
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
        this.imagenDireccion = `data:image/jpeg;base64,${imageData}`;
        //this.imagenDireccion = imageData;
        this.foto = this.imagenDireccion;
      })
      .catch(error => {
        console.error(error);
      });
  }

  addAsk() {
    if (
      this.Titulo == "" ||
      this.Descripcion == "" ||
      this.NombreMarca == "" ||
      this.NombreModelo == ""
    ) {
      let alert = this.alertCtrl.create({
        title: "Faltan Datos!",
        subTitle: "Revisa los datos.",
        buttons: ["OK"]
      });
      alert.present();
    } else {
      if (this.foto == "") {
        let alert = this.alertCtrl.create({
          title: "Falta una Imagen!",
          subTitle: "Selcciona una Imagen o toma una Foto.",
          buttons: ["OK"]
        });
        alert.present();
      } else {
        const fileTransfer: FileTransferObject = this.transfer.create();
        var random = Math.floor(Math.random() * 100);
        var nombre_foto = "Foto" + random + "-Usuario" + this.IdUser + ".jpg";
        let options: FileUploadOptions = {
          fileKey: "foto",
          fileName: nombre_foto,
          chunkedMode: false,
          httpMethod: "post",
          mimeType: "image/jpeg",
          headers: {}
        };

        let alert = this.alertCtrl.create({
          title: "Faltan Datos!",
          subTitle: nombre_foto,
          buttons: ["OK"]
        });
        //alert.present();

        let loader = this.loadingCtrl.create({
          content: "Guardando pedido..."
        });
        loader.present();

        fileTransfer
          .upload(
            this.imagenDireccion,
            "http://solucionesgp.com/autopartes/SubirImagenesPEDIDOS.php",
            options
          )
          .then(data => {
            console.log(data);

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
                Foto_Principal:
                  "http://solucionesgp.com/autopartes/imagenes-app/ImagenesPedidos/" +
                  nombre_foto,
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
              this.events.publish("reload");
              this.navCtrl.pop();
            });
          });
      }
    }
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
