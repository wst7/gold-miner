import { monitor } from "../core"
import databus from "../databus"


export enum GoodsType  {
  Dynamite = "dynamite",
  EnergyWater = "energy_water",
  Rocks = "rocks",
  Diamond = "diamond"
}
const Textures = {
  [GoodsType.Dynamite]: "dynamite",
  [GoodsType.EnergyWater]: "energy_water",
  [GoodsType.Rocks]: "rocks",
  [GoodsType.Diamond]: "diamond",
}
export const Prices: Record<GoodsType, number> = {
  [GoodsType.Dynamite]: 650,
  [GoodsType.EnergyWater]: 300,
  [GoodsType.Rocks]: 300,
  [GoodsType.Diamond]: 300
}
export default class Goods extends PIXI.Sprite {
  type: GoodsType
  price: number
  constructor(type: GoodsType) {
    super()
    this.type = type
    this.interactive = true
    this.price = databus.priceHalve ? Prices[type] / 2 : Prices[type]
    this.on("pointerdown", this.onTouch)
    this.init()
  }

  init() {
    const sprite = PIXI.Sprite.from(Textures[this.type])
    this.addChild(sprite)
  }
  onTouch(e) {
    monitor.emit("goods", e)
  }
}