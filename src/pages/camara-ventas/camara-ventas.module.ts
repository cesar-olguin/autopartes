import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CamaraVentasPage } from './camara-ventas';

@NgModule({
  declarations: [
    CamaraVentasPage,
  ],
  imports: [
    IonicPageModule.forChild(CamaraVentasPage),
  ],
})
export class CamaraVentasPageModule {}
