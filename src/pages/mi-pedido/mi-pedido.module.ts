import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiPedidoPage } from './mi-pedido';

@NgModule({
  declarations: [
    MiPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(MiPedidoPage),
  ],
})
export class MiPedidoPageModule {}
