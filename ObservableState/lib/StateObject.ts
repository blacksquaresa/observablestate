namespace ObservableState {
  export class StateObject {
    private _sourceObject: any;
    private _properties: { [key: string]: Property } = {};
    private _descriptions: Description[] = new Array<Description>();

    constructor(sourceObject: any) {
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

    private TriggerChanges(propertyName: string): void {
      for(let description of this._descriptions) {
        description.CheckState(propertyName);
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

      this.TriggerChanges(name);
    }

    SetPropertyValue(name: string, value: any): void {
      if (!this._properties.hasOwnProperty(name)) {
        return this.SetProperty(name, value);
      }

      this._properties[name].Value = value;

      this.TriggerChanges(name);
    }

    When(...properties: string[]): Description {
      const desc = new Description(this, ...properties);
      this._descriptions.push(desc);
      return desc;
    }
  }
}