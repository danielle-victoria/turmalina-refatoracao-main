import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import menuData from 'src/assets/search/menuData.json';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DocumentationComponent implements OnInit{
  title = "Open Web Technology";
  subtitle = "Technical call live coding challenge";

  userQuery = "";
  queryField = new UntypedFormControl();

  home = menuData[0].Name;
  tutorial = menuData[1].Name;
  revenue = menuData[2].Name;
  budgetRevenue = menuData[3].Name;
  extraBudgetRevenue = menuData[4].Name;
  budget = menuData [5].Name;
  budgetExpenditure = menuData[6].Name;
  extraBudgetExpenditure = menuData[7].Name;
  paymentDocument = menuData[8].Name;
  contract = menuData[9].Name;
  planningInstrument = menuData[10].Name;
  bidding = menuData[11].Name;
  agreement = menuData[12].Name;
  employeeInformation = menuData[13].Name;
  citizenInformation = menuData[14].Name;
  historicalSeries = menuData[15].Name;
  sandbox = menuData[16].Name;
  scores = menuData[17].Name;

  find(userQuery: string, content: string){
      if(userQuery.length > 0){
          return content.includes(userQuery)
      }
      return true
  }

  ngOnInit(){}
  
}
