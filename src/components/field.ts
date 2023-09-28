import * as PIXI from 'pixi.js'

class Field extends PIXI.Container {
  fontSize = 30
  fontColor = 'white'
  label: string = ''
  value: string | number = 60
  labelText: PIXI.Text
  valueText: PIXI.Text
  constructor(options: {
    label: string,
    value: number | string
  }) {
    super()
    this.label = options.label
    this.value = options.value
    const style = new PIXI.TextStyle({
      fontSize: this.fontSize,
      fill: this.fontColor
    });
    this.labelText = new PIXI.Text(this.label, style);
    this.labelText.y = 20
    this.labelText.x = 20
    this.addChild(this.labelText);

    this.valueText = new PIXI.Text(`${this.value}`, style);
    this.valueText.y = this.labelText.y
    this.valueText.x = this.labelText.x + this.labelText.width
    this.addChild(this.valueText);
  }

  setLabel(label) {
    this.label = label
    this.labelText.text = label
  }

  setValue(value) {
    this.value = value
    this.valueText.text = `${value}`
  }
}
export default Field