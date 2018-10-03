import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisVentasPage } from './mis-ventas';

@NgModule({
  declarations: [
    MisVentasPage,
  ],
  imports: [
    IonicPageModule.forChild(MisVentasPage),
  ],
})
export class MisVentasPageModule {}
