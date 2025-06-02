import k from "../kaplayCtx";

export function makeTrafficLight(pos) {
  return k.add([
    k.sprite("trafficLight", { anim: "set" }),
    k.area(),
    k.scale(0.7),
    k.anchor("center"),
    k.pos(pos),
    k.offscreen(),
    "trafficLight",
  ]);
}
