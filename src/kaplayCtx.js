import kaplay from "kaplay";

const k = kaplay({
  width: 1920,
  height: 1080,
  letterbox: true,
  background: [0, 0, 0],
  global: false,
  buttons: {
    jump: {
      keyboard: ["space"],
      mouse: "left",
    },
  },
  touchToMouse: true,
  debug: false,
});

export default k;

// Add this near the top
let _paused = true;
export const gamePaused = {
  get: () => _paused,
  set: (v) => { _paused = v; }
};

