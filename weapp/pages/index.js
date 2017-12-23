// pages/index.js
function _next() {
  var that = this;
  if (this.data.progress >= 100) {
    this.setData({
      disabled: false
    });
    return true;
  }
  this.setData({
    progress: ++this.data.progress
  });
  setTimeout(function () {
    _next.call(that);
  }, 20);
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    height:0,
    width:0,
    num:0.99,
    opacity:'',
    animationData2:{},
    scrollY:true,
    viewStyle:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  
    if (this.data.disabled) return;

    this.setData({
      progress: 0,
      disabled: true
    });
    _next.call(this);
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  /**
    * 获取手机屏幕高度
    * 
  */var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        that.setData({
          height:res.windowHeight,
          width: res.windowWidth
        })
      }
    })
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation
    setTimeout(function () {
      animation.translateY(60).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
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
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        this.setData({
          heigth: res.windowHeight,
          width: res.windowWidth
        })
      }
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
  
  },

  /**
   * 语音
   */
  tapVoice: function () 
  {
    const recorderManager = wx.getRecorderManager()

    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onResume(() => {
      console.log('recorder resume')
    })
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      const { tempFilePath } = res
    })
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })

    const options = {
      duration: 600000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }

    recorderManager.start(options)
  },

  /**
   * 样式库
   */
  tapStyleCool: function () 
  {
    wx.navigateTo({
      url: "/example/index"
    })
  },

  /**
   * 长按说话
   */
  touchdown: function () 
  {
    const recorderManager = wx.getRecorderManager()

    recorderManager.onStart(() => {
      console.log('recorder start')
    })

    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }

    recorderManager.start(options)
  },

  touchup: function () {
    var that = this
    const recorderManager = wx.getRecorderManager()

    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      const { tempFilePath } = res
      that.setData({
        voiceFilePath : res
      });
    })
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })

    recorderManager.stop()
  },

  /**
   * 播放音频
   */
  tapPlay: function () {
    var that = this;
    // if
    
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = that.data.voiceFilePath.tempFilePath;
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },



  scrolltoupper: function(e) {
    
  },
/*
*   滚动事件,
*   当用户滑动到
    1、距离可视区底部50px时，执行操作：文字区域opacity：.99;
    2、距离可视区底部200px时，执行操作：文字区域opacity：.5;
    3、距离可视区顶部10px时，执行操作：文字区域opacity：.2;
   
*/
  bindscroll:function(event){
    console.log(event.detail)
    //获取用户手机信息
    var height;
    wx.getSystemInfo({
      success: function (res) {
      height = res.windowHeight;
      }
    })
    console.log(event.detail.scrollTop)

    if (event.detail.scrollTop <=100){
      this.setData({
        num:0.99
      })
    } else if (event.detail.scrollTop >= 100 && event.detail.scrollTop <= 200){
      this.setData({
        num: 0.55
      })
    }else{
      this.setData({
        num: 0.33
      })
    }

  },
  
  // 滚动到顶部触发的事件
  scrollUpper: function (event){
    console.log(event.detail)
    if (event.detail.direction == 'top') {
      //显示和隐藏过度动画
        var animation = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 300,
          timingFunction: 'ease-in',
          delay:0
        });
        animation.opacity(0).step();
        this.setData({
          animationData2: animation.export(),
        })
    }

  },
  //滚动到底部触发的事件
  scrollLower: function (event){
    console.log(event.detail.direction)
    if (event.detail.direction == 'bottom')
    {
      var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 300,
        timingFunction: 'ease-in',
        delay: 0
      });
      animation.opacity(1).step();
      this.setData({
        animationData2: animation.export(),
      })
    }
  },
  // 联系我们
  CallMe:function(event){
    
    wx.makePhoneCall({
      phoneNumber: '15730179295' //
    })
  }

})