import { ExampleTwoComponent } from './example-two/example-two.component';
import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorialComponent {

    instructions = `
    # Introdução ao Turmalina Schema utilizando o Microdata

    ## O que é e por que utilizar o Microdata?
    
    Microdata é um tipo de linguagem de marcação embutida no HTML5 para melhorar a legibilidade das páginas web por máquinas. Esse tipo de linguagem de marcação atribui rótulos para identificar partes individuais do conteúdo, permitindo que mecanismos de busca e web crawlers possam extrair e processar os microdados de uma página da web. Ao utilizar este tipo de padrão para descrição de dados, você possibilita que mecanismos de busca entendam estas informações dentro do contexto semântico definido e facilita que outras aplicações reconheçam e importem esses dados do seu site.
    
    Em alto nível, microdata é uma especificação para incorporar dados legíveis por máquina em documentos HTML. Microdados consistem em pares nome/valor (conhecidos como itens) definidos de acordo com um vocabulário. Ao representar informações através do Microdata utilizamos elementos pertencentes a um vocabulário específico que deve ser referenciado no documento HTML. O vocabulário é a especificação das propriedades utilizadas e qual tipo de informação elas representam. Atualmente, vocabulários de microdata de propósito geral podem ser encontrados em sites como https://schema.org/, que contém especificações para descrever eventos, empresas, pessoas, produtos, etc. 
    
    ## O que é e por que utilizar o Turmalina Schema?
    
    Seguindo essa perspectiva, o Turmalina Schema é um vocabulário desenvolvido para descrever tipos e propriedades utilizados em dados disponibilizados por portais de transparência fiscal. O objetivo do Turmalina Schema é ser um esquema de marcação de dados para tornar portais de transparência fiscal mais compreensíveis para mecanismos de busca e web crawlers. Nesta documentação, você poderá encontrar as propriedades referentes a cada tipo e uma descrição de suas finalidades e utilização.
    
    Para adicionar informações ao seu conteúdo da web basta utilizar o vocabulário do Turmalina Schema em conjunto com o Microdata. Este guia ajudará você a se familiarizar com o básico do Microdata e do Turmalina Schema, a fim de que você possa começar a adicionar marcações às suas páginas web.
    
    ## Sintaxe do Microdata
    
    Como dito anteriormente, o modelo Microdata consiste em grupos de pares de nome/valor conhecidos como itens. Cada nome nesses pares é definido como uma propriedade, podendo ter um ou mais valores. O valor de uma propriedade pode ser uma string, um número float ou inteiro, assim como qualquer outro tipo de dado, incluindo outro grupo de pares nome/valor (i.e um item).
    
    O Microdata apresenta cinco atributos globais simples (disponíveis para uso de qualquer elemento HTML) que fornecem contexto para máquinas sobre seus dados. Os cinco atributos são: itemscope, itemtype, itemprop, itemid e itemref. Para o uso do Turmalina Schema, utilizaremos apenas os atributos itemscope, itemtype e itemprop. A seguir, vamos examiná-los em detalhes. 
    
    | ATRIBUTO | DESCRIÇÃO |
    | ------ | ------ |
    | itemscope | Este atributo é utilizado para demarcar o escopo de um item. O atributo itemscope é um atributo booleano que informa que há um modelo Microdata naquele escopo, demarcando no HTML onde ele inicia.  | 
    | itemtype | O atributo itemtype contém como valor uma URL válida que define o tipo do item e fornece o contexto para as propriedades referentes a ele. | 
    | itemprop | Este atributo define uma propriedade do item. | 
    
    Como visto, a sintaxe básica inclui os atributos itemscope e itemtype para definir um item, e o atributo itemprop para descrever cada propriedade do item. Sendo os tipos dos itens especificados por meio do atributo itemtype, que assume valores de URLs válidas definidas através do vocabulário de escolha. Neste caso, podem assumir as URLs de cada tipo registrado no vocabulário do Turmalina Schema; por exemplo, o Turmalina Schema define tipos como https://turmalina.tcepb.tc.br/documentation/Bidding ou https://turmalina.tcepb.tc.br/documentation/Contracts.
    
    ## Como marcar seu conteúdo usando o Microdata e o Turmalina Schema?
    
    Vamos começar com um exemplo concreto. Imagine que tenhamos uma página que contém uma tabela com informações sobre licitações. Seu código HTML pode ser parecido com este:
    
    \`\`\`html
    <div>
        <table>
            <caption>Descrição</caption>
            <!-- Table header  -->
            <tr>
                <th>Nome da unidade gestora</th>
                <th>Código da unidade gestora</th>
                <th>Número da licitação</th>
                <th>Modalidade de licitação</th>
                <th>Objeto da licitação</th>
                <th>Data da publicação</th>
                <th>Data de realização</th>
                <th>Nome do Participante</th>
                <th>CNPJ do paricipante</th>
                <th>Valor da proposta</th>
            </tr>
            <!-- Data referring to a certain row of the table  -->
            <tr>
                <td>Secretaria Municipal de Saúde</td>
                <td>00000.000-0</td>
                <td>10.017/2021</td>
                <td>Pregão Eletrônico</td>
                <td>SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE MEDICAMENTOS DA REDE HOSPITALAR E ESPECIALIZADA</td>
                <td>01/04/2021</td>
                <td>01/03/2021</td>
                <td>COMERCIAL VALFARMA LTDA</td>
                <td>02.600.770/0001-09</td>
                <td>R$ 3.535.816,11</td>
            </tr>
        </table>
    </div>
    \`\`\`
    
    \`\`\`html
    <div>
        <caption>Descrição</caption>
        <!-- Table header  -->
        <div>
            <div>Nome da unidade gestora</div>
            <div>Código da unidade gestora</div>
            <div>Número da licitação</div>
            <div>Modalidade de licitação</div>
            <div>Objeto da licitação</div>
            <div>Data da publicação</div>
            <div>Data de realização</div>
            <div>Nome do Participante</div>
            <div>CNPJ do paricipante</div>
            <div>Valor da proposta</div>
        </div>
        <!-- Data referring to a certain row of the table  -->
        <div>
            <div>Secretaria Municipal de Saúde</div>
            <div>00000.000-0</div>
            <div>10.017/2021</div>
            <div>Pregão Eletrônico</div>
            <div>SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE MEDICAMENTOS DA REDE HOSPITALAR E ESPECIALIZADA</div>
            <div>01/04/2021</div>
            <div>01/03/2021</div>
            <div>COMERCIAL VALFARMA LTDA</div>
            <div>02.600.770/0001-09</div>
            <div>R$ 3.535.816,11</div>
        </div>
    </div>
    \`\`\`
    
    ### Primeiro passo: itemscope e itemtype
    Para começar precisamos identificar a seção da página que contém a tabela com as informações sobre licitações. Para isso, adicionamos o elemento itemscope à tag HTML que inclui as informações sobre o item que desejamos:
    
    
    \`\`\`html
    <div>
        <table itemscope>
            <caption>Descrição</caption>
            <!-- Table header  -->
            <tr>
                <th>Nome da unidade gestora</th>
                <th>Código da unidade gestora</th>
                <th>Número da licitação</th>
                <th>Modalidade de licitação</th>
                <th>Objeto da licitação</th>
                <th>Data da publicação</th>
                <th>Data de realização</th>
                <th>Nome do Participante</th>
                <th>CNPJ do paricipante</th>
                <th>Valor da proposta</th>
            </tr>
            <!-- Data referring to a certain row of the table  -->
            <tr>
                <td>Secretaria Municipal de Saúde</td>
                <td>00000.000-0</td>
                <td>10.017/2021</td>
                <td>Pregão Eletrônico</td>
                <td>SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE MEDICAMENTOS DA REDE HOSPITALAR E ESPECIALIZADA</td>
                <td>01/04/2021</td>
                <td>01/03/2021</td>
                <td>COMERCIAL VALFARMA LTDA</td>
                <td>02.600.770/0001-09</td>
                <td>R$ 3.535.816,11</td>>
            </tr>
        </table>
    </div>
    \`\`\`
    
    \`\`\`html
    <div itemscope>
        <caption>Descrição</caption>
        <!-- Table header  -->
        <div>
            <div>Nome da unidade gestora</div>
            <div>Código da unidade gestora</div>
            <div>Número da licitação</div>
            <div>Modalidade de licitação</div>
            <div>Objeto da licitação</div>
            <div>Data da publicação</div>
            <div>Data de realização</div>
            <div>Nome do Participante</div>
            <div>CNPJ do paricipante</div>
            <div>Valor da proposta</div>
        </div>
        <!-- Data referring to a certain row of the table  -->
        <div>
            <div>Secretaria Municipal de Saúde</div>
            <div>00000.000-0</div>
            <div>10.017/2021</div>
            <div>Pregão Eletrônico</div>
            <div>SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE MEDICAMENTOS DA REDE HOSPITALAR E ESPECIALIZADA</div>
            <div>01/04/2021</div>
            <div>01/03/2021</div>
            <div>COMERCIAL VALFARMA LTDA</div>
            <div>02.600.770/0001-09</div>
            <div>R$ 3.535.816,11</div>
        </div>
    </div>
    \`\`\`
    
    Ao adicionarmos o itemscope estamos especificando que o HTML contém um bloco sobre um determinado item. Entretanto, não é suficiente especificar que existe um item no HTML, precisamos especificar também o tipo desse item. Para tanto, podemos utilizar o atributo itemtype imediatamente após o itemscope.
    \`\`\`html
    <div>
        <table itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/Bidding">
            <caption>Descrição</caption>
            <!-- Table header  -->
            <tr>
                <th>Nome da unidade gestora</th>
                <th>Código da unidade gestora</th>
                <th>Número da licitação</th>
                <th>Modalidade de licitação</th>
                <th>Objeto da licitação</th>
                <th>Data da publicação</th>
                <th>Data de realização</th>
                <th>Nome do Participante</th>
                <th>CNPJ do paricipante</th>
                <th>Valor da proposta</th>
            </tr>
            <!-- Data referring to a certain row of the table  -->
            <tr>
                <td>Secretaria Municipal de Saúde</td>
                <td>00000.000-0</td>
                <td>10.017/2021</td>
                <td>Pregão Eletrônico</td>
                <td>SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE MEDICAMENTOS DA REDE HOSPITALAR E ESPECIALIZADA</td>
                <td>01/04/2021</td>
                <td>01/03/2021</td>
                <td>COMERCIAL VALFARMA LTDA</td>
                <td>02.600.770/0001-09</td>
                <td>R$ 3.535.816,11</td>
            </tr>
        </table>
    </div>
    \`\`\`
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/Bidding">
        <caption>Descrição</caption>
        <!-- Table header  -->
        <div>
            <div>Nome da unidade gestora</div>
            <div>Código da unidade gestora</div>
            <div>Número da licitação</div>
            <div>Modalidade de licitação</div>
            <div>Objeto da licitação</div>
            <div>Data da publicação</div>
            <div>Data de realização</div>
            <div>Nome do Participante</div>
            <div>CNPJ do paricipante</div>
            <div>Valor da proposta</div>
        </div>
        <!-- Data referring to a certain row of the table  -->
        <div>
            <div>Secretaria Municipal de Saúde</div>
            <div>00000.000-0</div>
            <div>10.017/2021</div>
            <div>Pregão Eletrônico</div>
            <div>SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE MEDICAMENTOS DA REDE HOSPITALAR E ESPECIALIZADA</div>
            <div>01/04/2021</div>
            <div>01/03/2021</div>
            <div>COMERCIAL VALFARMA LTDA</div>
            <div>02.600.770/0001-09</div>
            <div>R$ 3.535.816,11</div>
        </div>
    </div>
    \`\`\`
    
    Ao utilizarmos o itemtype estamos especificando que o item contido nesse bloco é do tipo Bidding, ou seja, trata sobre Licitações como definido na documentação de tipos do Turmalina Schema. Como visto, os tipos dos itens são informados como URLs, neste caso https://turmalina.tcepb.tc.br/documentation/Bidding. <div> </div>
    
    **Observação 1:** Idealmente a declaração de um item precisa ser feita no primeiro elemento que contém todas as propriedades do item. A titulo de exemplo, o elemento \`table\` foi marcado com o itemscope/itemtype, pois ele é o primeiro elemento que contém todas as propriedades do item Bidding.
    
    **Observação 2:** Caso o portal possua mais de uma tabela por item, basta repetir a marcação nas respectivas tabelas.
    
    
    **Observação 3:** Caso uma página possua **muitas** tabelas pequenas, o primeiro elemento que contém todas as tabelas pode ser marcado com o itemscope/itemtype.
    
    ### Segundo passo: itemprop
    Além de indicarmos o escopo do item no HTML com o itemscope e especificarmos sobre o que é o item com o itemtype, podemos indicar mais informações sobre esse item. No microdata chamamos essas informações adicionais sobre um item de propriedades. Para rotular as propriedades de um item utilizamos o atributo itemprop. Por exemplo, para identificar a modalidade da Licitação no HTML, adicionamos itemprop=”bidModality” ao elemento que envolve o nome da modalidade de licitação.
    
    Observação: No link do itemtype (https://turmalina.tcepb.tc.br/documentation/Bidding, por exemplo) há uma lista completa de todas as propriedades que podemos associar a uma licitação.
    
    \`\`\`html
    <div>
        <table itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/Bidding">
            <caption>Descrição</caption>
            <!-- Table header  -->
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
            </tr>
            <!-- Data referring to a certain row of the table  -->
            <tr>
                <td itemprop="managementUnitName">Secretaria Municipal de Saúde</th>
                <td itemprop="managementUnitID">00000.000-0</th>
                <td itemprop="bidID">10.017/2021</th>
                <td itemprop="bidModality">Pregão Eletrônico</th>
                <td itemprop="object">SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE MEDICAMENTOS DA REDE HOSPITALAR E ESPECIALIZADA</th>
                <td itemprop="publicationDate">01/04/2021</th>
                <td itemprop="realizationDate">01/03/2021</th>
                <td itemprop="bidderName">COMERCIAL VALFARMA LTDA</th>
                <td itemprop="identificationNumber">02.600.770/0001-09</th>
                <td itemprop="bidderProposalAmount">R$ 3.535.816,11</th>
            </tr>
        </table>
    </div>
    \`\`\`
    
    \`\`\`html
    <div>
        <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/Bidding">
            <caption>Descrição</caption>
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
            </div>
            <!-- Data referring to a certain row of the table  -->
            <div>
                <div itemprop="managementUnitName">Secretaria Municipal de Saúde</div>
                <div itemprop="managementUnitID">00000.000-0</div>
                <div itemprop="bidID">10.017/2021</div>
                <div itemprop="bidModality">Pregão Eletrônico</div>
                <div itemprop="object">SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE MEDICAMENTOS DA REDE HOSPITALAR E ESPECIALIZADA</div>
                <div itemprop="publicationDate">01/04/2021</div>
                <div itemprop="realizationDate">01/03/2021</div>
                <div itemprop="bidderName">COMERCIAL VALFARMA LTDA</div>
                <div itemprop="identificationNumber">02.600.770/0001-09</div>
                <div itemprop="bidderProposalAmount">R$ 3.535.816,11</div>
            </div>
        </div>
    </div>
    \`\`\`
    
    ## Turmalina Schema: tipos e propriedades
    Durante todo o exemplo anterior, utilizamos o tipo Bidding fornecido pelo vocabulário Turmalina Schema. Entretanto, o Turmalina Schema descreve uma variedade de outros tipos, cada um com seu próprio conjunto de propriedades que podem ser utilizadas para descrever os itens. Abaixo segue uma lista com os tipos do Turmalina Schema e seus respectivos links:
    
    - PlanningInstrument - https://turmalina.tcepb.tc.br/documentation/PlanningInstrument
    - Bid - https://turmalina.tcepb.tc.br/documentation/Bid
    - Contract - https://turmalina.tcepb.tc.br/documentation/Contract
    - Agreement - https://turmalina.tcepb.tc.br/documentation/Agreement
    - BudgetRevenue - https://turmalina.tcepb.tc.br/documentation/BudgetRevenue
    - ExtraBudgetRevenue - https://turmalina.tcepb.tc.br/documentation/ExtraBudgetRevenue
    - BudgetExpenditure - https://turmalina.tcepb.tc.br/documentation/BudgetExpenditure
    - ExtraBudgetExpenditure - https://turmalina.tcepb.tc.br/documentation/ExtraBudgetExpenditure
    - EmployeeInformation - https://turmalina.tcepb.tc.br/documentation/EmployeeInformation
    - PaymentDocument - https://turmalina.tcepb.tc.br/documentation/PaymentDocument
    
    Nos links você também pode ver uma lista completa com as propriedades de cada tipo.
    
    **Observação 1:** As propriedades precisam ser declaradas tanto no header (ou qualquer outro elemento que exerça essa função), quanto nas linhas de dados.
    
    ##  Páginas com comportamento dinâmico
    
    Existem situações em que os dados marcados são acessíveis apenas após uma série de interações dinâmicas com o portal, como preenchimento de formulário e acionamento de botões. Para tratar esses casos, foram definadas algumas regras que precisam ser satisfeitas. 
    
    ## Formulários
    
    Qualquer formulário necessário à busca de **dados marcados** que precisa ser explicitamente preenchido pelo usuário, precisa conter campos pré-populados que possibilitem alguma busca padrão. A busca padrão sempre que possível deve retornar algum dado.
    
    ## Buscas sem resultado
    
    Quando as páginas de receitas e despesas extraorçamentárias não encontrem dados com a busca padrão, elas devem retornar o header da tabela buscada. Esse regra se aplica apenas a essas páginas.
    
    ## Elementos que expõem dados
    
    Os elementos que quando acionados produzem eventos que expõem **dados marcados** precisam conter a classe \`tm-execute\`. Esses elementos podem ser desde botões que efetuam buscas de dados à elementos que abrem popups com dados.   
    
    **Observação 1:** Links convencionais não podem ser marcados com \`tm-execute\`! Apenas elementos que produzem eventos que expõem **dados marcados** podem ser marcados com a respectiva classe. 
    
    ### Exemplo
    
    Este exemplo demonstra como proceder nos casos em que a página necessita de interação para expor seus dados.
    
    Neste exemplo, os dados sobre licitação são acessíveis apenas após a submissão do formulário e acionamento do botão de detalhamento. 
    <div class="img-md">
        <img src="/assets/images/md/pagina-inicial-licitacao.png" alt="Página inicial licitação"/>
    <div>
    
    1. Esse formulário segue a especificação proposta, apresentando uma busca de dados padrão.
    2. O botão de pesquisa contém a classe \`tm-execute\`, pois ele precisa ser explicitamente acionado para buscar os dados referentes a licitação.
    
    <div class="img-md">
        <img src="/assets/images/md/licitacao-pos-pesquisa.png" alt="Página de licitação pós pesquisa"/>
    <div>
    
    1. A página de detalhamento da licitação só pode ser aberta acionando o elemento destacado. Portanto, ele contém a classe \`tm-execute\`.  
    
    \`\`\`
    <!-- Adição da classe "tm-execute" ao elemento de detalhamento  -->
    
    <a _ngcontent-xmb-c319 class="tm-execute">04.064/2021</a>
    \`\`\`   
    
    Segue a página após acionamento do botão de detalhamento.
    <div class="img-md">
        <img src="/assets/images/md/detalhamento-licitacao.png" alt="Página de detalhamento"/>
    <div>
    
    ## Turmalina Schema: Boas práticas
    - Evitar o uso excessivo de ajax, pois seu mau uso pode provocar mau funcionamento no carregamento da página. 
    - Evitar o uso de iframes, pois eles dificultam a navegação do cidadão e podem não ser acessíveis através de crawlers.
    - Evitar direcionar o usuário para páginas externas para acessar informações fiscais.
    `
    example_one = ` \`\`\`html
    <!--  MENU 1 -->
    <div itemscope itemtype="Unipt.org/Bid">
        <table>
            <caption>Descrição</caption>
            <!-- Table header  -->
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
            </tr>
            <!-- Data referring to a certain row of the table  -->
            <tr>
                <td itemprop="managementUnitName">Secretaria Municipal de Saúde</th>
                <td itemprop="managementUnitID">00000.000-0</th>
                <td itemprop="bidID">10.017/2021</th>
                <td itemprop="bidModality">Pregão Eletrônico</th>
                <td itemprop="object">SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE MEDICAMENTOS DA REDE HOSPITALAR E ESPECIALIZADA</th>
                <td itemprop="publicationDate">01/04/2021</th>
                <td itemprop="realizationDate">01/03/2021</th>
                <td itemprop="bidderName">COMERCIAL VALFARMA LTDA</th>
                <td itemprop="identificationNumber">02.600.770/0001-09</th>
                <td itemprop="bidderProposalAmount">R$ 3.535.816,11</th>
            </tr>
        </table>
    </div>
    \`\`\` `

    example_two = ` \`\`\`html
    <!--  MENU 2 -->
    <div itemscope itemtype="Unipt.org/Bid">
        <div>
            <caption>Descrição</caption>
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
            </div>
            <!-- Data referring to a certain row of the table  -->
            <div>
                <div itemprop="managementUnitName">Secretaria Municipal de Saúde</div>
                <div itemprop="managementUnitID">00000.000-0</div>
                <div itemprop="bidID">10.017/2021</div>
                <div itemprop="bidModality">Pregão Eletrônico</div>
                <div itemprop="object">SISTEMA DE REGISTRO DE PREÇOS PARA A AQUISIÇÃO DE MEDICAMENTOS DA REDE HOSPITALAR E ESPECIALIZADA</div>
                <div itemprop="publicationDate">01/04/2021</div>
                <div itemprop="realizationDate">01/03/2021</div>
                <div itemprop="bidderName">COMERCIAL VALFARMA LTDA</div>
                <div itemprop="identificationNumber">02.600.770/0001-09</div>
                <div itemprop="bidderProposalAmount">R$ 3.535.816,11</div>
            </div>
        </div>
    </div>
    \`\`\` `

    menuOne : boolean = true;
    menuTwo : boolean = false;
    exampleOne(){
        this.menuTwo= false;
        this.menuOne= !this.menuOne;
    }
    exampleTwo(){
        this.menuOne= false;
        this.menuTwo= !this.menuTwo;
    }
}
