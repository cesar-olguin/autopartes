import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  constructor(public http: HttpClient) {
    //console.log('Hello UserServiceProvider Provider');
  }

  baseUrl = "http://solucionesgp.com/autopartes";

  getUsers() {
    return this.http.get("https://randomuser.me/api/?results=100");
  }

  getArticulos() {
    return this.http.get(this.baseUrl + "/articulo/");
  }

  getMarcas() {
    return this.http.get(this.baseUrl + "/marcas/");
  }

  getModelo(id) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/modelos/" + id).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getArticuloById(id) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/articulo/" + id).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getArticulosDiferentes(id) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/articulo/diferente/" + id).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }


  getArticulosOfertas(id) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/articulo/oferta/" + id).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getArticuloByUser(id) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/articulo/usuario/" + id).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getComentarios(id) {
    return new Promise(resolve => {
      this.http
        .get(this.baseUrl + "/articulo/" + id + "/comentario/")
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  postConversacion(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + "/articulo/conversacion/", data, {
          headers: { "Content-Type": "application/json;charset=utf-8" },
          responseType: "text"
        })
        .subscribe(
          res => {
            resolve(res);
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  postArticulo(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + "/articulo/", data, {
          headers: { "Content-Type": "application/json;charset=utf-8" },
          responseType: "text"
        })
        .subscribe(
          res => {
            resolve(res);
            // console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  putArticulo(id, data) {
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUrl + "/articulo/" + id, data).subscribe(
        res => {
          resolve(res);
          // console.log(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  postFotos(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + "/articulo/fotos/", data, {
          headers: { "Content-Type": "application/json;charset=utf-8" },
          responseType: "text"
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  putFotos(id, data) {
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUrl + "/articulo/fotos/" + id, data).subscribe(
        res => {
          resolve(res);
          // console.log(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  deleteFotos(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.baseUrl + "/articulo/fotos/" + id).subscribe(
        res => {
          resolve(res);
          // console.log(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  postRegistro(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + "/registro/", data, {
          headers: { "Content-Type": "application/json;charset=utf-8" },
          responseType: "text"
        })
        .subscribe(
          res => {
            resolve(res);
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  getLoggin(email, password) {
    return new Promise(resolve => {
      this.http
        .get(this.baseUrl + "/registro/" + email + "/" + password)
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  checkEmail(email) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/registro/" + email).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  postPedido(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + "/pedido/", data, {
          headers: { "Content-Type": "application/json;charset=utf-8" },
          responseType: "text"
        })
        .subscribe(
          res => {
            resolve(res);
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  getPedidos() {
    return this.http.get(this.baseUrl + "/pedido/");
  }

  getPedidosDiferentesUsuarios(idUsuario) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/pedido/diferente/" + idUsuario).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  postPedidoChat(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + "/pedido/chats/", data, {
          headers: { "Content-Type": "application/json;charset=utf-8" },
          responseType: "text"
        })
        .subscribe(
          res => {
            resolve(res);
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  getPedidosUsuario(idUsuario) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/pedido/usuario/" + idUsuario).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getPedidosChats(idPedido) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/pedido/chat/" + idPedido).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getChatDePedidos(idPedido, idUsuario) {
    return new Promise(resolve => {
      this.http
        .get(this.baseUrl + "/pedido/chat/" + idPedido + "/" + idUsuario)
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  getComentarioUsuario(idArticulo) {
    return new Promise(resolve => {
      this.http
        .get(this.baseUrl + "/articulo/comentario/" + idArticulo)
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  getComentarioUsuarioVendedor(idArticulo, idUsuario) {
    return new Promise(resolve => {
      this.http
        .get(
          this.baseUrl + "/articulo/comentario/" + idArticulo + "/" + idUsuario
        )
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            //console.log(err);
          }
        );
    });
  }

  getPedidoById(idPedido) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/pedido/" + idPedido).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getFotosIdArticulo(idArticulo) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/articulo/fotos/" + idArticulo).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getFotos() {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/articulo/fotos/").subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getBuscarPedidoMarcaModelo(marca, modelo, idUsuario) {
    return new Promise(resolve => {
      this.http
        .get(
          this.baseUrl +
            "/pedidos/buscar/marca/" +
            marca +
            "/modelo/" +
            modelo +
            "/usuario/" +
            idUsuario
        )
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  getBuscarArticuloMarcaModelo(marca, modelo, idUsuario) {
    return new Promise(resolve => {
      this.http
        .get(
          this.baseUrl +
            "/articulos/buscar/marca/" +
            marca +
            "/modelo/" +
            modelo +
            "/usuario/" +
            idUsuario
        )
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  getBuscarPedidoMarca(marca, idUsuario) {
    return new Promise(resolve => {
      this.http
        .get(
          this.baseUrl +
            "/pedidos/buscar/marca/" +
            marca +
            "/usuario/" +
            idUsuario
        )
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  getBuscarArticuloMarca(marca, idUsuario) {
    return new Promise(resolve => {
      this.http
        .get(
          this.baseUrl +
            "/articulos/buscar/marca/" +
            marca +
            "/usuario/" +
            idUsuario
        )
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  putPedido(id, data) {
    return new Promise((resolve, reject) => {
      this.http
        .put(this.baseUrl + "/pedido/" + id, data, {
          headers: { "Content-Type": "application/json;charset=utf-8" },
          responseType: "text"
        })
        .subscribe(
          res => {
            resolve(res);
            // console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  postNotificacionesMarcas(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + "/notificaciones/marcas/", data, {
          headers: { "Content-Type": "application/json;charset=utf-8" },
          responseType: "text"
        })
        .subscribe(
          res => {
            resolve(res);
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  getNotificacionesMarcas(idUsuario) {
    return new Promise(resolve => {
      this.http
        .get(this.baseUrl + "/notificaciones/marcas/" + idUsuario)
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  getNotificacionesUsuario(idUsuario, idMarca) {
    return new Promise(resolve => {
      this.http
        .get(
          this.baseUrl + "/notificaciones/marcas/" + idUsuario + "/" + idMarca
        )
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  putNotificaciones(id, data) {
    return new Promise((resolve, reject) => {
      this.http
        .put(this.baseUrl + "/notificacion/modificar/" + id, data, {
          headers: { "Content-Type": "application/json;charset=utf-8" },
          responseType: "text"
        })
        .subscribe(
          res => {
            resolve(res);
            // console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  getNotificacionesdelUsuario(id) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/notificaciones/" + id + "/").subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getNotificacioneEnviarPedido(id, marca) {
    return new Promise(resolve => {
      this.http
        .get(this.baseUrl + "/notificaciones/pedido/" + id + "/" + marca)
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  putImagenPerfil(id, data) {
    return new Promise((resolve, reject) => {
      this.http
        .put(this.baseUrl + "/usuario/imagen/" + id, data, {
          headers: { "Content-Type": "application/json;charset=utf-8" },
          responseType: "text"
        })
        .subscribe(
          res => {
            resolve(res);
            // console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  putTokenDevice(id, data) {
    return new Promise((resolve, reject) => {
      this.http
        .put(this.baseUrl + "/usuario/token/" + id, data, {
          headers: { "Content-Type": "application/json;charset=utf-8" },
          responseType: "text"
        })
        .subscribe(
          res => {
            resolve(res);
            // console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  enviarNotificacionMensaje(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + "/fcm/mensajes/", data, {
          headers: { "Content-Type": "application/json;charset=utf-8" },
          responseType: "text"
        })
        .subscribe(
          res => {
            resolve(res);
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  enviarNotificacionPedidos(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + "/fcm/notificaciones/pedidos/", data, {
          headers: { "Content-Type": "application/json;charset=utf-8" },
          responseType: "text"
        })
        .subscribe(
          res => {
            resolve(res);
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  tokenUsuario(id) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/token/" + id).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  imagenUsuario(id) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/imagen/" + id).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  tokenDiferenteUsuario(id) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + "/token/diferente/" + id).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }
}
