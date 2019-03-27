import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { CameraOptions, Camera } from "@ionic-native/camera";
import {
  FileTransferObject,
  FileUploadOptions,
  FileTransfer
} from "@ionic-native/file-transfer";

/**
 * Generated class for the ModificarPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-modificar-pedido",
  templateUrl: "modificar-pedido.html"
})
export class ModificarPedidoPage {
  idSelected: any[] = [];
  idPedidoSeleccionado;
  articuloId;
  Titulo: string = "";
  Descripcion: string = "";
  Precio;
  date: string;
  Foto_Principal;
  fotosArt;
  image;
  photos: any[];
  foto: string = "";
  arrayFotos;
  PedidoDatos;
  imagenDireccion: string = "";
  NombreMarca: any;
  NombreModelo: any;
  marcas: any;
  marcaId: any;
  modelos: {};
  datosModificar: any;
  FotoModificada: string = "";
  IdUser: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private restService: UserServiceProvider,
    private camera: Camera,
    private events: Events,
    private transfer: FileTransfer
  ) {
    this.idPedidoSeleccionado = navParams.get("PedidoEditar");
    this.IdUser = navParams.get("PedidoModificadoUsuario");
  }

  ionViewCanEnter() {
    //console.log(this.idPedidoSeleccionado);
    this.restService.getMarcas().subscribe(
      data => {
        this.marcas = data["records"];
      },
      error => {
        console.log(error);
      }
    );
    this.cargarPedido();
  }

  ionViewDidLoad() {}

  cargarPedido() {
    this.restService.getPedidoById(this.idPedidoSeleccionado).then(data => {
      this.PedidoDatos = data;
      let obj = JSON.parse(JSON.stringify(data));
      this.datosModificar = obj[0];
      this.FotoModificada = this.datosModificar.Foto_Principal;
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

  modificarPedido() {
    console.log(this.NombreMarca);

    if (this.foto == "") {
      //  || this.Titulo == "" || this.Descripcion == ""
      this.FotoModificada = this.datosModificar.Foto_Principal;
      // this.Titulo = this.datosModificar.Titulo;
      // this.Descripcion = this.datosModificar.Descripcion;
      // this.NombreMarca = this.datosModificar.Marca;
      // this.NombreModelo =  this.datosModificar.Modelo;
    }

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

    fileTransfer
      .upload(
        this.imagenDireccion,
        "http://partesmx.com/autopartes/SubirImagenesPEDIDOS.php",
        options
      )
      .then(data => {
        console.log(data);
      });

    let body = {
      Titulo: this.Titulo,
      Descripcion: this.Descripcion,
      Fecha_modificacion: new Date().toLocaleString(),
      Foto_Principal:
        "http://partesmx.com/autopartes/imagenes-app/ImagenesPedidos/" +
        nombre_foto,
      Marca: this.NombreMarca,
      Modelo: this.NombreModelo
    };
    console.log(body);

    this.restService.putPedido(this.idPedidoSeleccionado, body).then(data => {
      console.log(data);
    });

    this.events.publish("reload");
    this.navCtrl.pop();
  }
}
