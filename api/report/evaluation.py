EVALUATION_MODEL = {
    
    'PlanningInstrument': {
        'multiyearPlan': 10,
        'budgetGuidelinesLaw': 10,
        'annualBudgetLaw': 10
    },

    'BudgetRevenue': {
        'managementUnitName': 15,
        'predictedAmount': 15,
        'collectionAmount': 15,
        'budgetRevenueSource': 5,
        'budgetRevenueDescription': 5
    }, 

    'ExtraBudgetRevenue': {
        'managementUnitName': 2,
        'realizedAmount': 15,
        'extraBudgetRevenueSource': 5,
        'extraBudgetRevenueDescription': 2,
        'extraBudgetRevenueID': 1,
        'nomenclature': 1,
        'extraBudgetRevenueHistory': 5
    },

    'BudgetExpenditure': {
        'fixedAmount': 5,
        'paymentAmount': 5,
        'managementUnitName': 10,
        'budgetExpenditureFunction': 5,
        'budgetExpenditureSubfunction': 5,
        'budgetExpenditureProgram': 5,
        'budgetExpenditureAction': 5,
        'economicCategory': 5,
        'budgetNature': 5,
        'budgetExpenditureModality': 5,
        'budgetExpenditureElement': 5,
        'comittedExpenditureID': 5,
        'comittedExpenditureDate': 5,
        'creditorName': 10,
        'identificationNumber': 5,
        'bidID': 8,
        'bidModality': 7,
        'comittedValue': 5,
        'comittedExpenditureHistory': 25
    }, 
        
    'ExtraBudgetExpenditure': {
        'paymentAmount': 5,
        'managementUnitName': 2,
        'extraBudgetExpenditureID': 1,
        'extraBudgetExpenditureNomenclature': 5,
        'moveDate': 2,
        'extraBudgetExpenditureDescription': 5,
        'tabID': 5,
        'tabDate': 5,
        'creditorName': 10,
        'identificationNumber': 5,
        'tabHistory': 25
    }, 

    'Bid': {
        'notice': 60,
        'bidModality': 10,
        'managementUnitName': 10,
        'publicationDate': 10,
        'realizationDate': 10,
        'bidID': 10,
        'object': 10, 
        'bidderName': 10,
        'identificationNumber': 10,
        'bidderProposalAmount': 10
    },

    'Contract': {
        'managementUnitName': 5,
        'contractorName': 5,
        'identificationNumber': 5,
        'publicationDate': 5,
        'validityDate': 5,
        'contractAmount': 5,
        'object': 5, 
        'contractID': 5
        }, 

    'Agreement': {
        'agreementID': 5, 
        'grantorName': 5, 
        'contractorName': 5, 
        'celebrationDate': 5, 
        'publicationDate': 5, 
        'validityDate': 5, 
        'object': 5, 
        'agreementAmount': 5, 
        'counterpartAmount': 5
    }, 

    'PaymentDocument': {
        'managementUnitName': 5,
        'bankOperationID': 1,
        'bankAccountNumber': 1,
        'paymentDate': 1,
        'creditorName': 5,
        'identificationNumber': 1,
        'paymentAmount': 5,
        'fundingSource': 5,
        'paymentHistory': 5
    },
    
    'EmployeeInformation': {
        'employeeName': 10, 
        'identificationNumber': 10, 
        'employmentContractType': 10, 
        'employeePosition': 10, 
        'employeeSalary': 10
    }
}

dictionary_order = {
    'PlanningInstrument': 'Instrumentos de Planejamento',
    'BudgetRevenue': 'Receita Orçamentária',
    'ExtraBudgetRevenue': 'Receita Extraorçamentária',
    'BudgetExpenditure': 'Despesa Orçamentária',
    'ExtraBudgetExpenditure': 'Despesa Extraorçamentária',
    'Bid': 'Processos Licitatórios',
    'Contract': 'Contratos',
    'Agreement': 'Convênios',
    'PaymentDocument': 'Documento de Pagamento',
    'EmployeeInformation': 'Pessoal'
}