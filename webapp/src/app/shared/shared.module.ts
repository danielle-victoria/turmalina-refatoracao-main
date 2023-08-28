import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        MaterialModule,
        FormsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        CommonModule,
        HttpClientModule
    ],
    exports: [
        MaterialModule
    ],
    declarations: []
})
export class SharedModule { }
