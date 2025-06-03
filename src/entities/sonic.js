import k from "../kaplayCtx";

export function makeSonic(pos) {
  const sonic = k.add([
    k.sprite("sonic", { anim: "run" }),
    k.scale(1.3),
    k.area(),
    k.anchor("center"),
    k.pos(pos),
    k.body({ jumpForce: 1200 }),
    
    {
      ringCollectUI: null,
      controlsEnabled: true, // ✅ flag goes here

      setControls() {
        k.onButtonPress("jump", () => {
          if (!this.controlsEnabled) return; // ✅ check flag
          if (this.isGrounded()) {
            this.play("jump");
            this.jump();
            k.play("jump", { volume: 0.5 });
          }
        });
      },

      setEvents() {
        this.onGround(() => {
          if (!this.controlsEnabled) return; // ✅ check flag
          this.play("run");
        });
      },
    },
  ]);

  // Attach ring counter UI
  sonic.ringCollectUI = sonic.add([
    k.text("", { font: "mania", size: 45 }),
    k.color(255, 255, 0),
    k.anchor("center"),
    k.pos(100, -13),
  ]);

  return sonic;
}
