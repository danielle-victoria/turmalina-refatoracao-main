import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeInformationComponent  {

    instructions = `
    # Pessoal

    ## Tipo: EmployeeInformation
    
    O tipo EmployeeInformation possui diversas propriedades que representam as informações básicas sobre o quadro de servidores do município, agregando informações que abrangem cargos, salários e tipo de vínculo. A seguir estão os nomes das propriedades definidas do tipo:
    
    | PROPRIEDADE | TIPO ESPERADO | DESCRIÇÃO |
    | ------ | ------ | ------ |
    | employeeName | text | Campo texto contendo o nome do servidor |
    | identificationNumber | text |  Campo texto contendo o CPF do servidor |
    | employmentContractType | text | Campo texto contendo o tipo de contrato do servidor |
    | employeePosition | text | Campo texto contendo o tipo de cargo/função do servidor |
    | employeeSalary | number:float | Campo monetário contendo o valor do salário do servidor |
    
    Esse é um exemplo em HTML utilizando table
    \`\`\`html
    <table itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/EmployeeInformation">
        <!-- Table header  -->
        <tr>
            <th itemprop="employeeName">Nome do Servidor</th>
            <th itemprop="identificationNumber">CPF</th>
            <th itemprop="employmentContractType">Tipo de vínculo</th>
            <th itemprop="employeePosition">Cargo</th>
            <th itemprop="employeeSalary">Salário</th>
        </tr>
        <!-- Data referring to a certain row of the table -->
        <tr>
            <td itemprop="employeeName">ABDENE FRANCISCO DA SILVA</td>
            <td itemprop="identificationNumber">XXX.582.004-XX</td>
            <td itemprop="employmentContractType">Contratação por excepcional interesse público</td>
            <td itemprop="employeePosition">INSTRUTOR DE BANDA</td>
            <td itemprop="employeeSalary">1439.17</td>
        </tr>
    </table>
    \`\`\`
    
    Esse é um exemplo em HTML utilizando div
    
    \`\`\`html
    <div itemscope itemtype="https://turmalina.tcepb.tc.br/documentation/EmployeeInformation">
      <!-- Table header  -->
      <div>
        <div itemprop="employeeName">Nome do Servidor</div>
        <div itemprop="identificationNumber">CPF</div>
        <div itemprop="employmentContractType">Tipo de vínculo</div>
        <div itemprop="employeePosition">Cargo</div>
        <div itemprop="employeeSalary">Salário</div>
      </div>
      <!-- Data referring to a certain row of the table  -->
      <div>
        <div itemprop="employeeName">ABDENE FRANCISCO DA SILVA</div>
        <div itemprop="identificationNumber">XXX.582.004-XX</div>
        <div itemprop="employmentContractType">Contratação por excepcional interesse público</div>
        <div itemprop="employeePosition">INSTRUTOR DE BANDA</div>
        <div itemprop="employeeSalary">1439.17</div>
      </div>
    </div>
    \`\`\`
    `
}