import k from "../kaplayCtx";

// Load any additional sprites you might need for instructions
k.loadSprite("back-button", "graphics/back-button.png"); // You'll need to add this image

export default function instructions() {
  // Background
  k.add([
    k.sprite("up-far"),
    k.opacity(0.8),
  ]);

  // Title
  k.add([
    k.text("HOW TO PLAY", {
      font: "mania",
      size: 72,
    }),
    k.anchor("center"),
    k.pos(k.center().x - 20, 100),
    k.color(255, 255, 0),
    k.outline(4, k.rgb(0, 0, 0)),
  ]);

  // Story Introduction
  const storyText = [
    "Ryan, now a professor teaching CMSC 141, finds himself spiraling back to his student days when a",
    "mysterious compiler bug opens a time rift. To return, he must collect 141 points But HALToid, a rogue construct from an",
    "abandoned compiler, traps him in infinite loops and paradoxes. One wrong move, and he's stuck retaking his own class… forever.",
  ];

  let introY = 170;
  storyText.forEach((line) => {
    k.add([
      k.text(line, {
        font: "mania",
        size: 24,
      }),
      k.pos(k.center().x, introY),
      k.anchor("center"),
      k.color(k.rgb(255, 255, 255)),
      k.outline(2, k.rgb(0, 0, 0)),
    ]);
    introY += 30;
  });

  // Instructions content - organized in columns for better fit
  const leftColumnText = [
    "OBJECTIVE:",
    "• Collect pizzas to increase your score",
    "• Reach 141 points to win the game",
    "• Survive through 3 challenging levels",
    "",
    "",
    "",
    "CONTROLS:",
    "• Mouse1 - Move Sir Ryan",
    "• SPACEBAR - Jump",
    "• P - Pause/Resume game",
  ];

  const rightColumnText = [
    "GAMEPLAY:",
    "• Level numbers correspond to points per pizzas",
    "• Jump on enemies for bonus points",
    "• Avoid getting hit - you have 3 lives",
    "",
    "",
    "",
    "SCORING:",
    "• Enemy destruction: 5-7 points per level",
    "• Reach 48+ points to advance to Level 2",
    "• Reach 95+ points to advance to Level 3",
  ];
  
  // Left column
  let yPos = 360;
  leftColumnText.forEach((line) => {
    const isHeader = line.includes("OBJECTIVE:") || line.includes("CONTROLS:");
    const isBullet = line.startsWith("•");
    
    k.add([
      k.text(line, {
        font: "mania",
        size: isHeader ? 36 : isBullet ? 24 : 28,
      }),
      k.pos(isHeader ? 500 : isBullet ? 500 : 200, yPos),
      k.anchor(isHeader ? "center" : "left"),
      k.color(isHeader ? k.rgb(255, 255, 0) : k.rgb(255, 255, 255)),
      k.outline(2, k.rgb(0, 0, 0)),
    ]);
    
    yPos += line === "" ? 15 : (isHeader ? 45 : 30);
  });

  // Right column
  yPos = 360;
  rightColumnText.forEach((line) => {
    const isHeader = line.includes("GAMEPLAY:") || line.includes("SCORING:");
    const isBullet = line.startsWith("•");
    
    k.add([
      k.text(line, {
        font: "mania",
        size: isHeader ? 36 : isBullet ? 24 : 28,
      }),
      k.pos(isHeader ? k.width() - 800 : isBullet ? k.width() - 800 : k.width() - 200, yPos),
      k.anchor(isHeader ? "center" : "left"),
      k.color(isHeader ? k.rgb(255, 255, 0) : k.rgb(255, 255, 255)),
      k.outline(2, k.rgb(0, 0, 0)),
    ]);
    
    yPos += line === "" ? 15 : (isHeader ? 45 : 30);
  });

  // Back button
  const backButton = k.add([
    k.sprite("back-button"),
    k.pos(k.center().x - 930, k.center().y - 520),
    k.scale(3),
    k.area(),
    "back-button"
  ]);


  // Back button click handler
  backButton.onClick(() => {
    k.go("disclaimer"); // Go back to main menu
  });

  // Keyboard shortcut to go back
  k.onKeyPress("escape", () => {
    k.go("disclaimer");
  });


  backButton.onHover(() => {
    backButton.scaleTo(3.1);
  });

  backButton.onHoverEnd(() => {
    backButton.scaleTo(3);
  });

  // Optional: Add some visual flair
  k.add([
    k.sprite("road 141 second"),
    k.anchor("center"),
    k.scale(0.2),
    k.pos(k.width() - 120, 110),
    k.opacity(0.6),
  ]);
}