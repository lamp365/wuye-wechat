import { Config } from 'config.js';

class Base{
    constructor(){
         "use strict";
        this.onPay = Config.onPay;
        this.token = Config.tokenName;
    }
   
     //http 请求类, 当needReLogin为true时，未授权重试登录机制
     request(params, needReLogin) {

        var that = this,url=params.url;
        var needShowMessage = false;
       if(params.hasOwnProperty('needShowMessage'))  needShowMessage = params.needShowMessage;
        /**不传请求方式默认GET请求 */
        if(!params.type) params.type = 'get';

        /*不需要再次组装地址*/
        if(params.setUpUrl==false) url = params.url;
    
        wx.request({
            url: url,
            data: params.data,
            method:params.type,
            header: {
                'content-type': 'application/json',
                'token': wx.getStorageSync(that.token)
            },
            success: function (res) {
                
                // console.log(res.data.data);
                if (res.data.code == 200) {
                    //结果以参数形式传给回调函数中处理
                    if(needShowMessage){
                        that._showMessageToast(res.data.msg)
                    }
                    params.sCallback && params.sCallback(res.data.data);
                            
                } else {

                    if (res.data.code == '401') {
                        if (needReLogin) {
                            that.getTokenFromServer(params.sCallback);
                        }
                    }
                 
                    if(needShowMessage){
                     
                        that._showMessageToast(res.data.msg)
                    }
                    params.eCallback && params.eCallback(res.data);
                                  }
            },
            fail: function (err) {
                //wx.hideNavigationBarLoading();
                console.log(err);
                // params.eCallback && params.eCallback(err);
            }
        });
    }

    /**执行文件上传 */
    uploadFile(params,successShowMsg,errorShowMsg){
        var that = this,url=params.url;
         /*不需要再次组装地址*/
        if(params.setUpUrl==false) url = params.url;

        wx.uploadFile({
            url: url,
            formData: params.data,
            filePath: params.imgsrc,
            name: 'file', //固定
            method:'post',
            header: {
                "content-Type": "multipart/form-data",
                'token': wx.getStorageSync(that.token)
            },
            success: function (res) {
                
                // console.log(res);
                // 判断以2（2xx)开头的状态码为正确
                // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
                var re_data =  JSON.parse(res.data);
                // console.log(re_data);
                if (re_data.code == '200') {
                    if(successShowMsg) that._showMessageToast(re_data.msg);
                    //结果以参数形式传给回调函数中处理
                    params.sCallback && params.sCallback(re_data);
 
                } else {
                    if(errorShowMsg) that._showMessageToast(re_data.msg);
                    params.eCallback && params.eCallback(re_data);
                }
            },
            fail: function (err) {
                var re_data =  JSON.parse(err.data);
                if(errorShowMsg) that._showMessageToast(re_data.msg);
                console.log(err);
                // params.eCallback && params.eCallback(err);
            }
        });
    }

    getTokenFromServer(callBack){
        var that = this;
        wx.login({
          success:function(res){
              wx.request({
                url: Config.getToken,
                method: 'POST',
                data:{
                    code:res.code
                },
                success:function(res){
                    if(res.data.code == 200){
                        var token = res.data.data;
                        wx.setStorageSync(Config.tokenName,token);
                        callBack&&callBack(token);  //执行回调函数
                    }else{
                        that._showMessageToast();
                    }
                }
              })
          }
        })
    }
    veirfyFromServer(token){
        var that = this;
        wx.request({
          url: Config.verifyToken,
          method: 'POST',
          data: {
            token: token
          },
          success:function(res){
            if(res.data.code != 200){
                that.getTokenFromServer();
            }
          }
        })
    }
    tokenVerify(){
        var token = wx.getStorageSync(Config.tokenName);
        if(!token){
            this.getTokenFromServer(); //从服务器获取token
        }else{
            this.veirfyFromServer(token); // 验证TOKEN
        }
    }
     /**网络异常*/
     _showMessageToast(title='网络异常'){
        wx.showToast({
            title: title,
            icon: 'none',
            duration: 2000
        })
    }

    /*
    * 提示窗口
    * params:
    * title - {string}标题
    * content - {string}内容
    * flag - {bool}是否跳转到 "我的页面"
    */
   showTipsLog(title,content,flag){
        wx.showModal({
            title: title,
            content: content,
            showCancel:false,
            success: function(res) {
                
            }
        });
    }
}

export {Base}