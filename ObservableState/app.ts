class Greeter {
  element: HTMLElement;
  span: HTMLElement;
  timerToken: number;
  state: ObservableState.StateObject;

  constructor(element: HTMLElement) {
    this.element = element;
    this.element.innerHTML += "The time is: ";
    this.span = document.createElement('span');
    this.element.appendChild(this.span);
    this.span.innerText = new Date().toUTCString();

    this.state = new ObservableState.StateObject({ name: 'gareth', age: 42 });

    this.state.When("name").Equals("Sam").Then(() => { alert('Name changed to Sam'); });

    this.state.When("age").IsGreaterThan(42).Then(() => { alert('Age increased'); });

    this.state.When("age").IsGreaterThan(42).And("name").Equals("Sam").Then(() => { alert('Name and Age changed'); });

    this.state.SetProperty("name", "Sam");
    this.state.SetProperty("age", 43);
  }

  start() {
    this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
  }

  stop() {
    clearTimeout(this.timerToken);
  }

}

window.onload = () => {
  var el = document.getElementById('content');
  var greeter = window['greeter'] = new Greeter(el);
  greeter.start();
};