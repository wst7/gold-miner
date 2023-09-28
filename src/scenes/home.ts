
import * as PIXI from 'pixi.js'
import { createContainer, screen, stage, devicePixelRatio, ticker } from '../core'
import Scorer from '../components/scorer'
import Field from '../components/field'
import databus from '../databus'
import { getOres, getTarget } from '../level_data'
import Ore from '../components/ore'
import Timeout from '../components/timeout'
import Miner from '../components/miner'

const {
  width,
  height
} = screen

export default {

  init() {
    this.container = createContainer()

    // 背景
    this.bg = pixiUtil.genSprite('bg-desert');
    this.bg.width = width;
    this.bg.height = height;
    this.container.addChild(this.bg);

    // 草坪
    this.lawnBg = pixiUtil.genSprite('bg-lawn');
    this.lawnBg.width = width;
    this.lawnBg.height = height;
    this.lawnBg.interactive = true
    this.lawnBg.on("pointerdown", () => {
      this.miner.mining();
      console.log(this.miner)
    })
    this.container.addChild(this.lawnBg);

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
    this.scorer.y = 80
    ticker.add(() => {
      this.scorer.setScore(databus.score)
      this.scorer.setTarget(getTarget(databus.level))
    })
    this.container.addChild(this.scorer)

    // pause btn
    // this.pauseBtn = pixiUtil.genSprite('mask-bk')
    // this.pauseBtn.width = 100
    // this.pauseBtn.height = 50
    // this.pauseBtn.x = 10
    // this.pauseBtn.y = 10
    // this.pauseBtn.interactive = true
    // this.pauseBtn.on('pointertap', () => {
    //   this.pause() // TODO: 
    // })
    // this.container.addChild(this.pauseBtn)

    // timeout
    this.timeout = new Field({
      label: '倒计时: ',
      value: 60,
    })
    this.timeout.x = width - this.timeout.width - 60
    this.timeout.y = 80
    this.container.addChild(this.timeout)

    // level
    this.level = new Field({
      label: '关卡: ',
      value: databus.level,
    })
    this.level.x = width - this.level.width - 60
    this.level.y = this.timeout.y + this.timeout.height + 10
    this.container.addChild(this.level)

    
  },

  initWX() {
    wx.showShareMenu({})
    wx.onShareAppMessage(() => {
      // 用户点击了“转发”按钮
      return {
        title: '99%的人拼不出来！你敢试试吗？',
        imageUrl: `static/puzzle/${this.shareUrl || 'easy/0.jpg'}`,
        query: encodeURI(`shareUrl=${this.shareUrl || 'easy/0.jpg'}`)
      }
    })

    wx.onShow((res = {
      query: undefined,
      referrerInfo: undefined,
      scene: 0
    }) => {
      if (!res.query?.shareUrl) {
        return
      }

      if (res.scene === 1007 || res.scene === 1008) {
        if (this.puzzle) {
          this.destroyPuzzle()
        }
        const btnType = Number(res.query.gameType)
        this.newPuzzle(btnType, res.query.puzzleUrl)
      }
    })

    const res = wx.getLaunchOptionsSync()

    if (res.query.puzzleUrl && res.query.gameType) {
      const btnType = Number(res.query.gameType)
      this.newPuzzle(btnType, res.query.puzzleUrl)
    }
  }, 

  destroyPuzzle() {
    this.container.removeChild(this.puzzle)
    this.container.removeChild(this.info)
    this.container.removeChild(this.hint)
    this.puzzle.destroy()
    this.info.destroy()
    this.hint.destroy()
  },

  isTimeGoing() {
    if (this.puzzle.gameOn && !this.puzzleHelp.visible) {
      return true
    }
    return false
  },


  start() {
    this.init()
    this.initWX()
    stage.addChild(this.container)
  }
}