import { Component, ViewChild } from "@angular/core";
import { Nav, Platform, Events } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { VentasPage } from "../pages/ventas/ventas";
import { PedidosPage } from "../pages/pedidos/pedidos";
//import { FavoritosPage } from '../pages/favoritos/favoritos';
import { UsuarioPage } from "../pages/usuario/usuario";
import { MisVentasPage } from "../pages/mis-ventas/mis-ventas";
import { MisPedidosPage } from "../pages/mis-pedidos/mis-pedidos";
import { Push, PushObject, PushOptions } from "@ionic-native/push";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string; component: any; icon: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events: Events,
    public push: Push
  ) {
    this.initializeApp();
    this.pushNotificacion();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Login", component: LoginPage, icon: "log-in" },
      { title: "Inicio", component: HomePage, icon: "home" },
      { title: "Pedidos", component: PedidosPage, icon: "search" },
      { title: "Articulos", component: VentasPage, icon: "cart" }
    ];

    events.subscribe("user:loggedin", () => {
      this.pages = [
        { title: "Home", component: HomePage, icon: "home" },
        //{ title: 'Favoritos', component: FavoritosPage, icon: 'star' },
        { title: "Articulos en Venta", component: VentasPage, icon: "cart" },
        { title: "Usuario", component: UsuarioPage, icon: "person" },
        { title: "Mis Pedidos", component: MisPedidosPage, icon: "search" },
        { title: "Mis Ventas", component: MisVentasPage, icon: "cart" }
      ];
    });

    events.subscribe("user:loggedout", () => {
      this.pages = [
        { title: "Login", component: LoginPage, icon: "log-in" },
        { title: "Inicio", component: HomePage, icon: "home" },
        { title: "Pedidos", component: PedidosPage, icon: "search" },
        { title: "Articulos", component: VentasPage, icon: "cart" }
      ];
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
      //this.statusBar.backgroundColorByHexString('#000');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  pushNotificacion() {
    const options: PushOptions = {
      android: {
        senderID: "398680118616"
      },
      ios: {
        alert: "true",
        badge: true,
        sound: "false"
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject
      .on("notification")
      .subscribe((notification: any) =>
        console.log("Received a notification", notification)
      );

    pushObject
      .on("registration")
      .subscribe((registration: any) =>
        console.log("Device registered", registration)
      );

    pushObject
      .on("error")
      .subscribe(error => console.error("Error with Push plugin", error));
  }
}
