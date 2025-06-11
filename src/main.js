import k from "./kaplayCtx";
import disclaimer from "./scenes/disclaimer";
import game from "./scenes/game";
import gameover from "./scenes/gameover";
import mainMenu from "./scenes/mainMenu";
import credits from "./scenes/credits";
import lose from "./scenes/lose";
import win from "./scenes/win";
import instructions from "./scenes/instructions";

k.loadSprite("up-bg", "graphics/up-bg.png");
k.loadSprite("up-close", "graphics/shaped.png");
k.loadSprite("platforms", "graphics/floor.png");
k.loadSprite("box", "graphics/box.png");
k.loadSprite("sonic", "graphics/ryan.png", {
  sliceX: 8,
  sliceY: 5,
  anims: {
    run: { from: 0, to: 7, loop: true, speed: 30 },
    jump: { from: 8, to: 15, loop: false, speed: 10 },
    dizzy: {from: 16, to: 21, loop: true, speed: 10},
    spawn: {from: 22, to: 29, loop: true, speed: 10},
    idle: {from: 32, to: 37, loop: true, speed: 10},
    stand: {from: 38, to: 39, loop: true, speed: 3},
  },
});
k.loadSprite("ring", "graphics/ring.png", {
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 15, loop: true, speed: 30 },
  },
});
k.loadSprite("motobug", "graphics/motobug.png", {
  sliceX: 8,
  sliceY: 2,
  anims: {
    run: { from: 0, to: 7, loop: true, speed: 8 },
    crash: { from: 8, to: 15, loop: true, speed: 15 },
  },
});
k.loadSprite('trafficLight', "graphics/trafficLight.png", {
  sliceX: 4,
  sliceY: 1,
  anims: {
    set: {from: 0, to: 3, loop: false, speed: 0.8}
  }
});
k.loadSprite('portal', "graphics/portal.png", {
  sliceX: 8,
  sliceY: 3,
  anims: {
    spin: {from: 0, to: 7, loop: true, speed: 10},
    open: {from: 8, to: 13, loop: false, speed: 10},
    close: {from: 16, to: 23, loop: false, speed: 28},
  }
});

k.loadSprite('lives', "graphics/lives.png", {sliceX: 1, sliceY: 4});

k.loadFont("mania", "fonts/mania.ttf");
k.loadFont("pencilant", "fonts/pencilant.ttf");
k.loadSound("destroy", "sounds/Destroy.wav");
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("jump", "sounds/Jump.wav");
k.loadSound("ring", "sounds/Ring.wav");
k.loadSound("city", "sounds/city.mp3");
k.loadSound("lobby", "sounds/lobby.mp3");
k.loadSound("Hooray", "sounds/Hooray.mp3");
k.loadSound("Boo", "sounds/Boo.mp3");

k.scene("disclaimer", disclaimer);
k.scene("credits", credits);
k.scene("instructions", instructions);
k.scene("main-menu", mainMenu);
k.scene("game", game);
k.scene("lose", lose);
k.scene("win", win);
k.scene("gameover", gameover);

k.go("disclaimer");
