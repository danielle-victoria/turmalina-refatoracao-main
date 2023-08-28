import { Evaluation } from "./evaluation.model";
import { managementUnit } from "./managementunit.model";

export class TurmalinaStampDetail{
    constructor(
        public detailedEvaluation: Evaluation[],
        public endDateTime: string,
        public evaluationId: number,
        public logpath: string,
        public managementUnit: managementUnit,
        public score: number,
        public startDateTime: string,
        public status: boolean,   
    ){}
}