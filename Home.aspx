<%@ Page Title="" Language="C#" MasterPageFile="~/master/YuQianMaster.master" AutoEventWireup="true" CodeFile="Home.aspx.cs" Inherits="Home" %>

<%@ MasterType VirtualPath="~/master/YuQianMaster.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="Js/SiteJs/Home.js"></script>
    <style>
        .Wrap{overflow: hidden}
        .DescMain { left: 640px;background-color: #fff;z-index: 25}
        .DescMain .list .list-box .comment-input {left: 640px}
        .DescMain .Inner {overflow: scroll}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="Wrap">
        <div class="Main MainList">
            <!--首页-->
            <div class="home" id="home">
                <!--<div class="Bg"><img  src="images/load.png" lazypath="images/bg/home_bg.jpg" /></div>-->
                <div class="Inner Inner1 home-inner">
                    <div class="carousel-box">
                        <div class="carousel-bar">
                            <ul class="carousel-nav">
                                <li><a href="javascript:void(0)">
                                    <img src="images/home-img.png" /></a></li>
                                <li><a href="javascript:void(0)">
                                    <img src="images/home-img.png" /></a></li>
                                <li><a href="javascript:void(0)">
                                    <img src="images/home-img.png" /></a></li>
                            </ul>
                        </div>
                        <div class="carousel-click" style="z-index:20">
                           
                        </div>
                    </div>
                    <div class="desc-box hot_box">
                        <div class="tip-box">
                            <!--选中添加select-->
                            <div class="topics-btn tabs-btn select"><a href="javascript:void(0)">最新话题</a></div>
                            <div class="concern-btn tabs-btn"><a href="javascript:void(0)">我的关注</a></div>
                        </div>
                        <div class="con-box con-home-box dat-UserID-userid dat-WorkID-workid">
                            <div class="con-tip">
                                <div class="avatar-left">
                                    <p>
                                        <img class="dat-HeadImgUrl-src" src="images/master-img.png" />
                                    </p>
                                    <span class="publisher general-font dat-NickName"></span>
                                    <em class="release-time"></em>
                                </div>
                                <div class="contract-right" style="display: none">
                                    <!--点击查看详情添加select(没关注好友)-->
                                    <i class="icons-attention icons-sprite dat-UserID-userid"></i>
                                    <!--关注好友后下面icon显示-->
                                    <i class="icons-ok icons-sprite dat-UserID-userid"></i>
                                     <!--我发布下面icon显示-->
                                    <i class="icon-trash"></i>
                                </div>
                            </div>
                            <div class="con-item">
                                <div class="con-des CommentBtn">
                                    <img class="dat-PicPath-src" src="images/master-img-1.png" />
                                    <%-- <div class="choose-desc">
                                        <!--添加select变换箭头角度-->
                                        <div class="choose-desc-box">
                                            <span class="attention-desc-text">辛MM的中国范</span>
                                            <b class="attention-arrow"></b>
                                        </div>
                                        <div class="choose-desc-round">
                                            <i class="round"></i>
                                        </div>
                                    </div>--%>
                                </div>
                                <div class="con-features">
                                    <ul class="con-nav">
                                        <li><a href="javascript:void(0)" class="btn-sprite PraiseBtn dat-PraiseCount-praisecount dat-WorkID-workid"></a></li>
                                        <li><a href="javascript:void(0)" class="btn-sprite CollectBtn dat-ColloctCount-colloctcount dat-WorkID-workid"></a></li>
                                        <li><a href="javascript:void(0)" class="btn-sprite CommentBtn"></a></li>
                                        <li><a href="javascript:void(0)" class="btn-sprite ShareBtn dat-WorkID-workid"></a></li>
                                    </ul>
                                </div>
                                <div class="comment-list">
                                    <!--list-desc为一条评论信息-->
                                    <%-- <div class="list-desc">
                                        <span class="comment-face"><img  src="images/master-img-1.png" /></span>
                                        <em class="comment-name general-font center-vertical">章三道:</em>
                                        <strong class="comment-des general-font center-vertical">过法国风格放大</strong>
                                    </div>
                                    <div class="more-comment">
                                        <a href="listdesc.html" class="general-font">查看全部评论</a>
                                    </div>--%>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="Inner Inner2 home-inner" style="display:none;">
                    <div class="carousel-box">
                        <div class="carousel-bar">
                            <ul class="carousel-nav">
                                <li><a href="javascript:void(0)">
                                    <img src="images/home-img.png" /></a></li>
                                <li><a href="javascript:void(0)">
                                    <img src="images/home-img.png" /></a></li>
                                <li><a href="javascript:void(0)">
                                    <img src="images/home-img.png" /></a></li>
                            </ul>
                        </div>
                        <div class="carousel-click" style="z-index:20">
                           
                        </div>
                    </div>
                    <div class="desc-box follow_box">
                        <div class="tip-box">
                            <!--选中添加select-->
                            <div class="topics-btn tabs-btn"><a href="javascript:void(0)">最新话题</a></div>
                            <div class="concern-btn tabs-btn select"><a href="javascript:void(0)">我的关注</a></div>
                        </div>
                        <div class="con-box con-home-box dat-UserID-userid dat-WorkID-workid">
                            <div class="con-tip">
                                <div class="avatar-left">
                                    <p>
                                        <img class="dat-HeadImgUrl-src" src="images/master-img.png" />
                                    </p>
                                    <span class="publisher general-font dat-NickName"></span>
                                    <em class="release-time"></em>
                                </div>
                               <div class="contract-right" style="display: none">
                                    <!--点击查看详情添加select(没关注好友)-->
                                    <i class="icons-attention icons-sprite dat-UserID-userid"></i>
                                    <!--关注好友后下面icon显示-->
                                    <i class="icons-ok icons-sprite dat-UserID-userid"></i>
                                     <!--我发布下面icon显示-->
                                    <i class="icon-trash"></i>
                                </div>
                            </div>
                            <div class="con-item">
                                <div class="con-des CommentBtn">
                                    <img class="dat-PicPath-src" src="images/master-img-1.png" />
                                    <%-- <div class="choose-desc">
                                        <!--添加select变换箭头角度-->
                                        <div class="choose-desc-box">
                                            <span class="attention-desc-text">辛MM的中国范</span>
                                            <b class="attention-arrow"></b>
                                        </div>
                                        <div class="choose-desc-round">
                                            <i class="round"></i>
                                        </div>
                                    </div>--%>
                                </div>
                                <div class="con-features">
                                    <ul class="con-nav">
                                        <li><a href="javascript:void(0)" class="btn-sprite PraiseBtn dat-PraiseID-praiseid dat-WorkID-workid"></a></li>
                                        <li><a href="javascript:void(0)" class="btn-sprite CollectBtn dat-CollectID-collectid dat-WorkID-workid"></a></li>
                                        <li><a href="javascript:void(0)" class="btn-sprite CommentBtn"></a></li>
                                        <li><a href="javascript:void(0)" class="btn-sprite ShareBtn dat-WorkID-workid"></a></li>
                                    </ul>
                                </div>
                                <div class="comment-list">
                                    <!--list-desc为一条评论信息-->
                                    <%-- <div class="list-desc">
                                        <span class="comment-face"><img  src="images/master-img-1.png" /></span>
                                        <em class="comment-name general-font center-vertical">章三道:</em>
                                        <strong class="comment-des general-font center-vertical">过法国风格放大</strong>
                                    </div>
                                    <div class="more-comment">
                                        <a href="listdesc.html" class="general-font">查看全部评论</a>
                                    </div>--%>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        <!--Main_end-->
        
        <div class="Main DescMain" style="display:none">
            <!--首页-->
            <div class="list" id="list">
                <!--<div class="Bg"><img  src="images/load.png" lazypath="images/bg/home_bg.jpg" /></div>-->
                <div class="Inner">
                    <div class="desc-box list-box">
                        <div class="con-bar con-box">
                            <div class="con-tip">
                                <div class="avatar-left">
                                    <p><img  src="images/master-img.png" /></p>
                                    <span class="publisher general-font"></span>
                                    <em class="release-time"></em>
                                </div>
                                <div class="contract-right">
                                    <!--点击查看详情添加select(没关注好友)-->
                                    <i class="icons-attention icons-sprite"></i>
                                    <!--关注好友后下面icon显示-->
                                    <i class="icons-ok icons-sprite"></i>
                                    <!--我发布下面icon显示-->
                                    <i class="icon-trash"></i>
                                </div>
                            </div>
                            <div class="con-item">
                               <%-- <div class="con-des">
                                    <img  src="images/master-img-1.png" />
                                    <div class="choose-desc">
                                        <span class="attention-desc-text">辛MM的中国范</span>
                                        <b class="attention-arrow"></b>
                                        <i class="round"></i>
                                    </div>
                                </div>--%>
                                <div class="con-features">
                                    <ul class="con-nav">
                                        <li><a href="javascript:void(0)" class="btn-sprite PraiseBtn"></a></li>
                                        <li><a href="javascript:void(0)" class="btn-sprite CollectBtn"></a></li>
                                        <li><a href="javascript:void(0)" class="btn-sprite CommentBtn"></a></li>
                                        <li><a href="javascript:void(0)" class="btn-sprite ShareBtn"></a></li>
                                    </ul>
                                </div>
                                <div class="comment-list">
                                    <!--list-desc为一条评论信息-->
                                    <%--<div class="list-desc">
                                        <span class="comment-face"><img  src="images/master-img-1.png" /></span>
                                        <em class="comment-name general-font center-vertical">章三道:</em>
                                        <strong class="comment-des general-font center-vertical">过法国风格放大</strong>
                                    </div>--%>
                                   
                                </div>
                            </div>
                        </div>
                        <div class="report"><a href="javascript:void(0)" class="general-font">举报</a></div>
                        <div class="comment-input">
                            <span class="expression icons-sprite"></span>
                            <input type="text" placeholder="" name=""/>
                            <button class="reviews-btn general-font">评论</button>
                        </div>
                    </div>
                </div>
            </div>

        </div><!--Main_end-->
    </div>
    <!--Wrap_end-->
  
</asp:Content>

