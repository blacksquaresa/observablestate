var ObservableState;
(function (ObservableState) {
    var StateDescription = (function () {
        function StateDescription(parent) {
            var properties = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                properties[_i - 1] = arguments[_i];
            }
            this._currentProperties = new Array();
            this._state = DescriptionState.Preparing;
            this._parent = parent;
            this._operators = new ObservableState.Operators();
            this._cases = new Array();
            this.And.apply(this, properties);
        }
        StateDescription.prototype.AddDetail = function (operator) {
            var parameters = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                parameters[_i - 1] = arguments[_i];
            }
            if (this._currentProperties !== null && this._currentProperties.length > 0) {
                var property = this._currentProperties.pop();
                var detail = new (ObservableState.Detail.bind.apply(ObservableState.Detail, [void 0].concat([property, operator], parameters)))();
                this._currentCase.push(detail);
            }
        };
        StateDescription.prototype.And = function () {
            var properties = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                properties[_i - 0] = arguments[_i];
            }
            this._currentProperties = properties;
            this._currentCase = new ObservableState.Case();
            this._cases.push(this._currentCase);
            return this;
        };
        StateDescription.prototype.Then = function (action) {
            this._action = action;
            this._state = DescriptionState.Ready;
            return this;
        };
        StateDescription.prototype.Equals = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i - 0] = arguments[_i];
            }
            for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
                var value = values_1[_a];
                this.AddDetail(this._operators.Equals, value);
            }
            return this;
        };
        StateDescription.prototype.IsGreaterThan = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i - 0] = arguments[_i];
            }
            for (var _a = 0, values_2 = values; _a < values_2.length; _a++) {
                var value = values_2[_a];
                this.AddDetail(this._operators.IsGreaterThan, value);
            }
            return this;
        };
        StateDescription.prototype.IsLessThan = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i - 0] = arguments[_i];
            }
            for (var _a = 0, values_3 = values; _a < values_3.length; _a++) {
                var value = values_3[_a];
                this.AddDetail(this._operators.IsLessThan, value);
            }
            return this;
        };
        StateDescription.prototype.StartsWith = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i - 0] = arguments[_i];
            }
            for (var _a = 0, values_4 = values; _a < values_4.length; _a++) {
                var value = values_4[_a];
                this.AddDetail(this._operators.StartsWith, value);
            }
            return this;
        };
        StateDescription.prototype.EndsWith = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i - 0] = arguments[_i];
            }
            for (var _a = 0, values_5 = values; _a < values_5.length; _a++) {
                var value = values_5[_a];
                this.AddDetail(this._operators.EndsWith, value);
            }
            return this;
        };
        StateDescription.prototype.Matches = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i - 0] = arguments[_i];
            }
            for (var _a = 0, values_6 = values; _a < values_6.length; _a++) {
                var value = values_6[_a];
                this.AddDetail(this._operators.Matches, value);
            }
            return this;
        };
        StateDescription.prototype.CheckState = function () {
            var trigger = true;
            for (var _i = 0, _a = this._cases; _i < _a.length; _i++) {
                var option = _a[_i];
                if (!option.CheckState(this._parent)) {
                    trigger = false;
                    break;
                }
            }
            if (trigger) {
                this._action();
            }
            return trigger;
        };
        return StateDescription;
    }());
    ObservableState.StateDescription = StateDescription;
    var DescriptionState;
    (function (DescriptionState) {
        DescriptionState[DescriptionState["Preparing"] = 0] = "Preparing";
        DescriptionState[DescriptionState["Ready"] = 1] = "Ready";
        DescriptionState[DescriptionState["Paused"] = 2] = "Paused";
    })(DescriptionState || (DescriptionState = {}));
})(ObservableState || (ObservableState = {}));
//# sourceMappingURL=StateDescription.js.map