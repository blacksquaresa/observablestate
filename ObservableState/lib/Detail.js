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
        return Detail;
    }());
    ObservableState.Detail = Detail;
})(ObservableState || (ObservableState = {}));
//# sourceMappingURL=Detail.js.map