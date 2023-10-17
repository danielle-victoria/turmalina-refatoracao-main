import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UntypedFormControl, FormControl } from '@angular/forms';
import { MapleafService } from '../turmalina/mapleaf/mapleaf.service';
import { ReportService } from '../report/report.service';
import { EvaluationService } from '../evaluation/evaluation.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DateAdapter } from '@angular/material/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Observable, of as observableOf } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { IbgeData } from '../shared/models/ibgenames.model';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit, OnDestroy{
  /*** instantiation forms ***/
  city: UntypedFormControl = new UntypedFormControl();
  date: any;
  cityFilter: UntypedFormControl = new UntypedFormControl();
  @ViewChild('citySelect') citySelect!: MatSelect;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  protected _onDestroy = new Subject<void>();
  public filteredCity: ReplaySubject<IbgeData[]> = new ReplaySubject<IbgeData[]>(1);
  
  /*** input data ***/
  protected cities: IbgeData[] = this.mapleafservice.resultsIbge
  selectedValue!: string;
  selectedValueData!: string;
  endDate!: Date;
  loading!: boolean;
  miniturmalina: boolean = true;
  result: any;
  colors:any;
  filter:any;
  apiLoaded: boolean = false;
  apiReturn: Observable<boolean>;
  listDatesApi: any[] = [];
  dateId: any;
  datesApi: any[] = [];
  safeUrl: any;
  resultsEvaluation: any;
  reportUrl!: string;
  scoreTotal!: number;
  ApiRequest = new XMLHttpRequest();
  lastDate: any;

  constructor(public mapleafservice: MapleafService, public evaluationservice: EvaluationService, public reportservice: ReportService, private dateAdapter: DateAdapter<any>, private sanitizer: DomSanitizer){
    this.dateAdapter.setLocale('pt');
  }

  displaypdfvar = false;
  displaypdf() {
    this.displaypdfvar = true;
  }

  async getDates(selectedValue: string){
    this.listDatesApi = []
    if(selectedValue){
      // await this.mapleafservice.getTurmalinaDates(selectedValue.replace(/[áÁàÀâÂãéÉêÊíÍóÓôÔõúÚüç']/g, this.removeAcentos));
      await this.reportservice.getTurmalinaDates(selectedValue);

      for(var i in this.reportservice.resultsDates){
        let resultDate = this.reportservice.resultsDates[i]
        this.listDatesApi.push([moment.utc(resultDate["end_datetime"]).format("DD/MM/YYYY"), resultDate["id"]])
      }

      var datearray = this.listDatesApi[0][0].split("/");
      this.date = moment.utc(datearray[1] + '/' + datearray[0] + '/' + datearray[2]);

      return true;
    }
    else{
      return false;
    }
  }

  verifyDates(datesForms:string, datesApi:any[]){
    for(var i in datesApi){
      if(datesForms == datesApi[i][0]){
        return true;
      }
      else{
        continue;
      }
    }
    return false;
  }

  /*** filter dates ***/
  myFilter = (d: Date | null): boolean => {
    const day = moment.utc(d || new Date());
    // Prevent Saturday and Sunday from being selected.
    return day?this.verifyDates(day.format("DD/MM/YYYY"), this.listDatesApi):true 
  }
  
  /*** remove accents ***/
  removeAcentos(letra: string) {
    /** Remove letters accents*/
    if ('áàâã'.indexOf(letra) !== -1) {
      return 'a';
    } else if ('ÁÀÂ'.indexOf(letra) !== -1) {
      return 'A';
    } else if ('éê'.indexOf(letra) !== -1) {
      return 'e';
    } else if ('ÉÊ'.indexOf(letra) !== -1) {
      return 'E';
    } else if ('íÍ'.indexOf(letra) !== -1) {
      return 'i';
    } else if ('Í'.indexOf(letra) !== -1) {
      return 'I';
    } else if ('óÓôÔõ'.indexOf(letra) !== -1) {
      return 'o';
    } else if ('ÓÔ'.indexOf(letra) !== -1) {
      return 'O';
    } else if ('úÚü'.indexOf(letra) !== -1) {
      return 'u';
    } else if ('Ú'.indexOf(letra) !== -1) {
      return 'U';
    } else if ('ç'.indexOf(letra) !== -1) {
      return 'c';
    } else if ('\''.indexOf(letra) !== -1) {
      return '';
    } else {
      return letra;
    }
  }

  getSafeUrl(url:string){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

  // autoSelectLoading = () => {
  //   const interval = setInterval(() => {
  //     let lbar: any | null | undefined = document.querySelector("#lbar")
  //     if (lbar) {
  //       lbar.style.display = "block"
  //       clearInterval(interval)
  //     }
  //     else return
  //   }, 5)
  // }

  createTable(){
    this.resultsEvaluation = []
    this.resultsEvaluation = this.evaluationservice.resultsEvaluationId

    this.datesApi = []
    this.datesApi.push([moment.utc(this.resultsEvaluation["start_datetime"]).format("DD/MM/YYYY"), moment.utc(this.resultsEvaluation["end_datetime"]).format("DD/MM/YYYY")])
    let dateFormated = moment.utc(this.datesApi[0][1], 'DD/MM/YYYY').format("YYYY-MM-DD")
    this.reportUrl = environment.apiUrl + "report?management_unit=" + (this.resultsEvaluation["management_unit"]["name"]) + "&date=" + dateFormated
    this.getSafeUrl(this.reportUrl)
  }

  getDadosApi(id:string){
    this.miniturmalina = false
    this.loading = true
    this.evaluationservice.getTurmalinaEvaluationId(id).then(_ => {
      this.loading = false;
      this.createTable();
    })
  }

  correctionDate(date: Date){
    let day = new Date(date).getDate()
    let month = new Date(date).getMonth()
    let year = new Date(date).getFullYear()

    return `${year}-${month+1 < 10? `0${month+1}` : month+1}-${day < 10 ? `0${day}`: day }`
  }

  searchDadosMunicipio(date: any){
    var date = date.format("DD/MM/YYYY");
    var position = '';
    for( var i in this.listDatesApi){
      if(date == this.listDatesApi[i][0]){
        position = i;
        break;
      }
      else{continue}
    }
    this.getDadosApi(this.listDatesApi[Number(position)][1])
  }
  
  filterCities(){
    if(!this.mapleafservice.resultsIbge){
      return;
    }
    // get the search keyword
    let search = this.cityFilter.value;
    if (!search) {
      this.filteredCity.next(this.mapleafservice.resultsIbge.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the cities
    this.filteredCity.next(
      this.mapleafservice.resultsIbge.filter((bank) => bank.public_entity.toLowerCase().indexOf(search) > -1)
    );
  }

  sortCities(cities: IbgeData[]){
    return cities.sort((a, b) => a.public_entity.localeCompare(b.public_entity))
  }

  ngOnInit(): void {
    this.mapleafservice.getIBGE().then(data => {
      this.filteredCity.next(this.sortCities(this.mapleafservice.resultsIbge).slice());
    });
    this.cityFilter.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterCities();
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  getApiStatus(): Observable<boolean> {


    if (!this.apiLoaded){
      this.ApiRequest.open("GET", environment.apiUrl + "units");
      this.ApiRequest.send();
      
      this.ApiRequest.onload = () => {
        if (this.ApiRequest.status == 200) {
          if (!this.apiLoaded){
            this.apiLoaded = true;
            this.ngOnInit();
          }
          this.apiReturn = observableOf(true);
        
        } else {
          if (this.apiLoaded){
            this.apiLoaded = false;
          }
        
          this.apiReturn = observableOf(false);
        }
      };
    }
      
    return this.apiReturn;
  }

}
