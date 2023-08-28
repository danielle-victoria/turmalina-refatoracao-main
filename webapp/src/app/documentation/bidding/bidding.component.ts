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
    # Procedimentos Licitatórios

    ## Tipo: Bidding
    
    O tipo referente aos procedimentos licitatórios (Bidding) possui diferentes propriedades para representação de informações sobre as licitações públicas, por meio do qual o munícipio pode realizar contratações de obras, serviços, compras e alienações. A seguir estão os nomes de todas as propriedades definidas pelo tipo:
    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------------- | ------------- | ------------- |
    | notice | URL | Campo contendo o link do documento referente ao edital do procedimento licitatório |
    | bidModality | text | Campo texto contendo o nome da modalidade de licitação |
    | managementUnitName | text | Campo texto contendo o nome da unidade gestora do setor interessado |
    | managementUnitID | text | Campo texto contendo o código da unidade gestora do setor interessado |
    | publicationDate | date | Data referente à publicação do edital de licitação (formato DD/MM/YYYY) |
    | realizationDate | date | Data de realização da licitação (formato DD/MM/YYYY) |
    | bidID | text | Campo texto contendo o número da licitação |
    | object | text | Campo texto referente à descrição do objeto da licitação |
    | bidderName | text | Campo texto contendo o nome do licitante (vencedor ou perdedor) |
    | identificationNumber | text | Campo numérico contendo o CPF/CNPJ do licitante (vencedor ou perdedor) |
    | bidderProposalAmount | number:float | Campo monetário contendo o valor do último lance da proposta do licitante (vencedor ou perdedor) |
    
    Esse é um exemplo em HTML utilizando table
    
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
      <!-- Dados referentes a certa linha da tabela  -->
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
    
    Esse é um exemplo em HTML utilizando div
    
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/Bidding">
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
        <div itemprop="notice">Edital</div>
      </div>
      <!-- Dados referentes a certa linha da tabela  -->
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
