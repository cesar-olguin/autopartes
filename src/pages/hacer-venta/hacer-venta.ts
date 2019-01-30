import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  AlertController,
  LoadingController
} from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { Storage } from "@ionic/storage";
import { CamaraVentasPage } from "../camara-ventas/camara-ventas";
import { ImagePicker } from "@ionic-native/image-picker";
import { Base64 } from "@ionic-native/base64";
import {
  FileTransfer,
  FileTransferObject,
  FileUploadOptions
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";

/**
 * Generated class for the HacerVentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-hacer-venta",
  templateUrl: "hacer-venta.html"
})
export class HacerVentaPage {
  imagenDireccion: string = "";
  date: string = "";
  Titulo: string = "";
  Descripcion: string = "";
  Precio: string = "";
  Fecha_alta: string = "";
  Foto_Principal: string = "";
  foto;
  Usuario;
  marcas: any[] = [];
  marcaId;
  modelos;
  NombreMarca: string = "";
  NombreModelo: string = "";
  idArticuloAgregado;

  arrayImagenes;
  arrayFotos: any[];
  cropService;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider,
    private camera: Camera,
    private storage: Storage,
    public events: Events,
    public imagePicker: ImagePicker,
    public base64: Base64,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    public file: File
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
    this.arrayFotos = new Array<string>();
    this.camera.cleanup();
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

  vistaCamara() {
    this.navCtrl.push(CamaraVentasPage);
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
    this.storage.get("idUser").then(val => {
      const fileTransfer: FileTransferObject = this.transfer.create();

      this.Usuario = val;
      if (this.foto == null) {
        this.foto = "../../assets/imgs/sin-foto.png";
      }

      let body = {
        Titulo: this.Titulo,
        Descripcion: this.Descripcion,
        Precio: this.Precio,
        idUsuario: this.Usuario,
        Cantidad: "1",
        Ubicacion: "Manzanillo,Colima,Mexico",
        Fecha_alta: new Date().toLocaleString(),
        Fecha_modificacion: new Date().toLocaleString(),
        Foto_Principal: "",
        Marca: this.NombreMarca,
        Modelo: this.NombreModelo
      };

      console.log(body);
      // let alert = this.alertCtrl.create({
      //   title: "Foto Principal",
      //   subTitle: JSON.stringify(body.Foto_Principal),
      //   buttons: ["OK"]
      // });
      // alert.present();

      this.restService.postArticulo(body).then(
        result => {
          console.log("ID Articulo -> " + result);
          this.idArticuloAgregado = result;
          for (var i = 0; i < this.foto.length; i++) {
            this.foto.slice(0, 5);
            var random = Math.floor(Math.random() * 1000000);
            var nombre_foto = "Foto" + random + "-Venta" + result + "-Usuario"+ val +".jpg";
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
            // let alert = this.alertCtrl.create({
            //   title: "Foto " + i,
            //   subTitle: nombre_foto,
            //   buttons: ["OK"]
            // });
            // alert.present();
            let foto = {
              idArticulo: this.idArticuloAgregado,
              idUsuario: this.Usuario,
              NumeroFoto: i,
              Foto:
                "http://solucionesgp.com/autopartes/imagenes-app/ImagenesVentas/" +
                nombre_foto
            };
            this.restService.postFotos(foto);
          }
        },
        err => {
          console.log(err);
        }
      );
      this.events.publish("reload");
      this.navCtrl.pop();
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

  eliminarFoto(foto) {
    let alert = this.alertCtrl.create({
      title: "Borrar Foto",
      message: "Deseas borrar esta Foto?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Borrada de la app");
          }
        },
        {
          text: "Borrar Foto",
          handler: () => {
            for (var i = 0; i < this.arrayFotos.length; i++) {
              if (foto == this.arrayFotos[i]) {
                this.arrayFotos.splice(i, 1); // i = foto a eliminar -------- 1 = cantidad de elementos a borrar desde la posicion de la foto
              }
            }
          }
        }
      ]
    });
    alert.present();
  }
}
