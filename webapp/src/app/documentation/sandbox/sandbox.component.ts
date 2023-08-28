import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxComponent {

    instructions = `
    # Sandbox

    ## O que é?
    O sandbox é um ambiente de teste, destinado aos desenvolvedores de sites de municípios, para verificarem se estão atigindo os parâmetros avaliativos do sistema turmalina.

    ## Como funciona?
    O usuário com permissão, conseguirá acessar o formulário, onde inserirá uma lista de URLs de páginas de municípios, separadas por vírgula. Além disso, poderá inserir o seu email, para que seja possível receber o resultado do teste.
    
    <div class="img-sandbox">
        <img src="/assets/images/md/sandbox.jpeg" alt="Página inicial ambiente de testes"/>
    <div>
    `

}
