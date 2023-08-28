import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationComponent } from './documentation.component';

import { AgreementComponent } from './agreement/agreement.component';
import { BiddingComponent } from './bidding/bidding.component';
import { BudgetExpenditureComponent } from './budget-expenditure/budget-expenditure.component';
import { BudgetRevenueComponent } from './budget-revenue/budget-revenue.component';
import { ContractComponent } from './contract/contract.component';
import { EmployeeInformationComponent } from './employee-information/employee-information.component';
import { CitizenInformationComponent } from './citizen-information/citizen-information.component';
import { ExtraBudgetExpenditureComponent } from './extra-budget-expenditure/extra-budget-expenditure.component';
import { ExtraBudgetRevenueComponent } from './extra-budget-revenue/extra-budget-revenue.component';
import { HomeComponent } from './home/home.component';
import { PaymentDocumentComponent } from './payment-document/payment-document.component';
import { PlanningInstrumentComponent } from './planning-instrument/planning-instrument.component';
import { HistoricalSeriesComponent } from './historical-series/historical-series.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { ScoresComponent } from './scores/scores.component';

const routes: Routes = [
  { path: '', component: DocumentationComponent, children:[
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'Agreement', component: AgreementComponent },
    { path: 'Bidding', component: BiddingComponent },
    { path: 'BudgetExpenditure', component: BudgetExpenditureComponent },
    { path: 'BudgetRevenue', component: BudgetRevenueComponent },
    { path: 'Contract', component: ContractComponent },
    { path: 'EmployeeInformation', component: EmployeeInformationComponent },
    { path: 'CitizenInformation', component: CitizenInformationComponent },
    { path: 'ExtraBudgetExpenditure', component: ExtraBudgetExpenditureComponent },
    { path: 'ExtraBudgetRevenue', component: ExtraBudgetRevenueComponent },
    { path: 'home', component: HomeComponent },
    { path: 'PaymentDocument', component: PaymentDocumentComponent },
    { path: 'PlanningInstrument', component: PlanningInstrumentComponent },
    { path: 'HistoricalSeries', component: HistoricalSeriesComponent },
    { path: 'tutorial', component: TutorialComponent },
    { path: 'Sandbox', component: SandboxComponent },
    { path: 'scores', component: ScoresComponent }
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationRoutingModule { }
