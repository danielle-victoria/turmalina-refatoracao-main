import { Component,OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: [ './logs.component.css' ]
})
export class LogsComponent implements OnInit {
  name = 'Logs';
  LogsHtml: SafeHtml;
  constructor(private http:HttpClient,
  private sanitizer:DomSanitizer){

  }
  ngOnInit(){
    this.http.get('http://host.docker.internal:5000/logs',{responseType:'text'}).subscribe(res=>{
      this.LogsHtml = this.sanitizer.bypassSecurityTrustHtml(res);
    })
  }
}
