import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPreguntaPage } from './chat-pregunta';

@NgModule({
  declarations: [
    ChatPreguntaPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatPreguntaPage),
  ],
})
export class ChatPreguntaPageModule {}
