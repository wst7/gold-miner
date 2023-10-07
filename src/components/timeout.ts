import * as PIXI from "pixi.js"

class Timeout extends PIXI.Container {
  fontSize = 20
  fontColor = "white"
  restTime: 60// 剩余时间
  timer_string: PIXI.Text
  constructor() {
    super()
    let style = new PIXI.TextStyle({
      fontSize: this.fontSize,
      fill: this.fontColor
    });
    this.timer_string = new PIXI.Text(`Time: ${this.restTime}`, style);
    this.timer_string.y = 20
    this.timer_string.x = 100
    this.addChild(this.timer_string);

  }

  setTime(restTime) {
    this.restTime = restTime
    this.timer_string.text = restTime
  }
}
export default Timeout