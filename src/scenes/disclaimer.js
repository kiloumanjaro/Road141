import k from "../kaplayCtx";

k.loadSprite("road 141 second", "graphics/road 141 second.png");
k.loadSprite("up-bg", "graphics/up-bg.png");
k.loadSprite("road141", "graphics/road141.png");
k.loadSprite("start", "graphics/start.png");
k.loadSprite("bg", "graphics/bg.png");
k.loadSprite("up-far", "graphics/up-far.png");
k.loadSprite("up-credits", "graphics/up-credits.png");
k.loadSprite("instruction-button", "graphics/instruction-button.png");
k.loadSprite("star-button", "graphics/star-button.png");
k.loadSprite("back-button", "graphics/back-button.png");
k.loadSprite("credits-button", "graphics/credits-button.png");
k.loadSprite("play", "graphics/play-button.png");
k.loadSound("lobby", "sound/lobby.mp3");

export default function disclaimer() {
  k.add([
    k.sprite("bg"),
    k.opacity(0.8),
  ]);

  // Play background music
  const bgMusic = k.play("lobby", {
    volume: 0.3,
    loop: true
  });

  const startButton = k.add([
    k.sprite("play"),
    k.pos(k.center().x - 120, 497),
    k.area(),
    k.scale(3),
    "start-button"
  ]);

  startButton.onClick(() => {
    k.go("game");
  });

  startButton.onHover(() => {
    startButton.scaleTo(3.1);
  });

  startButton.onHoverEnd(() => {
    startButton.scaleTo(3);
  });

  const instructionButton = k.add([
    k.sprite("instruction-button"),
    k.pos(k.center().x - 930, k.center().y - 520),
    k.scale(3),
    k.area(),
    "instruction-button"
  ]);

  instructionButton.onClick(() => {
    k.go("instructions");
  });

  instructionButton.onHover(() => {
    instructionButton.scaleTo(3.1);
  });

  instructionButton.onHoverEnd(() => {
    instructionButton.scaleTo(3);
  });

  const starButton = k.add([
    k.sprite("star-button"),
    k.pos(k.center().x - 820, k.center().y - 520),
    k.scale(3),
    k.area(),
    "star-button"
  ]);

  starButton.onClick(() => {
    window.open("https://github.com/kiloumanjaro/Road141")
  });

  starButton.onHover(() => {
    starButton.scaleTo(3.1);
  });

  starButton.onHoverEnd(() => {
    starButton.scaleTo(3);
  });
  
  const creditButton = k.add([
    k.sprite("credits-button"),
    k.pos(k.center().x + 700, k.center().y - 520),
    k.scale(3),
    k.area(),
    "credit-button"
  ]);

  creditButton.onClick(() => {
    k.go("credits");
  });

  creditButton.onHover(() => {
    creditButton.scaleTo(3.1);
  });

  creditButton.onHoverEnd(() => {
    creditButton.scaleTo(3);
  });

  k.add([
    k.sprite("road 141 second"),
    k.anchor("center"),
    k.scale(0.9),
    k.pos(k.center()),
  ]);

  // Optional: Add music controls
  const muteButton = k.add([
    k.text("🔊", { size: 40 }),
    k.pos(1570, 50),
    k.area(),
    k.color(255, 255, 255),
    "mute-button"
  ]);

  let isMuted = false;
  muteButton.onClick(() => {
    if (isMuted) {
      bgMusic.volume = 0.3;
      muteButton.text = "🔊";
      isMuted = false;
    } else {
      bgMusic.volume = 0;
      muteButton.text = "🔇";
      isMuted = true;
    }
  });

  // Clean up music when leaving scene
  k.onSceneLeave(() => {
    bgMusic.stop();
  });

  // Remove startButton event handling
  // Instead, add a global click handler to start the game
 /* k.onClick(() => {
    k.go("game");
  }); */
}