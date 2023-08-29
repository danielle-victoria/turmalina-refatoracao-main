import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-example-one',
  templateUrl: './example-one.component.html',
  styleUrls: ['./example-one.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleOneComponent {

  instructions = ` \`\`\`html
      <!--  MENU 1 -->
      <div itemscope itemtype="Unipt.org/Bid">
          <table>
              <caption>Descrição</caption>
              <!-- Table header  -->
              <tr>
                  <th itemprop="managementUnitName">Nome da unidade gestora</th>
                  <th itemprop="managementUnitID">Código da unidade gestora</th>
                  <th itemprop="bidID">Número da licitação</th>
                  <th itemprop="bidModality">Modalidade de licitação</th>
                  <th itemprop="object">Objeto da licitação</th>
                  <th itemprop="publicationDate">Data da publicação</th>
                  <th itemprop="realizationDate">Data de realização</th>
                  <th itemprop="bidderName">Nome do Participante</th>
                  <th itemprop="identificationNumber">CNPJ do paricipante</th>
                  <th itemprop="bidderProposalAmount">Valor da proposta</th>
              </tr>
              <!-- Data referring to a certain row of the table  -->
              <tr>
                  <td itemprop="managementUnitName">Secretaria Municipal de Saúde</th>
                  <td itemprop="managementUnitID">00000.000-0</th>
                  <td itemprop="bidID">10.017/2021</th>
                  <td itemprop="bidModality">Pregão Eletrônico</th>
                  <td itemprop="object">SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE MEDICAMENTOS DA REDE HOSPITALAR E ESPECIALIZADA</th>
                  <td itemprop="publicationDate">01/04/2021</th>
                  <td itemprop="realizationDate">01/03/2021</th>
                  <td itemprop="bidderName">COMERCIAL VALFARMA LTDA</th>
                  <td itemprop="identificationNumber">02.600.770/0001-09</th>
                  <td itemprop="bidderProposalAmount">R$ 3.535.816,11</th>
              </tr>
          </table>
      </div>
\`\`\` `

}
