import k from "./kaplayCtx";
import disclaimer from "./scenes/disclaimer";
import game from "./scenes/game";
import gameover from "./scenes/gameover";
import mainMenu from "./scenes/mainMenu";
import credits from "./scenes/credits";

k.loadSprite("chemical-bg", "graphics/chemical-bg.png");
k.loadSprite("platforms", "graphics/platforms.png");
k.loadSprite("sonic", "graphics/ryan.png", {
  sliceX: 8,
  sliceY: 4,
  anims: {
    run: { from: 0, to: 7, loop: true, speed: 30 },
    jump: { from: 8, to: 15, loop: false, speed: 10 },
    dizzy: {from: 16, to: 21, loop: true, speed: 10},
    spawn: {from: 22, to: 29, loop: true, speed: 0.1}
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
    close: {from: 13, to: 8, loop: false, speed: 10},
  }
});

k.loadSprite('lives', "graphics/lives.png", {sliceX: 1, sliceY: 4});

k.loadFont("mania", "fonts/mania.ttf");
k.loadSound("destroy", "sounds/Destroy.wav");
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("jump", "sounds/Jump.wav");
k.loadSound("ring", "sounds/Ring.wav");
k.loadSound("city", "sounds/city.mp3");

k.scene("disclaimer", disclaimer);
k.scene("credits", credits);
k.scene("main-menu", mainMenu);
k.scene("game", game);
k.scene("gameover", gameover);

k.go("disclaimer");
