import * as PIXI from 'pixi.js'
import Field from './field'
import { ticker } from '../core'



export default class Scorer extends PIXI.Container {
  target: number
  score: number
  fontSize = 20
  fontColor = 'white'
  scoreText: Field
  targetText: Field

  constructor(options: {
    target: number,
    score: number,
  }) {
    super()
    this.target = options.target
    this.score = options.score
    this.init()
  }
  init() {

    this.scoreText = new Field({
      label: '金钱: ',
      value: this.score,
    })
    this.scoreText.x = 10
    this.scoreText.y = 10

    this.targetText = new Field({
      label: '目标: ',
      value: this.target,
    })
    this.targetText.x = this.scoreText.x
    this.targetText.y = this.scoreText.y + this.scoreText.height + 10
    this.addChild(this.scoreText)
    this.addChild(this.targetText)
  }

  setScore(score: number) {
    this.score = score
    this.scoreText.setValue(score)
  }
  setTarget(target: number) {
    this.target = target
    this.targetText.setValue(target)
  }
}