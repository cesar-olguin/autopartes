import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoPreguntaPage } from './pedido-pregunta';

@NgModule({
  declarations: [
    PedidoPreguntaPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoPreguntaPage),
  ],
})
export class PedidoPreguntaPageModule {}
