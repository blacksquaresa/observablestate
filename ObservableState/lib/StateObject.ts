namespace ObservableState {
  export class StateObject {
    private _sourceObject: any;
    private _properties: { [key: string]: Property } = {};
    private _descriptions: StateDescription[] = new Array<StateDescription>();

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

    private TriggerChanges(): void {
      for(let description of this._descriptions) {
        description.CheckState();
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

      this.TriggerChanges();
    }

    SetPropertyValue(name: string, value: any): void {
      if (!this._properties.hasOwnProperty(name)) {
        return this.SetProperty(name, value);
      }

      this._properties[name].Value = value;

      this.TriggerChanges();
    }

    When(...properties: string[]): StateDescription {
      const desc = new StateDescription(this, ...properties);
      this._descriptions.push(desc);
      return desc;
    }
  }
}