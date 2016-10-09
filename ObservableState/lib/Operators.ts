namespace ObservableState {
  export class Operators {

    Equals(state: StateObject, property: string, value: any): boolean {
      return state.GetPropertyValue(property) === value;
    }

    IsGreaterThan(state: StateObject, property: string, value: number): boolean {
      return state.GetPropertyValue(property) > value;
    }

    IsLessThan(state: StateObject, property: string, value: number): boolean {
      return state.GetPropertyValue(property) < value;
    }

    StartsWith(state: StateObject, property: string, value: string): boolean {
      const prop = state.GetPropertyValue(property) as string;
      return prop.substring(0, value.length) === value;
    }

    EndsWith(state: StateObject, property: string, value: string): boolean {
      const prop = state.GetPropertyValue(property) as string;
      return prop.substring(prop.length - value.length) === value;
    }

    Matches(state: StateObject, property: string, value: string): boolean {
      const regex = new RegExp(value);
      const prop = state.GetPropertyValue(property) as string;
      return regex.test(prop);
    }
  }
}