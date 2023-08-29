import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-budget-revenue',
  templateUrl: './budget-revenue.component.html',
  styleUrls: ['./budget-revenue.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetRevenueComponent {

    instructions = `
    # Budget Revenue

    ## Type: BudgetRevenue
    
    The BudgetRevenue type has different properties for representing information regarding budgetary revenue collected from various sources in order to meet public expenses resulting from the fulfillment of the functions of the municipality. The following are the names of the properties defined by the type:
    
    | PROPERTY | EXPECTED TYPE | DESCRIPTION |
    | ------ | ------ | ------ |
    | managementUnitName | text | Text field containing the name of the collection management unit |
    | managementUnitID | text | Text field containing the collection management unit code|
    | budgetRevenueSource | text | Text field referring to the classification of the origin of the budget revenue |
    | budgetRevenueDescription | text | Text field containing the rubric or description of the budget revenue (the resource must be identifiable) |
    | predictedAmount | number:float | Monetary field containing the initial budget revenue forecast value |
    | collectionAmount | number:float | Monetary field containing the amount collected from budget revenue |
    
    This is an HTML example using table
    \`\`\`html
    <table itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/BudgetRevenue">
        <!-- Cabeçalho da tabela  -->
        <tr>
            <th itemprop="managementUnitName">Nome da unidade gestora</th>
            <th itemprop="managementUnitID">Código da unidade gestora</th>
            <th itemprop="budgetRevenueSource">Origem da Receita</th>
            <th itemprop="budgetRevenueDescription">Descrição</th>
            <th itemprop="predictedAmount">Valor Previsto</th>
            <th itemprop="collectionAmount">Valor Arrecadado</th>
        </tr>
        <!-- Data referring to a certain row of the table  -->
        <tr>
            <td itemprop="managementUnitName">Fundo Municipal de Saúde de João Pessoa</td>
            <td itemprop="managementUnitID">00000.000-0</td>
            <td itemprop="budgetRevenueSource">E0.229-Outros Recursos Vinculados à Saúde</td>
            <td itemprop="budgetRevenueDescription">TAXAS DE INSPEÇÃO, CONTROLE E FISCALIZAÇÃO - PRINCIPAL</td>
            <td itemprop="predictedAmount">0.00</td>
            <td itemprop="collectionAmount">69825.55</td>
        </tr>
    </table>
    \`\`\`
    This is an example in HTML using div
    
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/BudgetRevenue">
        <!-- Cabeçalho da tabela  -->
        <div>
            <div itemprop="managementUnitName">Nome da unidade gestora</div>
            <div itemprop="managementUnitID">Código da unidade gestora</div>
            <div itemprop="budgetRevenueSource">Origem da Receita</div>
            <div itemprop="budgetRevenueDescription">Descrição</div>
            <div itemprop="predictedAmount">Valor Previsto</div>
            <div itemprop="collectionAmount">Valor Arrecadado</div>
        </div>
        <!-- Data referring to a certain row of the table  -->
        <div>
            <div itemprop="managementUnitName">Fundo Municipal de Saúde de João Pessoa</div>
            <div itemprop="managementUnitID">00000.000-0</div>
            <div itemprop="budgetRevenueSource">E0.229-Outros Recursos Vinculados à Saúde</div>
            <div itemprop="budgetRevenueDescription">TAXAS DE INSPEÇÃO, CONTROLE E FISCALIZAÇÃO - PRINCIPAL</div>
            <div itemprop="predictedAmount">0.00</div>
            <div itemprop="collectionAmount">69825.55</div>
        </div>
    </div>
    \`\`\`
    `

}
