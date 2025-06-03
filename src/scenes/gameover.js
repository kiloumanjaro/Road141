import k from "../kaplayCtx";

k.loadSprite("ending", "graphics/ending.png");
k.loadSprite("end screen", "graphics/end screen.png");
k.loadSprite("restart clicked", "graphics/restart clicked.png");
k.loadSprite("restart unlicked", "graphics/restart unlicked.png");
k.loadSprite("play clicked", "graphics/play clicked.png");
k.loadSprite("play unclicked", "graphics/play unclicked.png");

export default function gameover(citySfx) {
if (citySfx) citySfx.paused = true;
  let bestScore = k.getData("best-score");
  const currentScore = k.getData("current-score");

  const rankGrades = ["F", "E", "D", "C", "B", "A", "S"];
  const rankValues = [50, 80, 100, 200, 300, 400, 500];

  let currentRank = "F";
  let bestRank = "F";
  for (let i = 0; i < rankValues.length; i++) {
    if (rankValues[i] < currentScore) {
      currentRank = rankGrades[i];
    }

    if (rankValues[i] < bestScore) {
      bestRank = rankGrades[i];
    }
  }

  if (bestScore < currentScore) {
    k.setData("best-score", currentScore);
    bestScore = currentScore;
    bestRank = currentRank;
  }

  const reachedGoal = currentScore >= 141;

  if (reachedGoal) {
    k.add([
      k.sprite("ending"),
      k.opacity(0.8),
    ]); 
  } else {
    k.add([
      k.sprite("end screen"),
      k.opacity(0.9),
    ]);


    // Add the current score next to the "/141" on the chalkboard
    k.add([
      k.text(`${currentScore}`, { 
        font: "pencilant",
        size: 250,
        color: k.Color.WHITE 
      }),
      k.anchor("center"),
      k.pos(k.center().x + 280, k.center().y - 230), // Position it to the left of "/141"
    ]);
  }

  const playButton = k.add([
    k.sprite("play unclicked"),
    k.pos(k.center().x - 900, k.center().y - 320),
    k.scale(5),
    k.area(),
    "play-button"
  ]);

  playButton.onClick(() => {
    k.go("disclaimer");
  });

  playButton.onHover(() => {
    playButton.scaleTo(5.1);
  });

  playButton.onHoverEnd(() => {
    playButton.scaleTo(5);
  });

  // Create the restart button with click functionality
  const restartButton = k.add([
    k.sprite("restart unlicked"),
    k.pos(k.center().x - 900, k.center().y - 500),
    k.scale(5),
    k.area(), // Make it clickable
    "restart-btn" // Add a tag for identification
  ]);

  // Handle button interactions
  restartButton.onHover(() => {
    restartButton.scale = k.vec2(5.1, 5.1); // Slightly enlarge on hover
  });

  restartButton.onHoverEnd(() => {
    restartButton.scale = k.vec2(5, 5); // Return to normal size
  });

  restartButton.onClick(() => {
    // Change to clicked sprite
    restartButton.use(k.sprite("restart clicked"));
    
    // Optional: Add a brief delay before transitioning to make the click feel responsive
    k.wait(0.1, () => {
      k.go("game");
    });
  });

  // Also handle touch/mobile interactions
  restartButton.onTouchStart(() => {
    restartButton.use(k.sprite("restart clicked"));
  });

  restartButton.onTouchEnd(() => {
    k.wait(0.1, () => {
      k.go("game");
    });
  });
}
