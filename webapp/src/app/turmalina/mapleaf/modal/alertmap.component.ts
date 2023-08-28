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
  styles: [
    '.modalmap-content{width: 5% !important; align-items: center; height: 45%;}',
    '.boxmap-modal{display:flex; justify-content: center; flex-direction: column;align-items: center;height: 89vh;}',
    '.boxmap-modal .modalmap-content{position: relative;z-index: 2;}',
    '.boxmap-modal img{position: relative;z-index: 1;position: absolute;left: 0;top: 0;width: 100%;height:100%;opacity: 0.2;}',
  ]
})
export class AlertMapComponent extends SimpleModalComponent<AlertModel, null> implements AlertModel {
  title!: string;
  message!: string[];
  imageurl?: string;
  constructor() {
    super();
  }
}