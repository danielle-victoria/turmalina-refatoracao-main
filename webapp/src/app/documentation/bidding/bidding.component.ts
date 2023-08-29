import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BiddingComponent {

    instructions = `
    # Bidding Procedures

    ## Type: Bidding
    
    The type referring to bidding procedures (Bidding) has different properties for representing information about public biddings, through which the municipality can contract works, services, purchases and disposals. Following are the names of all properties defined by the type:
    
    | PROPERTY | EXPECTED TYPE | DESCRIPTION |
    | ------------- | ------------- | ------------- |
    | notice | URL | Field containing the link to the document referring to the public notice of the bidding procedure |
    | bidModality | text | Text field containing the name of the bidding modality |
    | managementUnitName | text | Text field containing the name of the management unit of the interested sector |
    | managementUnitID | text | Text field containing the management unit code of the interested sector |
    | publicationDate | date | Date referring to the publication of the bidding notice (DD/MM/YYYY format) |
    | realizationDate | date | Bidding date (DD/MM/YYYY format) |
    | bidID | text | Text field containing the bid number |
    | object | text | Text field referring to the description of the object of the bidding |
    | bidderName | text | Text field containing the name of the bidder (winner or loser) |
    | identificationNumber | text | Numerical field containing the CPF/CNPJ of the bidder (winner or loser) |
    | bidderProposalAmount | number:float | Monetary field containing the last bid amount of the bidder's proposal (winner or loser) |
    
    This is an HTML example using table
    
    \`\`\`html
    <table itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/Bidding">
      <!-- Cabeçalho da tabela  -->
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
        <th itemprop="notice">Edital</th>
      </tr>
      <!-- Data referring to a certain row of the table  -->
      <tr>
        <td itemprop="managementUnitName">Secretaria de Administração</td>
        <td itemprop="managementUnitID">201151</td>
        <td itemprop="bidID">000012021</td>
        <td itemprop="bidModality">Pregão Eletrônico</td>
        <td itemprop="object">
            REGISTRO DE PREÇOS PARA EVENTUAL CONTRATAÇÃO DE EMPRESA ESPECIALIZADA SERVIÇO DE CONTRATAÇÃO DE SEGURO PARA ESTAGIÁRIOS, PARA ATENDER AS NECESSIDADES DA SECRETARIA DE ADMINISTRAÇÃO – SEAD.
        </td>
        <td itemprop="publicationDate">08/07/2021</td>
        <td itemprop="realizationDate">20/08/2021</td>
        <td itemprop="bidderName">BRASILSEG COMPANHIA DE SEGUROS</td>
        <td itemprop="identificationNumber">28.196.889/0001-43</td>
        <td itemprop="bidderProposalAmount">1440.00</td>
        <td itemprop="notice"><a href="https://transparencia.joaopessoa.pb.gov.br:8080/licitacoes/visualizar-arquivo?id=37710">Edital</a></td>
      </tr>
    </table>
    \`\`\`
    
    This is an example in HTML using div
    
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/Bidding">
      <!-- Table header  -->
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
        <div itemprop="notice">Edital</div>
      </div>
      <!-- Data referring to a certain row of the table  -->
      <div>
        <div itemprop="managementUnitName">Secretaria de Administração</div>
        <div itemprop="managementUnitID">201151</div>
        <div itemprop="bidID">000012021</div>
        <div itemprop="bidModality">Pregão Eletrônico</div>
        <div itemprop="object">
          REGISTRO DE PREÇOS PARA EVENTUAL CONTRATAÇÃO DE EMPRESA ESPECIALIZADA SERVIÇO DE CONTRATAÇÃO DE SEGURO PARA ESTAGIÁRIOS, PARA ATENDER AS NECESSIDADES DA SECRETARIA DE ADMINISTRAÇÃO – SEAD.
        </div>
        <div itemprop="publicationDate">08/07/2021</div>
        <div itemprop="realizationDate">20/08/2021</div>
        <div itemprop="bidderName">BRASILSEG COMPANHIA DE SEGUROS</div>
        <div itemprop="identificationNumber">28.196.889/0001-43</div>
        <div itemprop="bidderProposalAmount">1440.00</div>
        <div itemprop="notice"><a href="https://transparencia.joaopessoa.pb.gov.br:8080/licitacoes/visualizar-arquivo?id=37710">Edital</a></div>
      </div>
    </div>
    \`\`\`
    `
}
