var ObservableState;
(function (ObservableState) {
    var StateObject = (function () {
        function StateObject(sourceObject) {
            this._properties = {};
            this._descriptions = new Array();
            this._sourceObject = sourceObject;
            this.prepareMe();
        }
        StateObject.prototype.prepareMe = function () {
            for (var prop in this._sourceObject) {
                if (this._sourceObject.hasOwnProperty(prop)) {
                    var property = new ObservableState.Property(prop, this._sourceObject[prop]);
                    this._properties[prop] = property;
                }
            }
        };
        StateObject.prototype.GetProperty = function (name) {
            return this._properties[name];
        };
        StateObject.prototype.GetPropertyValue = function (name) {
            return this._properties[name].Value;
        };
        StateObject.prototype.SetProperty = function (name, value) {
            if (this._properties.hasOwnProperty(name)) {
                return this.SetPropertyValue(name, value);
            }
            this._properties[name] = new ObservableState.Property(name, value);
        };
        StateObject.prototype.SetPropertyValue = function (name, value) {
            if (!this._properties.hasOwnProperty(name)) {
                return this.SetProperty(name, value);
            }
            this._properties[name].Value = value;
        };
        StateObject.prototype.When = function () {
            var properties = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                properties[_i - 0] = arguments[_i];
            }
            var desc = new (ObservableState.StateDescription.bind.apply(ObservableState.StateDescription, [void 0].concat([this], properties)))();
            this._descriptions.push(desc);
            return desc;
        };
        return StateObject;
    }());
    ObservableState.StateObject = StateObject;
})(ObservableState || (ObservableState = {}));
//# sourceMappingURL=StateObject.js.map