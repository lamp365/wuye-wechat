class Config {
     //constructor 是一种用于创建和初始化class创建的对象的特殊方法。
    // 构造函数
    constructor(){

    }
}
Config.debug = false;
Config.applet = '业主事 安心办';
Config.bannerName = '忆家物业';
Config.bannerDesc = '贴心改变生活，用心创造价值。';
Config.api = Config.debug ? 'http://wuye.gxqczy.cn/api/v1/' : "http://81.68.240.241:82/api/v1/";
Config.baseUrl = Config.debug ? "http://wuye.gxqczy.cn" : "http://81.68.240.241:82";
Config.tokenName = 'token';
Config.onPay = true;

//统一管理接口定义
Config.getToken = Config.api + 'getToken'; //获取用户TOKEN接口
Config.verifyToken = Config.api+'verifyToken'; //验证TOKEN接口
Config.modifyUser = Config.api+'modifyUser';//更新用户信息
Config.systemInfo = Config.api+'systemInfo';//获取应用信息
//index
Config.getBanner = Config.api+'getBanner';//获取轮播图
Config.getArticle = Config.api + 'getArticle'; //公告快讯 社区新闻  社区活动

//获取文章列表
Config.getArticleList = Config.api+'getArticleList';
Config.articleDetail = Config.api+'articleDetail';

//投票模块
Config.subject = Config.api+'subject';
Config.oneSubject = Config.api+'oneSubject';
Config.player = Config.api+'player';
Config.playerInfo = Config.api+'playerInfo';
Config.submitVote = Config.api+'submitVote';

//维修模块
Config.isLogin = Config.api+'isLogin';
Config.selectHouse = Config.api+'selectHouse';
Config.postRepair = Config.api+"postRepair";
Config.repairList = Config.api+'repairList';
Config.finishRepair = Config.api+'finishRepair';
Config.repDetail = Config.api+'repDetail';

//来访登记
Config.getCommunity = Config.api+"getCommunity";
Config.addVisit = Config.api+'addVisit';

//我的中心
Config.myCommunity = Config.api+'myCommunity';
Config.addCommunity = Config.api+'addCommunity';
Config.getPayMent = Config.api+'getPayMent';
Config.needPay = Config.api+'needPay';

//获取搜索
Config.searchData = Config.api+'searchData';
//图片上传
Config.uploadFile = Config.api+'uploadFile';



export {Config};