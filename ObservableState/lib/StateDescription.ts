namespace ObservableState {
  export class StateDescription {
    private _parent: StateObject;
    private _operators: Operators;
    private _currentProperties: string[] = new Array<string>();
    private _state: DescriptionState = DescriptionState.Preparing;
    private _action: Function;
    private _cases: Case[];
    private _currentCase: Case;

    constructor(parent: StateObject, ...properties: string[]) {
      this._parent = parent;
      this._operators = new Operators();
      this._cases = new Array<Case>();

      this.And(...properties);
    }

    private AddDetail(operator: Function, ...parameters: any[]) {
      if (this._currentProperties !== null && this._currentProperties.length > 0) {
        const property = this._currentProperties.pop();
        const detail = new Detail(property, operator, ...parameters);
        this._currentCase.push(detail);
      }
    }

    And(...properties: string[]): StateDescription {
      this._currentProperties = properties;
      this._currentCase = new Case();
      this._cases.push(this._currentCase);
      return this;
    }

    Then(action: Function): StateDescription {
      this._action = action;
      this._state = DescriptionState.Ready;
      return this;
    }

    Equals(...values: any[]): StateDescription {
      for (let value of values) {
        this.AddDetail(this._operators.Equals, value);
      }
      return this;
    }

    IsGreaterThan(...values: number[]): StateDescription {
      for (let value of values) {
        this.AddDetail(this._operators.IsGreaterThan, value);
      }
      return this;
    }

    IsLessThan(...values: number[]): StateDescription {
      for (let value of values) {
        this.AddDetail(this._operators.IsLessThan, value);
      }
      return this;
    }

    StartsWith(...values: string[]): StateDescription {
      for (let value of values) {
        this.AddDetail(this._operators.StartsWith, value);
      }
      return this;
    }

    EndsWith(...values: string[]): StateDescription {
      for (let value of values) {
        this.AddDetail(this._operators.EndsWith, value);
      }
      return this;
    }

    Matches(...values: string[]): StateDescription {
      for (let value of values) {
        this.AddDetail(this._operators.Matches, value);
      }
      return this;
    }

    CheckState(): boolean {
      let trigger = true;

      for(let option of this._cases)
      {
        if(!option.CheckState(this._parent)) {
          trigger = false;
          break;
        }
      }

      if(trigger) {
        this._action();
      }

      return trigger;
    }
  }

  enum DescriptionState {
    Preparing,
    Ready,
    Paused
  }
}