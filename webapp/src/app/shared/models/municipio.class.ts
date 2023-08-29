import { polygon } from 'leaflet';


export class Municipio{
    name!: string;
    dateUpdate: any;
    urlPortal!: string;
    polygon: any;
    score!: number;
    maxScore!: number;
    position!: number;
    rankingColor: string;

    constructor() {
        this.rankingColor = 'rgb(165, 204, 228)';
        this.polygon = null;
    }



    public setRankingColor(color: string){
        this.rankingColor = color;
    }

}
