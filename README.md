# Observable State
A small library for managing a state machine as an observable

##Usage
First, create your state object:

```
var state = new ObservableState.StateObject({ name: 'bob', age: 40, gender: 'male' });
```

Then register to listen for state changes:

```
state.When('name').Equals('billy').Then(function(){ console.log('name is now billy'); });
```
