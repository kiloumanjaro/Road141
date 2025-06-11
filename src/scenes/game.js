import k, { gamePaused } from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";
import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";
import { makeTrafficLight } from "../entities/trafficLight";
import { makePortal } from "../entities/portal";
k.loadSprite("pause-unclicked", "graphics/pause-unclicked.png");
k.loadSprite("pause-clicked", "graphics/pause-clicked.png");

 gamePaused.set(false);
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
    k.add([k.sprite("up-bg"), k.pos(0, 0), k.scale(1), k.opacity(0.8)]),
    k.add([k.sprite("up-bg"), k.pos(bgPieceWidth, 0), k.scale(1), k.opacity(0.8)]),
  ];

  // Platforms
  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 820), k.scale(3)]),
    k.add([k.sprite("platforms"), k.pos(380, 820), k.scale(3)]),
  ];

  // Player
  let sonic = makeSonic(k.vec2(200, 745));
  sonic.setControls();
  sonic.setEvents();

  
function showTrafficLight(level) {
  gamePaused.set(true);
  sonic.controlsEnabled = false; // Freeze Sonic's controls
  sonic.play("stand");

  k.wait(2, () => {
    const center = k.vec2(k.width() / 2, (k.height() / 2) - 130);
    const trafficLight = makeTrafficLight(center);

    k.wait(5, () => {
      k.destroy(trafficLight);
      gamePaused.set(false);

      // Resume Sonic
      sonic.controlsEnabled = true;
      if (!sonic.hidden && !teleporting) {
        sonic.play("run");
      }
    });
  });
}

  
  //health
  let frame = 0;
  let healthBar = k.add([
    k.sprite("lives"),
    k.anchor("center"),
    k.pos(350, 60),
    k.scale(7)
  ]);

  // Pause/Resume UI
  const pauseButton = k.add([
    k.scale(3),
    k.sprite("pause-unclicked"),
    k.pos(k.center().x - 930, k.center().y - 520),
    k.area(),
    "pause-button"
  ]);

  let resumeButton = null;
  let mainmenuButton = null;
  let pauseOverlay = null;
  let pauseText = null;


  
  // Function to show pause menu
  function showPauseMenu() {
    // Create pause overlay
    pauseOverlay = k.add([
      k.rect(k.width(), k.height()),
      k.pos(0, 0),
      k.color(0, 0, 0),
      k.opacity(0.8),
      k.z(100)
    ]);

    // Create pause text
    pauseText = k.add([
      k.text("GAME PAUSED", { font: "mania", size: 72 }),
      k.anchor("center"),
      k.pos(k.center().x, k.center().y - 100),
      k.color(255, 255, 255),
      k.z(101)
    ]);

    // Create resume button
    resumeButton = k.add([
      k.text("Press P to Resume", { font: "mania", size: 48 }),
      k.anchor("center"),
      k.pos(k.center().x, k.center().y + 50),
      k.area(),
      k.color(255, 255, 0),
      k.z(101),
      "resume-button"
    ]);

    mainmenuButton = k.add([
      k.text("Press M to Main Menu", { font: "mania", size: 48 }),
      k.anchor("center"),
      k.pos(k.center().x, k.center().y + 150),
      k.area(),
      k.color(255, 255, 0),
      k.z(101),
      "mainmenu-button"
    ]);

    // Hide pause button when paused
    pauseButton.hidden = true;
  }

  // Function to hide pause menu
  function hidePauseMenu() {
    // Remove pause overlay and buttons
    if (pauseOverlay) {
      k.destroy(pauseOverlay);
      pauseOverlay = null;
    }
    if (resumeButton) {
      k.destroy(resumeButton);
      resumeButton = null;
    }
    if (pauseText) {
      k.destroy(pauseText);
      pauseText = null;
    }

    // Show pause button again and reset its sprite
    pauseButton.hidden = false;
    pauseButton.use(k.sprite("pause-unclicked"));
  }


  // Pause functionality
  pauseButton.onClick(() => {
    if (!gamePaused.get()) {
      gamePaused.set(true);
      pauseButton.use(k.sprite("pause-clicked"));  // Change to clicked version
      showPauseMenu();
    }
  }); 

  // Keyboard shortcut for main menu (M key)
  k.onKeyPress("m", () => {
    k.go("disclaimer");
  });

  // Keyboard shortcut for pause/resume (P key)
  k.onKeyPress("p", () => {
    if (!gamePaused.get()) {
      // Pause the game
      gamePaused.set(true);
      showPauseMenu();
    } else {
      // Resume the game
      gamePaused.set(false);
      hidePauseMenu();
    }
  });

  // Keyboard shortcut for pause/resume (Esc key)
  k.onKeyPress("escape", () => {
    if (!gamePaused.get()) {
      // Pause the game
      gamePaused.set(true);
      showPauseMenu();
    } else {
      // Resume the game
      gamePaused.set(false);
      hidePauseMenu();
    }
  });


const box = k.add([
  k.sprite("box"),
  k.anchor("center"),
  k.pos(1720, 165),
  k.scale(2.5)
]);

  gamePaused.set(true);
  k.wait(0, () => {
    gamePaused.set(false);
  });

  const scoreText = k.add([
    k.text("00", { font: "mania", size: 90 }),
    k.pos(1680, 85),
  ]);


const levelText = k.add([
  k.text("LEVEL 1", {
    size: 39,
    font: "mania", // Custom font
  }),
  k.color(k.rgb(139, 171, 191)), // Maroon color for the text
  k.outline(5, k.rgb(0, 0, 0)), // 4px outline in gold color
  k.pos(1660, 256),
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
    if (teleporting || gamePaused.get()) return;
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
    
    scoreText.text = `${score}`;
    sonic.ringCollectUI.text = `+${inc}`;
    k.wait(1, () => (sonic.ringCollectUI.text = ""));

    if (checkScore(score, level)) {
      level++;
      showTrafficLight(level);
      levelText.text = `LEVEL ${level}`;
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
    if (teleporting || gamePaused.get() || sonic.invincible) return;

    enemy.play("crash");
    k.wait(0.6, () => {
      if (enemy.exists()) k.destroy(enemy);
    });

    
    if (!sonic.isGrounded()) {
      k.play("destroy", { volume: 0.5 });
      k.play("hyper-ring", { volume: 0.5 });

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
      scoreText.text = `${score}`;
      sonic.ringCollectUI.text = `+${inc}`;
      k.wait(1, () => (sonic.ringCollectUI.text = ""));

      if (checkScore(score, level)) {
        level++;

        showTrafficLight(level);
        levelText.text = `LEVEL ${level}`;
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

  // If on ground, pause and wait for input
  k.play("hurt", { volume: 0.5 });
  sonic.play("idle");

  if (lives > 1) {
    lives--;
    if (frame < 3) frame = (frame + 1) % healthBar.numFrames();
    healthBar.frame = frame;
  } else {
    gameSpeed = 0;
    k.wait(3, () => {
      k.setData("current-score", score);
      k.go("lose", citySfx);
    });
    return;
  }

gamePaused.set(true);
const message = k.add([
  k.text("You got hit! Recovering...", {
    size: 64,
    font: "mania",
  }),
  k.anchor("center"),
  k.pos(k.center().x, k.center().y - 100),
  "resumePrompt"
]);

k.wait(1, () => {
  gamePaused.set(false);
  sonic.play("run");
  message.destroy();
});

});

  sonic.onCollide("portal", () => {
    if (gamePaused.get()) return;
    level--;
    score = level === 2 ? 47 : 0;
    gameSpeed = level === 2 ? 1000 : 500;
    sonic.hidden = true;
    teleporting = true;


    const warningText = k.add([
      k.text(`Teleporting Back to Level ${level}`, {
        font: "mania",
        size: 64,
      }),
      k.anchor("center"),
      k.pos(k.center()),
    ]);
    
  

    k.wait(2, () => k.destroy(warningText));
    k.wait(1, () => {
      showTrafficLight(level);
      const spawningPortal = makePortal(k.vec2(200, 700));
      spawningPortal.play("open");
      k.wait(1, () => {
        spawningPortal.play("spin");
      })
      
    k.wait(7, () => {
      
      

      // When the "spawn" animation finishes, play "run"
      spawningPortal.play("close");
      k.wait(2.2, () => {
      gamePaused.set(false);
      });
      sonic.hidden = false;
      sonic.play("spawn");
      k.wait(1, () => {
        sonic.play("run");
      });
      sonic.invincible = true; // re-enable invincible on re-show
      k.wait(2, () => {
        sonic.invincible = false;
      });
      k.wait(0.5, () => {
      k.destroy(spawningPortal); // destroy immediately  
      });

      teleporting = false;
      scoreText.text = `${score}`;
      levelText.text = `LEVEL ${level}`;
    });

    });
  });

  // Spawners - Modified to check pause state
  function spawnMotoBug() {
    const waitTime = k.rand(0.5, 2.5);
    if (!gamePaused.get()) {
      const motobug = makeMotobug(k.vec2(1950, 773));
      motobug.onUpdate(() => {
        if (gameSpeed == 0 || gamePaused.get()) return;
        if (gamePaused.get() || gameSpeed === 0) return;
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
      ring.onUpdate(() => {
        if (gamePaused.get()) return;
        ring.move(-gameSpeed, 0);
      });
      ring.onExitScreen(() => ring.pos.x < 0 && k.destroy(ring));
    }
    k.wait(waitTime, spawnRing);
  }

  function spawnPortal() {
    const waitTime = k.rand(5, 7);
    if (!gamePaused.get() && level > 1) {
      const portal = makePortal(k.vec2(1950, 700));
      portal.onUpdate(() => {
        if (gamePaused.get()) return;
        portal.move(-gameSpeed, 0);
      });
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

  // Game loop - Modified to check pause state
  k.onUpdate(() => {
    if (gameSpeed == 0 || gamePaused.get()) return;
    
  if (gamePaused.get() || gameSpeed === 0) return;
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }
    bgPieces[0].move(-100, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

    bgPieces.forEach(bg => bg.moveTo(bg.pos.x, -sonic.pos.y / 10 - 50));

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 3, 820);
      platforms.push(platforms.shift());
    }
    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 3, 820);
  });
}