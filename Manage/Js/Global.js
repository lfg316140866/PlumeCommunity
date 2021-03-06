﻿/// <reference path="../../Js/jquery.js" />
/// <reference path="../../Js/Cmn.js" />
/// <reference path="../../Js/CmnAjax.js" />
/// <reference path="../../Js/CmnMis/CmnMis.js" />
/// <reference path="../../Js/CmnMis/CmnMisUserForm.js" />
/// <reference path="../../Js/CmnMis/CmnMisFrame.js" />

var G_DefaultTop = 110;

//保存最后的ScrollTop的位置
var G_LastScrollTop = G_DefaultTop;
 
//-------------------------------------
CmnMis.Frame.OnEveryInitComplete.Add(function (userForm) {
    if (userForm === CmnMis.CurUserForm) {
        G_LastScrollTop = G_DefaultTop;
    }
});
//-------------------------------------
CmnMis.Frame.OnEveryAddClick.Add(function (userForm) {
    /// <summary>每个用户表单的增加记录初始化后事件</summary>

    if (userForm === CmnMis.CurUserForm) {
        G_LastScrollTop = $("body").scrollTop();
        $("html,body").animate({ scrollTop: G_DefaultTop });
    }
});
//$("html,body").scroll(function () { $(this).stop(false, false) });
//-------------------------------------
CmnMis.Frame.OnEveryUpdateClick.Add(function (userForm) {
    /// <summary>每个用户表单修改记录初始化后事件</summary>

    if (userForm === CmnMis.CurUserForm) {
        G_LastScrollTop = $("body").scrollTop();
        $("html,body").animate({ scrollTop: G_DefaultTop });
    }
});
//-------------------------------------
CmnMis.Frame.AfterEveryRecListLoad.Add(function (userForm) {
    /// <summary>在每个用户表单列表数据加载完后触发</summary>

    if (userForm === CmnMis.CurUserForm) {
        setTimeout(function () {
            $("html,body").animate({ scrollTop: G_LastScrollTop });
            G_LastScrollTop = G_DefaultTop;
        }, 500);
    }
});
//-------------------------------------
CmnMis.Frame.OnEveryCancel.Add(function (userForm) {
    /// <summary>在每个用户表单编辑见面取消按钮的时候触发</summary>

    if (userForm === CmnMis.CurUserForm) {
        setTimeout(function () {
            $("html,body").animate({ scrollTop: G_LastScrollTop });
            G_LastScrollTop = G_DefaultTop;
        }, 500);
    }
});
//-------------------------------------
Date.prototype.format = function (format) {

    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}