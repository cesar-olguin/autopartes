import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  App,
  Events
} from "ionic-angular";
import { UserServiceProvider } from "./../../providers/user-service/user-service";
import { empty } from "rxjs/Observer";
import { Storage } from "@ionic/storage";
import { Md5 } from "ts-md5";
//import { UsuarioPage } from '../usuario/usuario';
import { RegistrarsePage } from "../registrarse/registrarse";
import { HomePage } from "../home/home";
import { Push, PushOptions, PushObject } from "@ionic-native/push";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restService: UserServiceProvider,
    public alertCtrl: AlertController,
    private appCtrl: App,
    private storage: Storage,
    public events: Events,
    public push: Push,
    private fb: Facebook
  ) {}

  public Usuario;
  public Password;
  public IdUsuario;
  userData: any;
  date: any;
  facebookUser: any;
  contraseñaF: any;

  ionViewDidLoad() {
    //this.Usuario = this.getFromStorageAsyncUser();
    //this.Password = this.getFromStorageAsyncPass();
  }

  login() {
    if (this.Usuario == empty || this.Password == empty) {
      this.sinDatos();
    } else {
      this.restService
        .getLoggin(this.Usuario, Md5.hashStr(this.Password))
        .then(data => {
          console.log(JSON.stringify(data));
          if (JSON.stringify(data) == "[]") {
            this.correoError();
          } else {
            window.localStorage.setItem("user", this.Usuario);
            window.localStorage.setItem("pass", this.Password);

            this.storage.set("user", this.Usuario);
            this.storage.set("pass", this.Password);

            let obj = JSON.parse(JSON.stringify(data));
            this.IdUsuario = obj[0];

            this.storage.set("idUser", this.IdUsuario.idUsuario);
            this.storage.set("name", this.IdUsuario.Nombre);
            this.storage.set("foto", this.IdUsuario.ImagenPerfil);

            //////////////////////////

            const options: PushOptions = {
              android: {
                senderID: "398680118616"
              },
              ios: {
                alert: "true",
                badge: "true",
                sound: "true"
              }
            };

            const pushObject: PushObject = this.push.init(options);

            pushObject.on("registration").subscribe((registration: any) => {
              console.log("Dispositivo Registrado -> ", registration);
              let body = {
                token: registration.registrationId
              };
              this.restService
                .putTokenDevice(this.IdUsuario.idUsuario, body)
                .then(resultado => {
                  console.log(resultado);
                });
            });

            //////////////////////////

            this.events.publish("user:loggedin");
            this.appCtrl.getRootNav().setRoot(HomePage);
          }
        });
    }
  }

  registrate() {
    this.appCtrl.getRootNav().push(RegistrarsePage);
  }

  sinDatos() {
    let alert = this.alertCtrl.create({
      title: "ERROR",
      subTitle: "Llena los campos.",
      buttons: ["Aceptar"]
    });
    alert.present();
  }

  correoError() {
    let alert = this.alertCtrl.create({
      title: "ERROR",
      subTitle: "Error en el usuario y/o contraseña.",
      buttons: ["Aceptar"]
    });
    alert.present();
  }

  facebookLogin() {
    this.fb
      .login(["public_profile", "email"])
      .then((res: FacebookLoginResponse) =>
        console.log("Logged into Facebook!", res)
      )
      .catch(e => console.log("Error logging into Facebook", e));
  }

  loginFB() {
    this.fb.login(["email", "public_profile"]).then(response => {
      console.log(response);
      this.fb
        .api(
          "me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)",
          []
        )
        .then(profile => {
          console.log(profile);

          this.userData = {
            email: profile["email"],
            first_name: profile["first_name"],
            picture: profile["picture_large"]["data"]["url"],
            username: profile["name"]
          };

          //

          const options: PushOptions = {
            android: {
              senderID: "398680118616"
            },
            ios: {
              alert: "true",
              badge: "true",
              sound: "true"
            }
          };

          const pushObject: PushObject = this.push.init(options);

          pushObject.on("registration").subscribe((registration: any) => {
            console.log("Dispositivo Registrado -> ", registration);
            this.contraseñaF = Md5.hashStr("123456");
            let body = {
              Nombre: profile["name"],
              ApellidoP: "",
              ApellidoM: "",
              Correo: profile["email"],
              Cell: "",
              Contrasena: Md5.hashStr("123456"),
              Confirmar: Md5.hashStr("123456"),
              Fecha_nac: "", //this.Fecha_nac = new Date().toLocaleDateString('en-GB'),
              Genero: "", // this.Genero,
              Fecha_alta: this.date = new Date().toLocaleDateString(
                "en-GB"
              ),
              ImagenPerfil: profile["picture_large"]["data"]["url"],
              token: registration.registrationId
            };
            this.restService.getUserFacebook(profile["email"]).then(data => {
              this.facebookUser = JSON.stringify(data);
              let obj = JSON.parse(JSON.stringify(data));
              this.IdUsuario = obj[0];
              console.log(data);
        
              if (this.facebookUser == "[]") {
                console.log("Facebook nuevo");
                this.restService.postRegistro(body).then(
                  result => {
                    console.log(result);
                    window.localStorage.setItem("user", profile["email"]);
                    window.localStorage.setItem("pass", "123456");

                    this.storage.set("user", profile["email"]);
                    this.storage.set("pass", "123456");
                    console.log(profile["email"]);
                    console.log(this.contraseñaF);


                    this.storage.set("idUser", this.IdUsuario.idUsuario);
                    this.storage.set("name", profile["name"]);
                    this.storage.set("foto", profile["picture_large"]["data"]["url"]);
                  });
                this.events.publish("user:loggedin");
                this.appCtrl.getRootNav().setRoot(HomePage);
              } 
              else {
                let facebookBody = {
                  Nombre: profile["name"],
                  ApellidoP: "",
                  ApellidoM: "",
                  Correo: profile["email"],
                  Cell: "",
                  Contrasena: Md5.hashStr("123456"),
                  Confirmar: Md5.hashStr("123456"),
                  Fecha_alta: this.date = new Date().toLocaleDateString(
                    "en-GB"
                  ),
                  ImagenPerfil: profile["picture_large"]["data"]["url"],
                  token: registration.registrationId
                };
                this.restService.putUserFacebook(profile["email"],facebookBody).then(resultado => {
                  console.log("Facebook Verificado");
                  window.localStorage.setItem("user", profile["email"]);
                  window.localStorage.setItem("pass", "123456");

                  this.storage.set("user", profile["email"]);
                  this.storage.set("pass", "123456");
                  console.log(profile["email"]);
                  console.log(this.contraseñaF);



                  this.storage.set("idUser", this.IdUsuario.idUsuario);
                  this.storage.set("name", profile["name"]);
                  this.storage.set("foto", profile["picture_large"]["data"]["url"]);

                  //////////////////////////

                  const options: PushOptions = {
                    android: {
                      senderID: "398680118616"
                    },
                    ios: {
                      alert: "true",
                      badge: "true",
                      sound: "true"
                    }
                  };

                  const pushObject: PushObject = this.push.init(options);

                  pushObject.on("registration").subscribe((registration: any) => {
                    console.log("Dispositivo Registrado -> ", registration);
                    let body = {
                      token: registration.registrationId
                    };
                    this.restService
                      .putTokenDevice(this.IdUsuario.idUsuario, body)
                      .then(resultado => {
                        console.log(resultado);
                      });
                  });
                  this.events.publish("user:loggedin");
                  this.appCtrl.getRootNav().setRoot(HomePage);
                });
                
              }
              this.events.publish("user:loggedin");
              this.appCtrl.getRootNav().setRoot(HomePage);
            });
          });
          this.events.publish("user:loggedin");
          this.appCtrl.getRootNav().setRoot(HomePage);
        });
      this.events.publish("user:loggedin");
      this.appCtrl.getRootNav().setRoot(HomePage);
    });
  }
}
