import { loader, screen } from "../core";
const pixiUtil = {
  getTexture(name) {
    return loader.resources[name].texture;
  },
  genMask(width = screen.width, height = screen.height) {
    let mask = this.genSprite("mask");
    mask.width = width;
    mask.height = height;
    mask.alpha = 0.7;
    return mask;
  },
  genSprite(name) {
    return new PIXI.Sprite(this.getTexture(name));
  },
  imgList: {
    // 'open': 'static/textures/open.png',
    // 'logo': 'static/textures/logo.png',
    // // 'btn_start': 'static/textures/btn_start.png',
    // // 'btn_guide': 'static/textures/btn_guide.png',
    // 'menu': 'static/textures/menu.png',
    // 'inviteUser': 'static/textures/inviteUser.png',
    "boom": "static/img/boom.png",
    "wallet": "static/img/wallet.png",
    "gold_hook": "static/img/gold_hook.png",
    "gold_car": "static/img/gold_car.png",
    "stone": "static/img/stone.png",
    "gold": "static/img/gold.png",
    "miner": "static/img/miner.png",
    "bg-lawn": "static/img/bg-lawn.png",
    "bg-desert": "static/img/bg-desert.jpg",
    "mask-bk": "static/img/mask-bk.png",

    
  }
};


window.pixiUtil = pixiUtil;