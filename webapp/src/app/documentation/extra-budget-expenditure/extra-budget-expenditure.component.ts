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
    # Extrabudgetary Expense

    ## Type: ExtraBudgetExpenditure
    
    The ExtraBudgetExpenditure type has different properties for representing information regarding extrabudgetary expenses, expenses that do not need legislative authorization to be carried out, that is, that are not part of the public budget. Also included here are the properties related to the commitments of these expenses, through which authorized monetary values ​​are reserved to meet a specific purpose that creates a pending payment obligation for the municipality. The following are the names of the properties defined by the type:
    
    | PROPERTY | EXPECTED TYPE | DESCRIPTION |
    | ------ | ------ | ------ |
    | paymentAmount | number:float | Monetary field containing the amount paid for the extrabudgetary expense |
    | managementUnitName | text | Text field containing the name of the managing unit |
    | managementUnitID | text | Text field containing the management unit code |
    | extraBudgetExpenditureID | text |  Text field containing the code adopted for the extrabudgetary expense |
    | extraBudgetExpenditureNomenclature | text |  Text field containing the nomenclature used for the extrabudgetary expense |
    | moveDate | date |  Extrabudgetary expense movement date |
    | extraBudgetExpenditureDescription | text |  Text field containing the description of the extrabudgetary expense |
    | tabID | text | Field referring to the number of the bid extrabudgetary expense slip |
    | tabDate | date | Text field referring to the date of the bid extrabudgetary expense tab (DD/MM/YYYY format)|
    | creditorName | text | Text field containing the name of the creditor |
    | identificationNumber | text | Text field containing the creditor's CPF or CNPJ |
    | tabHistory | text | Text field containing the tab history description |
    
    This is an HTML example using table
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
    
    This is an example in HTML using div
    
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/ExtraBudgetExpenditure">
      <!-- Table header  -->
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
