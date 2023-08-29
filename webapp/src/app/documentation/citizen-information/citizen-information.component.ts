import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-citizen-information',
  templateUrl: './citizen-information.component.html',
  styleUrls: ['./citizen-information.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitizenInformationComponent {

    instructions = `
    # Citizen Information
    
    To assess the existence of tools that help citizens access information, three classes were created. Each one identifies a component that facilitates access to information. Classes are used according to the table below
    
    | PROPERTY | EXPECTED TYPE | DESCRIPTION |
    | ------ | ------ | ------ |
    | tm-sic | classe| Field which has a class with the term "tm-sic", in order to address the Citizen Information Service of the portal |
    | tm-search | classe | Field which has a class with the term "tm-search", in order to identify a search tool within the portal |
    | tm-execute | classe | Field which has a class with the term "tm-execute", in order to identify that that button/link will display data from your click |

    This is an HTML example of the implementation of the link to the SIC
    \`\`\`html
    <!--Implementation of fields that direct to the SIC page-->
    <div>
        <a href="http://pocinhos.pb.gov.br/SIC" class="tm-sic"> Link para o Serviço de Informações ao Cidadão </a>
        <!--Ou-->
        <button type="submit" onClick="abrirSic()" class="tm-sic"> Botão para abrir o site do SIC </button> 
    </div>
    \`\`\`
    
    This is an HTML example of implementing the search box and the execute button
    
    \`\`\`html
    <!--Implementing a basic search form-->
    <div>
        <form method="get" action="https://www.joaopessoa.pb.gov.br/" class="tm-search">
            <input type="search">
            <button type="submit" class="tm-execute"> Pesquisar </button>
        </form>
    </div>
    \`\`\`
    `
    };