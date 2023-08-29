import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgreementComponent {
    instructions = `
    # Convênios/Termos de Parceria/Contratos de Repasse/Termos de Cooperação

    O tipo Convênios/Termos de Parceria/Contratos de Repasse/Termos de Cooperação possui diversas propriedades que representam as informações básicas que compõe um convênio administrativo. A seguir estão os nomes das propriedades definidas do tipo:
    
    ## Tipo: Agreement
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | agreementID | text | Campo referente ao número de identificação do convênio |
    | grantorName | text |  Campo texto contendo o nome do concedente do convênio |
    | contractorName | text | Campo texto contendo o nome do convenente do convênio |
    | celebrationDate | date (DD/MM/YYYY) | Data referente à celebração do convênio |
    | publicationDate | date (DD/MM/YYYY) | Data referente à publicação do convênio |
    | validityDate | date (DD/MM/YYYY) | Data de vigência do convênio |
    | object | text | Campo texto referente à descrição do objeto do convênio |
    | agreementAmount | number:float | Campo monetário referente ao valor pactuado do convênio |
    | counterpartAmount | text | Campo monetário referente a parcela de colaboração financeira do convenente para execução do objeto do convênio |
    
     This is an HTML example using table
    \`\`\`html
    <table itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/Agreement">
        <!-- Table header  -->
        <tr>
            <th itemprop="agreementID">Número do Convênio</th>
            <th itemprop="grantorName">Concedente</th>
            <th itemprop="contractorName">Convenente</th>
            <th itemprop="celebrationDate">Data da Celebração</th>
            <th itemprop="publicationDate">Data da Publicação</th>
            <th itemprop="validityDate">Início da Vigência</th>
            <th itemprop="validityDate">Fim da Vigência</th>
            <th itemprop="object">Objeto</th>
            <th itemprop="agreementAmount">Valor Pactuado</th>
            <th itemprop="counterpartAmount">Valor da Contrapartida</th>
        </tr>
        <!-- Data referring to a certain row of the table -->
        <tr>
            <td itemprop="agreementID">903322</td>
            <td itemprop="grantorName">Ministério do Turismo - Unidades com vínculo direto</td>
            <td itemprop="contractorName">MUNICIPIO DE JOAO PESSOA</td>
            <td itemprop="celebrationDate">21/12/2020</td>
            <td itemprop="publicationDate">18/12/2020</td>
            <td itemprop="validityDate">21/12/2020</td>
            <td itemprop="validityDate">21/12/2023</td>
            <td itemprop="object">Construcao de centro de apoio turistico adaptado no municipio de joao pessoa/pb.</td>
            <td itemprop="agreementAmount">R$ 22.087,74</td>
            <td itemprop="counterpartAmount">2.388,56</td>
        </tr>
    </table>
    \`\`\`
    
    Esse é um exemplo em HTML utilizando div
    
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/Agreement">
        <!-- Table header  -->
        <div>
            <div itemprop="agreementID">Número do Convênio</div>
            <div itemprop="grantorName">Concedente</div>
            <div itemprop="contractorName">Convenente</div>
            <div itemprop="celebrationDate">Data da Celebração</div>
            <div itemprop="publicationDate">Data da Publicação</div>
            <div itemprop="validityDate">Início da Vigência</div>
            <div itemprop="validityDate">Fim da Vigência</div>
            <div itemprop="object">Objeto</div>
            <div itemprop="agreementAmount">Valor Pactuado</div>
            <div itemprop="counterpartAmount">Valor da Contrapartida</div>
        </div>
        <!-- Data referring to a certain row of the table  -->
        <div>
            <div itemprop="agreementID">903322</div>
            <div itemprop="grantorName">Ministério do Turismo - Unidades com vínculo direto</div>
            <div itemprop="contractorName">MUNICIPIO DE JOAO PESSOA</div>
            <div itemprop="celebrationDate">21/12/2020</div>
            <div itemprop="publicationDate">18/12/2020</div>
            <div itemprop="validityDate">21/12/2020</div>
            <div itemprop="validityDate">21/12/2023</div>
            <div itemprop="object">Construcao de centro de apoio turistico adaptado no municipio de joao pessoa/pb</div>
            <div itemprop="agreementAmount">22087.74</div>
            <div itemprop="counterpartAmount">2388.56</div>
        </div>
    </div>
    \`\`\`
    `
}