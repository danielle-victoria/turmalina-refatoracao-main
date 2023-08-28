import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule, MarkedOptions } from "ngx-markdown";
import { DocumentationRoutingModule } from './documentation-routing.module';
import { ContractComponent } from './contract/contract.component';
import { DocumentationComponent } from './documentation.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { BudgetRevenueComponent } from './budget-revenue/budget-revenue.component';
import { ExtraBudgetRevenueComponent } from './extra-budget-revenue/extra-budget-revenue.component';
import { BudgetExpenditureComponent } from './budget-expenditure/budget-expenditure.component';
import { ExtraBudgetExpenditureComponent } from './extra-budget-expenditure/extra-budget-expenditure.component';
import { PaymentDocumentComponent } from './payment-document/payment-document.component';
import { PlanningInstrumentComponent } from './planning-instrument/planning-instrument.component';
import { BiddingComponent } from './bidding/bidding.component';
import { AgreementComponent } from './agreement/agreement.component';
import { EmployeeInformationComponent } from './employee-information/employee-information.component';
import { CitizenInformationComponent } from './citizen-information/citizen-information.component';
import { HistoricalSeriesComponent } from './historical-series/historical-series.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { ScoresComponent } from './scores/scores.component';
import { ExampleOneComponent } from './tutorial/example-one/example-one.component';
import { ExampleTwoComponent } from './tutorial/example-two/example-two.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContractComponent, DocumentationComponent, HomeComponent, TutorialComponent, BudgetRevenueComponent, ExtraBudgetRevenueComponent, BudgetExpenditureComponent, ExtraBudgetExpenditureComponent, PaymentDocumentComponent, PlanningInstrumentComponent, BiddingComponent, AgreementComponent, EmployeeInformationComponent, CitizenInformationComponent, HistoricalSeriesComponent, ExampleOneComponent, ExampleTwoComponent, SandboxComponent, ScoresComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    DocumentationRoutingModule,
    MarkdownModule.forRoot({
      loader: HttpClient, // optional, only if you use [src] attribute
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
  ],
  providers: [],
  bootstrap: [DocumentationComponent]
})
export class DocumentationModule { }
