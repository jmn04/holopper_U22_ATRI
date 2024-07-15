import Operation from "./Operation";
export default class ImportOperation extends Operation {
    name(): string;
    processInObject(keyword: string, source: any, target?: any): any;
}
export type ImportKeywordValue = string | {
    path: string;
    params?: any;
};
