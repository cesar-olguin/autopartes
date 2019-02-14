import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the ChatPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-popover',
  templateUrl: 'chat-popover.html'
})
export class ChatPopoverComponent {
  Escrito: string;

  constructor(public viewCtrl: ViewController) {
  }

  enviar() {
    this.viewCtrl.dismiss(this.Escrito);
  }

}
