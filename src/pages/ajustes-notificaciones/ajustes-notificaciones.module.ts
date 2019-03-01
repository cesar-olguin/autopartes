import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjustesNotificacionesPage } from './ajustes-notificaciones';

@NgModule({
  declarations: [
    AjustesNotificacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(AjustesNotificacionesPage),
  ],
})
export class AjustesNotificacionesPageModule {}
