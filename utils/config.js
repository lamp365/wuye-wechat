class Config {
     //constructor 是一种用于创建和初始化class创建的对象的特殊方法。
    // 构造函数
    constructor(){

    }
}
Config.debug = false;
Config.applet = '业主事';
Config.bannerName = '安泰物业';
Config.bannerDesc = '贴心改变生活，用心创造价值。';
Config.api = Config.debug ? 'http://wuye.gxqczy.cn/api/v1/' : "http://wuye.gxqczy.cn/api/v1/";
Config.baseUrl = Config.debug ? "http://wuye.gxqczy.cn" : "http://wuye.gxqczy.cn";
Config.tokenName = 'token';
Config.onPay = true;

//统一管理接口定义
Config.getToken = Config.api + 'getToken'; //获取用户TOKEN接口
Config.verifyToken = Config.api+'verifyToken'; //验证TOKEN接口
Config.modifyUser = Config.api+'modifyUser';//更新用户信息
Config.systemInfo = Config.api+'systemInfo';//获取应用信息
//index
Config.getBanner = Config.api+'getBanner';//获取轮播图
Config.indexArticle = Config.api + 'indexArticle'; //公告快讯


export {Config};