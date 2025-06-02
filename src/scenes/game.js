import k, { gamePaused } from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";
import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";
import { makeTrafficLight } from "../entities/trafficLight";
import { makePortal } from "../entities/portal";

function showTrafficLight(level) {
  gamePaused.set(true);
  k.wait(2, () => {
    const text = k.add([
      k.text(`Prepare for level ${level}!`, { font: "mania", size: 50 }),
      k.anchor("center"),
      k.pos(k.center()),
    ]);

    const trafficLight = makeTrafficLight(k.vec2(text.pos.x, text.pos.y - 220));

    k.wait(5, () => {
      gamePaused.set(false);
      text.destroy();
      k.destroy(trafficLight);
    });
  });
}

function checkScore(score, level) {
  if (level === 1 && score > 47) return true;
  if (level === 2 && score > 94) return true;
  return false;
}

export default function game() {
  // Initial setup
  gamePaused.set(true);
  const citySfx = k.play("city", { volume: 0.2, loop: true });
  k.setGravity(3100);

  // Background
  const bgPieceWidth = 960;
  const bgPieces = [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(1), k.opacity(0.8)]),
    k.add([k.sprite("chemical-bg"), k.pos(bgPieceWidth, 0), k.scale(1), k.opacity(0.8)]),
  ];

  // Platforms
  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite("platforms"), k.pos(384, 450), k.scale(4)]),
  ];

  // Player
  let sonic = makeSonic(k.vec2(200, 745));
  sonic.setControls();
  sonic.setEvents();

  //health
  let frame = 0;
  let healthBar = k.add([
    k.sprite("lives"),
    k.anchor("center"),
    k.pos(130, 120),
    k.scale(4)
  ]);


  // UI
  const controlsText = k.add([
    k.text("Press Space/Click/Touch to Jump!", { font: "mania", size: 64 }),
    k.anchor("center"),
    k.pos(k.center()),
  ]);

  const dismissControlsAction = k.onButtonPress("jump", () => {
    gamePaused.set(false);
    k.destroy(controlsText);
    dismissControlsAction.cancel();
  });

  const scoreText = k.add([
    k.text("KM : 0", { font: "mania", size: 72 }),
    k.pos(20, 20),
  ]);

  const levelText = k.add([
    k.text("LEVEL: 1", { font: "mania", size: 72 }),
    k.pos(1650, 20),
  ]);

  // Game variables
  let gameSpeed = 500;
  let level = 1;
  let score = 0;
  let lives = 3;
  let teleporting = false;

  // Collisions
  sonic.onCollide("ring", (ring) => {
    let inc = 1;
    if (teleporting) return;
    k.play("ring", { volume: 0.5 });
    k.destroy(ring);
    if (level == 2) {
      inc = 2;
      score += inc;
    } else if (level == 3) {
      inc = 3;
      score += inc;
    } else {
      score += inc;
    }
    
    scoreText.text = `KM : ${score}`;
    sonic.ringCollectUI.text = `+${inc}`;
    k.wait(1, () => (sonic.ringCollectUI.text = ""));

    if (checkScore(score, level)) {
      level++;
      showTrafficLight(level);
      levelText.text = `LEVEL: ${level}`;
      k.wait(2, () => {
        gameSpeed += 500;
        
      });
    }

    // game finished

    if (level === 3 && score >= 141) {
      score = 141;
      k.setData("current-score", score);
      k.go("win", citySfx); // move to ending
    }
  });

  sonic.onCollide("enemy", (enemy) => {
    let inc = 5;
    if (teleporting) return;

    if (!sonic.isGrounded()) {
      k.play("destroy", { volume: 0.5 });
      k.play("hyper-ring", { volume: 0.5 });
      k.destroy(enemy);
      sonic.play("jump");
      sonic.jump();
      if (level == 2) {
        inc = 6;
        score += inc;
      } else if (level == 3) {
        inc = 7;
        score += inc;
      } else {
        score += inc;
      }
      scoreText.text = `KM : ${score}`;
      sonic.ringCollectUI.text = `+${inc}`;
      k.wait(1, () => (sonic.ringCollectUI.text = ""));

      if (checkScore(score, level)) {
        level++;

        showTrafficLight(level);
        levelText.text = `LEVEL: ${level}`;
        k.wait(3, () => {
          gameSpeed += 500;
        });
        
      }
      // game finished

      if (level === 3 && score >= 141) {
        score = 141;
        k.setData("current-score", score);
        k.go("win", citySfx); // move to ending
      }
      return;
    }

    k.play("hurt", { volume: 0.5 });
    sonic.play("dizzy");

    if (lives > 1) {
        k.wait(1, () => {
        sonic.play("run");
      });
    }

    
    if (frame < 3) frame = (frame + 1) % healthBar.numFrames();
    healthBar.frame = frame;
    if (lives > 1) {
      lives--;
    } else {
      gameSpeed = 0;
      k.wait(3, () => {
        k.setData("current-score", score);
        k.go("lose", citySfx);
      });
      
      
    }
  });

  sonic.onCollide("portal", () => {
    if (gamePaused.get()) return;
    level--;
    score = level === 2 ? 47 : 0;
    gameSpeed = level === 2 ? 1000 : 500;
    sonic.hidden = true;
    teleporting = true;
    gamePaused.set(true);

    const warningText = k.add([
      k.text(`Entered a portal. Teleporting back to level ${level}`, {
        font: "mania",
        size: 64,
      }),
      k.anchor("center"),
      k.pos(k.center()),
    ]);

    k.wait(2, () => k.destroy(warningText));
    k.wait(1, () => {
      showTrafficLight(level);
      const spawningPortal = makePortal(k.vec2(90, 700));
      spawningPortal.play("open");
      k.wait(1, () => {
        spawningPortal.play("spin");
      })
      
      k.wait(5, () => {
        gamePaused.set(false);
        sonic.hidden = false;
        sonic.play("spawn");
        sonic.play("run");
        spawningPortal.play("close");
        k.wait(1, () => {
          k.destroy(spawningPortal);
        })
        teleporting = false;
        scoreText.text = `KM : ${score}`;
        levelText.text = `LEVEL: ${level}`;
      });

    });
  });

  // Spawners
  function spawnMotoBug() {
    const waitTime = k.rand(0.5, 2.5);
    if (!gamePaused.get()) {
      const motobug = makeMotobug(k.vec2(1950, 773));
      motobug.onUpdate(() => {
        if (gameSpeed == 0) return;
        motobug.move(-(gameSpeed + (gameSpeed < 3000 ? 300 : 0)), 0);
      });
      motobug.onExitScreen(() => motobug.pos.x < 0 && k.destroy(motobug));
    }
    k.wait(waitTime, spawnMotoBug);
  }

  function spawnRing() {
    const waitTime = level === 1 ? k.rand(0.5, 3) : level === 2 ? k.rand(0.5, 2) : k.rand(0.5, 1);
    if (!gamePaused.get()) {
      const ring = makeRing(k.vec2(1950, 745));
      ring.onUpdate(() => ring.move(-gameSpeed, 0));
      ring.onExitScreen(() => ring.pos.x < 0 && k.destroy(ring));
    }
    k.wait(waitTime, spawnRing);
  }

  function spawnPortal() {
    const waitTime = k.rand(5, 7);
    if (!gamePaused.get() && level > 1) {
      const portal = makePortal(k.vec2(1950, 735));
      portal.onUpdate(() => portal.move(-gameSpeed, 0));
      portal.onExitScreen(() => portal.pos.x < 0 && k.destroy(portal));
    }
    k.wait(waitTime, spawnPortal);
  }

  spawnMotoBug();
  spawnRing();
  spawnPortal();

  // Static ground platform
  k.add([
    k.rect(1920, 300),
    k.opacity(0),
    k.area(),
    k.pos(0, 832),
    k.body({ isStatic: true }),
    "platform",
  ]);

  // Game loop
  k.onUpdate(() => {
    if (gameSpeed == 0) return;
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }
    bgPieces[0].move(-100, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

    bgPieces.forEach(bg => bg.moveTo(bg.pos.x, -sonic.pos.y / 10 - 50));

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
      platforms.push(platforms.shift());
    }
    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);
  });
}
