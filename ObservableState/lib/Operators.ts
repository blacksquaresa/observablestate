namespace ObservableState {
  export class Operators<T> {
    private StateObject: StateObject<T>;

    constructor(state: StateObject<T>) {
      this.StateObject = state;
    }

    Equals(property: string, value: any): boolean {
      return this.StateObject.GetPropertyValue(property) === value;
    }

    IsGreaterThan(property: string, value: number): boolean {
      return this.StateObject.GetPropertyValue(property) === value;
    }

    IsLessThan(property: string, value: number): boolean {
      return this.StateObject.GetPropertyValue(property) === value;
    }

    StartsWith(property: string, value: string): boolean {
      return this.StateObject.GetPropertyValue(property) === value;
    }

    EndsWith(property: string, value: string): boolean {
      return this.StateObject.GetPropertyValue(property) === value;
    }

    Matches(property: string, value: string): boolean {
      return this.StateObject.GetPropertyValue(property) === value;
    }
  }
}