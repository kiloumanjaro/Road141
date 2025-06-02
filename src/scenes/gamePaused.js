import kaplay from "kaplay";

const k = kaplay({
  width: 1920,
  height: 1080,
  letterbox: true,
  background: [0, 0, 0],
  global: false,
  touchToMouse: true,
  buttons: {
    jump: {
      keyboard: ["space"],
      mouse: "left",
    },
  },
  debugKey: "d",
  debug: true,
});

// Create a reactive state for game pausing
export const gamePaused = {
  _value: false,
  _listeners: [],
  
  get() {
    return this._value;
  },
  
  set(value) {
    if (this._value !== value) {
      this._value = value;
      this._listeners.forEach(listener => listener(value));
    }
  },
  
  subscribe(listener) {
    this._listeners.push(listener);
    return () => {
      const index = this._listeners.indexOf(listener);
      if (index > -1) {
        this._listeners.splice(index, 1);
      }
    };
  }
};

export default k;