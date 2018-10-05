import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EscribirPage } from './escribir';

@NgModule({
  declarations: [
    EscribirPage,
  ],
  imports: [
    IonicPageModule.forChild(EscribirPage),
  ],
})
export class EscribirPageModule {}
