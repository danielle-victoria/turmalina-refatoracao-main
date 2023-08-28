import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogsComponent } from './logs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LogsRoutingModule } from './logs-routing.module';

@NgModule({
  declarations: [
    LogsComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LogsRoutingModule
  ]
})

export class LogsModule { }
