namespace ObservableState {
  export class Description {
    private _parent: StateObject;
    private _operators: Operators;
    private _currentProperties: string[] = new Array<string>();
    private _state: DescriptionState = DescriptionState.Preparing;
    private _action: Function;
    private _cases: Case[];
    private _currentCase: Case;
    private _relevantProperties: string[] = new Array<string>();
    private _behaviour: MatchBehaviour;

    constructor(parent: StateObject, ...properties: string[]) {
      this._parent = parent;
      this._operators = new Operators();
      this._cases = new Array<Case>();

      this.And(...properties);
    }

    private AddDetail(operator: Function, ...parameters: any[]) {
      if (this._currentProperties !== null && this._currentProperties.length > 0) {
        const property = this._currentProperties.shift();
        const detail = new Detail(property, operator, ...parameters);
        this._currentCase.push(detail);

        if(this._relevantProperties.indexOf(property) === -1) {
          this._relevantProperties.push(property);
        }
      }
    }

    And(...properties: string[]): Description {
      this._currentProperties = properties;
      this._currentCase = new Case();
      this._cases.push(this._currentCase);
      return this;
    }

    Then(action: Function, behaviour: MatchBehaviour = MatchBehaviour.FireOnEnter): Description {
      this._action = action;
      this._state = this.CheckState(null, true) ? DescriptionState.Matched : DescriptionState.Ready;
      this._behaviour = behaviour;
      return this;
    }

    Equals(...values: any[]): Description {
      for (let value of values) {
        this.AddDetail(this._operators.Equals, value);
      }
      return this;
    }

    IsGreaterThan(...values: number[]): Description {
      for (let value of values) {
        this.AddDetail(this._operators.IsGreaterThan, value);
      }
      return this;
    }

    IsLessThan(...values: number[]): Description {
      for (let value of values) {
        this.AddDetail(this._operators.IsLessThan, value);
      }
      return this;
    }

    StartsWith(...values: string[]): Description {
      for (let value of values) {
        this.AddDetail(this._operators.StartsWith, value);
      }
      return this;
    }

    EndsWith(...values: string[]): Description {
      for (let value of values) {
        this.AddDetail(this._operators.EndsWith, value);
      }
      return this;
    }

    Matches(...values: string[]): Description {
      for (let value of values) {
        this.AddDetail(this._operators.Matches, value);
      }
      return this;
    }

    CheckState(propertyName: string, triggerAction: boolean = true): boolean {
      // If we're not prepared and ready yet, or if we're already matched and the behaviour says we only fire when the state enters this described state, then stop processing.
      if(this._state === DescriptionState.Preparing ||
        (this._state === DescriptionState.Matched && this._behaviour === MatchBehaviour.FireOnEnter)) {
        return false;
      }

      // If the property that just changed is not relevant to this description, don't bother to check it.
      if(this._relevantProperties.indexOf(propertyName) === -1) {
        return false;
      }

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
        this._state = DescriptionState.Matched;
      } else {
        this._state = DescriptionState.Ready;
      }

      return trigger;
    }
  }

  enum DescriptionState {
    Preparing,
    Ready,
    Matched
  }

  export enum MatchBehaviour {
    FireOnEveryMatch,
    FireOnEnter
  }
}