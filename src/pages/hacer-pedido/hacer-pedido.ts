import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CameraOptions, Camera } from "@ionic-native/camera";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { Storage } from "@ionic/storage";

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
  image: string = null;
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private restService: UserServiceProvider,
    public storage: Storage
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
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    };
    this.camera
      .getPicture(options)
      .then(imageData => {
        this.image = `data:image/jpeg;base64,${imageData}`;
        this.foto = this.image;
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
      destinationType: this.camera.DestinationType.DATA_URL,
      correctOrientation: true,
      sourceType: 2,
      mediaType: 0
    };
    //this.photos = new Array<string>();
    this.camera
      .getPicture(options)
      .then(imageData => {
        this.image = `data:image/jpeg;base64,${imageData}`;
        this.foto = this.image;
      })
      .catch(error => {
        console.error(error);
      });
  }

  addAsk() {
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

      this.navCtrl.pop();
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
