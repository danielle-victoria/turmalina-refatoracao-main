import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MapleafService } from '../turmalina/mapleaf/mapleaf.service';
import { RankingModel } from '../shared/models/ranking.model';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import moment from 'moment';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit{
  rank: any;
  rankingList: RankingModel[]=[];
  endDateTime!: any;
  displayedColumns: string[] = ['posicao','orgao','ente','avaliacao', 'pontuacao', 'porcentagem', 'url']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<RankingModel>();
  visibility:boolean = false;
  loading: boolean = true;

  constructor(private mapleafservice: MapleafService) {
  }

  ngOnInit(){
    this.getRankingInformation();
  }

  /// Calculate position by Dense method (No jumps in position after ties)

  calculatePosition(index: number) {
    let position = index + 1;
  
    // Check ties based on score
    let previousScore = Number(this.rank[index]["score"]);
    let numEqualScores = 0;
    for (let i = index - 1; i >= 0; i--) {
      const currentScore = Number(this.rank[i]["score"]);
      if (currentScore === previousScore) {
        numEqualScores++;
      }
      previousScore = currentScore;
    }
  
    position -= numEqualScores;
  
    return position + '°';
  }

 /// Calculate position by method min (Position skips after ties)

  /*calculatePosition(index: number) {
    let position = index + 1;
  
    // Verificar empates com base no score
    for (let i = index - 1; i >= 0; i--) {
      if (Number(this.rank[i]["score"]) === Number(this.rank[index]["score"])) {
        position--;
      } else {
        break;
      }
    }
  
    return position + '°';
  }*/

  getRankingInformation(){
    this.mapleafservice.getRanking().then(_ => { 
      this.visibility = true
      setTimeout(() => {
        this.loading = false;
      },1000);
      this.rank = this.mapleafservice.ranking
      for(var i in this.rank){
        this.rankingList.push(
          {
            end_datetime: moment.utc(this.rank[i]["end_datetime"]).format("DD/MM/YYYY"),
            position: this.calculatePosition(Number(i)),
            name: this.rank[i]["management_unit"]["name"],
            public_entity: this.rank[i]["management_unit"]["public_entity"],
            url: this.rank[i]["management_unit"]["start_urls"],
            score: this.rank[i]["score"]
          }
        ) 
      }
      this.dataSource.data = this.rankingList;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}