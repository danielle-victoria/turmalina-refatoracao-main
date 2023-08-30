import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';


export interface AlertModel {
  title?: string;
  message: string[];
  imageurl?: string;
}

@Component({
  selector: 'alert',
  template: `
    <div class="boxmap-modal box-modal">
        <div class="modalmap-content modal-content">
        <div class="modal-header">
            <h4>{{title || 'Alert!'}}</h4>
        </div>
        <div class="modal-body">
            <p *ngFor="let data of message" class="points-state" >
              {{data || 'TADAA-AM!'}} 
            </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" (click)="close()">OK</button>
        </div>
        </div>
        <img *ngIf="imageurl!=undefined" src="{{imageurl}}">
    </div>
  `,
  styleUrls: ['./alertmap.component.css']
})
export class AlertMapComponent extends SimpleModalComponent<AlertModel, null> implements AlertModel {
  title!: string;
  message!: string[];
  imageurl?: string;
  constructor() {
    super();
  }
}