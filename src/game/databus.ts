/**
 * 全局状态管理器
 */
class DataBus {
    matchPattern: any
    gameInstance: any
    userInfo: any = {}

    gameover: boolean = false
    currAccessInfo: string
    playerMap: any = {}
    playerList: any[] = []
    selfPosNum: number
    selfClientId: number
    selfMemberInfo: any

    constructor() {
        this.userInfo = {};

        this.reset();
    }

    reset() {
        this.gameover       = false;
        this.currAccessInfo = '';
        this.playerMap      = {};
        this.playerList     = [];
        this.selfPosNum     = 0;
        this.selfClientId   = 1;
        this.selfMemberInfo = {};
        this.matchPattern   = void 0;
    }


}

export default new DataBus();

