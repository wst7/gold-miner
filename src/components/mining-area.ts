
export default class Area extends PIXI.Container {
  row: 3
  column: 4
  background: PIXI.Graphics
  
  constructor() {
    super();
    this.initialize();
  }
  public initialize() {
    this.interactive = true;
    this.width = 300
    this.height = 300
    this.background = new PIXI.Graphics()
  }
}