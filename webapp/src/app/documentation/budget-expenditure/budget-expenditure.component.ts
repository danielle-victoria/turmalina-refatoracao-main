import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-budget-expenditure',
  templateUrl: './budget-expenditure.component.html',
  styleUrls: ['./budget-expenditure.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetExpenditureComponent {

    instructions = `
    # Budget Expense

    ## Type: BudgetExpenditure
    
    The BudgetExpenditure type has different properties for representing information regarding budgetary expenditures, commitment to spend public resources, authorized by the competent Power, in order to meet a collective need foreseen in the budget. Also included here are properties related to expenditure commitments, through which authorized monetary values ​​are reserved to meet a specific purpose that creates a pending payment obligation for the municipality. The following are the names of the properties defined by the type:
    
    | PROPERTY | EXPECTED TYPE | DESCRIPTION |
    | ------ | ------ | ------ |
    | fixedAmount | number:float | Monetary field containing the budget amount set by the Annual Budget Law |
    | paymentAmount | number:float | Monetary field containing the amount paid for the budget expense |
    | managementUnitName | text | Text field containing the name of the managing unit |
    | managementUnitID | text | Text field containing the management unit code |
    | budgetExpenditureFunction | text | Text field containing the description of the function/purpose of the budgetary expenditure |
    | budgetExpenditureSubfunction | text | Text field containing the description of the budgetary expenditure subfunction |
    | budgetExpenditureProgram | text | Text field containing the budget expenditure program |
    | budgetExpenditureAction | text | Text field containing the budget expense action |
    | economicCategory | text | Field referring to the classification of the economic category of the budget expenditure |
    | budgetNature| text | Field referring to the classification of the nature of the budgetary expense |
    | budgetExpenditureModality | text | Text field containing the budget expenditure modality |
    | budgetExpenditureElement | text |  Text field containing the budget expense element |
    | comittedExpenditureID | text | Field referring to the commitment note number of the bid budget expense |
    | comittedExpenditureDate | date | Commitment date of the bid budget expenditure (DD/MM/YYYY format)|
    | creditorName | text | Text field containing the payee's name |
    | identificationNumber | text | Text field containing the beneficiary's CPF or CNPJ |
    | bidID | text | Text field referring to the bidding order number of the budgetary expense bid |
    | bidModality | text | Text field containing the name of the bidding modality of the budgeted expense bid |
    | comittedValue | number:float | Field referring to the pledged amount of the bid budget expense |
    | comittedExpenditureHistory | text | Text field containing the description of the commitment history |
    
    This is an HTML example using table
    
    \`\`\`html
    <table itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/BudgetExpenditure">
      <!-- Table header  -->
      <tr>
        <th itemprop="managementUnitName">Nome da unidade gestora</th>
        <th itemprop="managementUnitID">Código da unidade gestora</th>
        <th itemprop="creditorName">Favorecido</th>
        <th itemprop="identificationNumber">CPF/CNPJ do Favorecido</th>
        <th itemprop="fixedAmount">Valor Fixado da Despesa</th>
        <th itemprop="comittedValue">Valor Empenhado</th>
        <th itemprop="paymentAmount">Valor Pago</th>
        <th itemprop="comittedExpenditureID">Código do Empenho</th>
        <th itemprop="comittedExpenditureDate">Data do Empenho</th>
        <th itemprop="bidID">Número da licitação</th>
        <th itemprop="bidModality">Modalidade da Licitação</th>
        <th itemprop="budgetExpenditureFunction">Função</th>
        <th itemprop="budgetExpenditureSubfunction">Subfunção</th>
        <th itemprop="budgetExpenditureProgram">Programa</th>
        <th itemprop="budgetExpenditureAction">Ação</th>
        <th itemprop="economicCategory">Categoria Econômica</th>
        <th itemprop="budgetNature">Grupo de Natureza da Despesa</th>
        <th itemprop="budgetExpenditureModality">Modalidade da Despesa</th>
        <th itemprop="budgetExpenditureElement">Elemento da Despesa</th>
        <th itemprop="comittedExpenditureHistory">Histórico do Empenho</th>
      </tr>
    
      <!-- Data referring to a certain row of the table  -->
      <tr>
        <td itemprop="managementUnitName">Fundo Municipal de Cultura</td>
        <td itemprop="managementUnitID">100301</td>
        <td itemprop="creditorName">ALARIDO PRODUÇÕES ARTÍSTICAS LTDA</td>
        <td itemprop="identificationNumber">20.929.082/0001-60</td>
        <td itemprop="fixedAmount">1230000.00</td>
        <td itemprop="comittedValue">300000.00</td>
        <td itemprop="paymentAmount">300000.00</td>
        <td itemprop="comittedExpenditureID">000006</td>
        <td itemprop="comittedExpenditureDate">05/10/2021</td>
        <td itemprop="bidID">00002/2020</td>
        <td itemprop="bidModality">CONCURSO</td>
        <td itemprop="budgetExpenditureFunction">13 -	Cultura</td>
        <td itemprop="budgetExpenditureSubfunction">392 -	Difusão Cultural</td>
        <td itemprop="budgetExpenditureProgram">5382 -	5382-PROGRAMA DE INCENTIVOS À CULTURA</td>
        <td itemprop="budgetExpenditureAction">1415 -	PROGRAMA DE INCENTIVO A PROJETOS CULTURAIS BENEFICIADOS PELA LEI Nº 9560/2001</td>
        <td itemprop="economicCategory">3 -	DESPESAS CORRENTES</td>
        <td itemprop="budgetNature">3 -	OUTRAS DESPESAS CORRENTES</td>
        <td itemprop="budgetExpenditureModality">90 -	APLICAÇÕES DIRETAS</td>
        <td itemprop="budgetExpenditureElement">33903103 -	PREMIAÇÕES CULTURAIS</td>
        <td itemprop="comittedExpenditureHistory">VALOR REFERENTE AO PAGAMENTO DA PARCELA Nº 01/03 DO EDITAL Nº 002/2020 - PRÊMIO WALFREDO RODRIGUEZ DE PRODUÇÃO AUDIOVISUAL, PROCESSO Nº 010/2020 - FMC, PARA A EXECUÇÃO DAS AÇÕES DO PROJETO MALAIKA - MODALIDADE LOONGA METRAGEM, PELA ALARIDO PRODUÇÕES ARTÍSTICAS LTDA.</td>
      </tr>
    </table>
    \`\`\`
    
    This is an example in HTML using div
    
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/BudgetExpenditure">
      <!-- Table header  -->
      <div>
        <div itemprop="managementUnitName">Nome da unidade gestora</div>
        <div itemprop="managementUnitID">Código da unidade gestora</div>
        <div itemprop="creditorName">Favorecido</div>
        <div itemprop="identificationNumber">CPF/CNPJ do Favorecido</div>
        <div itemprop="fixedAmount">Valor Fixado da Despesa</div>
        <div itemprop="comittedValue">Valor Empenhado</div>
        <div itemprop="paymentAmount">Valor Pago</div>
        <div itemprop="comittedExpenditureID">Código do Empenho</div>
        <div itemprop="comittedExpenditureDate">Data do Empenho</div>
        <div itemprop="bidID">Número da licitação</div>
        <div itemprop="bidModality">Modalidade da Licitação</div>
        <div itemprop="budgetExpenditureFunction">Função</div>
        <div itemprop="budgetExpenditureSubfunction">Subfunção</div>
        <div itemprop="budgetExpenditureProgram">Programa</div>
        <div itemprop="budgetExpenditureAction">Ação</div>
        <div itemprop="economicCategory">Categoria Econômica</div>
        <div itemprop="budgetNature">Grupo de Natureza da Despesa</div>
        <div itemprop="budgetExpenditureModality">Modalidade da Despesa</div>
        <div itemprop="budgetExpenditureElement">Elemento da Despesa</div>
        <div itemprop="comittedExpenditureHistory">Histórico do Empenho</div>
      </div>
      <!-- Data referring to a certain row of the table  -->
      <div>
        <div itemprop="managementUnitName">Fundo Municipal de Cultura</div>
        <div itemprop="managementUnitID">100301</div>
        <div itemprop="creditorName">ALARIDO PRODUÇÕES ARTÍSTICAS LTDA</div>
        <div itemprop="identificationNumber">20.929.082/0001-60</div>
        <div itemprop="fixedAmount">1230000.00</div>
        <div itemprop="comittedValue">300000.00</div>
        <div itemprop="paymentAmount">300000.00</div>
        <div itemprop="comittedExpenditureID">000006</div>
        <div itemprop="comittedExpenditureDate">05/10/2021</div>
        <div itemprop="bidID">00002/2020</div>
        <div itemprop="bidModality">CONCURSO</div>
        <div itemprop="budgetExpenditureFunction">13 -	Cultura</div>
        <div itemprop="budgetExpenditureSubfunction">392 -	Difusão Cultural</div>
        <div itemprop="budgetExpenditureProgram">5382 -	5382-PROGRAMA DE INCENTIVOS À CULTURA</div>
        <div itemprop="budgetExpenditureAction">1415 -	PROGRAMA DE INCENTIVO A PROJETOS CULTURAIS BENEFICIADOS PELA LEI Nº 9560/2001</div>
        <div itemprop="economicCategory">3 -	DESPESAS CORRENTES</div>
        <div itemprop="budgetNature">3 -	OUTRAS DESPESAS CORRENTES</div>
        <div itemprop="budgetExpenditureModality">90 -	APLICAÇÕES DIRETAS</div>
        <div itemprop="budgetExpenditureElement">33903103 -	PREMIAÇÕES CULTURAIS</div>
        <div itemprop="comittedExpenditureHistory">VALOR REFERENTE AO PAGAMENTO DA PARCELA Nº 01/03 DO EDITAL Nº 002/2020 - PRÊMIO WALFREDO RODRIGUEZ DE PRODUÇÃO AUDIOVISUAL, PROCESSO Nº 010/2020 - FMC, PARA A EXECUÇÃO DAS AÇÕES DO PROJETO MALAIKA - MODALIDADE LOONGA METRAGEM, PELA ALARIDO PRODUÇÕES ARTÍSTICAS LTDA.</td>
      </div>
    </div>
    \`\`\`
    `

}
