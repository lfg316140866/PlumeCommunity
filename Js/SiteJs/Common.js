/// <reference path="../CmnTools/WechatShare.js" />
/// <reference path="../jquery-1.9.1.min.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="../CmnFuncExd.js" />
/// <reference path="SiteFunc.js" />
/// <reference path="../animate/AnimateFrame.js" />
$(function () {
    $(".JscMessageBtn").on("click", function () {
        var _message = $(".JscMessageText").val();
        if (_message == "") {
            Cmn.alert("请输入您的宝贵意见！");
            return;
        }
        var _param = {
            "Message":_message
        }
        CmnAjax.PostData("/Itf/CSharp/ItfOther.aspx?method=UserComments", _param, function (dat) {
            if (dat.IsSuccess == 1) {
                $(".JscMessageText").val("");
                Cmn.alert("提交成功！");
            }
            else if (dat.IsSuccess == 0) {
                SiteFunc.JumpPage("index.html");
            }
            else {
                Cmn.alert("网络异常");
            }

        })
    })
})


