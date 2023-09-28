/**
 * 全局状态管理器
 */
class DataBus {
  level: number = 1
  score: number = 0
  userInfo: any = {}

  constructor() {
    this.userInfo = {};
    this.reset();
  }

  reset() {
    this.level = 1
    this.score = 0
  }

  calcScore(score: number) {
    this.score += score
  }

}

export default new DataBus();

