import Operation from "./Operation";
export default class CombineOperation extends Operation {
    name(): string;
    processInObject(keyword: string, source: any, target?: any): any;
}
export type CombineKeywordValue = any;
