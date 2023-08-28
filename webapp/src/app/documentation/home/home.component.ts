import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

    instructions = `
    # Seja bem vindo(a) ao Turmalina Schema!

    O Turmalina Schema é uma iniciativa do Tribunal de Contas do Estado da Paraíba  (TCE-PB) desenvolvida para criar, manter e promover um esquema de marcação de dados para portais de transparência fiscal, tornando-os mais compreensíveis para mecanismos de busca e web crawlers.
    O vocabulário Turmalina Schema engloba diversos tipos, cada um associado a um conjunto de propriedades, que descrevem as principais informações disponibilizadas em portais de transparência fiscal.  Atualmente, o Turmalina Schema consiste em X Tipos e Y Propriedades. Os tipos abrangem propriedades sobre licitações, receitas orçamentárias e extra orçamentárias, despesas orçamentárias e extra orçamentárias, convênios, documentos de pagamento, entre outros.
    Para adicionar essas marcações ao seu conteúdo da web basta utilizar o vocabulário Turmalina Schema em conjunto com o Microdata. Este guia ajudará você a se familiarizar com o básico do Microdata e do Turmalina Schema, a fim de que você possa começar a marcar corretamente suas páginas web.

    ## Por que o Turmalina Schema?

    A transparência da gestão pública é um dos pilares da Lei de Responsabilidade da Gestão Fiscal (LC 101/2000) que assegura a liberação ao pleno conhecimento e acompanhamento da sociedade, em tempo real, de informações detalhadas sobre a execução orçamentária e financeira em meios eletrônicos de acesso público. 
    Com o Turmalina Schema, é possível atribuir rótulos para identificar partes individuais do conteúdo dos portais de transparência fiscal, permitindo que mecanismos de busca e web crawlers possam extrair e processar os microdados dessas páginas da web. Também ao utilizar este tipo de padrão para descrição de dados, você possibilita que mecanismos eletrônicos entendam estas informações dentro do contexto semântico definido e facilita outras aplicações reconhecerem e importarem estes dados do seu site, contribuindo para a transparência da gestão pública prevista em lei.

    ## Para quem é esta documentação?

    Este guia se propõe a auxiliar o desenvolvedor a se familiarizar com o básico do Microdata e do Turmalina Schema, a fim de que seja possível a adição de marcações semânticas às páginas web de portais de transparência fiscal. O material é extremamente didático e amplamente acessível para aqueles que já possuem conhecimento básico de HTML. Aqui você encontrará descrições detalhadas sobre cada tipo e conjunto de propriedades descritas no Turmalina Schema, bem como exemplos didáticos com o passo-a-passo de utilização e aplicação.

    ## Como usar esta documentação?

    Não há maneira errada de ler esta documentação: se você quiser pular, vá em frente! Faça o que melhor funcionar para você. A documentação foi estruturada de forma que cada descrição de tipos e suas respectivas propriedades são independentes uns dos outros, justamente a fim de possibilitar a busca por informações de forma mais rápida e direcionada. Entretanto, recomendamos fortemente que, antes de mais nada, o tutorial inicial seja lido atenciosamente para ambientá-los(as) com os primeiros passos utilizando o Turmalina Schema em conjunto com o Microdata.
    `

}
