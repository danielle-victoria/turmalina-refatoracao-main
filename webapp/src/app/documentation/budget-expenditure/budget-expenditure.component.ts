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
    # Despesa Orçamentária

    ## Tipo: BudgetExpenditure
    
    O tipo BudgetExpenditure possui diferentes propriedades para representação de informações referentes às despesas orçamentárias, compromisso de gasto de recursos públicos, autorizados pelo Poder competente, com o intuito de atender a uma necessidade coletiva prevista no orçamento. Também estão aqui inseridas as propriedades referentes aos empenhos de despesa, por meio do qual realiza-se reserva de valores monetários autorizados para atender um fim específico que cria para o município uma obrigação de pagamento pendente. A seguir estão os nomes das propriedades definidas pelo tipo:
    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | fixedAmount | number:float | Campo monetário contendo o valor do orçamento fixado pela Lei Orçamentária Anual |
    | paymentAmount | number:float | Campo monetário contendo o valor pago da despesa orçamentária |
    | managementUnitName | text | Campo texto contendo o nome da unidade gestora |
    | managementUnitID | text | Campo texto contendo o código da unidade gestora |
    | budgetExpenditureFunction | text | Campo texto contendo a descrição da função/finalidade da despesa orçamentária |
    | budgetExpenditureSubfunction | text | Campo texto contendo a descrição da subfunção da despesa orçamentária |
    | budgetExpenditureProgram | text | Campo texto contendo o programa da despesa orçamentária |
    | budgetExpenditureAction | text | Campo texto contendo a ação da despesa orçamentária |
    | economicCategory | text | Campo referente à classificação da categoria econômica da despesa orçamentária |
    | budgetNature| text | Campo referente à classificação da natureza da despesa orçamentária |
    | budgetExpenditureModality | text | Campo texto contendo a modalidade da despesa orçamentária |
    | budgetExpenditureElement | text |  Campo texto contendo o elemento da despesa orçamentária |
    | comittedExpenditureID | text | Campo referente ao número da nota de empenho da despesa orçamentária licitada |
    | comittedExpenditureDate | date | Data do empenho da despesa orçamentária licitada (formato DD/MM/YYYY)|
    | creditorName | text | Campo texto contendo o nome do favorecido |
    | identificationNumber | text | Campo texto contendo o CPF ou CNPJ do favorecido |
    | bidID | text | Campo texto referente ao número de ordem da licitação da despesa orçamentária licitada |
    | bidModality | text | Campo texto contendo o nome da modalidade de licitação da despesa orçamentária licitada |
    | comittedValue | number:float | Campo referente ao valor empenhado da despesa orçamentária licitada |
    | comittedExpenditureHistory | text | Campo texto contendo a descrição do histórico do empenho |
    
    Esse é um exemplo em HTML utilizando table
    
    \`\`\`html
    <table itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/BudgetExpenditure">
      <!-- Cabeçalho da tabela  -->
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
    
      <!-- Dados referentes a certa linha da tabela  -->
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
    
    Esse é um exemplo em HTML utilizando div
    
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/BudgetExpenditure">
      <!-- Cabeçalho da tabela  -->
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
      <!-- Dados referentes a certa linha da tabela  -->
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
