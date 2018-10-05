import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConversacionClientePage } from './conversacion-cliente';

@NgModule({
  declarations: [
    ConversacionClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ConversacionClientePage),
  ],
})
export class ConversacionClientePageModule {}
