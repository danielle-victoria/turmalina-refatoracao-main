import { Router, ActivatedRoute } from '@angular/router';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapleafService } from './mapleaf.service';
import { UntypedFormControl } from '@angular/forms';
import 'leaflet';
import * as d3 from 'd3';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import { latLng, tileLayer, polygon, Polygon } from "leaflet";
import { takeUntil } from 'rxjs/operators';
import { SimpleModalService } from 'ngx-simple-modal';
import { AlertMapComponent } from './modal/alertmap.component';
import * as L from 'leaflet';
import * as _ from 'lodash';
import { Municipio } from 'src/app/shared/models/municipio.class';
import { ReplaySubject, Subject } from 'rxjs';
import { IbgeData } from 'src/app/shared/models/ibgenames.model';
import { MatSelect } from '@angular/material/select';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mapleaf',
  templateUrl: './mapleaf.component.html',
  styleUrls: ['./mapleaf.component.css']
})

export class MapleafComponent implements OnInit {
  map:any;
  public innerWidth: any;
  
  municipioCtrl!: UntypedFormControl;
  protected _onDestroy = new Subject<void>();
  public filteredCity: ReplaySubject<IbgeData[]> = new ReplaySubject<IbgeData[]>(1);
  city: UntypedFormControl = new UntypedFormControl();
  cityFilter: UntypedFormControl = new UntypedFormControl();
  @ViewChild('citySelect') citySelect!: MatSelect;
  protected cities: IbgeData[] = this.mapleafservice.resultsIbge
  selectedValue!: string;


  paraibaGeoJson: any;
  municipios: Municipio[] = [];
  private stateTiles: any[] = [];
  private initialZoom: any = 8;
  public layers: any[] = [];
  private color:any;
  scaleColorLegend: any;
  public maxscoreMunicipios: number = 630;
  public MAX_score = 630;
  municipiosTopTen: Municipio[] = [];
  colorTextRank = "#fffff";
  colorTextRankScale: any;
  
  adjustmapResolution(sizeScreen:any) {
    if (sizeScreen <= 600) {
      this.map.setView([+-7.60, -36.75], 7);
    }
  }

  private removeAccents(letra: string) {
    if ('áàâã'.indexOf(letra) !== -1) {
      return 'a';
    } else if ('éê'.indexOf(letra) !== -1) {
      return 'e';
    } else if ('í'.indexOf(letra) !== -1) {
      return 'i';
    } else if ('óôõ'.indexOf(letra) !== -1) {
      return 'o';
    } else if ('úü'.indexOf(letra) !== -1) {
      return 'u';
    } else if ('ç'.indexOf(letra) !== -1) {
      return 'c';
    } else if ('\''.indexOf(letra) !== -1) {
      return '';
    } else {
      return letra;
    }
  }

  private simplifiesNames(name: string) {
    return name.toLowerCase().replace(/[áàâãéêíóôõúüç']/g, this.removeAccents);
  }

  filterMunicipios(name: string) {
    return this.municipios.filter(municipio =>
      _.isEqual(this.simplifiesNames(municipio.name), this.simplifiesNames(name)));
  }

  public convertJsonObjMunicipio(data: any) {
    let cont = 1
    for (let i in data) {
      let municipio = new Municipio();
      municipio.name = data[i]["management_unit"]["public_entity"];
      municipio.score = data[i]["score"];
      municipio. maxScore = this.MAX_score;
      municipio.urlPortal = data[i]["management_unit"]["start_urls"];
      municipio.position = cont;
      this.municipios.push(municipio);
      cont = cont + 1;
    }

  }

  public getTilesByZoomLevel() {
    return this.stateTiles;
  }

  public getscoreMunicipio(municipio: string) {
    for (let m of this.municipios) {
      if (this.simplifiesNames(municipio) === this.simplifiesNames(m.name)) {
        return m.score;
      }
    }
    return null;
  }

  public getColor(scoreMunicipio: any) {
    this.scaleColorLegend = this.scaleColorLegend === undefined ? d3.scaleSequential(["#76ffe1", "#007d62"])
      .domain([this.MAX_score,0]) : this.scaleColorLegend;
    return this.scaleColorLegend(scoreMunicipio);
  }


  public mapReady(map: L.Map) {

      this.map = map;
      let legend = new (L.Control.extend({
        options: { position: 'bottomleft' }
      }));

      let logos = new (L.Control.extend({
        options: { position: 'bottomleft' }
      }));
  
      this.mapleafservice.getEstadoParaibaGeoJson().subscribe((data: any) => {
        const paraibaLatLon = data.features[0].geometry.coordinates[1].map(
          (coords: any) => new L.LatLng(coords[1], coords[0])
        );
  
        
        L.polygon(
          [
            [
              new L.LatLng(90, -180),
              new L.LatLng(90, 180),
              new L.LatLng(-90, 180),
              new L.LatLng(-90, -180)
            ],
            paraibaLatLon
          ],
          {fillColor: '#a6cba8', color: "#007d62", weight: 3, opacity: 0.4, fillOpacity: 0}
        ).addTo(map);
       
      });
  
      const vm = this;

      legend.onAdd = (map) => {

          // Main container

          var legend_container = L.DomUtil.create('div', "legend-container");

           //Container of logos
          var logos_container= L.DomUtil.create('div', "logos-container", legend_container);

          //Logo aria

          var logo_aria = L.DomUtil.create('a', "logo aria", logos_container);
            logo_aria.setAttribute("href", "https://aria.ci.ufpb.br/");
            logo_aria.setAttribute("target", "_blank")
            var img_logo_aria = L.DomUtil.create('img', "img logo aria", logo_aria);
              img_logo_aria.setAttribute("src", "/assets/images/a-aria3.png");

          //Logo UFPB

          var logo_ufpb = L.DomUtil.create('a', "logo ufpb", logos_container);
            logo_ufpb.setAttribute("href", "https://www.ufpb.br/");
            logo_ufpb.setAttribute("target", "_blank")
              var img_logo_ufpb = L.DomUtil.create('img', "img logo ufpb", logo_ufpb);
                img_logo_ufpb.setAttribute("src", "/assets/images/ufpb-256.png");

          // Logo TCE

          var logo_tce= L.DomUtil.create('a', "logo tce", logos_container);
            logo_tce.setAttribute("href", "https://tce.pb.gov.br/");
            logo_tce.setAttribute("target", "_blank")
              var img_logo_tce = L.DomUtil.create('img', "img logo tce", logo_tce);
                img_logo_tce.setAttribute("src", "/assets/images/TCE2.png");

          // Div Score

          var div = L.DomUtil.create('div', 'info legend', legend_container),
              //grades = [0, 100, 200, 300, 400, 500, 630],
              //grades = [0, 20, 40, 60, 80, 100],
              grades = [0, 125, 250, 380, 510, 630],
              labels = [];

          div.innerHTML += '<div class="legend_text"><h1> Pontuação </h1></div>';
          var divtext = L.DomUtil.create('div', 'legend_box', div);
          
          // for (var i = 0; i < grades.length; i++) {
          //     divtext.innerHTML +=
          //     '<i style="background:' + vm.getColor(grades[i] + 1) + '"></i> ' +
          //     grades[i] + (grades[i + 1] ?'<br>' : '+');              
  
          // }

          divtext.innerHTML +=
          '<i style="background: linear-gradient(90deg, ' + vm.getColor(grades[0]) + '  0%, ' + vm.getColor(grades[5]) + ' "></i> ' +
          '<div>' +
          '<div>' + grades[0] +  '</div>' + '<div>' + grades[1] +  '</div>' + '<div>' + grades[2] +  '</div>' + '<div>' + grades[3] +  '</div>' + '<div>' + grades[4] +  
          '</div>' + '<div>' + grades[5] +  '</div>' + '</div>';

          //divtext.innerHTML +=
          //'<i style="background: linear-gradient(90deg, ' + vm.getColor(grades[0]) + '  0%, ' + vm.getColor(grades[5]) + ' "></i> ' +
          //'<div>' + '<div>' + grades[0] + '%</div>' + '<div>' + grades[1] + '%</div>' + '<div>' + grades[2] + '%</div>' + '<div>' + grades[3] + '%</div>' + '<div>' + grades[4] + 
          //'%</div>' + '<div>' + grades[5] + '%</div>' + '</div>';

          //Container of flags

          var flag_container= L.DomUtil.create('div', "flag-container", legend_container);

          // ODS flag

          var flag_ods = L.DomUtil.create('img', "flag ods", flag_container);
            flag_ods.setAttribute("src", "/assets/images/ODS_logo.png");

          //Brazil flag

          var flag_brasil = L.DomUtil.create('img', "flag brasil", flag_container);
            flag_brasil.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg");

          // ODS flag

          var flag_paraiba = L.DomUtil.create('img', "flag paraiba", flag_container);
            flag_paraiba.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Bandeira_da_Para%C3%ADba.svg/300px-Bandeira_da_Para%C3%ADba.svg.png");

          return legend_container;
      };
  
      legend.addTo(map);
      
      map.on('zoom', (result) => {
        this.layers = [];
        this.zone.run(() => {
          this.layers = this.getTilesByZoomLevel();
        });
      });
      
  }

  public mapOptions = {
    layers: [
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { minZoom: 6, maxZoom: 10, attribution: '...' }),
    ],
    attributionControl: false,
    zoom: this.initialZoom,
    minZoom: 8,
    maxZoom: 11,
    zoomControl: false,
    maxBounds: L.latLngBounds(latLng(-10.423935, -42.618801), latLng(-4.397879, -30.041905)),
    center: latLng(-7.12186, -36.72462)
    
  };

  private fetchTiles(tileObject:any) {
    this.mapleafservice.getParaibaGeoJson().subscribe((data: any) => {

      data.features.map((feature:any) => {
        feature.geometry.coordinates.forEach((coordinate: any) => {
          const nameMunicipio = feature.properties.NM_MUNICIP === "SANTA TERESINHA" ? "SANTA TEREZINHA" : feature.properties.NM_MUNICIP;
          const municipio = this.filterMunicipios(nameMunicipio)[0];
          const scoreMunicipio = this.getscoreMunicipio(nameMunicipio);
          const p = polygon(coordinate.map((coords:any) => [coords[1], coords[0]]),
            {
              // fillColor: scoreMunicipio !== null ? this.color(scoreMunicipio) : this.color(Math.random() * 500), 
              fillColor: scoreMunicipio !== null ? this.color(scoreMunicipio) : '#2e1c08',
              color: '#2e1b08',
              weight: 2,  
              opacity: 0.1,
              fillOpacity: 0.7
              // fillOpacity: scoreMunicipio !== null ? 0.85 : 0.05
            });
          p.addTo(this.map)
          if (scoreMunicipio !== null) {
            this.addPolygonMunicipio(nameMunicipio, p);
            this.addMouseOverPolygonEvent(p, municipio);
            this.addEventPolygon(p, municipio);
            this.addEventClickPolygon(p, municipio);
          }
          tileObject.push(p);

        });
      });

      this.layers = this.getTilesByZoomLevel();
      this.map.invalidateSize();
      this.innerWidth = (window.innerWidth <= 600);
      this.adjustmapResolution(window.innerWidth);
      
    });
  }

  
  public addPolygonMunicipio(nameMunicipio: string, p:any) {
    for (let i in this.municipios) {
      if (this.simplifiesNames(this.municipios[i].name) === this.simplifiesNames(nameMunicipio.toLowerCase())) {
        this.municipios[i].polygon = p;
        return;
      }
    }
  }

  public addEventClickPolygon(p: Polygon, municipio: Municipio) {
    p.addEventListener('click', evt => {
      this.zone.run(() => {
        this.restoremapStateInitial();
      });
      this.zone.run(() => this.map.fitBounds(p.getBounds()));
      environment.targetUnit = municipio.name;

      setTimeout(() => { this._router.navigateByUrl('/evaluation'); }, 500);

    });
  }

  public addMouseOverPolygonEvent(p: Polygon, municipio: Municipio) {
    p.addEventListener('mouseover', evt => {
      this.zone.run(() => {
        this.restoremapStateInitial();
      });
      p.setStyle({
        fillColor: '#361f01',
        color: '#2e1b08',
        weight: 2,  
        opacity: 0.1,
      });
      p.bindPopup(this.getConteudoPopUp(municipio)).openPopup();
    });
  }

  public addEventPolygon(p: Polygon, municipio: Municipio) {
    p.addEventListener('mouseout', evt => {
      this.zone.run(() => {
        this.restoremapStateInitial();
      });
      p.setStyle({
        fillColor: municipio.score != null ? this.color(municipio.score) : '#3b3b3b3b',
        color: '#2e1b08',
        weight: 2,  
        opacity: 0.1,
      });
      p.bindPopup(this.getConteudoPopUp(municipio)).closePopup();

    });
  }

  public zoomPolygon(p : Polygon, municipio: Municipio){
    this.restoremapStateInitial();
    this.map.fitBounds(p.getBounds());
    p.bindPopup(this.getConteudoPopUp(municipio)).openPopup();
  }
  
  public restoremapStateInitial() {
    for (let i in this.municipios) {
      if (this.municipios[i].polygon !== null) {
        this.municipios[i].polygon.setStyle({
          fillColor: this.color(this.municipios[i].score),
          color: '#2e1b08',
          weight: 2,  
          opacity: 0.1,
        });
        this.municipios[i].polygon.bindPopup(this.getConteudoPopUp(this.municipios[i])).closePopup();

      }
    }
  }

  public initializeMunicipiosComponent() {
    this.municipiosTopTen = this.municipios.slice(0, 10);
    return this.municipiosTopTen;
  }

  public getConteudoPopUp(municipio: Municipio) {
    return '<div style="font-size:16px"><b style="font-size:19px">' + municipio.name +
    '</b> <div class="popup-info-box"> <span class="popup-info-display-flex"> Posição no rank: <b> ' + municipio.position + '° </b>' + '</span>'
      +'</b> <span class="popup-info-display-flex"> Pontuação: <span> <b> ' + municipio.score + '</b>/<b>' + municipio. maxScore + '</span>' + '</span>'
      + '</b> <span class="popup-info-display-flex"> Porcentagem: <b> ' + '<span width="10px"></span>' + ((municipio.score*100/municipio. maxScore).toFixed(0)).replace(".",",") + '% </b> </font>' + '</span>'
      + '</div>' + '</div>';
      
  }

  
  filterCities() {
    if (!this.mapleafservice.resultsIbge) {
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
    // filter the banks
    this.filteredCity.next(
      this.mapleafservice.resultsIbge.filter((bank) => bank.public_entity.toLowerCase().indexOf(search) > -1)
    );

  }

  sortCities(cities: IbgeData[]){

    let newcities = cities.sort((a, b) => a.public_entity.localeCompare(b.public_entity))
    const vw  =this
    let index= newcities.map(function(e) {
      return e.name.replace(/[áÁàÀâÂãéÉêÊíÍóÓôÔõúÚüç']/g, vw.removeAccents);
    }).indexOf('Governo da Paraiba')
    let newobject: IbgeData = newcities[0];
    newcities[0] = newcities[index];
    newcities[index] = newobject;
    return newcities
  }

  searchDadosMunicipio(nameDoMunicipio:string){
    let municipio = nameDoMunicipio.replace(/[áÁàÀâÂãéÉêÊíÍóÓôÔõúÚüç']/g, this.removeAccents);
    const municipioFiltrado = this.filterMunicipios(municipio)[0];
    if(municipioFiltrado.polygon != undefined){
      this.zoomPolygon(municipioFiltrado.polygon, municipioFiltrado)
    }
    else{
      this.showAlert2(municipioFiltrado)
    }
  }

  showAlert2(municipio: Municipio) {
      let messageText = [];
      messageText.push(`Pontuação: ${municipio.score}/${municipio. maxScore}`)
      messageText.push(`Posição no rank: ${municipio.position}°`)
      let imageurl = undefined
      if(this.simplifiesNames(municipio.name) === "estado da paraiba"){
        imageurl="./bandeira.png"
      }

      this.SimpleModalService.addModal((AlertMapComponent), { 
        title: municipio.name,
        message: messageText,
        imageurl: imageurl
      }, { closeOnClickOutside: true });
  }

  constructor(private zone: NgZone, private mapleafservice: MapleafService, private SimpleModalService: SimpleModalService, private _router: Router) {
  }

  ngOnInit(): void{
    this.initialZoom = 8;

    this.mapleafservice.getIBGE().then(data => {
      /** This will get value changes on city selector */
      // load the initial bank list
      this.filteredCity.next(this.sortCities(this.mapleafservice.resultsIbge).slice());
      }
    );


    this.cityFilter.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterCities();
    });

    this.mapleafservice.getRankingModel().subscribe((data: any) => {
      this.convertJsonObjMunicipio(data);
      this.layers = this.getTilesByZoomLevel();
      this.fetchTiles(this.stateTiles);
      this.map.createPane('labels');

      // This pane is above markers but below popups
      this.map.getPane('labels').style.zIndex = 650;
    
      // Layers in this pane are non-interactive and do not obscure mouse/touch events
      this.map.getPane('labels').style.pointerEvents = 'none';
      
      const tilesPane =  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        pane: 'labels'
      });
      tilesPane.addTo(this.map);
      this.initializeMunicipiosComponent();
      this.maxscoreMunicipios = this.municipiosTopTen[0].score;
      this.color = d3.scaleSequential(["#76ffe1", "#007d62"]).domain([this.MAX_score, 0]);
      //this.color = d3.scaleSequential(d3.interpolateBlues).domain([0, this.MAX_score]);
    })
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
