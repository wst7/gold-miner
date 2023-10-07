import { createContainer, pixelRatio, ticker } from "../core"
import databus from "../databus"
import { OreType } from "../level_data"
import collisionDetection from "../utils/collision-detection"
import Ore from "./ore"


enum HookDirection {
  Left = "left",
  Right = "right"
}

enum RopeDirection {
  Grow = "grow",
  Shrink = "shrink"
}



export default class Miner extends PIXI.Sprite {
  hookStop = false // hook is rotation
  hookDirection = HookDirection.Left

  ropeStop = true // 绳子伸缩动画的开关
  ropeDirection = RopeDirection.Grow
  ropeInitSpeed = 2
  ropeCurrentSpeed = 4
  ropeAcceleratedSpeed = 0.2
  ropeMaxLength = 888
  ropeInitHeight = 50
  ropeColor = 0x64371f

  hook: PIXI.Sprite
  rope: PIXI.Graphics
  goldCare: PIXI.Sprite
  ropeHook: PIXI.Container
  ores: Ore[] = []

  hitSprite: Ore

  _beforeRopeStop: boolean
  _beforeHookStop: boolean
  constructor(ores: Ore[]) {
    super();
    this.ores = ores
    this.init()
  }
  init() {
    const goldCare = pixiUtil.genSprite("gold_car")
    this.addChild(goldCare)

    this.hook = pixiUtil.genSprite("gold_hook")
    this.hook.anchor.set(0.5)
    this.hook.rotation = Math.PI / 2
    this.rope = new PIXI.Graphics();
    this.ropeHook = createContainer()

    this.ropeHook.addChild(this.hook)
    this.ropeHook.addChild(this.rope);

    this.rope.beginFill(this.ropeColor);
    this.rope.drawRect(0, 0, 4, this.ropeInitHeight);
    this.rope.endFill();
    this.rope.position.set(this.hook.width / 2 - this.rope.width / 2, 0)
    this.hook.position.set(0, this.ropeInitHeight)
    this.ropeHook.pivot.x = this.ropeHook.width / 2
    this.ropeHook.pivot.y = 0

    this.addChild(this.ropeHook)

    goldCare.position.set(-28, - 148)


    // this.hookRotationAnimate()
    this.ropeGrowAnimate()

  }
  hookRotationAnimate() {
    ticker.add((delta) => {
      // rotation to left
      if (this.hookDirection == HookDirection.Left && !this.hookStop) {
        this.ropeHook.rotation += 0.01 * delta;
        if (this.ropeHook.rotation > 0.8) {
          this.hookDirection = HookDirection.Right
        }
      }
      // rotation to right
      if (this.hookDirection == HookDirection.Right && !this.hookStop) {
        this.ropeHook.rotation -= 0.01 * delta;
        if (this.ropeHook.rotation < -0.8) {
          this.hookDirection = HookDirection.Left
        }
      }
    })
  }

  ropeGrowAnimate() {
    ticker.add((delta) => {
      if (this.ropeStop) {
        return
      }
      if (this.ropeDirection == RopeDirection.Grow) {
        let hasHit = false;
        if (this.rope.height <= this.ropeMaxLength) {
          // this.ropeCurrentSpeed += this.ropeAcceleratedSpeed;
          this.rope.height += this.ropeCurrentSpeed;
          this.hook.y += this.ropeCurrentSpeed;

          // 碰撞检测
          for (let i = 0; i < this.ores.length; i++) {
            let ore = this.ores[i];
            if (ore.visible) {
              if (collisionDetection(this.hook, ore)) {
                this.ropeDirection = RopeDirection.Shrink;
                this.hitSprite = new Ore({
                  type: ore.type,
                  x: 0,
                  y: 0,
                  size: ore.size
                })
                this.hitSprite.anchor.set(0.5, 0.5)
                // TODO: use ore type size re calc hook speed
                this.ropeHook.addChild(this.hitSprite)
                ore.visible = false;
                hasHit = true;
                break;
              }
            }
          }
        } else {
          this.ropeDirection = RopeDirection.Shrink;
        }
      } else {
        if (this.rope.height >= this.ropeInitHeight) {
          // this.rope.height -= this.ropeCurrentSpeed;
          // this.hook.y -= this.ropeCurrentSpeed;
          if (this.hitSprite) {
            this.hitSprite.position.y = 130 + this.rope.height;
          }
        } else {
          this.hook.y = this.ropeInitHeight;
          this.ropeStop = true;
          this.hookStop = false;
          this.ropeDirection = RopeDirection.Grow;
          this.calcScore()
          this.ropeHook.removeChild(this.hitSprite);
          this.hitSprite = undefined
        }
      }
    })

  }
  //  judge ore type
  calcScore() {
    if (this.hitSprite) {
      databus.calcScore(this.hitSprite.score)
    }
  }

  mining() {
    if (this.ropeStop) {
      console.log("miner start mining")
      this.hookStop = true
      this.ropeStop = false
    } else {
      console.log("miner is mining")
    }
  }
  pause() {
    this._beforeRopeStop = this.ropeStop;
    this._beforeHookStop = this.hookStop ;
    this.ropeStop = true;
    this.hookStop = true;
  }
  continue() {
    this.ropeStop = this._beforeRopeStop;
    this.hookStop = this._beforeHookStop;
  }
}