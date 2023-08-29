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
    # Documento de Pagamento

    ## Tipo: PaymentDocument
    
    O tipo PaymentDocument possui diversas propriedades que representam as informações básicas que compõem um documento de pagamento, estágio da despesa pública em que a unidade pública efetua o pagamento ao ente responsável pela prestação do serviço ou fornecimento do bem, recebendo a devida quitação. A seguir estão os nomes das propriedades definidas do tipo:
    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | managementUnitName | text | Campo texto contendo o nome da unidade gestora emitente|
    | managementUnitID | text |  Campo texto contendo o código da unidade gestora emitente|
    | bankOperationID | text | Campo texto contendo a identificação da operação bancária realizada |
    | bankAccountNumber | text | Campo texto contendo o número da conta bancária |
    | paymentDate | date | Campo contendo a data do pagamento (formato DD/MM/YYYY)|
    | identificationNumber | text | Campo texto contendo o CPF ou CNPJ do favorecido do pagamento |
    | creditorName | text | Campo texto contendo o nome do favorecido do pagamento |
    | paymentAmount | number:float | Campo monetário contendo o valor do pagamento |
    | fundingSource | text | Campo texto contendo a fonte de recursos do pagamento |
    | paymentHistory | text | Campo texto contendo a descrição do histórico do pagamento |
    
    Esse é um exemplo em HTML utilizando table
    
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
    
    Esse é um exemplo em HTML utilizando div
    
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/PaymentDocument">
      <!-- Table header  -->
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