import { Config } from 'config.js';

class Base{
    constructor(){
         "use strict";
        this.onPay = Config.onPay;
        this.token = Config.tokenName;
    }
   
     //http 请求类, 当needReLogin为false时，不做未授权重试机制
     request(params, needReLogin) {

        var that = this,url=params.url;
        
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
                
                console.log(res);

                // 判断以2（2xx)开头的状态码为正确
                // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
                var code = res.statusCode.toString();
                var startChar = code.charAt(0);
                if (startChar == '2') {
                    
                    //结果以参数形式传给回调函数中处理
                    params.sCallback && params.sCallback(res.data);

                } else {

                    if (code == '401') {
                        if (needReLogin) {
                            that.getTokenFromServer(params);
                        }
                    }
                    console.log(res);
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

    getTokenFromServer(parame){
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
                    }else{
                        that._timeOutError();
                    }
                }
              })
          }
        })
    }
    veirfyFromServer(token){
        var that = this;
        // wx.request({
        //   url: 'url',
        // })
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
     _timeOutError(){
        wx.showToast({
            title: '网络异常',
            icon: 'none',
            duration: 1500
        })
    }
}

export {Base}