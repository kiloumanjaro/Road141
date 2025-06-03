import k from "../kaplayCtx";

// Load any additional sprites you might need for instructions
k.loadSprite("back-button", "graphics/back-button.png"); // You'll need to add this image

export default function instructions() {
  // Background
  k.add([
    k.sprite("bg"),
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
    k.color(255, 255, 255),
    k.outline(4, k.rgb(0, 0, 0)),
  ]);

  // Instructions content - organized in columns for better fit
  const leftColumnText = [
    "OBJECTIVE:",
    "• Collect rings to increase your score",
    "• Reach 141 points to win the game",
    "• Survive through 3 challenging levels",
    "",
    "CONTROLS:",
    "• Mouse1 - Move Sir Ryan",
    "• SPACEBAR - Jump",
    "• P - Pause/Resume game",
  ];

  const rightColumnText = [
    "GAMEPLAY:",
    "• Level 1: Collect rings (1 point each)",
    "• Level 2: Rings worth 2 points each",
    "• Level 3: Rings worth 3 points each",
    "• Jump on enemies for bonus points",
    "• Avoid getting hit - you have 3 lives",
    "• Use portals to go back to previous levels",
    "",
    "SCORING:",
    "• Ring collection: 1-3 points per level",
    "• Enemy destruction: 5-7 points per level",
    "• Reach 48+ points to advance to Level 2",
    "• Reach 95+ points to advance to Level 3",
  ];

  // Left column
  let yPos = 200;
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
  yPos = 200;
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
    k.text("BACK TO MENU", {
      font: "mania",
      size: 36,
    }),
    k.anchor("center"),
    k.pos(k.center().x - 20, k.height() - 70),
    k.area(),
    k.color(255, 255, 0),
    k.outline(3, k.rgb(0, 0, 0)),
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

  // Optional: Add some visual flair
  k.add([
    k.sprite("road 141 second"),
    k.anchor("center"),
    k.scale(0.2),
    k.pos(k.width() - 120, 110),
    k.opacity(0.6),
  ]);
}