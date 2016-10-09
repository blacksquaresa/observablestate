namespace ObservableState {
  export class StateObject<T> {
    private _sourceObject: T;
    private _properties: { [key: string]: Property } = {};
    private _descriptions: StateDescription<T>[] = new Array<StateDescription<T>>();

    constructor(sourceObject: T) {
      this._sourceObject = sourceObject;
      this.prepareMe();
    }

    private prepareMe(): void {
      for (let prop in this._sourceObject) {
        if (this._sourceObject.hasOwnProperty(prop)) {
          const property = new Property(prop, this._sourceObject[prop]);
          this._properties[prop] = property;
        }
      }
    }

    GetProperty(name: string): Property {
      return this._properties[name];
    }

    GetPropertyValue(name: string): any {
      return this._properties[name].Value;
    }

    SetProperty(name: string, value: any): void {
      if (this._properties.hasOwnProperty(name)) {
        return this.SetPropertyValue(name, value);
      }

      this._properties[name] = new Property(name, value);
    }

    SetPropertyValue(name: string, value: any): void {
      if (!this._properties.hasOwnProperty(name)) {
        return this.SetProperty(name, value);
      }

      this._properties[name].Value = value;
    }

    When(...properties: string[]): StateDescription<T> {
      const desc = new StateDescription<T>(this, ...properties);
      this._descriptions.push(desc);
      return desc;
    }
  }
}