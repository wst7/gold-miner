import { screen } from "../core";
import Button from "./button";

const { height, width } = screen;

export default class Pause extends PIXI.Sprite {
  options: Record<string, () => void>
  bg: PIXI.Graphics
  rect: PIXI.Graphics
  doneBtn: Button
  continueBtn: Button
  constructor(options: {
    doneAction: () => void,
    continueAction: () => void,
  }) {
    super()
    this.options = options
    this.visible = false
   
    this.init()
  }

  init() {
    this.bg = new PIXI.Graphics().beginFill(0xf8d365, 0.9)
      .drawRect(0, 0, width, height)
      .endFill();
      this.interactive = false
    this.addChild(this.bg)

    this.rect = new PIXI.Graphics().beginFill(0xf8d365)
      .lineStyle(5, 0xffffff)
      .drawRect(0, 0, width - 120, 400)
      .endFill();
    this.rect.pivot.x = this.rect.width / 2
    this.rect.pivot.y = this.rect.height / 2
    this.rect.x = width / 2
    this.rect.y = height / 2
    this.addChild(this.rect)

    // 结束
    this.doneBtn = new Button("提前结束", 0x00ff00)
    this.doneBtn.x = 100
    this.doneBtn.y = 80
    this.doneBtn.interactive = true
    this.doneBtn.on("pointerdown", (e) => {
      // e.stopped = true;
      this.options.doneAction()
    })

    this.continueBtn = new Button("继续游戏", 0x00ff00)
    this.continueBtn.x = this.bg.width - 400 - this.continueBtn.width
    this.continueBtn.y = 80
    this.continueBtn.interactive = true
    this.continueBtn.on("pointerdown", (e) => {
      // e.stopped = true;
      this.options.continueAction()
    })
    this.rect.addChild(this.doneBtn)
    this.rect.addChild(this.continueBtn)
  }

  show() {
    this.visible = true
    this.zIndex = 100
  }

  hide() {
    this.visible = false
  }
} 