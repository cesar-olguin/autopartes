import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Md5 } from 'ts-md5';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { AjustesNotificacionesPage } from '../ajustes-notificaciones/ajustes-notificaciones';
import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';

/**
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  espacio = " ";
  public Correo;
  public Password;
  Usuario: any;
  public user;
  objectKeys = Object.keys;
  imagenDireccion: string;
  imagen: string;

  public options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: false,
    allowEdit: true,
    targetHeight: 300,
    targetWidth: 300
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public appCtrl: App, public restService: UserServiceProvider, public events: Events, private camera: Camera, private crop: Crop, public platform: Platform, private base64: Base64, private transfer: FileTransfer) {
    this.storage.get('user').then((uval) => {
      this.storage.get('pass').then((pval) => {
        this.Correo = uval;
        this.Password = pval;

        this.restService.getLoggin(this.Correo, Md5.hashStr(this.Password)).then(data => {
          this.Usuario = data;

          console.log(data);

          let obj = JSON.parse(JSON.stringify(data));
          this.user = obj[0];
          //alert("JSON Parse -> " + this.user.idUsuario);
          this.storage.set('idUser', this.user.idUsuario);  
          this.imagen = this.user.ImagenPerfil;        
        });
      });
    });
  }

  ionViewDidLoad() {

  }

  close() {
    window.localStorage.clear();
    this.storage.clear();
    this.events.publish('user:loggedout');
    this.appCtrl.getRootNav().setRoot(HomePage);
  }

  fotoPerfil(): Promise<any> {
    return this.camera
      .getPicture(this.options)
      .then((fileUri) => {
        // Crop Image, on android this returns something like, '/storage/emulated/0/Android/...'
        // Only giving an android example as ionic-native camera has built in cropping ability
        if (this.platform.is('ios')) {
          return fileUri
        } else if (this.platform.is('android')) {
          // Modify fileUri format, may not always be necessary
          fileUri = 'file://' + fileUri;

          /* Using cordova-plugin-crop starts here */
          return this.crop.crop(fileUri, { quality: 100, targetWidth: -1, targetHeight: -1 });
        }
      }).then((path) => {
        // path looks like 'file:///storage/emulated/0/Android/data/com.foo.bar/cache/1477008080626-cropped.jpg?1477008106566'
        console.log('Cropped Image Path!: ' + path);

        this.base64.encodeFile(path).then((base64File: string) => {
          console.log("IMAGEN BASE64 -> " + base64File);
          return this.imagen = base64File;
        }, (err) => {
          console.log(err);
        });
        
      })
      .catch(error => {
        console.error(error);
      });
  }

  cropImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imagen = 'data:image/jpeg;base64,' + imageData;

      this.storage.get("idUser").then(idUsuario => {
        const fileTransfer: FileTransferObject = this.transfer.create();
        var random = Math.floor(Math.random() * 100);
        var nombre_foto = "Foto" + random + "-Usuario" + idUsuario + ".jpg";
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
            this.imagen,
            "http://solucionesgp.com/autopartes/SubirFotosPERFIL.php",
            options
          )
          .then(data => {
            console.log(data);
          });

        let body = {
          ImagenPerfil: "http://solucionesgp.com/autopartes/imagenes-app/FotosPerfiles/" +
            nombre_foto
        };
        console.log(body);

        this.restService.putImagenPerfil(idUsuario, body).then(data => {
          this.storage.set("foto", "http://solucionesgp.com/autopartes/imagenes-app/FotosPerfiles/" + nombre_foto);
          this.events.publish('user:loggedin');
        });
      });


    }, (err) => {
      // Handle error
    });
  }

  ajustes() {
    this.navCtrl.push(AjustesNotificacionesPage);
  }

}
