import Button from "../components/button";
import createCanvasSprite from "../components/canvas-sprite";
import GoodsBar from "../components/goods-bar";
import { createContainer, monitor, screen } from "../core";
import databus from "../databus";

const { width, height } = screen
export default {
  name: "clearing",
  show() {
    this.start()
    monitor.emit("scene:show", this.name);
  },
  hide() {
    this.container.destroy({ children: true });
    monitor.emit("scene:hide", this.name);
  },

  start() {
    this.container = createContainer()

    this.bg = createCanvasSprite({
      width,
      height,
      fill: "#333333",
    })

    this.container.addChild(this.bg)

    this.actions = createContainer()
    this.nextLevel = new Button("Next Level", 0x00ff00)
    this.nextLevel.on("pointerdown", () => {
      databus.level += 1
      // TODO:
      // databus.score -= 
      monitor.emit("scene:go", "home")
    })
    this.actions.addChild(this.nextLevel)
    
    this.share = new Button("Share", 0x00ff00)
    this.share.on("pointerdown", () => {
      // share to friend
    })
    this.actions.addChild(this.share)
    // 
    this.halve = new Button("Halve", 0x00ff00)
    this.halve.on("pointerdown", () => {
      // create ad
    })
    this.actions.addChild(this.halve)
    this.container.addChild(this.actions)

    this.goodsBar = new GoodsBar()
    this.container.addChild(this.goodsBar)
  }
}