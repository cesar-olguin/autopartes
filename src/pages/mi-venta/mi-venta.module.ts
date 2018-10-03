import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiVentaPage } from './mi-venta';

@NgModule({
  declarations: [
    MiVentaPage,
  ],
  imports: [
    IonicPageModule.forChild(MiVentaPage),
  ],
})
export class MiVentaPageModule {}
