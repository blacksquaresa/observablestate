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
            return prop.substring(0, value.length) === value;
        };
        Operators.prototype.EndsWith = function (state, property, value) {
            var prop = state.GetPropertyValue(property);
            return prop.substring(prop.length - value.length) === value;
        };
        Operators.prototype.Matches = function (state, property, value) {
            var regex = new RegExp(value);
            var prop = state.GetPropertyValue(property);
            return regex.test(prop);
        };
        return Operators;
    }());
    ObservableState.Operators = Operators;
})(ObservableState || (ObservableState = {}));
//# sourceMappingURL=Operators.js.map