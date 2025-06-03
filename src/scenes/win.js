import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";

export default function lose(citySfx) {
  citySfx?.stop();

  k.setGravity(0);
  const bg = k.add([
    k.sprite("up-close"),
    k.pos(0, 0),
    k.scale(1),
    k.opacity(1),
    k.fixed(),
  ]);

  const sonic = makeSonic(k.vec2(200, 680));
  k.camScale(1.5);
  sonic.play("run");

  k.wait(0, () => {
    if (sonic.body) sonic.body.useGravity = false;
  });

  const targetX = k.width() / 2;
  const walkY = sonic.pos.y;

  let movingOffscreen = false;
  let fadingOut = false;

  // Black overlay for fading out
  const fadeOverlay = k.add([
    k.rect(k.width(), k.height()),
    k.color(0, 0, 0),
    k.opacity(0),
    k.fixed(),
    "fade",
  ]);

  function startFadeOut() {
    if (!fadingOut) {
      fadingOut = true;
      k.tween(
        fadeOverlay.opacity,
        1,
        1, // duration of 1 second for fade out
        (val) => {
          fadeOverlay.opacity = val;
        },
        k.easings.easeInOutQuad
      ).then(() => {
        k.go("gameover");
      });
    }
  }

  k.onUpdate(() => {
    if (!movingOffscreen) {
      if (sonic.pos.x < targetX) {
        sonic.move(60, 0);
      } else {
        movingOffscreen = true;
      }
      sonic.pos.y = walkY;
    } else {
      sonic.move(100, 0);
      sonic.pos.y = walkY;

      const sonicRightEdge = sonic.pos.x + sonic.width / 2;
      if (sonic.pos.x > k.width() - 10 && !fadingOut) {
        startFadeOut();
      }
    }
  });

  let canPressSpace = false;

  // Delay before space bar can trigger fade
  k.wait(1, () => {  // wait 1 second before enabling
    canPressSpace = true;
  });

  k.onKeyPress("space", () => {
    if (canPressSpace) {
      startFadeOut();
    }
  });
}
