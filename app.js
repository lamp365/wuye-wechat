// app.js
import {Base} from "utils/base.js";
App({
  onLaunch() {
    var BaseObj = new Base();
    BaseObj.tokenVerify();  //有则验证  没有就登录 
  },
  onShow:function(){
    
  },
  //使用全局变量解决页面的传值问题  
  globalData: {
    address:'', //用户地址-在使用    
    userId: '', //用户userId
    api: '', //接口地址  
    baseUrl: '', //图片地址
    applet:'', //小程序名字 
  }
})
 