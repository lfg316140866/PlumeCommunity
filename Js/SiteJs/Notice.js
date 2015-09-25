/// <reference path="../ThirdLib/jquery.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="../CmnFuncExd.js" />
/// <reference path="../animate/AnimateFrame.js" />
/// <reference path="SiteFunc.js" />
//按钮闲置
_EventIdle = true;
$(function () {

    if (Cmn.Func.GetParamFromUrl("returnurl") != "") {
        SiteFunc.BackBtnBind(function () {
            location.href = decodeURIComponent(Cmn.Func.GetParamFromUrl("returnurl"));
        });
    } else {
        SiteFunc.BackBtnBind();
    }

    $(".notice-msg li").on("touchend", function () {
        var _self = $(this);
        setTimeout(function () {
            $("." + _self.attr("cl")).show().siblings().hide();
            SiteFunc.BackBtnBind(function () {
                $(".notice-msg").show().siblings().hide();
                SiteFunc.BackBtnBind();
            });
        }, 100);

    });

    $("li[workid]").click(function () {
        if (YQFunc.EventIdle) {
            YQFunc.EventIdle = false;
        } else {
            return false;
        }
        var _self = $(this);
        var _messageID = _self.attr("messageid");
        if (_messageID.trim() == "") {

            return false;
        }
        var _param = {
            MessageID: _messageID
        }
        CmnAjax.PostData("/Itf/CSharp/Interface.aspx?method=SetMessageHasReadByID", _param, function (data) {

            if (data.IsSuccess == 1) {
                SiteFunc.JumpPage("Home.aspx?WorkID=" + _self.attr("workid"));
                YQFunc.EventIdle = true;
            } else {
                //登录判断
                YQFunc.BackLogin(data);
                YQFunc.EventIdle = true;

            }
        });
    });

    $("li[userid]").click(function () {
        if (YQFunc.EventIdle) {
            YQFunc.EventIdle = false;
        } else {
            return false;
        }
        var _self = $(this);
        var _messageID = _self.attr("messageid");
        if (_messageID.trim() == "") {

            return false;
        }
        var _param = {
            MessageID: _messageID
        }
        CmnAjax.PostData("/Itf/CSharp/Interface.aspx?method=SetMessageHasReadByID", _param, function (data) {
            
            if (data.IsSuccess == 1) {
                SiteFunc.JumpPage("Personal.aspx?uid=" + _self.attr("userid"));
                YQFunc.EventIdle = true;
            } else {
                //登录判断
                YQFunc.BackLogin(data);
                YQFunc.EventIdle = true;

            }
        });
    });
});

var YQFunc = {
    EventIdle: true,
    BackLogin: function (data) {
        if (data.ErrMsg == "用户未登录") {
            SiteFunc.JumpPage("index.aspx");
        }
    }
}