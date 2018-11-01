//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    day: 0,
    hour: 0,
    second: 0,
    min: 0,
    delta: 0,
    weekDay: '',
    today: '',
    items: [
      '恰逢盛夏，酷暑难当，作息规律，早睡早起，才能精神饱满，保持最佳的身体状态',
      '远离街边小摊上购买的食物与饮料，尽量在家中进食，避免由于饮食不干净造成的急性肠胃炎',
      '家长们无需刻意给考生追加食物，应保持饮食的规律与稳定。',
      '早餐是一天中最重要的一餐，基本原则是清淡易消化，可选择含糖、碳水化合物和蛋白质较多的食物',
      '考生的午餐质量要有所保证，午餐应该吃饱，吃好，为下午的考试做好充分准备',
      '考试期间，不要喝饮料，饮料有利尿作用，也会影响考生的考试状态'
    ],
    text: ''
  },
  //事件处理函数
  formatData: function(time) {
    var oneMin = 60 * 1000
    var oneHour = oneMin * 60
    var oneDay = oneHour * 24
    var day = Math.floor(time/oneDay);
    var hour = Math.floor((time - day * oneDay)/oneHour);
    var min = Math.floor((time - oneDay * day - oneHour * hour)/oneMin);
    var second = Math.floor((time - oneDay * day - oneHour * hour - oneMin * min)/1000);
    this.setData({
      day,
      hour,
      second,
      min,
      delta: this.data.delta - 1000
    });
  },
  getText: function() {
    var index = Math.floor(Math.random() * 5);
    this.setData({
      text: this.data.items[index]
    })
  },
  getADay: function () {
    var aday = new Date();
    var currYear = aday.getFullYear();
    var nextYear = currYear + 1;
    var currAday = (new Date(currYear + '-06-07')).setHours(0);
    if (aday < currAday) {
      return currAday;
    }
    return (new Date(nextYear + '-06-07')).setHours(0);
  },
  onLoad: function () {
    var week = ['日', '一', '二', '三', '四', '五', '六'];
    var aday = this.getADay();
    var today = new Date();
    var delta = aday - today;
    var weekDay = week[today.getDay()];
    var todayString = today.toLocaleDateString();
    this.setData({
      delta,
      weekDay,
      today: todayString
    })
    this.formatData(delta)
    this.getText()
    var that = this
    setInterval(() => {
      that.formatData(that.data.delta)
    }, 1000)
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShareAppMessage: function () {
    return {
      title: '高考倒计时',
      path: '/pages/index/index',
      success: function (res) {
        alert('转发成功')
      },
      fail: function (res) {
        alert('转发失败')
      }
    }
  }
})
