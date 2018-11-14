import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EscribirPedidosPage } from './escribir-pedidos';

@NgModule({
  declarations: [
    EscribirPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(EscribirPedidosPage),
  ],
})
export class EscribirPedidosPageModule {}
