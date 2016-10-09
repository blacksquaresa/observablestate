var ObservableState;
(function (ObservableState) {
    var Operators = (function () {
        function Operators(state) {
            this.StateObject = state;
        }
        Operators.prototype.Equals = function (property, value) {
            return this.StateObject.GetPropertyValue(property) === value;
        };
        Operators.prototype.IsGreaterThan = function (property, value) {
            return this.StateObject.GetPropertyValue(property) === value;
        };
        Operators.prototype.IsLessThan = function (property, value) {
            return this.StateObject.GetPropertyValue(property) === value;
        };
        Operators.prototype.StartsWith = function (property, value) {
            return this.StateObject.GetPropertyValue(property) === value;
        };
        Operators.prototype.EndsWith = function (property, value) {
            return this.StateObject.GetPropertyValue(property) === value;
        };
        Operators.prototype.Matches = function (property, value) {
            return this.StateObject.GetPropertyValue(property) === value;
        };
        return Operators;
    }());
    ObservableState.Operators = Operators;
})(ObservableState || (ObservableState = {}));
//# sourceMappingURL=Operators.js.map