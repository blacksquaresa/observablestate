class Greeter {
  element: HTMLElement;
  span: HTMLElement;
  timerToken: number;
  state: ObservableState.StateObject;

  constructor(element: HTMLElement) {
    this.element = element;
    this.element.innerHTML += 'The time is: ';
    this.span = document.createElement('span');
    this.element.appendChild(this.span);
    this.span.innerText = new Date().toUTCString();

    this.state = new ObservableState.StateObject({ name: 'gareth', age: 42 });

    this.state.When('name').Equals('Sam').Then(() => { alert('Name changed to Sam'); });

    this.state.When('age').IsGreaterThan(42).Then(() => { alert('Age increased'); }, ObservableState.MatchBehaviour.FireOnEveryMatch);

    this.state
      .When('age')
      .IsGreaterThan(42)
      .And('name')
      .Equals('Sam')
      .Then(() => { alert('Name and Age changed'); }, ObservableState.MatchBehaviour.FireOnEnter);

    this.state
      .When('name', 'age')
      .Equals('Sam')
      .IsGreaterThan(42)
      .And('name', 'age')
      .StartsWith('Sa')
      .IsLessThan(44)
      .Then(() => { alert('Name or Age changed'); }, ObservableState.MatchBehaviour.FireOnEveryMatch);

    this.state.SetProperty('name', 'Sam');
    this.state.SetProperty('age', 43);
    this.state.SetProperty('age', 45);
    this.state.SetProperty('gender', 'male');
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