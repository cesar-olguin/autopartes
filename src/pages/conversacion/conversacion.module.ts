import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConversacionPage } from './conversacion';

@NgModule({
  declarations: [
    ConversacionPage,
  ],
  imports: [
    IonicPageModule.forChild(ConversacionPage),
  ],
})
export class ConversacionPageModule {}
