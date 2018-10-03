import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModificarPedidoPage } from './modificar-pedido';

@NgModule({
  declarations: [
    ModificarPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModificarPedidoPage),
  ],
})
export class ModificarPedidoPageModule {}
