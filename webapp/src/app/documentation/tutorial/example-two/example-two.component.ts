import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-example-two',
  templateUrl: './example-two.component.html',
  styleUrls: ['./example-two.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleTwoComponent {

  instructions = ` \`\`\`html
      <!--  MENU 2 -->
      <div itemscope itemtype="Unipt.org/Bid">
          <div>
              <caption>Descrição</caption>
              <!-- Cabeçalho da tabela  -->
              <div>
                  <div itemprop="managementUnitName">Nome da unidade gestora</div>
                  <div itemprop="managementUnitID">Código da unidade gestora</div>
                  <div itemprop="bidID">Número da licitação</div>
                  <div itemprop="bidModality">Modalidade de licitação</div>
                  <div itemprop="object">Objeto da licitação</div>
                  <div itemprop="publicationDate">Data da publicação</div>
                  <div itemprop="realizationDate">Data de realização</div>
                  <div itemprop="bidderName">Nome do Participante</div>
                  <div itemprop="identificationNumber">CNPJ do paricipante</div>
                  <div itemprop="bidderProposalAmount">Valor da proposta</div>
              </div>
              <!-- Dados referentes a certa linha da tabela  -->
              <div>
                  <div itemprop="managementUnitName">Secretaria Municipal de Saúde</div>
                  <div itemprop="managementUnitID">00000.000-0</div>
                  <div itemprop="bidID">10.017/2021</div>
                  <div itemprop="bidModality">Pregão Eletrônico</div>
                  <div itemprop="object">SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE MEDICAMENTOS DA REDE HOSPITALAR E ESPECIALIZADA</div>
                  <div itemprop="publicationDate">01/04/2021</div>
                  <div itemprop="realizationDate">01/03/2021</div>
                  <div itemprop="bidderName">COMERCIAL VALFARMA LTDA</div>
                  <div itemprop="identificationNumber">02.600.770/0001-09</div>
                  <div itemprop="bidderProposalAmount">R$ 3.535.816,11</div>
              </div>
          </div>
      </div>
\`\`\` `

}
