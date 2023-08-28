import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface AlertModel {
  title?: string;
  message: string[];
}

@Component({
  selector: 'alert',
  template: `
    <div class="box-modal">
        <div class="modal-content">
        <div class="modal-header">
            <h4>{{title || 'Alert!'}}</h4>
        </div>
        <div class="modal-body">
            <p *ngFor="let data of message; let i = index" class="message-{{i}}">
              {{data || 'TADAA-AM!'}} 
            </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" (click)="close()">OK</button>
        </div>
        </div>
    </div>
  `,
})
export class AlertComponent extends SimpleModalComponent<AlertModel, null> implements AlertModel {
  title!: string;
  message!: string[];
  constructor() {
    super();
  }
}