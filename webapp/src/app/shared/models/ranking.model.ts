import { managementUnit } from './managementunit.model';
export interface RankingModel{
    end_datetime: string,
    position: number | string,
    name: string,
    public_entity: string,
    url: string,
    score: string
}