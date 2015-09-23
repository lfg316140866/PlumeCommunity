/// <reference path="../ThirdLib/jquery.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="../CmnFuncExd.js" />
/// <reference path="../animate/AnimateFrame.js" />

$(function () {
    //$(".list").height($("body").height() - 200);
    $(".header-box").remove();
    $(".search-nav a").on("touchend", function() {
        var _self = $(this);
        var _index = _self.index();
        _self.addClass("select").siblings().removeClass("select");
        if (_index == 0) {
            if ($(".list").eq(2).find("li").length > 0) {
                $(".list").eq(2).show().siblings(".list").hide();
            } else {
                $(".list").eq(0).show().siblings(".list").hide();

            }
        } else {
            $(".list").eq(1).show().siblings(".list").hide();
        }
    });

    $(".search-recd-con img[labelid]").click(function() {
        //SiteFunc.JumpPage("Home.aspx?lid=" + $(this).attr("labelid"));
        var _param = { LabelID: $(this).attr("labelid") };
        $(".search-key-list").show().siblings(".list").hide();
        var _list = new CmnAjax.DataStepLoad(".search-key-list li", "/Itf/CSharp/Interface.aspx?method=GetWorkListByLabel", _param, ".search-key-list", 1000, 24);
        _list.BindScrollLoadData(".search-key-list .search-pub");
    });

    $(".search-con-list").on("click", "li", function () {
        var _uid = $(this).attr("userid");
        if (_uid != "") {
            SiteFunc.JumpPage("Personal.aspx?uid=" + _uid);
        }
    });

    $(".search-con-list").on("click", "img[workid]", function (event) {
        event.stopPropagation();
        var _workID = $(this).attr("workid");
        if (_workID != "") {
            SiteFunc.JumpPage("Home.aspx?WorkID=" + _workID);
        }
    });

    var _labelID = Cmn.Func.GetParamFromUrl("lid");
    
    if (_labelID != "") {
        var _param = { LabelID: _labelID };
        $(".search-key-list").show().siblings(".list").hide();
        var _list = new CmnAjax.DataStepLoad(".search-key-list li", "/Itf/CSharp/Interface.aspx?method=GetWorkListByLabel", _param, ".search-key-list", 1000, 24);
        _list.BindScrollLoadData(".search-key-list .search-pub");
    }

    $("#SeachBtn").on("touchend", function() {
        var _keyWord= $(".search-input input").val();
        if (_keyWord.trim() == "") {
            _keyWord = $(".search-input input").attr("placeholder");
        }
        if ($(".search-nav .select").index(".search-nav a") == 0) {
            var _param = { KeyWordLabel: _keyWord };
            $(".search-key-list").show().siblings(".list").hide();
            var _list = new CmnAjax.DataStepLoad(".search-key-list li", "/Itf/CSharp/Interface.aspx?method=GetWorkListLikeLabel", _param, ".search-key-list", 1000, 24);
            _list.BindScrollLoadData(".search-key-list .search-pub");
        } else {
            var _param = { KeyWordName: _keyWord };
            $(".search-con-list").show().siblings(".list").hide();
            var _list = new CmnAjax.DataStepLoad(".search-con-list li", "/Itf/CSharp/Interface.aspx?method=GetUserListLikeName", _param, ".search-con-list", 1000, 10, function () {
                _list.BindScrollLoadData(".search-con-list");
                $(".search-con-list li:hidden").show();                          
            });
        }
    });
    

   
})