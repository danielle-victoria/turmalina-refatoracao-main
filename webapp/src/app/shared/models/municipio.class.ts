import { polygon } from 'leaflet';


export class Municipio{
    nome!: string;
    dataAtualizacao: any;
    urlPortal!: string;
    polygon: any;
    pontuacao!: number;
    pontuacaoMaxima!: number;
    posicao!: number;
    rankingColor: string;

    constructor() {
        this.rankingColor = 'rgb(165, 204, 228)';
        this.polygon = null;
    }



    public setRankingColor(color: string){
        this.rankingColor = color;
    }

}
