import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RankService {
  /*** Urls ***/
  apiUrl = environment.apiUrl
  
  ranking: any;

  constructor(private http:HttpClient) {
    
  }
  
  public getRanking(){
    let promise = new Promise<void>((resolve, reject) => {
      this.http
      .get<any[]>(this.apiUrl + 'ranking')
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
    return this.http.get<any[]>(this.apiUrl + 'ranking')
  }

    
}
