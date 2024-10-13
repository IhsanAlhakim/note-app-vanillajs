class State {
  constructor(initValue) {
    this.value = initValue;
  }

  get() {
    return this.value;
  }

  set(newValue) {
    this.value = newValue;
  }
}

export const notes = new State([]);
export const noteToEdit = new State(null);
