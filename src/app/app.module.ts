import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConversacionClientePage } from '../pages/conversacion-cliente/conversacion-cliente';
import { ConversacionVendedorPage } from '../pages/conversacion-vendedor/conversacion-vendedor';
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
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { MiPedidoChatPage } from '../pages/mi-pedido-chat/mi-pedido-chat';
import { ChatPreguntaPage } from '../pages/chat-pregunta/chat-pregunta';
import { ChatRespuestaPage } from '../pages/chat-respuesta/chat-respuesta';
import { PayPal } from '@ionic-native/paypal'
import { Push } from '@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { LongPressModule } from 'ionic-long-press';
import { AjustesNotificacionesPage } from '../pages/ajustes-notificaciones/ajustes-notificaciones';
import { ChatPopoverComponent } from '../components/chat-popover/chat-popover';
import { NotificacionesModelosPage } from '../pages/notificaciones-modelos/notificaciones-modelos';
import { OfertasPage } from '../pages/ofertas/ofertas';
import { Facebook } from '@ionic-native/facebook';
import { NotificacionesPartesPage } from '../pages/notificaciones-partes/notificaciones-partes';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConversacionClientePage,
    ConversacionVendedorPage,
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
    MiPedidoChatPage,
    RegistrarsePage,
    RespuestasPage,
    UsuarioPage,
    VentaPage,
    VentasPage,
    ChatPreguntaPage,
    ChatRespuestaPage,
    AjustesNotificacionesPage,
    ChatPopoverComponent,
    NotificacionesModelosPage,
    OfertasPage,
    NotificacionesPartesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      monthNames: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],
      monthShortNames: [
        "ene",
        "feb",
        "mar",
        "abr",
        "may",
        "jun",
        "jul",
        "ago",
        "sep",
        "oct",
        "nov",
        "dic"
      ],
      dayNames: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado"
      ],
      dayShortNames: ["dom", "lun", "mar", "mie", "jue", "vie", "sab"]
    }),
    IonicStorageModule.forRoot(),
    IonicImageViewerModule,
    LongPressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConversacionClientePage,
    ConversacionVendedorPage,
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
    MiPedidoChatPage,
    RegistrarsePage,
    RespuestasPage,
    UsuarioPage,
    VentaPage,
    VentasPage,
    ChatPreguntaPage,
    ChatRespuestaPage,
    AjustesNotificacionesPage,
    ChatPopoverComponent,
    NotificacionesModelosPage,
    OfertasPage,
    NotificacionesPartesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserServiceProvider,
    Camera,
    Crop,
    ImagePicker,
    Base64,
    PayPal,
    Push,
    LocalNotifications,
    FileTransfer,
    File,
    Facebook
  ]
})
export class AppModule {}
