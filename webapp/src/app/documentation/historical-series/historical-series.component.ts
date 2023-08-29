import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-historical-series',
  templateUrl: './historical-series.component.html',
  styleUrls: ['./historical-series.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoricalSeriesComponent {
  instructions = `
    # Séries Históricas
    
    Para avaliar a existência de ferramentas que permitam ao usuário consultar dados de anos anteriores, três classes foram criadas. Cada uma identifica um componente específico que juntos montam os seletores das séries históricas do portal. Isto é, existe uma ferramenta constituída por esses componentes a qual dá acesso ao histórico de gastos, orçamentos, processos, etc. As classes são utilizadas conforme a tabela abaixo:

    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | tm-date | classe | Campo o qual possui uma classe com o termo "tm-date". Esse campo é um seletor de **DATAS COMPLETAS** das séries históricas|
    | tm-month | classe | Campo o qual possui uma classe com o termo "tm-month". Esse campo é um seletor de **MESES** das séries históricas |
    | tm-year | classe | Campo o qual possui uma classe com o termo "tm-year".  Esse campo é um seletor de **ANOS** das séries históricas |

    Esses são alguns exemplos de implementação do formulário de séries históricas. 
    Podem ser encontradas diferentes estruturas HTML ao consultar os portais. \n\n
    **Exemplo 1**
    \`\`\`html
    <div>
        <form action="">
            <input class= "tm-date" type="date">
        </form>
    </div>
    \`\`\`
    **Exemplo 2**
    \`\`\`html
    <div>
        <form action="">
            <input value="2018" class= "tm-year" type="button">
            <input value="2019" class= "tm-year" type="button">
        </form>
    </div>
    \`\`\`
    **Exemplo 3**
    \`\`\`html
    <div>
        <form action="">
            <input class= "tm-date" type="date">
            <input class="tm-month" type="month">
            <input value="2022" class="tm-year" type="button">
        </form>
    </div>
    \`\`\`
    `;
}