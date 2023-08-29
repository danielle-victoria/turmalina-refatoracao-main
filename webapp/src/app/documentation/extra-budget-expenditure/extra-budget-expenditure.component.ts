import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-extra-budget-expenditure',
  templateUrl: './extra-budget-expenditure.component.html',
  styleUrls: ['./extra-budget-expenditure.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtraBudgetExpenditureComponent {

    instructions = `
    # Despesa Extraorçamentária

    ## Tipo: ExtraBudgetExpenditure
    
    O tipo ExtraBudgetExpenditure possui diferentes propriedades para representação de informações referentes às despesas extraorçamentárias, despesas que não precisam de autorização legislativa para serem realizadas, ou seja, que não integram o orçamento público. Também estão aqui inseridas as propriedades referentes aos empenhos dessas despesas, por meio do qual realiza-se reserva de valores monetários autorizados para atender um fim específico que cria para o município uma obrigação de pagamento pendente. A seguir estão os nomes das propriedades definidas pelo tipo:
    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | paymentAmount | number:float | Campo monetário contendo o valor pago da despesa extraorçamentária |
    | managementUnitName | text | Campo texto contendo o nome da unidade gestora |
    | managementUnitID | text | Campo texto contendo o código da unidade gestora |
    | extraBudgetExpenditureID | text |  Campo texto contendo o código adotado da despesa extraorçamentária |
    | extraBudgetExpenditureNomenclature | text |  Campo texto contendo a nomenclatura utilizada da despesa extraorçamentária |
    | moveDate | date |  Data de movimentação da despesa extraorçamentária |
    | extraBudgetExpenditureDescription | text |  Campo texto contendo a descrição da despesa extraorçamentária |
    | tabID | text | Campo referente ao número da guia da despesa extraorçamentária licitada |
    | tabDate | date | Campo texto referente a data da guia da despesa extraorçamentária licitada (formato DD/MM/YYYY)|
    | creditorName | text | Campo texto contendo o nome do credor |
    | identificationNumber | text | Campo texto contendo o CPF ou CNPJ do credor |
    | tabHistory | text | Campo texto contendo a descrição do histórico da guia |
    
    Esse é um exemplo em HTML utilizando table
    \`\`\`html
    <table itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/ExtraBudgetExpenditure">
        <caption>Descrição</caption>
        <!-- Table header  -->
        <tr>
            <th itemprop="managementUnitName">Nome da unidade gestora</th>
            <th itemprop="managementUnitID">Código da unidade gestora</th>
            <th itemprop="creditorName">Favorecido</th>
            <th itemprop="identificationNumber">CPF/CNPJ do Favorecido</th>
            <th itemprop="paymentAmount">Valor Pago</th>
            <th itemprop="tabID">Número da Guia</th>
            <th itemprop="tabDate">Data da Guia</th>
            <th itemprop="tabHistory">Histórico da Guia</th>
            <th itemprop="extraBudgetExpenditureID">Código Adotado</th>
            <th itemprop="extraBudgetExpenditureNomenclature">Nomenclatura Utilizada</th>
            <th itemprop="moveDate">Data de Movimentação</th>
            <th itemprop="extraBudgetExpenditureDescription">Descrição</th>
        </tr>
        <!-- Data referring to a certain row of the table  -->
        <tr>
            <td itemprop="managementUnitName">Fundação Cultural de João Pessoa</td>
            <td itemprop="managementUnitID">100301</td>
            <td itemprop="creditorName">01402285000150 - DENTAL GOLD ASSISTENCIA ODONTOLOGICA LTDA</td>
            <td itemprop="identificationNumber">01.402.285/0001-50</td>
            <td itemprop="paymentAmount">59.63</td>
            <td itemprop="tabID">0018030/2021</td>
            <td itemprop="tabDate">19/02/2021</td>
            <td itemprop="tabHistory">VALOR REFERENTE A PAGAMENTO DE RETENÇÕES FEITAS DURANTE O MES DE JANEIRO 2021 - PP DE DENTAL GOLD</td>
            <td itemprop="extraBudgetExpenditureID">218810199</td>
            <td itemprop="extraBudgetExpenditureNomenclature">Retenção INSS</td>
            <td itemprop="moveDate">19/02/2021</td>
            <td itemprop="extraBudgetExpenditureDescription">120 - Dental Gold</td>
        </tr>
    </table>
    \`\`\`
    
    Esse é um exemplo em HTML utilizando div
    
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/ExtraBudgetExpenditure">
      <!-- Table header -->
      <div>
        <div itemprop="managementUnitName">Nome da unidade gestora</div>
        <div itemprop="managementUnitID">Código da unidade gestora</div>
        <div itemprop="creditorName">Favorecido</div>
        <div itemprop="identificationNumber">CPF/CNPJ do Favorecido</div>
        <div itemprop="paymentAmount">Valor Pago</div>
        <div itemprop="tabID">Número da Guia</div>
        <div itemprop="tabDate">Data da Guia</div>
        <div itemprop="tabHistory">Histórico da Guia</div>
        <div itemprop="extraBudgetExpenditureID">Código Adotado</div>
        <div itemprop="extraBudgetExpenditureNomenclature">Nomenclatura Utilizada</div>
        <div itemprop="moveDate">Data de Movimentação</div>
        <div itemprop="extraBudgetExpenditureDescription">Descrição</div>
      </div>
      <!-- Data referring to a certain row of the table  -->
      <div>
        <div itemprop="managementUnitName">Fundação Cultural de João Pessoa</div>
        <div itemprop="managementUnitID">100301</div>
        <div itemprop="creditorName">01402285000150 - DENTAL GOLD ASSISTENCIA ODONTOLOGICA LdivA</div>
        <div itemprop="identificationNumber">01.402.285/0001-50</div>
        <div itemprop="paymentAmount">59.63</div>
        <div itemprop="tabID">0018030/2021</div>
        <div itemprop="tabDate">19/02/2021</div>
        <div itemprop="tabHistory">VALOR REFERENTE A PAGAMENTO DE RETENÇÕES FEITAS DURANTE O MES DE JANEIRO 2021 - PP DE DENTAL GOLD</div>
        <div itemprop="extraBudgetExpenditureID">218810199</div>
        <div itemprop="extraBudgetExpenditureNomenclature">Retenção INSS</div>
        <div itemprop="moveDate">19/02/2021</div>
        <div itemprop="extraBudgetExpenditureDescription">120 - Dental Gold</div>
    </div>
    \`\`\`
    `

}