import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RankRoutingModule } from './rank-routing.module';
import { RankComponent } from './rank.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from './paginator';
@NgModule({
  declarations: [
    RankComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RankRoutingModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro}],
})
export class RankModule { }
