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
    # Receitas Orçamentárias

    ## Tipo: BudgetRevenue
    
    O tipo BudgetRevenue possui diferentes propriedades para representação de informações referentes às receitas orçamentárias, arrecadadas a partir de diversas fontes a fim de atender às despesas públicas decorrentes do cumprimento das funções do município. A seguir estão os nomes das propriedades definidas pelo tipo:
    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | managementUnitName | text | Campo texto contendo o nome da unidade gestora arrecadadora |
    | managementUnitID | text | Campo texto contendo o código da unidade gestora arrecadadora|
    | budgetRevenueSource | text | Campo texto referente à classificação da origem da receita orçamentária |
    | budgetRevenueDescription | text | Campo texto contendo a rúbrica ou descrição da receita orçamentária (o recurso precisa ser identificável) |
    | predictedAmount | number:float | Campo monetário contendo o valor da previsão inicial da receita orçamentária |
    | collectionAmount | number:float | Campo monetário contendo o valor arrecadado da receita orçamentária |
    
    Esse é um exemplo em HTML utilizando table
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
        <!-- Dados referentes a certa linha da tabela  -->
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
    Esse é um exemplo em HTML utilizando div
    
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
        <!-- Dados referentes a certa linha da tabela  -->
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
