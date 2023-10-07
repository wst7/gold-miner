
import { createContainer, screen, stage, devicePixelRatio, ticker, monitor } from "../core"
import Scorer from "../components/scorer"
import Field from "../components/field"
import databus from "../databus"
import { getOres, getTarget } from "../level_data"
import Ore from "../components/ore"
import Miner from "../components/miner"
import Button from "../components/button"
import Pause from "../components/pause"
import Scene from "../components/scene"

const {
  width,
  height
} = screen


export default {
  name: "home",
  init() {
    databus.reset()
    this.container = createContainer()

    // 背景
    this.bg = pixiUtil.genSprite("bg-desert");
    this.bg.width = width;
    this.bg.height = height;
    this.container.addChild(this.bg);

    // 草坪
    this.lawnBg = pixiUtil.genSprite("bg-lawn");
    this.lawnBg.width = width;
    this.lawnBg.height = height;
    this.lawnBg.interactive = true
    this.lawnBg.hitArea = new PIXI.Rectangle(0, 180, width, height);
    this.lawnBg.on("pointerdown", (e) => {
      console.log("lawnBg")
      if (!this.pause.visible) {
        this.miner.mining();
      }
    })
    this.container.addChild(this.lawnBg);

    const pauseBtn = new Button("暂停");
    pauseBtn.x = 20
    pauseBtn.y = 20
    pauseBtn.on("pointerdown", () => {
      clearTimeout(this.timer);
      this.miner.pause();
      this.pause.show()

    });
    this.container.addChild(pauseBtn);

    // create ores
    const ores = getOres(databus.level)
    this.ores = ores.map(_ore => {
      const ore = new Ore(_ore)
      this.container.addChild(ore)
      return ore
    });

    // miner
    this.miner = new Miner(this.ores);
    this.miner.x = width / 2 - this.miner.width / 2;
    this.miner.y = 320;
    this.container.addChild(this.miner);

    // scorer
    this.scorer = new Scorer({
      target: getTarget(databus.level),
      score: databus.score,
    })
    this.scorer.y = 100
    ticker.add(() => {
      this.scorer.setScore(databus.score)
      this.scorer.setTarget(getTarget(databus.level))
    })
    this.container.addChild(this.scorer)

    // timeout
    this.timeout = new Field({
      label: "倒计时: ",
      value: databus.time,
    })
    ticker.add(() => {
      this.timeout.setValue(databus.time)
    })
    this.timeout.x = width - this.timeout.width - 60
    this.timeout.y = 110
    this.container.addChild(this.timeout)

    // level
    this.level = new Field({
      label: "关卡: ",
      value: databus.level,
    })
    this.level.x = width - this.level.width - 60
    this.level.y = this.timeout.y + this.timeout.height + 10
    this.container.addChild(this.level)


    this.pause = new Pause({
      doneAction: () => {
        console.log("doneAction")
        this.start()
      },
      continueAction: () => {
        console.log("continueAction")
        this.continue()
      }
    })
    this.container.addChild(this.pause)
    this.timing()
  },

  initWX() {
    wx.showShareMenu({})
    wx.onShareAppMessage(() => {
      // 用户点击了“转发”按钮
      return {
        title: "99%的人拼不出来！你敢试试吗？",
        imageUrl: `static/puzzle/${this.shareUrl || "easy/0.jpg"}`,
        query: encodeURI(`shareUrl=${this.shareUrl || "easy/0.jpg"}`)
      }
    })
    const res = wx.getLaunchOptionsSync()
    if (res.query.puzzleUrl && res.query.gameType) {
      //
    }
  },

  show() {
    this.start()
    monitor.emit("scene:show", this.name);
  },
  hide() {
    this.container.destroy({ children: true });
    monitor.emit("scene:hide", "this.name");
  },

  start() {
    this.init()
    this.initWX()
    stage.addChild(this.container)
  },


  continue() {
    this.pause.hide()
    this.timing()
    this.miner.continue()
  },
  timing() {
    if (databus.time === 0) {
      // 关卡结束
    }
    if (this._pause) {
      clearTimeout(this.timer)
      return
    }
    databus.time -= 1
    this.timer = setTimeout(() => {
      this.timing()
    }, 1000)
  }
}