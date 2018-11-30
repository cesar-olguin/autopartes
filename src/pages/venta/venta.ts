import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { Storage } from "@ionic/storage";
import {
  PayPal,
  PayPalPayment,
  PayPalConfiguration,
  PayPalPaymentDetails
} from "@ionic-native/paypal";
import { HomePage } from "../home/home";
import { ConversacionClientePage } from "../conversacion-cliente/conversacion-cliente";
/**
 * Generated class for the VentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-venta",
  templateUrl: "venta.html"
})
export class VentaPage {
  articuloId: any;
  idSelected: any[] = [];
  comentarios: any;
  idArticulo;
  idUsuario;
  Comentario;
  IdUser;
  vendedor;
  fotosArt;
  comparar;
  Fecha;
  Escrito = undefined;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public restService: UserServiceProvider,
    public payPal: PayPal,
    public alertCtrl: AlertController
  ) {
    this.idSelected = navParams.get("art");
    this.idArticulo = this.idSelected;
    this.storage.set("idArt", this.idArticulo);
  }
  ionViewCanEnter(){
    this.loadArt();
    this.loadChat();
    this.cargarFotos();
  }
  ionViewDidLoad() {
    this.loadArt();
    this.loadChat();
    this.cargarFotos();
  }

  ionViewWillEnter(){
    this.loadArt();
    this.loadChat();
    this.cargarFotos();
  }

  loadArt() {
    this.storage.remove("vend");
    this.restService.getArticuloById(this.idArticulo).then(data => {
      this.articuloId = data;
      let obj = JSON.parse(JSON.stringify(data));
      this.vendedor = obj[0];
      console.log("ID vendedor -> ", this.vendedor.idUsuario);
      this.storage.set("miID", this.vendedor.idUsuario);
    });
  }

  hacerPregunta() {
    this.storage.get("idUser").then(idLog => {
      this.restService
        .getComentarioUsuarioVendedor(this.idArticulo, idLog)
        .then(data => {
          this.comparar = JSON.stringify(data);
          console.log(data);

          if (this.comparar == "[]") {
            if (this.Escrito != undefined) {
              this.escribir();
            }
          }
          if (this.comparar != "[]") {
            if (this.Escrito != undefined && this.Escrito != "") {
              this.escribir();
            }
            if (this.Escrito != undefined || this.Escrito == "") {
              this.navCtrl.push(ConversacionClientePage, {
                idArt: this.vendedor.idArticulo,
                idCli: idLog
              });
            }
          }
        });
    });
  }

  escribir() {
    this.storage.get("idUser").then(idLog => {
      let body = {
        idArticulo: this.idArticulo,
        idUsuario: idLog,
        Vendedor: this.vendedor.idUsuario,
        Cliente: idLog,
        Conversacion: this.Escrito,
        Fecha: this.Fecha = new Date().toLocaleDateString("en-GB")
      };
      this.restService.postConversacion(body);
      console.log(body);
      this.Escrito = "";
      this.navCtrl.push(ConversacionClientePage, {
        idArt: this.vendedor.idArticulo,
        idCli: idLog
      });
    });
  }

  loadChat() {
    this.restService.getComentarios(this.idArticulo).then(data => {
      this.comentarios = data;
    });
  }

  cargarFotos() {
    this.restService.getFotosIdArticulo(this.idArticulo).then(data => {
      this.fotosArt = data;
    });
  }

  ComprarPayPal(datos) {
    this.payPal
      .init({
        PayPalEnvironmentProduction: "YOUR_PRODUCTION_CLIENT_ID",
        PayPalEnvironmentSandbox:
          "ARyO7rMNDaDnRkc_0r7P0QbyUnFt4bSdCg13nYqNJoZvQTXcKUvT-v6D7vewf9G5QOCbCaoE3b0_TePu"
      })
      .then(
        () => {
          // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
          this.payPal
            .prepareToRender(
              "PayPalEnvironmentSandbox",
              new PayPalConfiguration({
                // Only needed if you get an "Internal Service Error" after PayPal login!
                //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
              })
            )
            .then(
              () => {
                let payment = new PayPalPayment(
                  datos.Precio,
                  "MXN",
                  datos.Titulo,
                  "sale"
                );
                this.payPal.renderSinglePaymentUI(payment).then(
                  response => {
                    console.log(response);

                    // Successfully paid
                    // Example sandbox response
                    //
                    // {
                    //   "client": {
                    //     "environment": "sandbox",
                    //     "product_name": "PayPal iOS SDK",
                    //     "paypal_sdk_version": "2.16.0",
                    //     "platform": "iOS"
                    //   },
                    //   "response_type": "payment",
                    //   "response": {
                    //     "id": "PAY-1AB23456CD789012EF34GHIJ",
                    //     "state": "approved",
                    //     "create_time": "2016-10-03T13:33:33Z",
                    //     "intent": "sale"
                    //   }
                    // }
                    this.alertCtrl
                      .create({
                        title: "Compra Exitosa",
                        subTitle: "Tu numero de compra es el:",
                        message: response.response.id,
                        buttons: [
                          {
                            text: "OK",
                            handler: () => {
                              this.navCtrl.setRoot(HomePage);
                            }
                          }
                        ]
                      })
                      .present();
                  },
                  ErrorPay => {
                    console.log(ErrorPay);

                    // Error or render dialog closed without being successful
                  }
                );
              },
              ErrorConfig => {
                console.log(ErrorConfig);

                // Error in configuration
              }
            );
        },
        ErrorSup => {
          console.log(ErrorSup);
          // Error in initialization, maybe PayPal isn't supported or something else
        }
      );
  }
}
