import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HacerPedidoPage } from './hacer-pedido';

@NgModule({
  declarations: [
    HacerPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(HacerPedidoPage),
  ],
})
export class HacerPedidoPageModule {}
