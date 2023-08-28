import { AlertComponent } from './modal/alert.component';
import { MomentDateAdapter} from '@angular/material-moment-adapter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EvaluationRoutingModule } from './evaluation-routing.module';
import { EvaluationComponent } from './evaluation.component';
import { MapleafService } from '../turmalina/mapleaf/mapleaf.service';
import { HttpClientModule } from '@angular/common/http';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_FORMATS } from './datepicker-formats';
import _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { SimpleModalModule } from 'ngx-simple-modal';
const moment = _rollupMoment || _moment;

@NgModule({
    declarations: [
        AlertComponent,
        EvaluationComponent
    ],
    imports: [
        SimpleModalModule.forRoot({ container: "modal-container" }),
        RoundProgressModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        MaterialModule,
        CommonModule,
        HttpClientModule,
        EvaluationRoutingModule
    ],
    bootstrap: [
        EvaluationComponent
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE]
        },
        MapleafService
    ]
})

export class EvaluationModule { }
