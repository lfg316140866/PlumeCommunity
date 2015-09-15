/// <reference path="../ThirdLib/jquery.js" />

YQMaster= {
    BackBtnBind: function (func) {
        /// <summary>设置返回按钮</summary>
        /// <param name="func" type="function">点击事件执行方法（不是function类型则按钮隐藏）</param>
        var _returnBtn = $(".return-btn");
        if (typeof func != "function") {
            _returnBtn.hide();
        } else {
            _returnBtn.show();
        }
        _returnBtn.on("touchend", function () {
            func && func();
        });
    },
    JumpPage : function (url) {
        if (location.href.indexOf("?") > 0) {
            var _url = (location.href).substring(0,location.href.indexOf("?"));
            _url = "/" + url + "?returnurl=" + _url + ""
            location.href = ((_url).replace(/\?/g, "&")).replace('&', '?');
        }
        else{
            _url = "/" + url + "?returnurl=" + location.href + ""
            location.href = ((_url).replace(/\?/g, "&")).replace('&', '?');
        }}
    
}