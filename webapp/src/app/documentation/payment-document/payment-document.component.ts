import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-payment-document',
  templateUrl: './payment-document.component.html',
  styleUrls: ['./payment-document.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentDocumentComponent {

    instructions = `
    # Payment Document

    ## Type: PaymentDocument
    
    The PaymentDocument type has several properties that represent the basic information that make up a payment document, stage of public expenditure in which the public unit makes the payment to the entity responsible for providing the service or supplying the good, receiving the due discharge. The following are the names of the type's defined properties:
    
    | PROPERTY | EXPECTED TYPE | DESCRIPTION |
    | ------ | ------ | ------ |
    | managementUnitName | text | Text field containing the name of the issuing management unit|
    | managementUnitID | text |  Text field containing the issuer management unit code|
    | bankOperationID | text | Text field containing the identification of the bank operation performed |
    | bankAccountNumber | text | Text field containing the bank account number |
    | paymentDate | date | Field containing payment date (DD/MM/YYYY format)|
    | identificationNumber | text | Text field containing the CPF or CNPJ of the payee |
    | creditorName | text | Text field containing the name of the payee of the payment |
    | paymentAmount | number:float | Monetary field containing the payment amount |
    | fundingSource | text | Text field containing the source of funds for the payment |
    | paymentHistory | text | Text field containing the description of the payment history |
    
    This is an HTML example using table
    
    \`\`\`html
    <table itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/PaymentDocument">
        <!-- Table header  -->
        <tr>
            <th itemprop="managementUnitName">Nome da unidade gestora</th>
            <th itemprop="managementUnitID">Código da unidade gestora</th>
            <th itemprop="bankOperationID">Número da operação bancária</th>
            <th itemprop="bankAccountNumber">Número da conta bancária</th>
            <th itemprop="paymentDate">Data do Pagamento</th>
            <th itemprop="identificationNumber">CNPJ</th>
            <th itemprop="creditorName">Nome do favorecido</th>
            <th itemprop="paymentAmount">Valor do Pagamento</th>
            <th itemprop="fundingSource">Fonte do recurso</th>
            <th itemprop="paymentHistory">Histórico do pagamento</th>
        </tr>
        <!-- Data referring to a certain row of the table  -->
        <tr>
            <td itemprop="managementUnitName">FUNDO MUNICIPAL DE SAUDE</td>
            <td itemprop="managementUnitID">03011</td>
            <td itemprop="bankOperationID">005131 - PAGAMENTO</td>
            <td itemprop="bankAccountNumber">000000134600 - BB C/C 13.460-0 FUNDO M. DE SAUDE</td>
            <td itemprop="paymentDate">15/07/2021</td>
            <td itemprop="identificationNumber">02708218000120</td>
            <td itemprop="creditorName">GILDO JOSE DA SILVA ME</td>
            <td itemprop="paymentAmount">22087.74</td>
            <td itemprop="fundingSource">211 - Receitas de Impostos e de Transferência de Imposto</td>
            <td itemprop="paymentHistory">VALOR QUE ORA SE EMPENHA P ATENDER DESPESA COM AQUISIÇÃO DE MEDICAMENTOS PARA DISTRIBUIÇÃO COM A POPULAÇAO ATRAVES DE ORDEM JUDICIAL</td>
        </tr>
    </table>
    \`\`\`
    
    This is an example in HTML using div
    
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/PaymentDocument">
      <!-- Cabeçalho da tabela  -->
      <div>
        <div itemprop="managementUnitName">Nome da unidade gestora</div>
        <div itemprop="managementUnitID">Código da unidade gestora</div>
        <div itemprop="bankOperationID">Número da operação bancária</div>
        <div itemprop="bankAccountNumber">Número da conta bancária</div>
        <div itemprop="paymentDate">Data do Pagamento</div>
        <div itemprop="identificationNumber">CNPJ</div>
        <div itemprop="creditorName">Nome do favorecido</div>
        <div itemprop="paymentAmount">Valor do Pagamento</div>
        <div itemprop="fundingSource">Fonte do recurso</div>
        <div itemprop="paymentHistory">Histórico do pagamento</div>
      </div>
      <!-- Data referring to a certain row of the table  -->
      <div>
        <div itemprop="managementUnitName">FUNDO MUNICIPAL DE SAUDE</div>
        <div itemprop="managementUnitID">03011</div>
        <div itemprop="bankOperationID">005131 - PAGAMENTO</div>
        <div itemprop="bankAccountNumber">000000134600 - BB C/C 13.460-0 FUNDO M. DE SAUDE</div>
        <div itemprop="paymentDate">15/07/2021</div>
        <div itemprop="identificationNumber">02708218000120</div>
        <div itemprop="creditorName">GILDO JOSE DA SILVA ME</div>
        <div itemprop="paymentAmount">22087.74</div>
        <div itemprop="fundingSource">211 - Receitas de Impostos e de Transferência de Imposto</div>
        <div itemprop="paymentHistory">VALOR QUE ORA SE EMPENHA P ATENDER DESPESA COM AQUISIÇÃO DE MEDICAMENTOS PARA DISTRIBUIÇÃO COM A POPULAÇAO ATRAVES DE ORDEM JUDICIAL</div>
      </div>
    </div>
    \`\`\`
    `

}
