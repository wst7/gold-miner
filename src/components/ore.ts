import { OreSize, OreType } from "../level_data"

const Textures = {
  [OreType.Stone]: "stone",
  [OreType.Gold]: "gold",
  [OreType.Wallet]: "wallet",
  [OreType.Diamond]: "diamond",
  [OreType.Boom]: "boom"
}
const UnitScore = {
  [OreType.Stone]: 10,
  [OreType.Gold]: 50,
  [OreType.Wallet]: 200,
  [OreType.Diamond]: 400,
  [OreType.Boom]: -100
}

const UnitSpeed = {
  [OreType.Stone]: 0.5,
  [OreType.Gold]: 1,
  [OreType.Wallet]: 1,
  [OreType.Diamond]: 1,
  [OreType.Boom]: 0
}

const MaxSize = Number(OreSize.S80)
export default class Ore extends PIXI.Sprite {
  type: OreType
  size: OreSize
  score: number
  speed: number // TODO: REMOVE
  constructor(options: {
    type: OreType,
    x: number,
    y: number,
    size: OreSize
  }) {
    super()
    this.type = options.type
    this.size = options.size
    this.score = UnitScore[this.type]
    this.speed = UnitSpeed[this.type]
    this.x = options.x
    this.y = options.y
    this.init()
  }
  init() {
    const sprite = PIXI.Sprite.from(Textures[this.type])
    const size = Number(this.size)
    sprite.scale.set(size / MaxSize, size / MaxSize)
    this.addChild(sprite)
  }
}
