import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="temError()" class="ui-message ui-messages-error">
       {{ text }}
    </div>
  `,
  styles: [`
    .ui-messages-error {
      margin-top: 6px;
    }
  `
  ],
})
export class MessageComponent {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  temError(): boolean {

    return this.control.hasError(this.error) && this.control.dirty;
  }

}
