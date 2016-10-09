var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
        this.state = new ObservableState.StateObject({ name: 'gareth', age: 42 });
        this.state.When("name").Equals("Sam").Then(function () { alert('Name changed to Sam'); });
        this.state.SetProperty("name", "Sam");
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
}());
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = window['greeter'] = new Greeter(el);
    greeter.start();
};
//# sourceMappingURL=app.js.map