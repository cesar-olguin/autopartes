import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiPedidoChatPage } from './mi-pedido-chat';

@NgModule({
  declarations: [
    MiPedidoChatPage,
  ],
  imports: [
    IonicPageModule.forChild(MiPedidoChatPage),
  ],
})
export class MiPedidoChatPageModule {}
