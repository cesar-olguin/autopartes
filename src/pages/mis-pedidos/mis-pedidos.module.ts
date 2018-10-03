import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisPedidosPage } from './mis-pedidos';

@NgModule({
  declarations: [
    MisPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(MisPedidosPage),
  ],
})
export class MisPedidosPageModule {}
