namespace ObservableState {
  export class StateDescription<T> {
    private _parent: StateObject<T>;
    private _operators: Operators<T>;
    private _currentProperties: string[] = new Array<string>();
    private _state: DescriptionState = DescriptionState.Preparing;
    private _action: Function;
    private _cases: Case[];

    constructor( parent: StateObject<T>, ...properties: string[] ) {
      this._parent = parent;
      this._operators = new Operators<T>( this._parent );

      if ( properties !== null ) {
        this._currentProperties = properties;
      }
    }

    And(...properties: string[]): StateDescription<T> {
      this._currentProperties = properties;
      return this;
    }

    Then(action: Function): StateDescription<T> {
      this._action = action;
      return this;
    }

    private AddDetail(operator: Function, ...parameters: any[]) {
      if (this._currentProperties !== null && this._currentProperties.length > 0) {
        const property = this._currentProperties.pop();
        const detail = new Detail(property, operator, ...parameters);
      }
    }

    Equals(...values: any[]): StateDescription<T> {
      for(let value of values)
      {
        this.AddDetail(this._operators.Equals, value);
      }
      return this;
    }

    IsGreaterThan(...values: number[]): StateDescription<T> {
      for (let value of values) {
        this.AddDetail(this._operators.IsGreaterThan, value);
      }
      return this;
    }

    IsLessThan(...values: number[]): StateDescription<T> {
      for (let value of values) {
        this.AddDetail(this._operators.IsLessThan, value);
      }
      return this;
    }

    StartsWith(...values: string[]): StateDescription<T> {
      for (let value of values) {
        this.AddDetail(this._operators.StartsWith, value);
      }
      return this;
    }

    EndsWith(...values: string[]): StateDescription<T> {
      for (let value of values) {
        this.AddDetail(this._operators.EndsWith, value);
      }
      return this;
    }

    Matches(...values: string[]): StateDescription<T> {
      for (let value of values) {
        this.AddDetail(this._operators.Matches, value);
      }
      return this;
    }
  }

  enum DescriptionState {
    Preparing,
    Ready,
    Paused
  }
}