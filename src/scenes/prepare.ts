

export default async () => {
  await new Promise(async (resolve) => {
    new PIXI.Spritesheet(
      await loadBaseTexture('static/textures/misc-0.png'),
      require('../static/textures/misc-0.json')
    ).parse(resolve)
  })
  PIXI.BaseTexture.addToCache(await loadBaseTexture('static/textures/border.png'), 'border.png')

  await new Promise(async resolve => {
    new PIXI.Spritesheet(
      await loadBaseTexture('static/textures/misc-2.png'),
      require('../static/textures/misc-2.json')
    ).parse(resolve)
  })
  for (let i = 0; i < 5; i++) {

    PIXI.BaseTexture.addToCache(await loadBaseTexture(`static/puzzle/easy/${i}.jpg`), `easy/${i}.jpg`)
    PIXI.BaseTexture.addToCache(await loadBaseTexture(`static/puzzle/middle/${i}.jpg`), `middle/${i}.jpg`)
    PIXI.BaseTexture.addToCache(await loadBaseTexture(`static/puzzle/hard/${i}.jpg`), `hard/${i}.jpg`)
  }
}
function loadTexture(url: string) {
  return new Promise(resolve => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve(PIXI.Texture.from(img))
  })
}

function loadBaseTexture(url: string): Promise<any> {
  return new Promise(resolve => {
    const img = wx.createImage()
    img.src = url
    img.onload = () => resolve(new PIXI.BaseTexture(img))
  })
}