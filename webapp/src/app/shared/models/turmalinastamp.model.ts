import { DetailEvaluation } from "./detail_evaluation.model";
import { Evaluation } from "./evaluation.model";
import { managementUnit } from "./managementunit.model";

export class TurmalinaStamp{
    constructor(
        public detailedEvaluation: DetailEvaluation,
        public endDateTime: string,
        public evaluationId: number,
        public logpath: string,
        public managementUnit: managementUnit,
        public score: number,
        public startDateTime: string,
        public status: boolean,
        public summaryEvaluation: Evaluation,
    ){}
}