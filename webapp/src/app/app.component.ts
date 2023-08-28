import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  public colorString!: string
  toggleNavbar = true;


  constructor(private router: Router) { 
  }

  getRoute(){
    return this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationStart) {
          if (event.url.search("/documentation") != -1) {
            this.colorString = "whitemap";
          }
          else {
            if(event.url.search("/turmalina") != -1){
              if (this.router.url == "/turmalina/mapleaf") {
                window.location.reload();
              }
              this.colorString = "whitemap";
            }
            else {
              this.colorString = "gray";
            }
          }
        }
      }
    )
  }

  ngOnInit(){
    this.getRoute()
  }

  ngAfterViewInit(){
    this.getRoute()
  }
  title = 'turmalina';
}
