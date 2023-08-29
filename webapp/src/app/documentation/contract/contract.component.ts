import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractComponent  {

  instructions = `
  # Contract

  ## Type: Contract
  
  The Contract type has several properties that represent the basic information that make up an administrative contract, through which parties with different interests make agreements or adjustments, transferring some right or subjecting themselves to some obligation. The following are the names of the type's defined properties:
  
  | PROPERTY | EXPECTED TYPE | DESCRIPTION |
  | ------------- | ------------- | ------------- |
  | managementUnitName | text | Text field containing the name of the interested contracting management unit |
  | managementUnitID | text | Text field containing the interested contracting management unit code |
  | contractorName | text | Text field containing the contractor's name |
  | identificationNumber | text | Numeric field containing the contractor's CPF/CNPJ |
  | publicationDate | date | Date referring to the publication of the contract extract (DD/MM/YYYY format) |
  | validityDate | date | Effective date of the contract (DD/MM/YYYY formation) |
  | contractAmount | number:float | Monetary field containing the contracted amount |
  | object | text | Field referring to the description of the object of the contract |
  | contractID | text | Text field containing the contract identification code |
  
  This is an HTML example using table
  
  \`\`\`html
  <table itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/Contract">
      <!-- Table header  -->
      <tr>
          <th itemprop="managementUnitName">Nome da unidade gestora</th>
          <th itemprop="managementUnitID">Código da unidade gestora</th>
          <th itemprop="contractID">Código do contrato</th>
          <th itemprop="contractorName">Nome do contratado</th>
          <th itemprop="identificationNumber">CPF/CNPJ do contratado</th>
          <th itemprop="object">Objeto do Contrato</th>
          <th itemprop="publicationDate">Data da publicação</th>
          <th itemprop="validityDate">Início Vigência</th>
          <th itemprop="validityDate">Fim Vigência</th>
          <th itemprop="contractAmount">Valor Contratado</th>
      </tr>
  
      <!-- Data referring to each row of the table  -->
      <tr>
          <td itemprop="managementUnitName">Secretaria Municipal de Saúde - SMS</td>
          <td itemprop="managementUnitID">2030</td>
          <td itemprop="contractID">106982021</td>
          <td itemprop="contractorName">ANTONIO CAVALCANTE PINTO NETO EIRELI</td>
          <td itemprop="identificationNumber">32.127.100/0001-70</td>
          <td itemprop="object">SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE ANTIBIÓTICOS DA REDE HOSPITALAR DO MUNICIPIO</td>
          <td itemprop="publicationDate">21/09/2021</td>
          <td itemprop="validityDate">21/09/2021</td>
          <td itemprop="validityDate">31/12/2021</td>
          <td itemprop="contractAmount">239280.00</td>
      </tr>
  </table>
  \`\`\`
  
  This is an example in HTML using div
  
  \`\`\`html
  <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/Contract">
    <!-- Table header  -->
    <div>
      <div itemprop="managementUnitName">Nome da unidade gestora</div>
      <div itemprop="managementUnitID">Código da unidade gestora</div>
      <div itemprop="contractID">Código do contrato</div>
      <div itemprop="contractorName">Nome do contratado</div>
      <div itemprop="identificationNumber">CPF/CNPJ do contratado</div>
      <div itemprop="object">Objeto do contrato</div>
      <div itemprop="publicationDate">Data da publicação</div>
      <div itemprop="validityDate">Início da vigência</div>
      <div itemprop="validityDate">Fim da Vigência</div>
      <div itemprop="contractAmount">Valor Contratado</div>
    </div>
    <!-- Data referring to a certain row of the table  -->
    <div>
      <div itemprop="managementUnitName">Secretaria Municipal de Saúde - SMS</div>
      <div itemprop="managementUnitID">2030</div>
      <div itemprop="contractID">106982021a</div>
      <div itemprop="contractorName">ANTONIO CAVALCANTE PINTO NETO EIRELI</div>
      <div itemprop="identificationNumber">32.127.100/0001-70</div>
      <div itemprop="object">SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE ANTIBIÓTICOS DA REDE HOSPITALAR DO MUNICIPIO</div>
      <div itemprop="publicationDate">21/09/2021</div>
      <div itemprop="validityDate">21/09/2021</div>
      <div itemprop="validityDate">31/12/2021</div>
      <div itemprop="contractAmount">239280.00</div>
    </div>
  </div>
  \`\`\`
  `
}
