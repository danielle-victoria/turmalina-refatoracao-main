import { TurmalinaStampDetail } from './../../shared/models/turmalinastamp_detail.model';
import { TurmalinaStamp } from './../../shared/models/turmalinastamp.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IbgeData } from 'src/app/shared/models/ibgenames.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MapleafService {
  /*** Urls ***/
  apiUrl = environment.apiUrl
  ibgeUrl = 'https://servicodados.ibge.gov.br/'
  
  resultsDetailPoints!: TurmalinaStampDetail[];
  resultsEntityURL: string;
  resultsSummaryPoints!: any;
  bestEvaluation: any;
  resultsIbge : IbgeData[];
  resultsDates!: any[];
  resultsEvaluationId!: any;
  summaryMean: any;
  ranking: any;

  constructor(private http:HttpClient) {
    this.resultsDetailPoints = [];
    this.resultsIbge = [];
  }

  public getSubCategoryJson(): Observable<any>{
    return this.http.get("./assets/subcategory/names.json")
  }

  public getParaibaGeoJson(): Observable<any> {
    return this.http.get("./assets/map-data/paraiba.json")
  }

  public getEstadoParaibaGeoJson(): Observable<any> {
    return this.http.get("./assets/map-data/shape_paraiba.json")
  }
  
  public getTurmalinaStamp(municipio:string, firststamp:string, secondstamp:string){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'turmalina_entitiestimestamp' + '?entity=' + municipio + '&first_timestamp=' + firststamp + ' 00:00:00.000' + '&second_timestamp=' + secondstamp + ' 23:59:59.999')
      .toPromise()
      .then(
        data => {
          this.resultsDetailPoints = data;
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    })
    return promise
  }

  public getTurmalinaEvaluationId(id:string){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'turmalina_evaluationbyid' + '?id=' + id)
      .toPromise()
      .then(
        data => {
          this.resultsEvaluationId = data;
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    })
    return promise
  }

  public getTurmalinaMean(){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'turmalina_summarymean')
      .toPromise()
      .then(
        data => {
          this.summaryMean = data;
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    })
    return promise
  }

  public getRanking(){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'turmalina_ranking')
      .toPromise()
      .then(
        data => {
          this.ranking = data;
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    })
    return promise
  }

  public getRankingModel(): Observable<any>{
    return this.http.get<any[]>(this.apiUrl + 'turmalina_ranking')
  }

  public getTurmalinaDates(municipio:string){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'turmalina_dates' + '?entity=' + municipio)
      .toPromise()
      .then(
        data => {
          this.resultsDates = data;
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    })
    return promise
  }

  public getSummaryPoints(municipio:string, quantity:string){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'turmalina_entitieslatest' + '?entity=' + municipio + '&quantity=' +  quantity)
      .toPromise()
      .then(
        data => {
          this.resultsEntityURL = data[0].management_unit.start_urls;
          this.resultsSummaryPoints = data.map(item => {
            return new TurmalinaStamp(
              item.detailed_evaluation,
              item.end_datetime,
              item.id,
              item.log_path,
              item.management_unit,
              item.score,
              item.start_datetime,
              item.status,
              item.summary_evaluation,
            )
          })
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    })
    return promise
  }

  public getBestEvaluation(municipio:string) {
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any>(this.apiUrl + 'turmalina_getbestevaluation' + '?entity=' + municipio)
      .toPromise()
      .then(
        data => {
          this.bestEvaluation = new TurmalinaStamp(
              data.detailed_evaluation,
              data.end_datetime,
              data.id,
              data.log_path,
              data.management_unit,
              data.score,
              data.start_datetime,
              data.status,
              data.summary_evaluation,
            )
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    })
    return promise
  }

  public getIBGE(){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<IbgeData[]>(this.apiUrl + 'turmalina_units')
      .toPromise()
      .then(
        data => {
          this.resultsIbge = data.map(item => {
            return new IbgeData(
              item.id,
              item.name,
              item.public_entity,
            )
          })
          // resolve();
        },
        msg => {
          reject(msg);
        }
        
      );
    })
    return promise
  }
}
