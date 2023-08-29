import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-planning-instrument',
  templateUrl: './planning-instrument.component.html',
  styleUrls: ['./planning-instrument.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanningInstrumentComponent {

    instructions = `
    # Instrumentos de Planejamento

    O tipo referente aos instrumentos de planejamento possui diferentes propriedades para representação dos documentos do Plano Plurianual, da Lei de Diretrizes Orçamentárias e da Lei Orçamentária Anual do município. A seguir estão os nomes das propriedades definidas do tipo:
    
    ## Tipo: PlanningInstrument
    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | multiyearPlan | URL | Campo contendo o link do documento referente ao Plano Plurianual (PPA) do município |
    | budgetGuidelinesLaw | URL |  Campo contendo o link do documento referente à Lei de Diretrizes Orçamentárias (LDO) do município |
    | annualBudgetLaw | URL |  Campo contendo o link do documento referente à Lei Orçamentária Anual (LOA) do município |
    
    Esse é um exemplo em HTML utilizando table
    \`\`\`html
    <table itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/PlanningInstrument">
        <!-- Table header  -->
        <tr>
            <th itemprop="multiyearPlan">Plano Plurianual (PPA)</th>
            <th itemprop="budgetGuidelinesLaw">Lei de Diretrizes Orçamentárias (LDO)</th>
            <th itemprop="annualBudgetLaw">Lei Orçamentária Anual (LOA)</th>
        </tr>
        <!-- Dados referentes a certa linha da tabela  -->
        <tr>
            <td itemprop="multiyearPlan"><a>href="http://pocinhos.pb.gov.br/wp-content/uploads/2021/01/LDO-2021-1.pdf">Lei de Diretrizes Orçamentárias 2021</a></td>
            <td itemprop="budgetGuidelinesLaw"><a>href="http://pocinhos.pb.gov.br/wp-content/uploads/2021/01/PPA-Plano-Plurianual-2018-2021.pdf">Lei de PPA – Plano Plurianual 2018-2021</a></td>
            <td itemprop="annualBudgetLaw"><a>href="http://pocinhos.pb.gov.br/wp-content/uploads/2021/01/LOA-2021.pdf">LOA – Lei Orçamentária Anual 2021</a></td>
        </tr>
    </table>
    \`\`\`
    
    Esse é um exemplo em HTML utilizando div
    
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/PlanningInstrument">
      <!-- Table header  -->
      <div>
        <div itemprop="multiyearPlan">Plano Plurianual (PPA)</div>
        <div itemprop="budgetGuidelinesLaw">Lei de Diretrizes Orçamentárias (LDO)</div>
        <div itemprop="annualBudgetLaw">Lei Orçamentária Anual (LOA)</div>
      </div>
      <!-- Data referring to a certain row of the table  -->
      <div>
        <div itemprop="multiyearPlan"><a>href="http://pocinhos.pb.gov.br/wp-content/uploads/2021/01/LDO-2021-1.pdf">Lei de Diretrizes Orçamentárias 2021</a></div>
        <div itemprop="budgetGuidelinesLaw"><a>href="http://pocinhos.pb.gov.br/wp-content/uploads/2021/01/PPA-Plano-Plurianual-2018-2021.pdf">Lei de PPA – Plano Plurianual 2018-2021</a></div>
        <div itemprop="annualBudgetLaw"><a>href="http://pocinhos.pb.gov.br/wp-content/uploads/2021/01/LOA-2021.pdf">LOA – Lei Orçamentária Anual 2021</a></div>
      </div>
    </div>
    \`\`\`
    `

}
