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

export class ReportService {
  /*** Urls ***/
  apiUrl = environment.apiUrl
  
  resultsDates!: any[];
  
  constructor(private http:HttpClient) {
    
  }

        
  public getTurmalinaDates(municipio:string){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'dates' + '?entity=' + municipio)
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
  
}
