import { TurmalinaStampDetail } from './../shared/models/turmalinastamp_detail.model';
import { TurmalinaStamp } from './../shared/models/turmalinastamp.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IbgeData } from 'src/app/shared/models/ibgenames.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EvaluationService {
  /*** Urls ***/
  apiUrl = environment.apiUrl
  
  resultsDetailPoints!: TurmalinaStampDetail[];
  resultsEntityURL: string;
  resultsSummaryPoints!: any;
  bestEvaluation: any;
  resultsEvaluationId!: any;
  summaryMean: any;
  
  constructor(private http:HttpClient) {
    
  }
  
  public getTurmalinaStamp(municipio:string, firststamp:string, secondstamp:string){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'entitiestimestamp' + '?entity=' + municipio + '&first_timestamp=' + firststamp + ' 00:00:00.000' + '&second_timestamp=' + secondstamp + ' 23:59:59.999')
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
      .get<any[]>(this.apiUrl + 'evaluationbyid' + '?id=' + id)
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
      .get<any[]>(this.apiUrl + 'summarymean')
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

  public getSummaryPoints(municipio:string, quantity:string){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'entitieslatest' + '?entity=' + municipio + '&quantity=' +  quantity)
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
      .get<any>(this.apiUrl + 'getbestevaluation' + '?entity=' + municipio)
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

  
}
