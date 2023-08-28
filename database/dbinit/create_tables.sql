CREATE TABLE IF NOT EXISTS managementunit (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	public_entity TEXT NOT NULL,
	start_urls TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS evaluation (
	id SERIAL PRIMARY KEY,
	management_unit_id INT NOT NULL,
	start_datetime TIMESTAMP NOT NULL,
	log_path TEXT NULL,
	detailed_evaluation JSON NULL,
	summary_evaluation JSON NULL,
	score INT NOT NULL,
	end_datetime TIMESTAMP NULL,
	status bool NOT NULL,
    FOREIGN KEY (management_unit_id)
        REFERENCES managementunit (id)
);

INSERT INTO public.managementunit (name,public_entity,start_urls) VALUES
	 ('Prefeitura de Joao Pessoa','Joao Pessoa','https://transparencia.joaopessoa.pb.gov.br/#/licitacoes');

INSERT INTO public.evaluation (management_unit_id,start_datetime,log_path,detailed_evaluation,summary_evaluation,score,end_datetime,status) VALUES
	 (1,'2022-01-30 20:14:06.158','logs/tm_crawler/turmalina/4dc1dbd2822211ec8f8c4f65ae6a3726.log','{"BudgetRevenue": {"managementUnitName": 0, "budgetRevenueSource": 0, "budgetRevenueDescription": 0, "predictedAmount": 0, "collectionAmount": 0}, "ExtraBudgetRevenue": {"extraBudgetRevenueID": 0, "extraBudgetRevenueDescription": 0, "extraBudgetRevenueSource": 0, "managementUnitName": 0, "nomenclature": 0, "extraBudgetRevenueHistory": 0, "realizedAmount": 0}, "BudgetExpenditure": {"managementUnitName": 0, "creditorName": 0, "identificationNumber": 0, "fixedAmount": 0, "comittedValue": 0, "paymentAmount": 0, "comittedExpenditureID": 0, "comittedExpenditureDate": 0, "bidID": 0, "bidModality": 0, "budgetExpenditureFunction": 0, "budgetExpenditureSubfunction": 0, "budgetExpenditureProgram": 0, "budgetExpenditureAction": 0, "economicCategory": 0, "budgetNature": 0, "budgetExpenditureModality": 0, "budgetExpenditureElement": 0, "comittedExpenditureHistory": 0}, "ExtraBudgetExpenditure": {"managementUnitName": 0, "creditorName": 0, "identificationNumber": 0, "paymentAmount": 0, "tabID": 0, "tabDate": 0, "tabHistory": 0, "extraBudgetExpenditureID": 0, "extraBudgetExpenditureNomenclature": 0, "moveDate": 0, "extraBudgetExpenditureDescription": 0}, "PaymentDocument": {"managementUnitName": 0, "bankOperationID": 0, "bankAccountNumber": 0, "paymentDate": 0, "identificationNumber": 0, "creditorName": 0, "paymentAmount": 0, "fundingSource": 0, "paymentHistory": 0}, "Contract": {"managementUnitName": 0, "contractID": 0, "contractorName": 0, "identificationNumber": 0, "object": 0, "publicationDate": 0, "validityDate": 0, "contractAmount": 0}, "PlanningInstrument": {"multiyearPlan": 0, "budgetGuidelinesLaw": 0, "annualBudgetLaw": 0}, "Bid": {"managementUnitName": 1, "bidID": 1, "bidModality": 1, "object": 1, "publicationDate": 1, "realizationDate": 0, "bidderName": 0, "identificationNumber": 0, "bidderProposalAmount": 0, "notice": 0}, "Agreement": {"agreementID": 0, "grantorName": 0, "contractorName": 0, "celebrationDate": 0, "publicationDate": 0, "validityDate": 0, "object": 0, "agreementAmount": 0, "counterpartAmount": 0}, "EmployeeInformation": {"employeeName": 0, "identificationNumber": 0, "employmentContractType": 0, "employeePosition": 0, "employeeSalary": 0}}','{"BudgetRevenue": 0, "ExtraBudgetRevenue": 0, "BudgetExpenditure": 0, "ExtraBudgetExpenditure": 0, "PaymentDocument": 0, "Contract": 0, "PlanningInstrument": 0, "Bid": 5, "Agreement": 0, "EmployeeInformation": 0}',5,'2022-01-30 20:27:08.032',true);
