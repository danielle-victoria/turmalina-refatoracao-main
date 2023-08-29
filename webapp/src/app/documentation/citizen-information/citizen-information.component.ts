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
    # Informação ao Cidadão
    
    Para avaliar a existência de ferramentas que auxiliam o acesso à informação por parte dos cidadãos, três classes foram criadas. Cada uma identifica um componente facilitador do acesso à informação. As classes são utilizadas conforme a tabela abaixo
    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | tm-sic | classe| Campo o qual possui uma classe com o termo "tm-sic", a fim de endereçar o Serviço de Informações ao Cidadão do portal |
    | tm-search | classe | Campo o qual possui uma classe com o termo "tm-search", a fim de identificar uma ferramenta de pesquisa dentro do portal |
    | tm-execute | classe | Campo o qual possui uma classe com o termo "tm-execute", a fim de identificar que aquele botão/link exibirá dados a partir do seu clique |

    Esse é um exemplo em HTML da implementação do link para o SIC
    \`\`\`html
    <!--Implementation of fields that direct to the SIC page-->
    <div>
        <a href="http://pocinhos.pb.gov.br/SIC" class="tm-sic"> Link para o Serviço de Informações ao Cidadão </a>
        <!--Or-->
        <button type="submit" onClick="abrirSic()" class="tm-sic"> Botão para abrir o site do SIC </button> 
    </div>
    \`\`\`
    
    Esse é um exemplo em HTML da implementação da caixa de pesquisa e do botão execute
    
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