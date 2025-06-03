import k from "../kaplayCtx";

k.loadSprite("road 141 second", "graphics/road 141 second.png");
k.loadSprite("chemical-bg", "graphics/chemical-bg.png");
k.loadSprite("road141", "graphics/road141.png");
k.loadSprite("start", "graphics/start.png");
k.loadSprite("bg", "graphics/bg.png");
k.loadSprite("instruction unclicked", "graphics/instruction unclicked.png");
k.loadSprite("instructions clicked", "graphics/instructions clicked.png");
k.loadSprite("star unclicked", "graphics/star unclicked.png");
k.loadSprite("star clicked", "graphics/star clicked.png");
k.loadSprite("credits unclicked", "graphics/credits unclicked.png");

export default function disclaimer() {
  k.add([
    k.sprite("bg"),
    k.opacity(0.8),
  ]);

  const instructionButton = k.add([
    k.sprite("instruction unclicked"),
    k.pos(k.center().x - 930, k.center().y - 520),
    k.scale(3),
    k.area(),
    "instruction-button"
  ]);

  instructionButton.onClick(() => {
    // Your instruction button functionality here if needed
  });

  instructionButton.onHover(() => {
    instructionButton.scaleTo(3.1);
  });

  instructionButton.onHoverEnd(() => {
    instructionButton.scaleTo(3);
  });

  const starButton = k.add([
    k.sprite("star unclicked"),
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
    k.sprite("credits unclicked"),
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

  // Remove startButton event handling
  // Instead, add a global click handler to start the game
  k.onClick(() => {
    k.go("game");
  });

  k.add([
    k.sprite("road 141 second"),
    k.anchor("center"),
    k.scale(0.9),
    k.pos(k.center()),
  ]);
}
