import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SandboxComponent } from './sandbox.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SandboxRoutingModule } from './sandbox-routing.module';

@NgModule({
  declarations: [
    SandboxComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SandboxRoutingModule
  ]
})

export class SandboxModule { }
