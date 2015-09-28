/// <reference path="SiteFunc.js" />
/// <reference path="../jquery.cycle.all.js" />
/// <reference path="../ThirdLib/jquery.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="../CmnFuncExd.js" />

$(function () {
    //返回按钮
    if (Cmn.Func.GetParamFromUrl("returnurl") != "") {
        SiteFunc.BackBtnBind(function () {
            location.href = decodeURIComponent(Cmn.Func.GetParamFromUrl("returnurl"));
        });
    } else {
        if (Cmn.Func.GetParamFromUrl("uid") != "") {
            SiteFunc.BackBtnBind(function () {
                location.href = "Personal.aspx?uid=" + Cmn.Func.GetParamFromUrl("uid");
            });
        } else {
            SiteFunc.BackBtnBind();
        }

    }
    var _userID = Cmn.Func.GetParamFromUrl("uid");
    var _list = Cmn.Func.GetParamFromUrl("list");
    var _method = "GetUserListByFollow";
    var _container = "#ListFollow";
    if (_list == "fans") {
        _method = "GetUserListByFans";
        _container = "#ListFans";
    }
    var _param = {
        UserID: Cmn.Func.GetParamFromUrl("uid")
    }
    var _ListLabel = new CmnAjax.DataStepLoad(_container + " li", "/Itf/CSharp/Interface.aspx?method=" + _method, _param, '.Inner', 1000, 10,
        function (data) {
            if (data.IsSuccess == 1) {
                $(_container).show();

            } else {

                //登录判断
                if (data.ErrMsg == "用户未登录") {
                    location.href = "index.aspx";
                }
            }
        });
    _ListLabel.BindScrollLoadData("body", 300);

    $(".Inner").on("click", "li", function () {
        var _uid = $(this).attr("userid");
        if (_uid != "") {
            SiteFunc.JumpPage("Personal.aspx?uid=" + _uid);
        }
    });


    $(".Inner").on("click", ".BtnFollow", function (event) {
        event.stopPropagation();
        if (YQFunc.EventIdle) {
            YQFunc.EventIdle = false;
        } else {
            return false;
        }

        var _self = $(this);
        if ($(this).hasClass("select")) {
            if (!confirm("确定不在关注该用户吗？")) {
                YQFunc.EventIdle = true;
                return false;
            }
            Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=DelFollowByID", { "FollowedUserID": _self.parents("li").attr("userid"), "FollowID": _self.attr("followid") }, function (data) {
                if (data.IsSuccess == 1) {
                    //if (_self.parents(".pub-call").attr("id") == "ListFollow") {
                    //    _self.parents("li").remove();
                    //} else {
                        _self.removeClass("select").attr("followid","");
                    //}
                    
                }
                YQFunc.EventIdle = true;
            });

        } else {
            Cmn.Ajax.PostData("/Itf/CSharp/Interface.aspx?method=AddFollow", { "FollowedUserID": _self.parents("li").attr("userid") }, function (data) {
                if (data.IsSuccess == 1) {
                    _self.addClass("select").attr("followid", data["FollowID"]);
                   
                } else {
                    //登录判断
                    YQFunc.BackLogin(data);
                   
                }
                YQFunc.EventIdle = true;
            });
        }

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