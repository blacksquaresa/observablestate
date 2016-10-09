var ObservableState;
(function (ObservableState) {
    var Description = (function () {
        function Description(parent) {
            var properties = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                properties[_i - 1] = arguments[_i];
            }
            this._currentProperties = new Array();
            this._state = DescriptionState.Preparing;
            this._relevantProperties = new Array();
            this._parent = parent;
            this._operators = new ObservableState.Operators();
            this._cases = new Array();
            this.And.apply(this, properties);
        }
        Description.prototype.AddDetail = function (operator) {
            var parameters = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                parameters[_i - 1] = arguments[_i];
            }
            if (this._currentProperties !== null && this._currentProperties.length > 0) {
                var property = this._currentProperties.shift();
                var detail = new (ObservableState.Detail.bind.apply(ObservableState.Detail, [void 0].concat([property, operator], parameters)))();
                this._currentCase.push(detail);
                if (this._relevantProperties.indexOf(property) === -1) {
                    this._relevantProperties.push(property);
                }
            }
        };
        Description.prototype.And = function () {
            var properties = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                properties[_i - 0] = arguments[_i];
            }
            this._currentProperties = properties;
            this._currentCase = new ObservableState.Case();
            this._cases.push(this._currentCase);
            return this;
        };
        Description.prototype.Then = function (action, behaviour) {
            if (behaviour === void 0) { behaviour = MatchBehaviour.FireOnEnter; }
            this._action = action;
            this._state = this.CheckState(null, true) ? DescriptionState.Matched : DescriptionState.Ready;
            this._behaviour = behaviour;
            return this;
        };
        Description.prototype.Equals = function () {
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
        Description.prototype.IsGreaterThan = function () {
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
        Description.prototype.IsLessThan = function () {
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
        Description.prototype.StartsWith = function () {
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
        Description.prototype.EndsWith = function () {
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
        Description.prototype.Matches = function () {
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
        Description.prototype.CheckState = function (propertyName, triggerAction) {
            if (triggerAction === void 0) { triggerAction = true; }
            // If we're not prepared and ready yet, or if we're already matched and the behaviour says we only fire when the state enters this described state, then stop processing.
            if (this._state === DescriptionState.Preparing ||
                (this._state === DescriptionState.Matched && this._behaviour === MatchBehaviour.FireOnEnter)) {
                return false;
            }
            // If the property that just changed is not relevant to this description, don't bother to check it.
            if (this._relevantProperties.indexOf(propertyName) === -1) {
                return false;
            }
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
                this._state = DescriptionState.Matched;
            }
            else {
                this._state = DescriptionState.Ready;
            }
            return trigger;
        };
        return Description;
    }());
    ObservableState.Description = Description;
    var DescriptionState;
    (function (DescriptionState) {
        DescriptionState[DescriptionState["Preparing"] = 0] = "Preparing";
        DescriptionState[DescriptionState["Ready"] = 1] = "Ready";
        DescriptionState[DescriptionState["Matched"] = 2] = "Matched";
    })(DescriptionState || (DescriptionState = {}));
    (function (MatchBehaviour) {
        MatchBehaviour[MatchBehaviour["FireOnEveryMatch"] = 0] = "FireOnEveryMatch";
        MatchBehaviour[MatchBehaviour["FireOnEnter"] = 1] = "FireOnEnter";
    })(ObservableState.MatchBehaviour || (ObservableState.MatchBehaviour = {}));
    var MatchBehaviour = ObservableState.MatchBehaviour;
})(ObservableState || (ObservableState = {}));
//# sourceMappingURL=Description.js.map