var ObservableState;
(function (ObservableState) {
    var Operators = (function () {
        function Operators() {
        }
        Operators.prototype.Equals = function (state, property, value) {
            return state.GetPropertyValue(property) === value;
        };
        Operators.prototype.IsGreaterThan = function (state, property, value) {
            return state.GetPropertyValue(property) > value;
        };
        Operators.prototype.IsLessThan = function (state, property, value) {
            return state.GetPropertyValue(property) < value;
        };
        Operators.prototype.StartsWith = function (state, property, value) {
            var prop = state.GetPropertyValue(property);
            return prop.subString(0, value.length) === value;
        };
        Operators.prototype.EndsWith = function (state, property, value) {
            var prop = state.GetPropertyValue(property);
            return prop.subString(prop.length - value.length) === value;
        };
        Operators.prototype.Matches = function (state, property, value) {
            var regex = new RegExp(value);
            return state.GetPropertyValue(property).match(regex);
        };
        return Operators;
    }());
    ObservableState.Operators = Operators;
})(ObservableState || (ObservableState = {}));
//# sourceMappingURL=Operators.js.map