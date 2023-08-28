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
    # Agreements/Terms of Partnership/Transfer Agreements/Terms of Cooperation

    The Agreements/Partnership Terms/Transfer Agreements/Cooperation Terms type has several properties that represent the basic information that makes up an administrative agreement. The following are the names of the type's defined properties:
    
    ## Tipo: Agreement
    | PROPERTY | EXPECTED TYPE | DESCRIPTION |
    | ------ | ------ | ------ |
    | agreementID | text | Field referring to the identification number of the agreement |
    | grantorName | text |  Text field containing the name of the grantor of the agreement|
    | contractorName | text | Text field containing the name of the partner of the agreement|
    | celebrationDate | date (DD/MM/YYYY) | Date referring to the conclusion of the agreement |
    | publicationDate | date (DD/MM/YYYY) | Date referring to the publication of the agreement |
    | validityDate | date (DD/MM/YYYY) | Effective date of the agreement |
    | object | text | Text field referring to the description of the object of the agreement |
    | agreementAmount | number:float | Monetary field referring to the agreed value of the agreement|
    | counterpartAmount | text | Monetary field referring to the portion of the financial collaboration of the contracting party for the execution of the object of the agreement |
    
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
    
    This is an example in HTML using div
    
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/Agreement">
        <!-- Table header -->
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
