

export default class Button extends PIXI.Sprite {
  constructor(text: string, bgColor?: number) {
    super();
    bgColor = bgColor || 0xdcaf44;
    this.interactive = true
    const _text = new PIXI.Text(text, {
      fontFamily: 'Arial',
      fontSize: 34,
      fill: 0xffffff,
      align: 'center',

    })
    const button = new PIXI.Graphics();
    button.beginFill(bgColor);
    button.drawRoundedRect(0, 0, _text.width + 40, _text.height + 40, 8);
    button.endFill();
    button.interactive = true;
    button.buttonMode = true
    this.addChild(button);

    _text.anchor.set(0.5)
    _text.x = button.width / 2;
    _text.y = button.height / 2;
    this.addChild(_text);

  }
}