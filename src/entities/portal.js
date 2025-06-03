import k from "../kaplayCtx";

export function makePortal(pos) {
  return k.add([
    k.sprite("portal", { anim: "spin" }),
    k.area({shape: new k.Rect(k.vec2(0), 5, 5)}),
    k.scale(5),
    k.anchor("center"),
    k.pos(pos),
    k.offscreen(),
    "portal",
  ]);
}
