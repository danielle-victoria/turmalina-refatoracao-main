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
    # Guys

    ## Type: EmployeeInformation
    
    The EmployeeInformation type has several properties that represent basic information about the city's public servants, aggregating information that includes positions, salaries and type of bond. The following are the names of the type's defined properties:
    
    | PROPERTY | EXPECTED TYPE | DESCRIPTION |
    | ------ | ------ | ------ |
    | employeeName | text | Text field containing the server name |
    | identificationNumber | text |  Text field containing the server's CPF |
    | employmentContractType | text | Text field containing the server contract type |
    | employeePosition | text | Text field containing the type of position/function of the server |
    | employeeSalary | number:float | Monetary field containing the server's salary value |
    
    This is an HTML example using table
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
        <!-- Data referring to a certain row of the table  -->
        <tr>
            <td itemprop="employeeName">ABDENE FRANCISCO DA SILVA</td>
            <td itemprop="identificationNumber">XXX.582.004-XX</td>
            <td itemprop="employmentContractType">Contratação por excepcional interesse público</td>
            <td itemprop="employeePosition">INSTRUTOR DE BANDA</td>
            <td itemprop="employeeSalary">1439.17</td>
        </tr>
    </table>
    \`\`\`
    
    This is an example in HTML using div
    
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
