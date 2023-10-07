import "@iro/wechat-adapter";
import "./utils/index";
import "./utils/pixiUtil";

import { home, preload } from "./scenes";
import { monitor } from "./core";
import clearing from "./scenes/clearing";

let scene = null
const initRouter = () => {
  if (scene) return
  monitor.on("scene:go", (name, opts) => {
    switch (name) {
      case "home":
        scene = home
        break;
      case "preload":
        scene = preload
        break;
      case "clearing":
        scene = clearing
        break;
    }
    scene.show()
  })
  monitor.emit("scene:go", "preload");
}

wx.onShow(info => {
  monitor.emit("wx:show", info);
  initRouter();
});

/**
 * 检查更新
 */
const checkUpdate = () => {
  const manager = wx.getUpdateManager();
  manager.onUpdateReady(() => {
    manager.applyUpdate();
  });
};

checkUpdate();