import { stage, screen, monitor, loader, createContainer } from "../core";
import config from "../config";

const {
  width,
  height
} = screen

const FONTSIZE = 28
const FILL = 0x004d40
const LETTERSPACING = 3

export default {
  name: "preload",
  show() {
    this.start()
    monitor.emit("scene:show", this.name);
  },
  hide() {
    this.container.destroy({ children: true });
    monitor.emit("scene:hide", this.name);
  },

  start() {
    this.init().then(() => {
      this.hide();
      monitor.emit("scene:go", "home");
    })
  },
  async init(): Promise<void> {
    const layout = createContainer()
    const tip = new PIXI.Text("Loading...", {
      fontSize: FONTSIZE,
      fill: FILL,
      letterSpacing: LETTERSPACING
    })
    const progressBar = {
      inner: new PIXI.Graphics(),
      outer: new PIXI.Graphics()
    }
    const advice1 = new PIXI.Text("抵制不良游戏 拒绝盗版游戏", {
      fontSize: FONTSIZE,
      fill: FILL,
      letterSpacing: LETTERSPACING
    })
    const advice2 = new PIXI.Text("注意自我保护 谨防受骗上当", {
      fontSize: FONTSIZE,
      fill: FILL,
      letterSpacing: LETTERSPACING
    })
    const advice3 = new PIXI.Text("适度游戏益脑 过度游戏伤身", {
      fontSize: FONTSIZE,
      fill: FILL,
      letterSpacing: LETTERSPACING
    })
    const advice4 = new PIXI.Text(
      "合理安排时间 享受健康生活",
      {
      fontSize: FONTSIZE,
      fill: FILL,
      letterSpacing: LETTERSPACING
    })
    advice1.position.set((width - advice1.width) * 0.5, 0)
    advice2.position.set((width - advice2.width) * 0.5, advice1.y + FONTSIZE)
    advice3.position.set((width - advice3.width) * 0.5, advice2.y + FONTSIZE)
    advice4.position.set((width - advice4.width) * 0.5, advice3.y + FONTSIZE)
    tip.position.set((width - tip.width) * 0.5, advice4.y + FONTSIZE * 2)
  
    layout.addChild(advice1, progressBar.outer)
    layout.addChild(advice2, progressBar.outer)
    layout.addChild(advice3, progressBar.outer)
    layout.addChild(advice4, progressBar.outer)
    layout.addChild(tip, progressBar.outer)
  
    progressBar.outer.beginFill(config.bgColor)
    progressBar.outer.drawRect(0, 0, width, 5)
    progressBar.outer.endFill()
  
    progressBar.inner.beginFill(0x004d40)
    progressBar.inner.drawRect(0, 0, width, 5)
    progressBar.inner.endFill()
    progressBar.inner.scale.x = 0
  
    progressBar.outer.addChild(progressBar.inner)
    stage.addChild(layout)
    return new Promise(async resolve => {
      loader.add("loading_bg", "static/img/loading_bg.jpg").load(() => {
        const bg = pixiUtil.genSprite("loading_bg");
        bg.width = width;
        bg.height = height;
        layout.addChild(bg)
  
        Object.entries(pixiUtil.imgList).forEach(([k, v]) => loader.add(k, v));
        loader.load(() => {
          layout.destroy()
          resolve()
        })
          .onProgress.add(loader => {
            progressBar.inner.scale.x = loader.progress / 100
          })
      })
    }) 
  }
}