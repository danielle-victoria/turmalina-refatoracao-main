import { UntypedFormGroup } from '@angular/forms';
import { User } from './../shared/models/user.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LogsService {
  public logsUrl:string = environment.apiUrl + 'turmalina_logs' 
  public registerRequests$: BehaviorSubject<number>;
  constructor(private http: HttpClient) {
    this.registerRequests$ = new BehaviorSubject<number>(0);
  } 

  register(user : UntypedFormGroup): any{

    // let body: any = new HttpParams();
    // body = body.append('start_urls', user.start_urls);
    // body = body.append('receiver_address', user.receiver_address);

    let body: any = new HttpParams();

    body = body.append('start_urls', user.value.start_urls);
    body = body.append('receiver_address', user.value.receiver_address);
    console.log(body) 
    const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };

    return this.http.post(environment.apiUrl + 'turmalina_logs', body, httpOptions)
  }
}

