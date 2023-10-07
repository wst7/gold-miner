import { createContainer, monitor } from "../core";

export default class Scene {
  name: string = null
  container = createContainer()
  bg: PIXI.Sprite
  constructor(name?: string) {
    if (name) {
      this.name = name
    }
    
  }
  show() {
    if (!this.name) {
      console.error("Scene name is not set");
      return;
    }
    monitor.emit("scene:show", this.name);
    this.start()
  }

  hide() {
    this.container.destroy({ children: true });
    monitor.emit("scene:hide", this.name);
  }
  start() {
    console.warn("need overwrite start function")
  }
}