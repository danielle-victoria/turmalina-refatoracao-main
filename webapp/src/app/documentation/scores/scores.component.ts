import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoresComponent {

    instructions = `
    # Pontuações

    |Tipo                                   |Item                                                 |Propriedade                        |Pontuação|
|:--------------------------------------|:----------------------------------------------------|:----------------------------------|--------:|
|1.1 Instrumentos de Planejamento       |Plano Plurianual                                     |multiannualPlan                    |10       |
|1.1 Instrumentos de Planejamento       |Lei de Diretrizes Orçamentárias                      |budgetGuidelinesLaw                |10       |
|1.1 Instrumentos de Planejamento       |Lei Orçamentária Anual                               |annualBudgetLaw                    |10       |
|1.2 Procedimentos Licitatórios         |Edital                                               |notice                             |60       |
|1.2 Procedimentos Licitatórios         |Modalidade de Licitação                              |bidModality                        |10       |
|1.2 Procedimentos Licitatórios         |Repartição/Setor Interessado                         |managementUnitName                 |10       |
|1.2 Procedimentos Licitatórios         |Data de Publicação                                   |publicationDate                    |10       |
|1.2 Procedimentos Licitatórios         |Data de Realização                                   |realizationDate                    |10       |
|1.2 Procedimentos Licitatórios         |Número de Ordem/Série (Número da Licitação)          |bidID                              |10       |
|1.2 Procedimentos Licitatórios         |Objeto                                               |object                             |10       |
|1.2 Procedimentos Licitatórios         |Nome dos Participantes (Vencedores e Perdedores)     |bidderName                         |10       |
|1.2 Procedimentos Licitatórios         |CNPJ/CPF                                             |identificationNumber               |10       |
|1.2 Procedimentos Licitatórios         |Valores                                              |bidderProposalAmount               |10       |
|1.3 Contratos                          |Unidade Gestora                                      |managementUnitName                 |5        |
|1.3 Contratos                          |Nome do Contratado                                   |contractorName                     |5        |
|1.3 Contratos                          |CNPJ/CPF do Contratado                               |identificationNumber               |5        |
|1.3 Contratos                          |Data de Publicação                                   |publicationDate                    |5        |
|1.3 Contratos                          |Vigência                                             |validityDate                       |5        |
|1.3 Contratos                          |Valor Contratado                                     |contractAmount                     |5        |
|1.3 Contratos                          |Objeto                                               |object                             |5        |
|1.3 Contratos                          |Número do Contrato                                   |contractID                         |5        |
|1.4 Convênios/Contratos de Repasse     |Número do Convênio                                   |agreementID                        |5        |
|1.4 Convênios/Contratos de Repasse     |Concedente                                           |grantorName                        |5        |
|1.4 Convênios/Contratos de Repasse     |Convenente                                           |contractorName                     |5        |
|1.4 Convênios/Contratos de Repasse     |Data da Celebração                                   |celebrationDate                    |5        |
|1.4 Convênios/Contratos de Repasse     |Data da Publicação                                   |publicationDate                    |5        |
|1.4 Convênios/Contratos de Repasse     |Vigência                                             |validityDate                       |5        |
|1.4 Convênios/Contratos de Repasse     |Objeto                                               |object                             |5        |
|1.4 Convênios/Contratos de Repasse     |Valor Pactuado                                       |agreementAmount                    |5        |
|1.4 Convênios/Contratos de Repasse     |Valor da Contrapartida                               |counterpartAmount                  |5        |
|1.5.1 Receita Orçamentária             |Unidade Gestora Arrecadadora                         |managementUnitName                 |15       |
|1.5.1 Receita Orçamentária             |Valor Previsto                                       |predictedAmount                    |15       |
|1.5.1 Receita Orçamentária             |Valor Arrecadado                                     |collectionAmount                   |15       |
|1.5.1 Receita Orçamentária             |Origem da Receita                                    |budgetRevenueSource                |5        |
|1.5.1 Receita Orçamentária             |Rúbrica/Descrição (recurso precisa ser identificável)|budgetRevenueDescription           |5        |
|1.5.2 Receita Extraorçamentária        |Unidade Gestora Arrecadadora                         |managementUnitName                 |2        |
|1.5.2 Receita Extraorçamentária        |Valor Realizado                                      |realizedAmount                     |15       |
|1.5.2 Receita Extraorçamentária        |Origem da receita                                    |extraBudgetRevenueSource           |5        |
|1.5.2 Receita Extraorçamentária        |Rúbrica/Descrição (recurso precisa ser identificável)|extraBudgetRevenueDescription      |2        |
|1.5.2 Receita Extraorçamentária        |Código adotado                                       |extraBudgetRevenueID               |1        |
|1.5.2 Receita Extraorçamentária        |Nomeclatura utilizada                                |nomenclature                       |1        |
|1.5.2 Receita Extraorçamentária        |Histórico                                            |extraBudgetRevenueHistory          |5        |
|1.6.1 Despesa Orçamentária             |Valor fixado                                         |fixedAmount                        |5        |
|1.6.1 Despesa Orçamentária             |Valor pago                                           |paymentAmount                      |5        |
|1.6.1 Despesa Orçamentária             |Órgão/Unidade Orçamentária                           |managementUnitName                 |10       |
|1.6.1 Despesa Orçamentária             |Função                                               |budgetExpenditureFunction          |5        |
|1.6.1 Despesa Orçamentária             |Sub-Função                                           |budgetExpenditureSubfunction       |5        |
|1.6.1 Despesa Orçamentária             |Programa                                             |budgetExpenditureProgram           |5        |
|1.6.1 Despesa Orçamentária             |Ação                                                 |budgetExpenditureAction            |5        |
|1.6.1 Despesa Orçamentária             |Categoria Econômica                                  |economicCategory                   |5        |
|1.6.1 Despesa Orçamentária             |Natureza da Despesa                                  |budgetNature                       |5        |
|1.6.1 Despesa Orçamentária             |Modalidade de Aplicação                              |budgetExpenditureModality          |5        |
|1.6.1 Despesa Orçamentária             |Elemento da Despesa                                  |BudgetExpendintureElement          |5        |
|1.6.1 Despesa Orçamentária             |Número do Empenho                                    |comittedExpenditureID              |5        |
|1.6.1 Despesa Orçamentária             |Data do Empenho                                      |comittedExpenditureDate            |5        |
|1.6.1 Despesa Orçamentária             |Favorecido do Empenho                                |creditorName                       |10       |
|1.6.1 Despesa Orçamentária             |CNPJ/CPF do Favorecido                               |identificationNumber               |5        |
|1.6.1 Despesa Orçamentária             |Número da Licitação                                  |bidID                              |8        |
|1.6.1 Despesa Orçamentária             |Modalidade da Licitação                              |bidModality                        |7        |
|1.6.1 Despesa Orçamentária             |Valor do Empenho                                     |comittedValue                      |5        |
|1.6.1 Despesa Orçamentária             |Histórico do Empenho                                 |comittedExpenditureHistory         |25       |
|1.6.2 Despesa Extraorçamentária        |Valor pago                                           |paymentAmount                      |5        |
|1.6.2 Despesa Extraorçamentária        |Órgão/Unidade Orçamentária                           |managementUnitName                 |2        |
|1.6.2 Despesa Extraorçamentária        |Código adotado                                       |extraBudgetExpenditureID           |1        |
|1.6.2 Despesa Extraorçamentária        |Nomenclatura                                         |extraBudgetExpenditureNomenclature |5        |
|1.6.2 Despesa Extraorçamentária        |Data de movimentação                                 |moveDate                           |2        |
|1.6.2 Despesa Extraorçamentária        |Descrição                                            |extraBudgetExpenditureDescription  |5        |
|1.6.2 Despesa Extraorçamentária        |Número da Guia                                       |tabID                              |5        |
|1.6.2 Despesa Extraorçamentária        |Data da Guia                                         |tabDate                            |5        |
|1.6.2 Despesa Extraorçamentária        |Credor                                               |creditorName                       |10       |
|1.6.2 Despesa Extraorçamentária        |CNPJ/CPF do Credor                                   |identificationNumber               |5        |
|1.6.2 Despesa Extraorçamentária        |Histórico                                            |tabHistory                         |25       |
|1.6.3 Despesa do Documento de Pagamento|Unidade Gestora Emitente                             |managementUnitName                 |5        |
|1.6.3 Despesa do Documento de Pagamento|Número (OP / CHEQUE / TRANS BANC)                    |bankOperationID                    |1        |
|1.6.3 Despesa do Documento de Pagamento|Conta Bancária                                       |bankAccountNumber                  |1        |
|1.6.3 Despesa do Documento de Pagamento|Data                                                 |paymentDate                        |1        |
|1.6.3 Despesa do Documento de Pagamento|Favorecido                                           |creditorName                       |5        |
|1.6.3 Despesa do Documento de Pagamento|CNPJ/CPF do Favorecido                               |identificationNumber               |1        |
|1.6.3 Despesa do Documento de Pagamento|Valor                                                |paymentAmount                      |5        |
|1.6.3 Despesa do Documento de Pagamento|Fonte de Recursos                                    |fundingSource                      |5        |
|1.6.3 Despesa do Documento de Pagamento|Histórico do Pagamento                               |paymentHIstory                     |5        |
|1.7 Quadro Pessoal                     |Nome dos Funcionários                                |employeeName                       |10       |
|1.7 Quadro Pessoal                     |CPF                                                  |identificationNumber               |10       |
|1.7 Quadro Pessoal                     |Tipo de Cargo / Emprego / Função                     |employeeContractType               |10       |
|1.7 Quadro Pessoal                     |Cargo / Função                                       |employeePosition                   |10       |
|1.7 Quadro Pessoal                     |Salário por servidor (no sentido amplo)              |employeeSalary                     |10       |
    `

}