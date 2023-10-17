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
       
  public getIBGE(){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<IbgeData[]>(this.apiUrl + 'units')
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
