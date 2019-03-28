import { Component, ViewChild } from "@angular/core";
import { Nav, Platform, Events, App } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { VentasPage } from "../pages/ventas/ventas";
//import { PedidosPage } from "../pages/pedidos/pedidos";
//import { FavoritosPage } from '../pages/favoritos/favoritos';
import { UsuarioPage } from "../pages/usuario/usuario";
import { MisVentasPage } from "../pages/mis-ventas/mis-ventas";
import { MisPedidosPage } from "../pages/mis-pedidos/mis-pedidos";
import { Push, PushObject, PushOptions } from "@ionic-native/push";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { Storage } from "@ionic/storage";
import { UserServiceProvider } from "../providers/user-service/user-service";
import { OfertasPage } from "../pages/ofertas/ofertas";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string; component: any; icon: string }>;
  usuario: Array<{
    component: any;
    img: string;
    usuario: string;
    correo: string;
  }>;
  nombreUsuario: string;
  correoUsuario: string;
  fotoUsuario: string;
  salir: Array<{ titulo: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events: Events,
    public push: Push,
    public localNotifications: LocalNotifications,
    public storage: Storage,
    public appCtrl: App,
    public restService: UserServiceProvider
  ) {
    this.initializeApp();
    this.pushNotificacion();

    this.usuario = [
      {
        component: LoginPage,
        img: "../assets/imgs/profile.jpg",
        usuario: "¡Iniciar Sesión!",
        correo: ""
      }
    ];

    this.pages = [
      { title: "INGRESA", component: LoginPage, icon: "log-in" },
      { title: "INICIO", component: HomePage, icon: "home" },
      { title: "VENTAS", component: VentasPage, icon: "cart" },
      { title: "OFERTAS", component: OfertasPage, icon: "pricetag" }
    ];

    this.salir = [{ titulo: "" }];

    events.subscribe("user:loggedin", () => {
      this.storage.get("user").then(idval => {
        this.correoUsuario = idval;
        console.log(this.correoUsuario);

        this.storage.get("name").then(nombre => {
          this.nombreUsuario = nombre;
          this.storage.get("foto").then(foto => {
            this.fotoUsuario = foto;

            this.pages = [
              { title: "INICIO", component: HomePage, icon: "home" },
              { title: "MIS PEDIDOS", component: MisPedidosPage, icon: "search" },
              { title: "VENTAS", component: VentasPage, icon: "cart" },
              { title: "MIS VENTAS", component: MisVentasPage, icon: "cart" },
              { title: "OFERTAS", component: OfertasPage, icon: "pricetag" },
              { title: "USUARIO", component: UsuarioPage, icon: "person" }
            ];

            this.usuario = [
              { component: UsuarioPage, img: this.fotoUsuario, usuario: "Hola " + this.nombreUsuario, correo: this.correoUsuario
              }
            ];

            this.salir = [{ titulo: "Cerrar Sesion" }];
          });
        });
      });
    });

    events.subscribe("user:loggedout", () => {
      this.storage.clear();
      this.pages = [
        { title: "INGRESA", component: LoginPage, icon: "log-in" },
        { title: "INICIO", component: HomePage, icon: "home" },
        { title: "VENTAS", component: VentasPage, icon: "cart" },
        { title: "OFERTAS", component: OfertasPage, icon: "pricetag" }
      ];

      this.usuario = [
        {
          component: LoginPage,
          img: "../assets/imgs/profile.jpg",
          usuario: "¡Iniciar Sesión!",
          correo: ""
        }
      ];

      this.salir = [{ titulo: "" }];
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      // let status bar overlay webview
      this.statusBar.overlaysWebView(false);

      // set status bar to white
      this.statusBar.backgroundColorByHexString("#000");
      this.splashScreen.hide();
    });
  }

  close() {
    window.localStorage.clear();
    this.storage.clear();
    this.events.publish("user:loggedout");
    this.appCtrl.getRootNav().setRoot(HomePage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  usuarioNombre(usuario) {
    this.nav.setRoot(usuario.component);
  }

  pushNotificacion() {
    // // to initialize push notifications

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

    pushObject.on("notification").subscribe((notification: any) => {
      console.log("Notificaciones Consola -> ", notification);
      this.localNotifications.schedule({
        // id: 1,
        // text: "Notificacion Simple",
        data: { secret: pushObject },
        icon: "res://assets/icon/favicon.icon"
      });
    });

    pushObject.on("registration").subscribe((registration: any) => {
      console.log("Dispositivo Registrado -> ", registration);      
      this.storage.get("idUser").then(idval => {
        let body = {
          token: registration.registrationId
        }
        this.restService.putTokenDevice(idval, body).then(resultado => {
          console.log(resultado);
        });
      });
    });

    pushObject.on("error").subscribe(error => {
      console.error("Error con el Plugin Push -> ", error);
    });
  }
}