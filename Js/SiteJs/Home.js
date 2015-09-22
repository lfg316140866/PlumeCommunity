/// <reference path="SiteFunc.js" />
/// <reference path="../jquery.cycle.all.js" />
/// <reference path="../ThirdLib/jquery.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="../CmnFuncExd.js" />
/// <reference path="../unslider.js" />
/// <reference path="../animate/AnimateFrame.js" />


//首页业务逻辑 此处名称可以和页面对应起来 也可以和场景ID对应
$(document).ready(function () {
    $("html").css("height", "auto");
    $(".concern-btn").bind("click", function () {
        var _top = $(".Inner").eq(0).scrollTop();
        //$(".Inner").eq(0).css("visibility", "hidden").next().css("visibility", "visible");
        $(".Inner").eq(0).hide().next().show();
        $(".Inner").eq(1).scrollTop(_top);
    });
    $(".topics-btn").bind("click", function () {
        var _top = $(".Inner").eq(1).scrollTop();
        //$(".Inner").eq(0).css("visibility", "visible").next().css("visibility", "hidden");
        $(".Inner").eq(0).show().next().hide();
        $(".Inner").eq(0).scrollTop(_top);
    });

    $(".DescMain .icon-trash").on("click", function () {
        var _self = $(this);
        var _workID = _self.attr("workid");
        _param = {
            WorkID: _workID
        }
        CmnAjax.PostData("/Itf/CSharp/Interface.aspx?method=DelWorkByID", _param, function (data) {
            if (YQFunc.EventIdle) {
                YQFunc.EventIdle = false;
            } else {
                return;
            }
            if (data.IsSuccess == 1) {
                $(".MainList .con-box[workid=" + _workID + "]").remove();
                $(".return-btn").trigger("click");
                YQFunc.EventIdle = true;
            } else {
                //登录判断
                YQFunc.BackLogin(data);
                YQFunc.EventIdle = true;

            }
        });
    });


    //评论按钮绑定
    $(".reviews-btn").on("click", function () {
        //var _comment = $("#Comment_Input").val();
        if ($("#Comment_Input").text().length + $("#Comment_Input img").length > 40) {
            Cmn.alert("您所输入的内容过长");
            return false;
        }
        var _commentHtml = $("#Comment_Input").html();
        $("#Comment_Input img").each(function() {
            $(this).replaceWith($(this).attr("emcode"));
        });
        var _comment = $("#Comment_Input").html();

        var _replyUserID = $("#Comment_Input").attr("replyuserid");
        _replyUserID = undefined ? "" : _replyUserID;
        if (_comment.trim() == "") {
            Cmn.alert("评论不可为空");
            return false;
        }
        $("#Comment_Input").html("");
        $("#Comment_Input").prev().html('<i>我也说一句</i>');
        var _workID = $(this).parents(".desc-box").attr("workid");
        var _param = {
            WorkID: _workID,
            ReplyUserID: _replyUserID,
            Comment: _comment
        }
        CmnAjax.PostData("/Itf/CSharp/Interface.aspx?method=AddComment", _param, function (data) {
            $("#Comment_Input").attr({ "placeholder": "我也说一句", "replyuserid": "" });
            if (data.IsSuccess == 1) {
                //var _html = '<div class="list-desc">' +
                //          '<span class="comment-face"><img src="' + $("#HeadImgUrl").html() + '"></span>' + '<em class="comment-name general-font center-vertical">' + $("#NickName").html() + ':</em>' +
                //          '<strong class="comment-des general-font center-vertical">' + _comment + '</strong></div>';
                var _html = YQFunc.GetCommentHtml({ UserID: $("#UserID").html(), HeadImgUrl: $("#HeadImgUrl").html(), NickName: $("#NickName").html(), ReplyUserName: $("#Comment_Input").attr("replyusername"), Comment: _comment, CommentID: data["CommentID"] });
                var _workID = $(".DescMain .con-box").attr("workid");
                $(".DescMain .con-box[workid=" + _workID + "] .comment-list").append(_html);
                var _len = $(".Inner1 .con-box[workid=" + _workID + "] .comment-list .list-desc").length;
                var _len1 = $(".DescMain .con-box[workid=" + _workID + "] .comment-list .list-desc").length;
                if (_len < 3) {
                    $(".MainList .con-box[workid=" + _workID + "] .comment-list").append(_html);
                } else {
                    if ($(".Inner1 .con-box[workid=" + _workID + "] .comment-list .CommentBtn").length == 0 && _len1 > 3) {
                        _html = '<div class="more-comment CommentBtn" workid="' + _workID + '"><a href="javascript:void(0)" class="general-font">查看全部评论</a></div>';
                        $(".MainList .con-box[workid=" + _workID + "] .comment-list").append(_html);
                    }
                }


            } else {
                //登录判断

                YQFunc.BackLogin(data);
            }
        });
    });

    $("#Comment_Input").on("input", function () {
       
        var _self = $(this);
        //$("#Test").val(_self.html());
        if (_self.width() >= 520) {
            return false;
        }
        if (_self.html() == "") {
            _self.prev().show();
        } else {
            _self.prev().hide();
        }
    });

    //评论输入框获取焦点事件
    //$("#Comment_Input").focus(function() {
    //    var _self = $(this);
    //    if (_self.html() == "<i>我也说一句</i>" && _self.text() == "我也说一句") {
    //        _self.html("");
    //    }
    //});

    //评论输入框失去焦点事件
    //$("#Comment_Input").blur(function () {
    //    var _self = $(this);
    //    if (_self.html() == "" || _self.text() == "") {
    //        _self.html("<i>我也说一句</i>");
    //    }
    //});

    //举报按钮
    $(".report").on("click", function () {
        if (YQFunc.EventIdle) {
            YQFunc.EventIdle = false;
        } else {
            return;
        }
        var _self = $(this);
        var _workID = $(this).parents(".desc-box").attr("workid");
        var _param = {
            WorkID: _workID
        }
        CmnAjax.PostData("/Itf/CSharp/Interface.aspx?method=AddReport", _param, function (data) {
            if (data.IsSuccess == 1) {
                _self.attr("reportid", data.ReportID).css("visibility", "hidden");
                YQFunc.EventIdle = true;
            } else {
                //登录判断
                YQFunc.BackLogin(data);
                YQFunc.EventIdle = true;
            }
        });
    });

    //标签点击事件绑定
    $(".Inner1,Inner2").on("click", ".choose-desc-box", function (event) {
        event.stopPropagation();
        location.href = "Search.aspx?lid=" + $(this).attr("labelid");
    });

    $(".DescMain").on("click", ".choose-desc-box", function (event) {
        event.stopPropagation();
        SiteFunc.JumpPage("Search.aspx?lid=" + $(this).attr("labelid"), "Home.aspx?workid=" + $(this).parents(".con-box").attr("workid"));
    });

    //头像点击事件绑定
    $(".Inner1,.Inner2").on("click", ".BtnToUser", function (event) {
        event.stopPropagation();
        SiteFunc.JumpPage("Personal.aspx?uid=" + $(this).parent().attr("userid"));
    });

    $(".DescMain").on("click", ".BtnToUser", function (event) {
        event.stopPropagation();
        SiteFunc.JumpPage("Personal.aspx?uid=" + $(this).parent().attr("userid"), "Home.aspx?workid=" + $(this).parents(".con-box").attr("workid"));
    });

    //详情页点击消息回复
    $(".DescMain").on("click", ".list-desc", function (event) {
        event.stopPropagation();
        $("#Comment_Input").html("").prev().show();
        var _self = $(this);
        if (_self.attr("userid") == $("#UserID").html()) {
            if (confirm("确认要删除这条评论吗？")) {
                var _param = {
                    CommentID: _self.attr("commentid")
                }
                CmnAjax.PostData("/Itf/CSharp/Interface.aspx?method=DelCommentByID", _param, function (data) {
                    $(".list-desc[commentid=" + _self.attr("commentid") + "]").remove();
                    var _len = $(".DescMain .con-box[workid=" + _workID + "] .comment-list .list-desc").length;
                    if (_len < 4) {
                        $(".MainList .con-box[workid=" + _workID + "] .comment-list .CommentBtn").remove();
                    }
                });
            }
            return false;
        }
        $("#Comment_Input").focus();

        $("#Comment_Input").attr({ "replyuserid": _self.attr("userid"), "replyusername": _self.find(".comment-name span").html() });
        $("#Comment_Input").prev().html("回复" + _self.find(".comment-name span").html());
    });

    //
    $(".DescMain .Inner,.header-box").click(function () {
        $("#Comment_Input").attr({ "replyuserid": "", "replyusername": "" });
        $("#Comment_Input").prev().html("我也说一句");
        //表情框隐藏
        $(".expression-float").hide();
    });
    //底部评论区
    $(".comment-input").click(function (event) {
        event.stopPropagation();
        //表情框隐藏
        $(".expression-float").hide();
    });
   

    //显示表情
    $(".expression").click(function (event) {
        event.stopPropagation();
        $(".expression-float").toggle();
    });

    //选择表情
    $(".expression-float li a").click(function() {
        var _self = $(this);
        
        //$("#Comment_Input").html($("#Comment_Input").html() + _self.html()).prev().hide();
        $("#Comment_Input").append(_self.html()).prev().hide();
        //$("#Comment_Input").focus();
    });

    YQFunc.DescCommentBtnBind();
    SiteFunc.BackBtnBind();

    YQFunc.CommentBtnBind();

    //收藏按钮绑定
    YQFunc.CollectBtnBind();

    //点赞按钮绑定
    YQFunc.PraiseBtnBind();

    //关注按钮绑定
    YQFunc.FollowBtnBind();
    if (Cmn.Func.GetParamFromUrl("returnurl") != "") {
        SiteFunc.BackBtnBind(function () {
            location.href = decodeURIComponent(Cmn.Func.GetParamFromUrl("returnurl"));
        });
    } else {
        SiteFunc.BackBtnBind();
    }
    if (Cmn.Func.GetParamFromUrl("WorkID") != "") {
        $(".DescMain").show();
        $(".DescMain").css({ left: "0px" });
        $(".DescMain .comment-input").css({ left: "0px" });
        $(".footer-box").css({ bottom: "-115px" })
        YQFunc.GetDesc(Cmn.Func.GetParamFromUrl("WorkID"), "self");
        return false;
    }

    if (Cmn.Func.GetParamFromUrl("lid") != "") {
        $(".carousel-box").remove();
        $(".tip-box").remove();
        var _param = {
            LabelID: Cmn.Func.GetParamFromUrl("lid")
        }
        var _workListLabel = new CmnAjax.DataStepLoad(".hot_box .con-home-box", "/Itf/CSharp/Interface.aspx?method=GetWorkListOrderDateDescByLabel", _param, '.hot_box', 1000, 2,
         function (data) {
             if (data.IsSuccess == 1) {
                 var _dataLength = data.data.length;
                 var _container = $(".hot_box .con-home-box");
                 var _beginIndex = _container.length - _dataLength;
                 for (var _i = 0; _i < _dataLength; _i++) {

                     //});
                     //关注收藏点赞图标状态
                     YQFunc.GetFollowPraiseCollectState(_container.eq(_beginIndex + _i), data.data[_i]["UserID"], data.data[_i]["WorkID"]);

                     //获取评论
                     YQFunc.GetCommentTop3(_container.eq(_beginIndex + _i), data.data[_i]["WorkID"]);
                     //获取标签
                     YQFunc.GetWorkLabel(_container.eq(_beginIndex + _i), data.data[_i]["WorkImgID"]);
                 }
             } else {

                 //登录判断
                 if (data.ErrMsg == "用户未登录") {
                     _NoLogin = true;
                     Cmn.alert("用户未登录");
                     location.href = "index.aspx";
                 }
                 //YQFunc.BackLogin(data);
             }

         });
        _workListLabel.BindScrollLoadData(".Inner1");
        return false;
    }


    var _IsCycleChange = false;
    $('.Inner1 .carousel-nav').cycle({
        fx: 'scrollHorz',
        timeout: 0,
        pager: $(".Inner1 .carousel-click"),
        //prev: $(".Js_LeftBtn"),
        //next: $(".Js_RightBtn"),
        activePagerClass: 'select',
        speed: 800,
        pause: 0,
        pagerEvent: 'touchstart',
        before: function () {
            _IsCycleChange = true;
        },
        after: function () {
            _IsCycleChange = false;
        }
    });
    $('.Inner2 .carousel-nav').cycle({
        fx: 'scrollHorz',
        timeout: 0,
        pager: $(".Inner2 .carousel-click"),
        activePagerClass: 'select',
        speed: 800,
        pause: 0,
        prevNextEvent: 'touchstart',
        before: function () {
            _IsCycleChange = true;
        },
        after: function () {
            _IsCycleChange = false;
        }
    });
    $(".carousel-click a").on("touchstart", function () {
        var _index = $(this).index();
        $(this).parents(".Inner").siblings(".Inner").find(".carousel-nav").cycle(_index);
    });


    Cmn.Func.TouchSlide(".carousel-bar", 30, function (dir) {
        if (_IsCycleChange) { return false; }
        if (dir === "left") {
            $(".carousel-nav").cycle("next");
        }
        else if (dir === "right") {
            $(".carousel-nav").cycle("prev");
        }
    });

    var _NoLogin = false;



    var _workListHot = new CmnAjax.DataStepLoad(".hot_box .con-home-box", "/Itf/CSharp/Interface.aspx?method=GetWorkListOrderDateDesc", {}, '.hot_box', 1000, 2,
        function (data) {
            if (data.IsSuccess == 1) {
                var _dataLength = data.data.length;
                var _container = $(".hot_box .con-home-box");
                var _beginIndex = _container.length - _dataLength;
                for (var _i = 0; _i < _dataLength; _i++) {

                    //});
                    //关注收藏点赞图标状态
                    YQFunc.GetFollowPraiseCollectState(_container.eq(_beginIndex + _i), data.data[_i]["UserID"], data.data[_i]["WorkID"]);

                    //获取评论
                    YQFunc.GetCommentTop3(_container.eq(_beginIndex + _i), data.data[_i]["WorkID"]);
                    //获取标签
                    YQFunc.GetWorkLabel(_container.eq(_beginIndex + _i), data.data[_i]["WorkImgID"]);
                }
            } else {

                //登录判断
                if (data.ErrMsg == "用户未登录") {
                    _NoLogin = true;
                    Cmn.alert("用户未登录");
                    location.href = "index.aspx";
                }
                //YQFunc.BackLogin(data);
            }

        });
    _workListHot.BindScrollLoadData(".Inner1");
    if (_NoLogin) {
        return false;
    }
    var _workListFollow = new CmnAjax.DataStepLoad(".follow_box .con-home-box", "/Itf/CSharp/Interface.aspx?method=GetWorkListOrderDateDescByFollow", {}, '.follow_box', 1000, 2,
       function (data) {
           if (data.IsSuccess == 1) {
               var _dataLength = data.data.length;
               var _container = $(".follow_box .con-home-box");
               var _beginIndex = $(".follow_box .con-home-box").length - _dataLength;
               for (var _i = 0; _i < _dataLength; _i++) {

                   //关注图标
                   YQFunc.GetFollowPraiseCollectState(_container.eq(_beginIndex + _i), data.data[_i]["UserID"], data.data[_i]["WorkID"]);




                   //获取评论
                   YQFunc.GetCommentTop3(_container.eq(_beginIndex + _i), data.data[_i]["WorkID"]);

                   //获取标签
                   YQFunc.GetWorkLabel(_container.eq(_beginIndex + _i), data.data[_i]["WorkImgID"]);




               }
           } else {
               //登录判断
               YQFunc.BackLogin(data);
           }
       });
    _workListFollow.BindScrollLoadData(".Inner2");




});


$.prototype.SgShow = function () {
    $(this).css("display", "block");
    return $(this);
}


var YQFunc = {
    EventIdle: true,
    PraiseBtnBind: function () {
        $(".Inner").on("click", ".PraiseBtn", function () {

            if (YQFunc.EventIdle) {
                YQFunc.EventIdle = false;
            } else {
                return;
            }
            //$(".PraiseBtn").unbind("click").bind("click", function () {
            var _self = $(this);
            var _praiseID = _self.attr("praiseid");
            var _workID = _self.attr("workid");
            if (_praiseID == "" || _praiseID == undefined) {
                Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=AddPraise", { "WorkID": _workID }, function (data) {
                    if (data.IsSuccess == 1 && data.data[0]["PraiseID"] != "") {
                        $(".PraiseBtn[workid=" + _workID + "]").attr("praiseid", data.data[0]["PraiseID"]).addClass("select");
                        YQFunc.EventIdle = true;
                        Cmn.alert("点赞成功");
                    } else {
                        //登录判断
                        YQFunc.BackLogin(data);
                        YQFunc.EventIdle = true;
                    }

                });
            } else {
                Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=DelPraiseByID", { "PraiseID": _praiseID }, function (data) {
                    if (data.IsSuccess == 1) {
                        $(".PraiseBtn[workid=" + _workID + "]").attr("praiseid", "").removeClass("select");
                        YQFunc.EventIdle = true;
                        Cmn.alert("取消点赞成功");

                    } else {
                        //登录判断
                        YQFunc.BackLogin(data);
                        YQFunc.EventIdle = true;
                    }

                });
            }
        });
    },
    CollectBtnBind: function () {
        $(".Inner").on("click", ".CollectBtn", function () {
            if (YQFunc.EventIdle) {
                YQFunc.EventIdle = false;
            } else {
                return;
            }
            //$(".CollectBtn").unbind("click").bind("click", function () {
            var _self = $(this);
            var _collectID = _self.attr("collectid");
            var _workID = _self.attr("workid");
            if (_collectID == "" || _collectID == undefined) {
                Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=AddCollect", { "WorkID": _workID }, function (data) {
                    if (data.IsSuccess == 1 && data.data[0]["CollectID"] != "") {
                        $(".CollectBtn[workid=" + _workID + "]").attr("collectid", data.data[0]["CollectID"]).addClass("select");
                        YQFunc.EventIdle = true;
                        Cmn.alert("收藏成功");
                    } else {
                        //登录判断
                        YQFunc.BackLogin(data);
                        YQFunc.EventIdle = true;
                    }

                });
            } else {
                Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=DelCollectByID", { "CollectID": _collectID }, function (data) {
                    if (data.IsSuccess == 1) {
                        $(".CollectBtn[workid=" + _workID + "]").attr("collectid", "").removeClass("select");
                        YQFunc.EventIdle = true;
                        Cmn.alert("取消收藏成功");
                    } else {
                        //登录判断
                        YQFunc.BackLogin(data);
                        YQFunc.EventIdle = true;
                    }

                });
            }
        });
    },
    FollowBtnBind: function () {
        $(".Inner1,.Inner3").on("click", ".icons-attention", function () {
            if (YQFunc.EventIdle) {
                YQFunc.EventIdle = false;
            } else {
                return;
            }
            //$(".icons-attention").unbind("click").bind("click", function () {
            var _self = $(this);
            //if ($(this).hasClass("select")) {
            //    Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=DelFollowByID", { "FollowedUserID": _self.attr("userid") }, function (data) {
            //        if (data.IsSuccess == 1) {
            //            _self.removeClass("select");
            //        }
            //    });

            //} else {
            Cmn.Ajax.PostData("/Itf/CSharp/Interface.aspx?method=AddFollow", { "FollowedUserID": _self.attr("userid") }, function (data) {
                if (data.IsSuccess == 1) {
                    //_self.addClass("select");
                    $(".icons-attention[userid=" + _self.attr("userid") + "]").hide().siblings(".icons-sprite").SgShow().attr("followid", data["FollowID"]);
                    //_self.hide().siblings().SgShow();
                    YQFunc.EventIdle = true;
                } else {
                    //登录判断
                    YQFunc.BackLogin(data);
                    YQFunc.EventIdle = true;
                }

            });
            //}
        });
    },
    GetFollowPraiseCollectState: function (Container, FollowedUserID, WorkID) {
        var _param = { FollowedUserID: FollowedUserID, WorkID: WorkID }
        Cmn.Ajax.PostData("/Itf/CSharp/Interface.aspx?method=GetFollowPraiseCollectState", _param, function (Statedata) {
            if (Statedata.IsSuccess == 1) {
                if (Statedata.data[0]["IsSelf"] == 0) {
                    if (Statedata.data[0]["FollowID"] == "") {
                        Container.find(".icons-attention").SgShow().siblings().hide();
                        Container.find(".contract-right").SgShow();
                    } else {
                        Container.find(".icons-attention").hide().next().SgShow().attr("followid", Statedata.data[0]["FollowID"]);
                        Container.find(".contract-right").SgShow();
                    }
                    Container.find(".contract-right .icon-trash").hide();
                } else {
                    Container.find(".contract-right .icons-sprite").hide();
                    Container.find(".contract-right .icon-trash").SgShow();
                }
                Container.find(".contract-right i").attr("workid", WorkID);


                if (Statedata.data[0]["PraiseID"] != "") {
                    Container.find(".PraiseBtn").attr({ "praiseid": Statedata.data[0]["PraiseID"], "workid": WorkID, "praisecount": Statedata.data[0]["PraiseCount"] }).addClass("select");
                }

                if (Statedata.data[0]["CollectID"] != "") {
                    Container.find(".CollectBtn").attr({ "collectid": Statedata.data[0]["CollectID"], "workid": WorkID, "colloctcount": Statedata.data[0]["ColloctCount"] }).addClass("select");
                }
                if (Statedata.data[0]["ReportID"] != "") {
                    Container.find(".report").attr("reportid", Statedata.data[0]["ReportID"]).css("visibility", "hidden");
                } else {
                    Container.find(".report").attr("reportid", Statedata.data[0]["ReportID"]).css("visibility", "visible");
                }

                Container.find(".PraiseBtn").attr({ "workid": WorkID, "praisecount": Statedata.data[0]["PraiseCount"] })
                Container.find(".CollectBtn").attr({ "workid": WorkID, "colloctcount": Statedata.data[0]["ColloctCount"] });
                Container.find(".ShareBtn").attr({ "workid": WorkID });

                Container.find(".avatar-left img").attr("src", Statedata.data[0]["HeadImgUrl"]);
                Container.find(".avatar-left span").html(Statedata.data[0]["NickName"]);
                YQFunc.GetSendTime(Container, Statedata.data[0]["SendTime"], Statedata.data[0]["cmn_CreateDate"]);


            } else {
                //登录判断
                YQFunc.BackLogin(Statedata);
            }

        });
    },
    GetCommentTop3: function (Container, WorkID) {
        Cmn.Ajax.PostData("/Itf/CSharp/Interface.aspx?method=GetCommentTop3ByWorkID", { WorkID: WorkID }, function (data1) {
            if (data1.IsSuccess == 1) {
                var _listHtml = "";
                for (var _j = 0; _j < data1.data.length; _j++) {
                    if (_j == 3) {
                        _listHtml += '<div class="more-comment CommentBtn" workid="' + WorkID + '">' +
                                   '<a href="javascript:void(0)" class="general-font">查看全部评论</a>' +
                                '</div>';
                        break;
                    }
                    //_listHtml += '<div class="list-desc" userid="' + data1.data[_j]["UserID"] + '">' +
                    //               '<span class="comment-face BtnToUser"><img src="' + data1.data[_j]["HeadImgUrl"] + '"></span>' +
                    //               '<em class="comment-name general-font center-vertical">' + data1.data[_j]["NickName"] + ':</em>' +
                    //'<strong class="comment-des general-font center-vertical">' + data1.data[_j]["Comment"] + '</strong>' +
                    //'</div>';
                    _listHtml += YQFunc.GetCommentHtml(data1.data[_j],true);

                }
                Container.find(".comment-list").append(_listHtml);
            } else {
                //登录判断
                YQFunc.BackLogin(data1);
            }

        });
    },
    GetComment: function (Container, WorkID) {
        Cmn.Ajax.PostData("/Itf/CSharp/Interface.aspx?method=GetCommentByWorkID", { WorkID: WorkID }, function (data1) {
            if (data1.IsSuccess == 1) {
                var _listHtml = "";
                var _j;
                for (_j = 0; _j < data1.data.length; _j++) {
                    _listHtml += YQFunc.GetCommentHtml(data1.data[_j],false);

                }
                Container.find(".comment-list").append(_listHtml);
            } else {
                //登录判断
                YQFunc.BackLogin(data1);
            }
        });
    },
    GetCommentHtml: function (data,isList) {
        return '<div class="list-desc" userid="' + data["UserID"] + '" commentid="' + data["CommentID"] + '">' +
                                   '<span class="comment-face BtnToUser"><img src="' + data["HeadImgUrl"] + '"></span>' +
                                   '<em class="comment-name general-font"><span>' + data["NickName"] + '</span>' + (data["ReplyUserName"] == "" || data["ReplyUserName"] == undefined ? "" : "回复" + data["ReplyUserName"]) + ':</em>' +
                    '<strong class="comment-des general-font ' + (isList ? "comment-msg" : "") + '">' + data["Comment"].replace(/\[em_([0-9|a-z|A-Z]*)\]/g, '<img src="images/em/$1.png" border="0" />') + '</strong>' +
                    '</div>';
    },

    GetWorkLabel: function (Container, WorkImgID) {
        Cmn.Ajax.PostData("/Itf/CSharp/Interface.aspx?method=GetWorkImgLabelByWorkImgID", { WorkImgID: WorkImgID }, function (data1) {
            if (data1.IsSuccess == 1) {
                var _listHtml = "";
                for (var _j = 0; _j < data1.data.length; _j++) {
                    //_listHtml += '<div class="choose-desc" style="top:' + data1.data[_j]["LabelTop"] + 'px;left:' + data1.data[_j]["LabelLeft"] + 'px">' +
                    //    '<div labelid="' + data1.data[_j]["LabelID"] + '" class="choose-desc-box' + (data1.data[_j]["Direction"] == "False" ? "" : " select") + '">' +
                    //    '<span class="attention-desc-text">' + data1.data[_j]["Contents"] + '</span>' +
                    //    '<b class="attention-arrow"></b>' +
                    //    '</div>' +
                    //    '<div class="choose-desc-round">' +
                    //    '<i class="round"></i>' +
                    //    '</div>' +
                    //    '</div>';

                    _listHtml += '<div class="set-label" style="top:' + data1.data[_j]["LabelTop"] + 'px;left:' + data1.data[_j]["LabelLeft"] + 'px">' +
                                        '<div class="choose-desc ' + (data1.data[_j]["Direction"] == "False" ? "tags-set" : "") + '">' +
                                            '<div labelid="' + data1.data[_j]["LabelID"] + '" class="choose-desc-box">' +
                                                '<span class="attention-desc-text">' + data1.data[_j]["Contents"] + '</span>' +
                                                '<b class="attention-arrow"></b>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="choose-desc-round">' +
                                            '<i class="round"></i>' +
                                        '</div>' +

                                        '<div class="choose-desc ' + (data1.data[_j]["Direction"] == "False" ? "" : "tags-set") + '">' +
                                            '<div labelid="' + data1.data[_j]["LabelID"] + '" class="choose-desc-box choose-desc-fr">' +
                                                '<span class="attention-desc-text">' + data1.data[_j]["Contents"] + '</span>' +
                                                '<b class="attention-arrow"></b>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>';


                }
                Container.find(".con-des").append(_listHtml);
            } else {
                //登录判断
                YQFunc.BackLogin(data1);
            }
        });
    },
    GetSendTime: function (Container, SendTime, CreateDate) {
        var _sendTime = SendTime;
        _sendTimetext = "";
        if (_sendTime < 60) {
            _sendTimetext = "刚刚";
        } else if (_sendTime < 3600) {
            _sendTimetext = (_sendTime / 60).toFixed(0) + "分钟前";
        } else if (_sendTime < 3600 * 24) {
            _sendTimetext = (_sendTime / 3600).toFixed(0) + "小时前";
        } else if (_sendTime < 3600 * 24 * 5) {
            _sendTimetext = (_sendTime / 3600 / 24).toFixed(0) + "天前";
        } else {
            _sendTimetext = CreateDate;
        }
        Container.find(".release-time").html(_sendTimetext);
    },
    CommentBtnBind: function () {
        $(".Inner1,.Inner2").on("click", ".CommentBtn", function () {
            _self = $(this);
            _workID = _self.parents(".con-box").attr("workid");

            //YQFunc.GetComment($(".DescMain"), _workID);
            //YQFunc.GetWorkImgAndLabelByWorkID(_workID);
            //YQFunc.GetFollowPraiseCollectState($(".DescMain"), _self.parents(".con-box").attr("userid"), _workID);
            //$(".DescMain .PraiseBtn").attr({ "praiseid": _self.parents(".con-nav").find(".PraiseBtn").attr("praiseid"), "workid": _self.attr("workid") });
            //$(".DescMain .CollectBtn").attr({ "praiseid": _self.parents(".con-nav").find(".CollectBtn").attr("collectid"), "workid": _self.attr("workid") });

            //$(".DescMain .con-tip").html(_self.parents(".con-box").find(".con-tip").html());
            //$(".DescMain .contract-right").show();
            //$(".DescMain .con-des").html(_self.parents(".con-box").find(".con-des").html());
            YQFunc.GetDesc(_workID, _self.parents(".con-box").attr("userid"));
            $(".DescMain").show();
            $(".DescMain").animate({ left: "0px" }, 500, function () {
                $(".MainList").hide();

            });
            $(".DescMain .comment-input").animate({ left: "0px" }, 500);
            $(".footer-box").animate({ bottom: "-115px" }, 100);
            SiteFunc.BackBtnBind(function () {
                $(".MainList").show();
                $(".DescMain").animate({ left: "640px" }, 500);
                $(".DescMain .comment-input").animate({ left: "640px" }, 500, function () {
                    $(".DescMain .con-des").remove();
                    $(".DescMain .comment-list").html("");
                    $(".DescMain").hide();
                });
                $(".footer-box").animate({ bottom: "0px" }, 100);
                SiteFunc.BackBtnBind();
            });
        });
    },
    DescCommentBtnBind: function () {
        $(".DescMain .CommentBtn").on("click", function () {
            //setTimeout(function () {
            $("#Comment_Input").focus();
            //}, 100);

        });
    },
    GetWorkImgAndLabelByWorkID: function (WorkID) {
        var _param = {
            WorkID: WorkID
        }
        CmnAjax.PostData("/Itf/CSharp/Interface.aspx?method=GetWorkImgAndLabelByWorkID", _param, function (data) {
            if (data.IsSuccess == 1) {

                for (var _i = 0; _i < data.data.length; _i++) {
                    var _html;
                    if ($(".DescMain .con-des[worlimgid=" + data.data[_i]["WorkImgID"] + "]").length == 0) {
                        _html = '<div class="con-des" worlimgid="' + data.data[_i]["WorkImgID"] + '">' +
                            '<img class="dat-PicPath-src" src="' + data.data[_i]["PicPath"] + '">' +
                            '</div>';
                        $(".DescMain .con-features").before(_html);
                    }
                    if (data.data[_i]["LabelID"] != "") {
                        //_html = '<div class="choose-desc"  workid="' + data.data[_i]["WorkID"] + '" style="top:' + data.data[_i]["LabelTop"] + 'px;left:' + data.data[_i]["LabelLeft"] + 'px">' +
                        //    '<div labelid="' + data.data[_i]["LabelID"] + '" class="choose-desc-box' + (data.data[_i]["Direction"] == "False" ? "" : " select") + '">' +
                        //    '<span class="attention-desc-text">' + data.data[_i]["Contents"] + '</span>' +
                        //    '<b class="attention-arrow"></b>' +
                        //    '</div>' +
                        //    '<div class="choose-desc-round">' +
                        //    '<i class="round"></i>' +
                        //    '</div>' +
                        //    '</div>';

                        _html = '<div class="set-label" style="top:' + data.data[_i]["LabelTop"] + 'px;left:' + data.data[_i]["LabelLeft"] + 'px">' +
                                       '<div class="choose-desc ' + (data.data[_i]["Direction"] == "False" ? "tags-set" : "") + '">' +
                                           '<div labelid="' + data.data[_i]["LabelID"] + '" class="choose-desc-box">' +
                                               '<span class="attention-desc-text">' + data.data[_i]["Contents"] + '</span>' +
                                               '<b class="attention-arrow"></b>' +
                                           '</div>' +
                                       '</div>' +
                                       '<div class="choose-desc-round">' +
                                           '<i class="round"></i>' +
                                       '</div>' +

                                       '<div class="choose-desc ' + (data.data[_i]["Direction"] == "False" ? "" : "tags-set") + '">' +
                                           '<div labelid="' + data.data[_i]["LabelID"] + '" class="choose-desc-box choose-desc-fr">' +
                                               '<span class="attention-desc-text">' + data.data[_i]["Contents"] + '</span>' +
                                               '<b class="attention-arrow"></b>' +
                                           '</div>' +
                                       '</div>' +
                                   '</div>';
                        $(".DescMain .con-des[worlimgid=" + data.data[_i]["WorkImgID"] + "]").append(_html);
                    }


                }
            } else {
                //登录判断
                YQFunc.BackLogin(data);
            }
        });
    },
    GetDesc: function (WorkID, UserID) {
        $(".DescMain .desc-box").attr("workid", WorkID);
        $(".DescMain .con-box").attr("workid", WorkID);
        $(".DescMain .BtnToUser").parent().attr("userid", UserID);
        YQFunc.GetComment($(".DescMain"), WorkID);
        YQFunc.GetWorkImgAndLabelByWorkID(WorkID);
        YQFunc.GetFollowPraiseCollectState($(".DescMain"), UserID, WorkID);
    },
    BackLogin: function (data) {
        if (data.ErrMsg == "用户未登录") {

            Cmn.alert("用户未登录");
            location.href = "index.aspx";
        }
    }


}

var cursor = 0; // 光标位置  
document.onselectionchange = function () {
    var range = document.selection.createRange();
    var srcele = range.parentElement();//获取到当前元素
    var copy = document.body.createTextRange();
    copy.moveToElementText(srcele);

    for (cursor = 0; copy.compareEndPoints("StartToStart", range) < 0; cursor++) {
        copy.moveStart("character", 1);//改变光标位置，实际上我们是在记录cursor的数量.
    }
}
function moveEnd(obj) {

    $("#Comment_Input").focus();
    var r = document.selection.createRange();
    //因为这里死从当前光标开始移动的(好像文本框的是从0算起.)所以我们需要拿到当前光标位置，然后就可以计算出要移动多少位了，这样就可以把光标移动到想要的位置了
    r.moveStart('character', $("#Comment_Input").innerText.length - cursor);
    r.collapse(true);
    r.select();
}


