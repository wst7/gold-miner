import '@iro/wechat-adapter';
import './utils/index';
import './utils/pixiUtil';

import { game, preload } from './scenes';

preload().then(() => {
  game.start();
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