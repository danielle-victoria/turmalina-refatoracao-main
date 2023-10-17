import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    ChangeDetectorRef,
    OnDestroy,
  } from '@angular/core';
  import { UntypedFormControl } from '@angular/forms';
  import { MapleafService } from '../turmalina/mapleaf/mapleaf.service';
  import { EvaluationService } from '../evaluation/evaluation.service';
  import { Chart, registerables } from 'chart.js';
  import { ColorGenerator } from './color-generator.model';
  import { ReplaySubject, Subject } from 'rxjs';
  import { Observable, of as observableOf } from 'rxjs';
  import { takeUntil } from 'rxjs/operators';
  import moment from 'moment';
  import { MatSelect } from '@angular/material/select';
  import { IbgeData } from '../shared/models/ibgenames.model';
  import { SimpleModalService } from 'ngx-simple-modal';
  import { AlertComponent } from './modal/alert.component';
  import { environment } from 'src/environments/environment';
  
  @Component({
    selector: 'app-evaluation',
    templateUrl: './evaluation.component.html',
    styleUrls: ['./evaluation.component.css'],
  })
  export class EvaluationComponent implements OnInit, OnDestroy {
    /*** instantiation forms ***/
    city: UntypedFormControl = new UntypedFormControl();
    date: UntypedFormControl = new UntypedFormControl();
    cityFilter: UntypedFormControl = new UntypedFormControl();
    @ViewChild('citySelect') citySelect!: MatSelect;
    @ViewChild('graphOneId') barchartid!: ElementRef;
    @ViewChild('graphTwoId') timechartid!: ElementRef;
  
    protected _onDestroy = new Subject<void>();
    public filteredCity: ReplaySubject<IbgeData[]> = new ReplaySubject<
      IbgeData[]
    >(1);
  
    /*** input data ***/
    protected cities: IbgeData[] = this.mapleafservice.resultsIbge;
    entityURL: string;
    selectedValue!: string;
    selectedValueData!: string;
    startDate!: Date;
    endDate!: Date;
    loading!: boolean;
    miniturmalina: boolean = true;
    apiLoaded: boolean = false;
    apiReturn: Observable<boolean>;
    /*** graphics ***/
    datalength!: number;
    result: any[] = [];
    public barchart!: Chart;
    public timechart!: Chart;
    conditionGraph: any = false;
    ApiRequest = new XMLHttpRequest();
    evaluationPlaceholder: string;
    preSelectedUnit: boolean = false;
    unitName: string;
  
    /*** chart data ***/
    categoryValues: number[] = [];
    categoryValuesMean: number[] = [];
    seriesValues: any[] = [];
    categoryMaxPoints: number[] = [30, 55, 31, 130, 70, 150, 40, 45, 29, 50];      //old pontuation [30, 45, 15, 120, 50, 150, 40, 45, 0, 50]
    totalMaxPoints: number = this.categoryMaxPoints.reduce((a, b) => a + b, 0);
    categoryPtLabels: string[] = [
      'Planejamento',
      'Receita',
      'Receita Extraorçamentária',
      'Despesa',
      'Despesa Extraorçamentária',
      'Licitações',
      'Contratos',
      'Convênios',
      'Pagamento',
      'Pessoal'
    ];
    categoryLabels: string[] = [
      'PlanningInstrument',
      'BudgetRevenue',
      'ExtraBudgetRevenue',
      'BudgetExpenditure',
      'ExtraBudgetExpenditure',
      'Bidding',
      'Contract',
      'Agreement',
      'PaymentDocument',
      'EmployeeInformation',
    ];
  
  
    scoreTotal!: number;
    lastUpdate!: string;
    nameCity!: string;
  
    /*** graphics configuration ***/
    stroke: number = 5;
    radius: number = 40;
    semicircle: boolean = false;
    rounded: boolean = true;
    responsive: boolean = true;
    clockwise: boolean = true;
    color: string = '#037DA6';
    background: string = '#eaeaea';
    duration: number = 800;
    animation: string = 'easeOutCubic';
    animationDelay: number = 0;
    colors: any;
    summaryMean: any;
    colorsMean: any;
  
    constructor(
      public mapleafservice: MapleafService,
      public evaluationservice: EvaluationService,
      public changeDetectorRef: ChangeDetectorRef,
      private SimpleModalService: SimpleModalService
    ) {
      Chart.register(...registerables);
    }
  
    /** display modal */
    showAlert2(i: number) {
      const active_btn: any = document.querySelector(
        '.category-search-btn.active'
      );
  
      if (active_btn) active_btn.classList.toggle('active');
  
      const pressed_category: Element | null | undefined = document.querySelector(
        `#${this.categoryLabels[i]}`
      );
      const pressed_btn_span: Element | null | undefined =
        pressed_category?.nextElementSibling;
      const pressed_btn_anchor: Element | null | undefined =
        pressed_btn_span?.firstElementChild;
  
      pressed_btn_anchor?.classList.toggle('active');
  
      //const table: any = document.querySelector(".tabela-categorias")
      const categoryHeader: any = document.querySelector('.cabecalho');
      const categoryInfo: any = document.querySelector('.categoria-informacoes');
  
      const categoryTitle: any =
        categoryHeader.querySelector('.categoria-titulo');
      categoryTitle.innerText = this.categoryPtLabels[i];
  
      const percentageDiv: any = document.querySelector('.categoria-percentual');
      const percentageTextDiv: any = percentageDiv.firstElementChild;
      const percentageValue = (this.categoryValues[i] / this.categoryMaxPoints[i]) * 100;
      const percentage = (this.categoryValues[i] / this.categoryMaxPoints[i]) * 100;
  
      percentageTextDiv.textContent = percentageValue
        ? `${percentageValue.toFixed(0)}%`
        : '0%';
      percentageDiv.removeAttribute('hidden');
      percentageDiv.style.background = percentageValue
        ? `conic-gradient(var(--color-lightgreen) ${
            (percentageValue / 100) * 360
          }deg, #d9d9d9 0deg)`
        : `conic-gradient(var(--color-lightgreen) 0deg, #d9d9d9 0deg)`;
  
      categoryHeader.style.padding = '20px 90px';
  
      let table_html: string = `<table>
                                    <thead>
                                        <tr>
                                          <th>Atributo</th>
                                          <th>Pontuação</th>
                                          <th>Percentual</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                  `;
  
      this.mapleafservice.getSubCategoryJson().subscribe((namesAndMaxPoints: any) => {
        let results = this.evaluationservice.bestEvaluation.detailedEvaluation;
  
        // categoryNamePt is itemtype names and categoryName is itemprops keys
        let categoryNamePt = this.categoryPtLabels[i]
        let categoryName = this.categoryLabels[i]
        
        // Generation Values of avaliation table for each category
        for (let subItem in namesAndMaxPoints[categoryNamePt]) {
          let resultsKey = namesAndMaxPoints[categoryNamePt][subItem]['key'];
          table_html += `<tr>
                           <td>${subItem}</td>
                           <td>${results[categoryName][resultsKey] || 0}/${namesAndMaxPoints[categoryNamePt][subItem]['max']} </td>
                           <td>${results[categoryName][resultsKey] / namesAndMaxPoints[categoryNamePt][subItem]['max'] * 100}%</td>
                         </tr>`
        }
  
        // 1° names af itemprops
        // 2° received values / max values
        // 3° received values / max values * 100 to get percentage
  
        table_html += `</tbody>
                    </table>`;
        categoryInfo.innerHTML = table_html;
      });
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
      } else if ("'".indexOf(letra) !== -1) {
        return '';
      } else {
        return letra;
      }
    }
  
    /*** sum points of categories ***/
    subCategories() {
  
      let summary = this.evaluationservice.bestEvaluation.summaryEvaluation;
  
      for (var category of this.categoryLabels) {
        let value = summary[category];
        this.categoryValues.push(Number(value));
      }
      this.scoreTotal = this.evaluationservice.bestEvaluation.score;
    }
  
    getTimeSeries() {
      if (this.evaluationservice.resultsSummaryPoints != undefined) {
        let indexSeries = -1;
        let indexAnterior = 0;
        let dateAnterior = ' ';
        let resultsLength = this.evaluationservice.resultsSummaryPoints.length;
        for (var i = resultsLength - 1; i >= 0; i = i - 1) {
          let results = this.evaluationservice.resultsSummaryPoints;
          let evaluation = this.evaluationservice.resultsSummaryPoints.slice(i)[0];
          if (evaluation.endDateTime != 'undefined') {
            let dateEvaluation = moment.utc(evaluation.endDateTime)
              .locale('pt')
              .format('L');
  
            if (dateEvaluation != dateAnterior) {
              this.seriesValues.push([dateEvaluation, Number(evaluation.score)]);
              indexSeries += 1;
              indexAnterior = i;
              dateAnterior = dateEvaluation;
            } else {
              if (evaluation.score > results.slice(indexAnterior)[0].score) {
                this.seriesValues[indexSeries] = [
                  dateEvaluation,
                  Number(evaluation.score),
                ];
              } else {
                continue;
              }
            }
          } else {
            continue;
          }
        }
        this.lastUpdate = this.seriesValues[this.seriesValues.length-1][0];
      }
    }
  
    /*** colors of the graphics ***/
    generateColors() {
      let datalength = this.categoryPtLabels.length;
  
      let color = new ColorGenerator();
      const colorRangeInfo = {
        colorStart: 0.5,
        colorEnd: 1,
        useEndAsStart: false,
      };
  
      const colorRangeInfoMean = {
        colorStart: 1,
        colorEnd: 1.5,
        useEndAsStart: false,
      };
  
      this.colors = ['#58a897'] // color.interpolateColors(datalength, colorRangeInfo);
      this.colorsMean = ['#a3876a'] /* color.interpolateColorsMean(
        datalength,
        colorRangeInfoMean
      ); */
    }
  
    /*** progress circle chart styles ***/
    getOverlayStyle() {
      const isSemi = this.semicircle;
      const transform = (isSemi ? '' : 'translateY(-40%) ') + 'translateX(-50%)';
  
      return {
        top: isSemi ? 'auto' : '40%',
        bottom: 'auto',
        left: '50%',
        transform,
        'font-size': this.radius / 3.5 + 'px',
      };
    }
  
    /*** createChart ***/
    createChart(nome: string) {
      if (this.barchart !== null && this.barchart !== undefined) {
        this.barchart.destroy();
      }
      if (this.timechart !== null && this.timechart !== undefined) {
        this.timechart.destroy();
      }
      this.categoryValues = [];
      this.seriesValues = [];
      this.summaryMean = Object.entries(this.evaluationservice.summaryMean).map(
        ([k, v]) => v
      );
      this.subCategories();
      this.generateColors();
      this.getTimeSeries();
      this.conditionGraph = true;
      this.barchart = new Chart(this.barchartid.nativeElement, {
        type: 'bar',
        data: {
          labels: this.categoryPtLabels,
          datasets: [
            {
              data: this.categoryValues,
              backgroundColor: this.colors,
              borderWidth: 1,
              label: nome,
            },
            {
              data: this.summaryMean,
              backgroundColor: this.colorsMean,
              borderWidth: 1,
              label: 'Média do Estado',
            },
          ],
        },
        options: {
          indexAxis: 'x',
          responsive: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                font: {
                  size: 15
                }
              }
            },
            title: {
              display: true,
              text: 'Pontuação do município e do Estado',
              font: {
                size: 21
              }
            },
          },
          scales: {
            xAxes: {
              ticks: {
                font: {
                  size: 15
                }
              },
            },
            yAxes: {
              ticks: {
                font: {
                  size: 15
                }
              },
            },
          },
        },
      });
  
      this.timechart = new Chart(this.timechartid.nativeElement, {
        type: 'line',
        data: {
          datasets: [
            {
              data: this.seriesValues,
              backgroundColor: this.colors,
              borderColor: this.colorsMean,
              borderWidth: 3,
            },
          ],
        },
        options: {
          indexAxis: 'x',
          responsive: true,
          plugins: {
            legend: {
              display: false,
              labels: {
                font: {
                  size: 15
                }
              }
            },
            title: {
              display: true,
              text: 'Histórico de pontuações',
              font: {
                size: 21
              }
            },
          },
          scales: {
            xAxes: {
              ticks: {
                autoSkip: false,
                maxRotation: 45,
                minRotation: 45,
                font: {
                  size: 15
                }
              },
            },
            yAxes: {
              ticks: {
                font: {
                  size: 15
                }
              },
            },
          },
        },
      });
  
    }
  
    /*** capture API data ***/
    getDadosTotalPoints(nome: any) {
      this.miniturmalina = false;
      this.loading = true;
      
      this.evaluationservice.getBestEvaluation(nome).then((_) => {
        this.evaluationservice.getSummaryPoints(nome, '12').then((_) => {
          this.entityURL = this.evaluationservice.resultsEntityURL;
          this.evaluationservice.getTurmalinaMean().then((_) => {
            this.loading = false;
            this.conditionGraph = false;
            this.nameCity = nome;
            this.createChart(nome);
            this.autoSelectFirstLabel();
          });
        });
      })
    }
  
    /*** uses the "remove accents" function in searches ***/
    searchDadosMunicipio(nomeDoMunicipio: string) {
      // let municipio = nomeDoMunicipio.replace(
      //   /[áÁàÀâÂãéÉêÊíÍóÓôÔõúÚüç']/g,
      //   this.removeAcentos
      // );
      this.getDadosTotalPoints(nomeDoMunicipio);
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
        this.mapleafservice.resultsIbge.filter(
          (bank) => bank.public_entity.toLowerCase().indexOf(search) > -1
        )
      );
    }
  
    sortCities(cities: IbgeData[]) {
      return cities.sort((a, b) =>
        a.public_entity.localeCompare(b.public_entity)
      );
    }
  
    /*** Automatically select the first label button ***/
    autoSelectFirstLabel = () => {
      const interval = setInterval(() => {
        let firstOptionButton: Element | null | undefined = document.querySelector(".categorias")?.firstElementChild?.lastElementChild?.firstElementChild;
        if (firstOptionButton) {
          this.showAlert2(0)
          if ("active" !in firstOptionButton.classList) {
            firstOptionButton.classList.add("active");
          }
          clearInterval(interval)
        }
        else return
      }, 5)
    }
  
    ngOnInit(): void {
      this.mapleafservice.getIBGE().then((data) => {
        /** This will get value changes on city selector */
        // load the initial bank list
  
        this.filteredCity.next(
          this.sortCities(this.mapleafservice.resultsIbge).slice()
        );
  
      });
  
      this.cityFilter.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterCities();
        });
  
  
        this.evaluationPlaceholder = "Selecione o Município/Estado/Órgão Público";
        
        if (environment.targetUnit != '') {
          this.preSelectedUnit = true;
          this.unitName = environment.targetUnit;
          environment.targetUnit = '';
        } else if (this.preSelectedUnit) {
          this.getDadosTotalPoints(this.unitName);
          //this.city.setValue(this.unitName);
          this.cityFilter.setValue(this.unitName);
        }
    }
  
    /** Search form */
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
  
