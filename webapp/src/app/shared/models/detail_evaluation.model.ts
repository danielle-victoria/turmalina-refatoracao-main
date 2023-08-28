import { AgreementModel } from "./agreement.model";
import { BidModel } from "./bid.model";
import { BudgetExpenditure } from "./budgetexpenditure.model";
import { BudgetRevenue } from "./budgetrevenue.model";
import { Contract } from "./contract.model";
import { EmployeeInformation } from "./employeeinformation.model";
import { ExtraBudgetExpenditureModel } from "./extrabudgetexp.model";
import { ExtraBudgetRevenueModel } from "./extrabudgetrevenue.model";
import { PaymentDocument } from "./paymentdoc.model";
import { PlanningInstrumentModel } from "./planning.model";

export class DetailEvaluation{
    
    constructor(
        public Agreement?: AgreementModel,
        public Bid?: BidModel,
        public BudgetExpenditure?: BudgetExpenditure,
        public BudgetRevenue?: BudgetRevenue,
        public Contract?: Contract,
        public EmployeeInformation?: EmployeeInformation,
        public ExtraBudgetExpenditure?: ExtraBudgetExpenditureModel,
        public ExtraBudgetRevenue?: ExtraBudgetRevenueModel,
        public PaymentDocument?: PaymentDocument,
        public PlanningInstrument?: PlanningInstrumentModel
    ){
    }

}