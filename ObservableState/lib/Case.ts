namespace ObservableState {
  export class Case extends Array<Detail> {
    CheckState(state: StateObject): boolean {
      let complies = false;

      for(let detail of this) {
        if (detail.CheckDetail(state)) {
          complies = true;
          break;
        }
      }

      return complies;
    }
  }
}