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

export {Config};