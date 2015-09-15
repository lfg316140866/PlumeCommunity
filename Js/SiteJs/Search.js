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
            $(".list").eq(0).show().siblings(".list").hide();
        } else {
            $(".list").eq(1).show().siblings(".list").hide();
        }
    });

    var _labelID = Cmn.Func.GetParamFromUrl("lid");
    if (_labelID != "") {
        var _param = { LabelID: _labelID };
        $(".search-key-list").show().siblings(".list").hide();
        CmnAjax.DataStepLoad(".search-key-list li", "/Itf/CSharp/Interface.aspx?method=GetWorkListByLabel", _param, ".search-key-list", 1000, 24);
    }

    $("#SeachBtn").on("touchend", function() {
        var _keyWord= $(".search-input input").val();
        if (_keyWord.trim() == "") {
            _keyWord = $(".search-input input").attr("placeholder");
        }
        if ($(".search-nav .select").index(".search-nav a") == 0) {
            var _param = { KeyWordLabel: _keyWord };
            $(".search-key-list").show().siblings(".list").hide();
            CmnAjax.DataStepLoad(".search-key-list li", "/Itf/CSharp/Interface.aspx?method=GetWorkListLikeLabel", _param, ".search-key-list", 1000, 24);
        } else {
            var _param = { KeyWordName: _keyWord };
            $(".search-con-list").show().siblings(".list").hide();
            CmnAjax.DataStepLoad(".search-con-list li", "/Itf/CSharp/Interface.aspx?method=GetUserListLikeName", _param, ".search-con-list", 1000, 10,function() {
                $(".search-con-list li:hidden").show();                          
            });
        }
    });


   
})