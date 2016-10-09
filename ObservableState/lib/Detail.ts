namespace ObservableState {
  export class Detail {
    Property: string;
    Operator: Function;
    Parameters: any[];

    constructor(property: string, operator: Function, ...parameters: any[]) {
      this.Property = property;
      this.Operator = operator;
      this.Parameters = parameters;
    }
  }
}