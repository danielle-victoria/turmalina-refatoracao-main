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
  # Contrato

  ## Tipo: Contract
  
  O tipo Contract possui diversas propriedades que representam as informações básicas que compõem um contrato administrativo, por meio do qual partes que tenham interesses diversos realizam acordos ou ajustes, transferindo entre si algum direito ou se sujeitando a alguma obrigação. A seguir estão os nomes das propriedades definidas do tipo:
  
  | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
  | ------------- | ------------- | ------------- |
  | managementUnitName | text | Campo texto contendo o nome da unidade gestora contratante interessado |
  | managementUnitID | text | Campo texto contendo o código da unidade gestora contratante interessado |
  | contractorName | text | Campo texto contendo o nome do contratado |
  | identificationNumber | text | Campo numérico contendo o CPF/CNPJ do contratado |
  | publicationDate | date | Data referente à publicação do extrato de contrato (formato DD/MM/YYYY) |
  | validityDate | date | Data de vigência do contrato (formação DD/MM/YYYY) |
  | contractAmount | number:float | Campo monetário contendo o valor contratado |
  | object | text | Campo referente à descrição do objeto do contrato |
  | contractID | text | Campo texto contendo o código de identificação do contrato |
  
  Esse é um exemplo em HTML utilizando table
  
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
  
      <!-- Data referring to a certain row of the table  -->
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
  
  Esse é um exemplo em HTML utilizando div
  
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
    <!-- Data referring to a certain row of the table -->
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