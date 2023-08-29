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
    # Historical Series
    
    To evaluate the existence of tools that allow the user to consult data from previous years, three classes were created. Each one identifies a specific component that together assemble the selectors of the portal's historical series. That is, there is a tool made up of these components which gives access to the history of expenses, budgets, processes, etc. The classes are used according to the table below:

    
    | PROPERTY | EXPECTED TYPE | DESCRIPTION |
    | ------ | ------ | ------ |
    | tm-date | classe | Field which has a class with the term "tm-date". This field is a **FULL DATES** selector for historical series|
    | tm-month | classe | Field which has a class with the term "tm-month". This field is a **MONTHS** selector of historical series |
    | tm-year | classe | Field which has a class with the term "tm-year". This field is a **YEARS** selector of historical series |

    These are some examples of implementation of the historical series form.
    Different HTML structures can be found when consulting the portals. \n\n
    **Example 1**
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
