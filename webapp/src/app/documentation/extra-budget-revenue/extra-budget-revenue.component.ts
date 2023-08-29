import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-extra-budget-revenue',
  templateUrl: './extra-budget-revenue.component.html',
  styleUrls: ['./extra-budget-revenue.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtraBudgetRevenueComponent {

    instructions = `
    # Extrabudgetary Income

    ## Type: ExtraBudgetRevenue
    
    The ExtraBudgetRevenue type has different properties for representing information referring to extrabudgetary revenues, from any and all collections that do not figure in the public budget and do not constitute municipal income. The following are the names of the properties defined by the type:
    
    | PROPERTY | EXPECTED TYPE | DESCRIPTION |
    | ------ | ------ | ------ |
    | managementUnitName | text |  Text field containing the name of the managing unit |
    | managementUnitID | text |  Text field containing the management unit code |
    | realizedAmount | number:float |  Monetary field containing the realized extrabudgetary revenue amount |
    | extraBudgetRevenueSource | text | Text field referring to the classification of the origin of extrabudgetary income |
    | extraBudgetRevenueDescription | text | Text field containing the rubric or description of the extrabudgetary income (the resource must be identifiable) |
    | extraBudgetRevenueID | text |  Text field containing the extrabudgetary revenue code |
    | nomenclature | text |  Text field containing the nomenclature used in the extrabudgetary |
    | extraBudgetRevenueHistory | text |  Text field containing the extrabudgetary income history |
    
    This is an HTML example using table
    \`\`\`html
    <table itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/ExtraBudgetRevenue">
        <caption>Descrição</caption>
        <!-- Table header  -->
        <tr>
            <th itemprop="extraBudgetRevenueID">Código</th>
            <th itemprop="extraBudgetRevenueDescription">Descrição</th>
            <th itemprop="extraBudgetRevenueSource">Origem</th>
            <th itemprop="managementUnitName">Nome da unidade gestora</th>
            <th itemprop="managementUnitID">Código da unidade gestora</th>
            <th itemprop="nomenclature">Nomenclatura Utilizada</th>
            <th itemprop="extraBudgetRevenueHistory">Histórico</th>
            <th itemprop="realizedAmount">Valor Realizado</th>
        </tr>
        <!-- Data referring to a certain row of the table  -->
        <tr>
            <td itemprop="extraBudgetRevenueID">218810108</td>
            <td itemprop="extraBudgetRevenueDescription">ISS</td>
            <td itemprop="extraBudgetRevenueSource">0192000000</td>
            <td itemprop="managementUnitName">Prefeitura Municipal de João Pessoa</td>
            <td itemprop="managementUnitID">08.778.326/0001-56</td>
            <td itemprop="nomenclature">Retenção INSS</td>
            <td itemprop="extraBudgetRevenueHistory">Empenho referente contratação de serviços de consultoria e apoio ao gerenciamento do programa João Pessoa Sustentável, no município de João Pessoa/PB. Financiado com recursos do Contrato de Empréstimo nº 4444/OC-BR (BR-L 1421), firmado entre o município de João Pessoa e o Banco Interamericano de Desenvolvimento - BID. Conforme Contrato nº 02.003/2020 - UEP/GAPRE, da Seleção Baseada na Qualidade e Custo no 01/2018, Processo Administrativo nº 2019/033171.</td>
            <td itemprop="realizedAmount">2527.07</td>
        </tr>
    </table>
    \`\`\`
    
    This is an example in HTML using div
    
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/ExtraBudgetRevenue">
      <!-- Table header  -->
      <div>
          <div itemprop="extraBudgetRevenueID">Código</div>
          <div itemprop="extraBudgetRevenueDescription">Descrição</div>
          <div itemprop="extraBudgetRevenueSource">Origem</div>
          <div itemprop="managementUnitName">Nome da unidade gestora</div>
          <div itemprop="managementUnitID">Código da unidade gestora</div>
          <div itemprop="nomenclature">Nomenclatura Utilizada</div>
          <div itemprop="extraBudgetRevenueHistory">Histórico</div>
          <div itemprop="realizedAmount">Valor Realizado</div>
      </div>
      <!-- Data referring to a certain row of the table  -->
      <div>
        <div itemprop="extraBudgetRevenueID">218810108</div>
        <div itemprop="extraBudgetRevenueDescription">ISS</div>
        <div itemprop="extraBudgetRevenueSource">0192000000</div>
        <div itemprop="managementUnitName">Prefeitura Municipal de João Pessoa</div>
        <div itemprop="managementUnitID">08.778.326/0001-56</div>
        <div itemprop="nomenclature">Retenção INSS</div>
        <div itemprop="extraBudgetRevenueHistory">Empenho referente contratação de serviços de consultoria e apoio ao gerenciamento do programa João Pessoa Sustentável, no município de João Pessoa/PB. Financiado com recursos do Contrato de Empréstimo nº 4444/OC-BR (BR-L 1421), firmado entre o município de João Pessoa e o Banco Interamericano de Desenvolvimento - BID. Conforme Contrato nº 02.003/2020 - UEP/GAPRE, da Seleção Baseada na Qualidade e Custo no 01/2018, Processo Administrativo nº 2019/033171.</div>
        <div itemprop="realizedAmount">2527.07</div>
    </div>
    \`\`\`
    `
}
