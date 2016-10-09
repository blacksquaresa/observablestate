var ObservableState;
(function (ObservableState) {
    var Property = (function () {
        function Property(name, value) {
            this.Name = name;
            this.Value = value;
        }
        return Property;
    }());
    ObservableState.Property = Property;
})(ObservableState || (ObservableState = {}));
//# sourceMappingURL=Property.js.map