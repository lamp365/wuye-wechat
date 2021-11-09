// pages/repairs/repairs.js
import {Config} from "../../utils/config.js";
import {Base} from '../../utils/base.js';

var BaseObj = new Base();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoading: true,
    community_arr: [], 
    building_arr:[],
    house_arr:[],
    userInfo:[],
    flag: 0, //选中的下标
    c_index: 0, //选中的下标
    b_index:0,
    h_index:0,
    
    reason:'',
    mobile:'',
    desc: '', //输入的问题描述
    address:'',
    temp: [], //上传的图片
    img_url:[] //存储服务器返回的图片地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //验证客户是否登陆  是否 绑定过小区
    this.checkUserInfo();
  },

  checkUserInfo:function(){
    var that = this;
    this.setData({showLoading:false})
    var parame = {
      url:Config.isLogin,
      needShowMessage:true,
      sCallback:function(res){
        var community_arr = res.community_arr;
        var building_arr = res.building_arr;
        var house_arr = res.house_arr;
        community_arr.unshift({code:-1,name:'请选择对应小区'});
        building_arr.unshift({code:-1,floor_num:'请选择对应楼栋'});
        house_arr.unshift({code:-1,name:'请选择对应房号'});
        that.setData({   
          community_arr: community_arr, 
          building_arr:building_arr,
          house_arr:house_arr,
          userInfo:res.userInfo,
        })
      },
      eCallback:function(res){
        wx.navigateTo({ 
          url: '../my/my',
        })
      }
    };
    BaseObj.request(parame);
  },

  //选择类型
  bindCommunityChange: function(e) {
    // var code = e.currentTarget.dataset.code; 
    var c_index = e.detail.value;
    var code = this.data.community_arr[c_index].code;
    this.setData({
      c_index: e.detail.value
    });
    if(code == -1){
      var building_arr = [];
      var house_arr = [];
      building_arr[0]= new Object;
      building_arr[0].code = -1;
      building_arr[0].floor_num = '请选择对应楼栋';
      house_arr[0] = new Object;
      house_arr[0].code = -1;
      house_arr[0].name = '请选择对应房号';
     this.setData({
        building_arr:building_arr,
        house_arr:house_arr,
        b_index:0,
        h_index:0
     });
      return '';
    }
    var that = this;
    var parame={
      url:Config.selectHouse,
      data:{code:code,act:'build'},
      type:'post',
      sCallback:function(res){
        res.unshift({code:-1,floor_num:'选择对应楼栋'});
        that.setData({
          building_arr:res,
          b_index:0
        })
      }
    }
    BaseObj.request(parame);
  },
  //选择类型
  bindBuildingChange: function(e) {
    // var code = e.currentTarget.dataset.code; 
    var b_index = e.detail.value;
    var code = this.data.building_arr[b_index].code;
    this.setData({
      b_index: e.detail.value
    });
    if(code == -1){
      var house_arr = [];
      house_arr[0] = new Object;
      house_arr[0].code = -1;
      house_arr[0].name = '请选择对应房号';
     this.setData({
        house_arr:house_arr,
        h_index:0
     });
      return '';
    }
    var that = this;
    var parame={
      url:Config.selectHouse,
      data:{code:code,act:'house'},
      type:'post',
      sCallback:function(res){
        res.unshift({code:-1,name:'选择对应房号'});
        that.setData({
          house_arr:res,
          h_index:0
        })
      }
    }
    BaseObj.request(parame);
  },

  bindHouseChange:function(e){
    var h_index = e.detail.value;
    this.setData({
      h_index: e.detail.value
    });
  },

  //点击上传图片
  bindPhoto(e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index;
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // console.log(res);
        var tempFilePaths = res.tempFilePaths;  //接收到的是数组
        var temp = this.data.temp;
        if (index == -1) {
          temp = temp.concat(tempFilePaths);
        } else {
          temp[index] = tempFilePaths[0];
        }
        if (temp.length > 3) {
          temp.splice(3, temp.length - 3);//从3位置 删除掉多余的
        }
        this.setData({
          temp: temp
        });
      }
    });
  },

  bindDelete:function(e){
    let index = e.currentTarget.dataset.index;
    var temp = this.data.temp;
    temp.splice(index,1);
    this.setData({
      temp:temp
    })
  },

  bindReason:function(e){
    this.setData({
      reason:e.detail.value
    })
  },
  bindMobile:function(e){
    this.setData({
      mobile:e.detail.value
    })
  },
  bindDescText:function(e){
    this.setData({
      desc:e.detail.value
    })
  },
  bindRepairAddress:function(e){
    this.setData({
      address:e.detail.value
    })
  },

  bindButton:function(){
      if(this.data.c_index == 0 || !this.data.c_index){
        BaseObj._showMessageToast('请选择所属小区！');
        return '';
      }
      if(this.data.b_index == 0 || !this.data.b_index){
        BaseObj._showMessageToast('请选择所属楼号！');
        return '';
      }
      if(this.data.h_index == 0 || !this.data.h_index){
        BaseObj._showMessageToast('请选择所属房号！');
        return '';
      }
      if(!this.data.reason){
         BaseObj._showMessageToast('请输入缘由');return '';
      }
      if(!this.data.desc){
        BaseObj._showMessageToast('请输入问题详情');return '';
     }
     if(!this.data.mobile){
          BaseObj._showMessageToast('请输入联系方式');return '';
      } 
      if(this.data.mobile.length != 11){
        BaseObj._showMessageToast('手机号需11位');return '';
      }
      var tel = this.data.mobile;
      console.log(typeof tel);
      // if(typeof tel !== 'number' ){
      //   BaseObj._showMessageToast('手机号必须数字');return '';
      // }
      if(!this.data.address){
          BaseObj._showMessageToast('请输入地址');return '';
      } 
      //上传图片
      this.uploadImg();

      
  },
  uploadImg:function(){
    var that = this;
    var temp = this.data.temp;
    var img_url =this.data.img_url;
    var temp_length = temp.length;
    var copy_img = temp.splice(0); //复制
    if(temp_length == 0){
      this.submitData();
      return '';
    }
    for(var i=0;i<temp_length;i++){
      var one_img = copy_img[i];
      wx.showLoading({
        title: '提交中',
      });
      var parame = {
          url:Config.uploadFile,
          imgsrc:one_img,
          sCallback:function(res){
              wx.hideLoading(); //隐藏提示框
              img_url.push(res.url);
              that.setData({
                img_url:img_url
              });
              var img_url_leng = img_url.length;
              if(temp_length == img_url_leng){
                //全部上传成功才执行提交数据
                that.submitData();
              }
          },
      };
      BaseObj.uploadFile(parame,'',true);
    }
  },

  submitData:function(){
    var that = this;
    wx.showLoading({
      title: '处理中',
    })
    var c_index = this.data.c_index;
    var h_index = this.data.h_index;
    var all_data = {
      community_code:this.data.community_arr[c_index].code,
      house_code:this.data.house_arr[h_index].code,
      mobile:this.data.mobile, 
      reason:this.data.reason,
      desc:this.data.desc,
      address:this.data.address,  
      needShowMessage:true
    };
    var img_url = this.data.img_url;
    if(img_url.length>0){
      //数组转为逗号拼接
      var img_str = img_url.join(',');
      all_data.thumb = img_str;
    }
    var parame = {
      url:Config.postRepair,
      type:'post',
      data:all_data,
      sCallback:function(res){
        wx.hideLoading(); //隐藏提示框
        that.setData({
          temp:[],img_url:[]
        });
        wx.navigateTo({
          url: '../repList/repList'
        })
      }
    }
    BaseObj.request(parame);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      temp:[],
      img_url:[],
      desc:'',
      reason:'',
      mobile:''
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})