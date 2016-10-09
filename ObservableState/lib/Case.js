var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ObservableState;
(function (ObservableState) {
    var Case = (function (_super) {
        __extends(Case, _super);
        function Case() {
            _super.apply(this, arguments);
        }
        Case.prototype.CheckState = function (state) {
            var complies = false;
            for (var _i = 0, _a = this; _i < _a.length; _i++) {
                var detail = _a[_i];
                if (detail.CheckDetail(state)) {
                    complies = true;
                    break;
                }
            }
            return complies;
        };
        return Case;
    }(Array));
    ObservableState.Case = Case;
})(ObservableState || (ObservableState = {}));
//# sourceMappingURL=Case.js.map