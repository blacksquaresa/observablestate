var ObservableState;
(function (ObservableState) {
    var Detail = (function () {
        function Detail(property, operator) {
            var parameters = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                parameters[_i - 2] = arguments[_i];
            }
            this.Property = property;
            this.Operator = operator;
            this.Parameters = parameters;
        }
        Detail.prototype.CheckDetail = function (state) {
            return this.Operator.apply(this, [state, this.Property].concat(this.Parameters));
        };
        return Detail;
    }());
    ObservableState.Detail = Detail;
})(ObservableState || (ObservableState = {}));
//# sourceMappingURL=Detail.js.map