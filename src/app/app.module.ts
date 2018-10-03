import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CuentaPage } from '../pages/cuenta/cuenta';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { HacerPedidoPage } from '../pages/hacer-pedido/hacer-pedido';
import { LoginPage } from '../pages/login/login';
import { MiPedidoPage } from '../pages/mi-pedido/mi-pedido';
import { MiVentaPage } from '../pages/mi-venta/mi-venta';
import { MisPedidosPage } from '../pages/mis-pedidos/mis-pedidos';
import { MisVentasPage } from '../pages/mis-ventas/mis-ventas';
import { ModificarPedidoPage } from '../pages/modificar-pedido/modificar-pedido';
import { ModificarVentaPage } from '../pages/modificar-venta/modificar-venta';
import { PedidoPage } from '../pages/pedido/pedido';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { PreguntaPage } from '../pages/pregunta/pregunta';
import { PreguntasPage } from '../pages/preguntas/preguntas';
import { RealizarVentaPage } from '../pages/realizar-venta/realizar-venta';
import { RegistrarsePage } from '../pages/registrarse/registrarse';
import { ResponderPage } from '../pages/responder/responder';
import { UsuarioPage } from '../pages/usuario/usuario';
import { VentaPage } from '../pages/venta/venta';
import { VentasPage } from '../pages/ventas/ventas';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserServiceProvider } from '../providers/user-service/user-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CuentaPage,
    FavoritosPage,
    HacerPedidoPage,
    LoginPage,
    MiPedidoPage,
    MiVentaPage,
    MisPedidosPage,
    MisVentasPage,
    ModificarPedidoPage,
    ModificarVentaPage,
    PedidoPage,
    PedidosPage,
    PreguntaPage,
    PreguntasPage,
    RealizarVentaPage,
    RegistrarsePage,
    ResponderPage,
    UsuarioPage,
    VentaPage,
    VentasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CuentaPage,
    FavoritosPage,
    HacerPedidoPage,
    LoginPage,
    MiPedidoPage,
    MiVentaPage,
    MisPedidosPage,
    MisVentasPage,
    ModificarPedidoPage,
    ModificarVentaPage,
    PedidoPage,
    PedidosPage,
    PreguntaPage,
    PreguntasPage,
    RealizarVentaPage,
    RegistrarsePage,
    ResponderPage,
    UsuarioPage,
    VentaPage,
    VentasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserServiceProvider
  ]
})
export class AppModule { }
