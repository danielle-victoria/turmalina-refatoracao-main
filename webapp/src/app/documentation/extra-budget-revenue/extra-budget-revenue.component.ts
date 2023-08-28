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
    # Receitas Extraorçamentárias

    ## Tipo: ExtraBudgetRevenue
    
    O tipo ExtraBudgetRevenue possui diferentes propriedades para representação de informações referentes às receitas extraorçamentárias, provenientes de toda e qualquer arrecadação que não figure no orçamento público e não constitua renda do município. A seguir estão os nomes das propriedades definidas pelo tipo:
    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | managementUnitName | text |  Campo texto contendo o nome da unidade gestora |
    | managementUnitID | text |  Campo texto contendo o código da unidade gestora |
    | realizedAmount | number:float |  Campo monetário contendo o valor realizado receita extraorçamentária |
    | extraBudgetRevenueSource | text | Campo texto referente à classificação da origem da receita extraorçamentária |
    | extraBudgetRevenueDescription | text | Campo texto contendo a rúbrica ou descrição da receita extraorçamentária (o recurso precisa ser identificável) |
    | extraBudgetRevenueID | text |  Campo texto contendo o código da receita extraorçamentária |
    | nomenclature | text |  Campo texto contendo a nomenclatura utilizada na extraorçamentária |
    | extraBudgetRevenueHistory | text |  Campo texto contendo o histórico receita extraorçamentária |
    
    Esse é um exemplo em HTML utilizando table
    \`\`\`html
    <table itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/ExtraBudgetRevenue">
        <caption>Descrição</caption>
        <!-- Cabeçalho da tabela  -->
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
        <!-- Dados referentes a certa linha da tabela  -->
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
    
    Esse é um exemplo em HTML utilizando div
    
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/ExtraBudgetRevenue">
      <!-- Cabeçalho da tabela  -->
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
      <!-- Dados referentes a certa linha da tabela  -->
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
