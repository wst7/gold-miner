export enum OreType {
  Stone = 'stone',
  Gold = 'gold',
  Wallet = 'wallet',
  Diamond = 'diamond',
  Boom = 'boom'
}

export enum OreSize {
  S10 = "10",
  S20 = "20",
  S40 = "40",
  S60 = "60",
  S80 = "80",
}

const levels = {
  1: {
    target: 650,
    ores: [
      {
        type: OreType.Gold,
        x: 200,
        y: 900,
        size: OreSize.S60
      },
      {
        type: OreType.Stone,
        x: 100,
        y: 1000,
        size: OreSize.S60
      },
      {
        type: OreType.Wallet,
        x: 400,
        y: 700,
        size: OreSize.S40
      },
      {
        type: OreType.Boom,
        x: 500,
        y: 900,
        size: OreSize.S80
      },
    ]
  },
  2: {
    target: 1150,
    ores: [
      {
        type: OreType.Gold,
        x: 200,
        y: 900,
        size: OreSize.S80
      },
      {
        type: OreType.Stone,
        x: 100,
        y: 1000,
        size: OreSize.S20
      },
      {
        type: OreType.Wallet,
        x: 200,
        y: 300,
        size: OreSize.S40
      },
    ]
  }
}

export function getTarget(levelIdx: number) {
  const level = levels[levelIdx]
  if (!level) return 0
  return level.target
}

export function getOres(levelIdx: number) {
  const level = levels[levelIdx]
  if (!level) return [] 
  return level.ores
}