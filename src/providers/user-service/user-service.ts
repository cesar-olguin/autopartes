import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.get('https://randomuser.me/api/?results=25');
  }
  
  getArticulos() {
    return this.http.get(this.baseUrl + '/articulo/');
  }

  getMarcas() {
    return this.http.get(this.baseUrl + '/marcas/');
  }

  getModelo(id) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + '/modelos/' + id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getArticuloById(id) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + '/articulo/' + id).subscribe(data => {
        resolve(data)
      }, err => {
        console.log(err);
      });
    });
  }

  getArticulosDiferentes(id) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + '/articulo/diferente/' + id).subscribe(data => {
        resolve(data)
      }, err => {
        console.log(err);
      });
    });
  }

  getArticuloByUser(id) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + '/articulo/usuario/' + id).subscribe(data => {
        resolve(data)
      }, err => {
        console.log(err);
      });
    });
  }

  getComentarios(id) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + '/articulo/' + id + '/comentario/').subscribe(data => {
        resolve(data)
      }, err => {
        console.log(err);
      });
    });
  }

  postComentario(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/articulo/comentario/', data)
        .subscribe(res => {
          resolve(res);
          console.log(data);
        }, err => {
          console.log(err);
        });
    });
  }

  postArticulo(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/articulo/', data)
        .subscribe(res => {
          resolve(res);
          console.log(data);
        }, err => {
          console.log(err);
        });
    });
  }

  postFoto(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/articulo/fotos/', data)
        .subscribe(res => {
          resolve(res);
        }, err => {
          console.log(err);
        });
    });
  }

  postRegistro(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/registro/', data)
        .subscribe(res => {
          resolve(res);
          console.log(data);
        }, err => {
          console.log(err);
        });
    });
  }

  getLoggin(email, password) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + '/registro/' + email + '/' + password).subscribe(data => {
        resolve(data)
      }, err => {
        console.log(err);
      });
    });
  }

  checkEmail(email){
    return new Promise(resolve => {
      this.http.get(this.baseUrl + '/registro/' + email).subscribe(data => {
        resolve(data)
      }, err => {
        console.log(err);
      });
    });
  }

  postPedido(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/pedido/', data)
        .subscribe(res => {
          resolve(res);
          console.log(data);
        }, err => {
          console.log(err);
        });
    });
  }

  getPedidos() {
    return this.http.get(this.baseUrl + '/pedido/');
  }

  getComentarioUsuario(idArticulo) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + '/articulo/comentario/'+ idArticulo).subscribe(data => {
        resolve(data)
      }, err => {
        console.log(err);
      });
    });
  }

  getComentarioUsuarioVendedor(idArticulo,idUsuario) {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + '/articulo/comentario/' + idArticulo + '/' + idUsuario).subscribe(data => {
        resolve(data)
      }, err => {
        console.log(err);
      });
    });
  }

}
