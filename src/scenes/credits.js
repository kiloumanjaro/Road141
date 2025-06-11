import k from "../kaplayCtx";

export default function credits() {
  // Background
  k.add([
    k.sprite("up-credits"),
    k.opacity(0.6),
  ]);

  // Create a container for all credits text that will scroll
  const creditsContainer = k.add([
    k.pos(0, k.height() + 100), // Start below screen
  ]);

  // Game title
  creditsContainer.add([
    k.text("Road 141: The Less Traveled", {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center().x, 0),
    k.color(255, 255, 255)
  ]);

  // Credits data with more cinematic spacing
  const creditsData = [
    { type: "section", title: "DEVELOPED BY" },
    { type: "credit", name: "CJ, Karl, Kint" },
    { type: "spacer" },
    
    { type: "section", title: "UI DESIGN" },
    { type: "credit", name: "Kint" },
    { type: "spacer" },
    
    { type: "section", title: "LEVEL DESIGN" },
    { type: "credit", name: "CJ" },
    { type: "spacer" },

    { type: "section", title: "SOUND DESIGN" },
    { type: "credit", name: "Karl" },
    { type: "spacer" },

    { type: "section", title: "SPRITES" },
    { type: "credit", name: "Kint" },
    { type: "credit", name: "BDragon1727" },
    { type: "credit", name: "Redreeh" },
    { type: "credit", name: "Craftpix" },
    { type: "big_spacer" },
    
    { type: "section", title: "SPECIAL THANKS" },
    { type: "credit", name: "freeCodeCamp.org" },
    { type: "credit", name: "Kaplay.js Community" },
    { type: "credit", name: "All Players & Supporters" },
    { type: "big_spacer" },
    
    { type: "section", title: "BUILT WITH" },
    { type: "credit", name: "Kaplay.js" },
    { type: "credit", name: "JavaScript" },
    { type: "big_spacer" },
    
    { type: "small", name: "© 2025 Road 141 Game" },
    { type: "small", name: "Version 1.0" },
  ];

  let yPosition = 150;
  
  creditsData.forEach((item) => {
    switch(item.type) {
      case "section":
        creditsContainer.add([
          k.text(item.title, {
            font: "mania",
            size: 36,
          }),
          k.anchor("center"),
          k.pos(k.center().x, yPosition),
          k.color(255, 215, 0), // Gold color for sections
        ]);
        yPosition += 45;
        break;
        
      case "credit":
        creditsContainer.add([
          k.text(item.name, {
            font: "mania",
            size: 28,
          }),
          k.anchor("center"),
          k.pos(k.center().x, yPosition),
          k.color(255, 255, 255),
        ]);
        yPosition += 40;
        break;
        
      case "final":
        creditsContainer.add([
          k.text(item.title, {
            font: "mania",
            size: 48,
          }),
          k.anchor("center"),
          k.pos(k.center().x, yPosition),
          k.color(255, 100, 100), // Light red for final message
        ]);
        yPosition += 80;
        break;
        
      case "small":
        creditsContainer.add([
          k.text(item.name, {
            font: "mania",
            size: 20,
          }),
          k.anchor("center"),
          k.pos(k.center().x, yPosition),
          k.color(180, 180, 180),
        ]);
        yPosition += 35;
        break;
        
      case "spacer":
        yPosition += 70;
        break;
        
      case "big_spacer":
        yPosition += 85;
        break;
    }
  });

  // Calculate total height for smooth scrolling
  const totalHeight = yPosition + 200;
  const scrollSpeed = 50; // pixels per second
  const totalDuration = totalHeight / scrollSpeed;

  // Smooth scrolling animation using Kaplay's tween
  k.tween(
    creditsContainer.pos,
    k.vec2(0, -totalHeight),
    totalDuration,
    (val) => creditsContainer.pos = val,
    k.easings.easeLinear
  ).onEnd(() => {
    // Credits finished, show back button or return to menu
    showEndScreen();
  });

  // Skip button (optional - press any key to skip)
  let skipText = k.add([
    k.text("Press ANY KEY to skip", {
      font: "mania",
      size: 40,
    }),
    k.pos(k.width() - 20, k.height() - 40),
    k.anchor("botright"),
    k.color(200, 200, 200),
    k.opacity(0.7),
  ]);

  // Skip functionality
  let hasSkipped = false;
  
  k.onKeyPress(() => {
    if (!hasSkipped) {
      hasSkipped = true;
      k.go("disclaimer"); // or your main menu scene
    }
  });

  k.onClick(() => {
    if (!hasSkipped) {
      hasSkipped = true;
      k.go("disclaimer"); // or your main menu scene
    }
  });

  // Show end screen when credits finish
  function showEndScreen() {
    if (hasSkipped) return;
    
    // Clear everything
    k.destroyAll();
    
    // Add background
    k.add([
      k.sprite("bg"),
      k.opacity(0.8),
    ]);

    // Thank you message
    k.add([
      k.text("Thank You for Playing!", {
        font: "mania",
        size: 48,
      }),
      k.anchor("center"),
      k.pos(k.center().x - 25, k.center().y - 150),
      k.color(255, 215, 0),
    ]);

    // Back to menu button
    const backButton = k.add([
      k.rect(300, 80),
      k.anchor("center"),
      k.pos(k.center().x - 20, k.center().y + 50),
      k.area(),
      k.color(50, 50, 50),
      k.outline(4, k.Color.WHITE),
      "back-button"
    ]);

    k.add([
      k.text("BACK TO MENU", {
        font: "mania",
        size: 28,
      }),
      k.anchor("center"),
      k.pos(k.center().x -20 , k.center().y + 50),
      k.color(255, 255, 255),
    ]);

    backButton.onClick(() => {
      k.go("disclaimer");
    });

    backButton.onHover(() => {
      backButton.color = k.Color.fromHex("#008000");
    });

    backButton.onHoverEnd(() => {
      backButton.color = k.Color.fromHex("#323232");
    });
  }
}