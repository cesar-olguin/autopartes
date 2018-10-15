import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConversacionClientePage } from '../pages/conversacion-cliente/conversacion-cliente';
import { ConversacionVendedorPage } from '../pages/conversacion-vendedor/conversacion-vendedor';
import { CuentaPage } from '../pages/cuenta/cuenta';
import { EscribirPage } from '../pages/escribir/escribir';
import { EscribirRespuestaPage } from '../pages/escribir-respuesta/escribir-respuesta';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { HacerPedidoPage } from '../pages/hacer-pedido/hacer-pedido';
import { HacerVentaPage } from '../pages/hacer-venta/hacer-venta';
import { LoginPage } from '../pages/login/login';
import { MiPedidoPage } from '../pages/mi-pedido/mi-pedido';
import { MiVentaPage } from '../pages/mi-venta/mi-venta';
import { MisPedidosPage } from '../pages/mis-pedidos/mis-pedidos';
import { MisVentasPage } from '../pages/mis-ventas/mis-ventas';
import { ModificarPedidoPage } from '../pages/modificar-pedido/modificar-pedido';
import { ModificarVentaPage } from '../pages/modificar-venta/modificar-venta';
import { PedidoPage } from '../pages/pedido/pedido';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { PreguntasPage } from '../pages/preguntas/preguntas';
import { RegistrarsePage } from '../pages/registrarse/registrarse';
import { RespuestasPage } from '../pages/respuestas/respuestas';
import { UsuarioPage } from '../pages/usuario/usuario';
import { VentaPage } from '../pages/venta/venta';
import { VentasPage } from '../pages/ventas/ventas';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConversacionClientePage,
    ConversacionVendedorPage,
    CuentaPage,
    EscribirPage,
    EscribirRespuestaPage,
    FavoritosPage,
    HacerPedidoPage,
    HacerVentaPage,
    LoginPage,
    MiPedidoPage,
    MiVentaPage,
    MisPedidosPage,
    MisVentasPage,
    ModificarPedidoPage,
    ModificarVentaPage,
    PedidoPage,
    PedidosPage,
    PreguntasPage,
    RegistrarsePage,
    RespuestasPage,
    UsuarioPage,
    VentaPage,
    VentasPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthShortNames: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
      dayShortNames: ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'],
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConversacionClientePage,
    ConversacionVendedorPage,
    CuentaPage,
    EscribirPage,
    EscribirRespuestaPage,
    FavoritosPage,
    HacerPedidoPage,
    HacerVentaPage,
    LoginPage,
    MiPedidoPage,
    MiVentaPage,
    MisPedidosPage,
    MisVentasPage,
    ModificarPedidoPage,
    ModificarVentaPage,
    PedidoPage,
    PedidosPage,
    PreguntasPage,
    RegistrarsePage,
    RespuestasPage,
    UsuarioPage,
    VentaPage,
    VentasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserServiceProvider,
    Camera,
  ]
})
export class AppModule { }
