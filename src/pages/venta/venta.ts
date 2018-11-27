import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { Storage } from "@ionic/storage";
import { PreguntasPage } from "../preguntas/preguntas";
import {
  PayPal,
  PayPalPayment,
  PayPalConfiguration,
  PayPalPaymentDetails
} from "@ionic-native/paypal";
import { HomePage } from "../home/home";
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
    this.loadArt();
    this.loadChat();
    this.cargarFotos();
  }

  ionViewDidLoad() {
    this.loadChat();
  }

  hacerPregunta() {
    this.navCtrl.push(PreguntasPage);
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
