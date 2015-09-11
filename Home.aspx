<%@ Page Title="" Language="C#" MasterPageFile="~/master/YuQianMaster.master" AutoEventWireup="true" CodeFile="Home.aspx.cs" Inherits="Home" %>

<%@ MasterType VirtualPath="~/master/YuQianMaster.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="Js/SiteJs/Home.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="Wrap">
        <div class="Main">
            <!--首页-->
            <div class="home" id="home">
                <!--<div class="Bg"><img  src="images/load.png" lazypath="images/bg/home_bg.jpg" /></div>-->
                <div class="Inner Inner1" style="height: 100%;overflow: scroll">
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
                        <div class="carousel-click">
                            <a href="javascript:void(0)"></a>
                            <a href="javascript:void(0)"></a>
                            <a href="javascript:void(0)"></a>
                        </div>
                    </div>
                    <div class="desc-box hot_box">
                        <div class="tip-box">
                            <!--选中添加select-->
                            <div class="topics-btn tabs-btn select"><a href="javascript:void(0)">最新话题</a></div>
                            <div class="concern-btn tabs-btn"><a href="javascript:void(0)">我的关注</a></div>
                        </div>
                        <div class="con-box con-home-box">
                            <div class="con-tip">
                                <div class="avatar-left">
                                    <p>
                                        <img class="dat-HeadImgUrl-src" src="images/master-img.png" />
                                    </p>
                                    <span class="publisher general-font dat-UserName">Alex Tan</span>
                                    <em class="release-time">1小时前</em>
                                </div>
                                <div class="contract-right">
                                    <!--点击查看详情添加select(没关注好友)-->
                                    <i class="icons-attention icons-sprite dat-UserID-userid"></i>
                                    <!--关注好友后下面icon显示-->
                                    <i class="icons-ok icons-sprite dat-UserID-userid"></i>
                                </div>
                            </div>
                            <div class="con-item">
                                <div class="con-des">
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
                                        <li><a href="javascript:void(0)" class="btn-sprite"></a></li>
                                        <li><a href="javascript:void(0)" class="btn-sprite"></a></li>
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
                <div class="Inner Inner2" style="display: none;height: 100%;overflow: scroll">
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
                        <div class="carousel-click">
                            <a href="javascript:void(0)"></a>
                            <a href="javascript:void(0)"></a>
                            <a href="javascript:void(0)"></a>
                        </div>
                    </div>
                    <div class="desc-box follow_box">
                        <div class="tip-box">
                            <!--选中添加select-->
                            <div class="topics-btn tabs-btn"><a href="javascript:void(0)">最新话题</a></div>
                            <div class="concern-btn tabs-btn select"><a href="javascript:void(0)">我的关注</a></div>
                        </div>
                        <div class="con-box con-home-box">
                            <div class="con-tip">
                                <div class="avatar-left">
                                    <p>
                                        <img class="dat-HeadImgUrl-src" src="images/master-img.png" />
                                    </p>
                                    <span class="publisher general-font dat-UserName">Alex Tan</span>
                                    <em class="release-time">1小时前</em>
                                </div>
                                <div class="contract-right">
                                    <!--点击查看详情添加select(没关注好友)-->
                                    <i class="icons-attention icons-sprite dat-UserID-userid"></i>
                                    <!--关注好友后下面icon显示-->
                                    <i class="icons-ok icons-sprite dat-UserID-userid"></i>
                                </div>
                            </div>
                            <div class="con-item">
                                <div class="con-des">
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
                                        <li><a href="javascript:void(0)" class="btn-sprite"></a></li>
                                        <li><a href="javascript:void(0)" class="btn-sprite"></a></li>
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
    </div>
    <!--Wrap_end-->
    <!---------------浮层-------------------->
    <div class="pop-float">
        <!-----------发布成功浮层---------->
        <div class="success-float">
            <div class="success-arrow">
                <img src="images/load.png" lazypath="images/success-arrow.png" />
            </div>
            <div class="success-tip">发布成功</div>
            <div class="success-desc">
                <p>自己看，还不够？</p>
                <p>试试分享吧！</p>
            </div>
        </div>
        <!-------修改个人信息浮层-------->
        <div class="info-float">
            <!-----------性别-------------->
            <div class="gender-box">
                <div class="gender-man">
                    <a href="javascript:void(0)">
                        <i class="set-man"></i>
                        <span>男</span>
                    </a>
                </div>
                <div class="gender-wonmen">
                    <a href="javascript:void(0)">
                        <i class="set-wonmen"></i>
                        <span>女</span>
                    </a>
                </div>
            </div>
            <!-----------个性签名-------------->
            <div class="signature-box">
                <div class="signature-con">
                    <textarea>输入你的个人简介</textarea>
                </div>
                <div class="float-close-btn"><a href="javascript:void(0)"><i class="icon-remove"></i></a></div>
            </div>
            <!-----------填写姓名-------------->
            <div class="fill-name-box">
                <div class="fill-name-con">
                    <input type="text" name="请输入姓名" placeholder="请输入姓名" />
                </div>
                <p class="">听说酷炫的名字与你更配哟!</p>
            </div>
            <div class="float-submit-btn"><a href="javascript:void(0)">确定</a></div>
            <div class="float-close-btn"><a href="javascript:void(0)"></a></div>
        </div>
        <!-------登陆-------->
        <div class="land-float">
            <h1 class="tip-box">与中国美的不期而遇</h1>
            <div class="land-box info-box">
                <input type="text" name="" placeholder="请输入您的手机号" class="land-phone pub-input" />
                <input type="password" name="" placeholder="请输入您的密码" class="land-password pub-input" />
                <button class="">登录</button>
                <a href="javascript:void(0)" class="forget-password">忘记密码？</a>
            </div>
        </div>
        <!-------注册-------->
        <div class="register-float">
            <h1 class="tip-box">注册账号</h1>
            <div class="register-box info-box">
                <input type="text" name="" placeholder="手机号 / 只适用中国大陆手机号" class="register-phone pub-input" />
                <input type="password" name="" placeholder="6-14位密码、建议数字、字母、符号" class="register-password pub-input" />
                <input type="text" name="" placeholder="输入验证码" class="register-code pub-input code-box" /><span class="code-time code-box">60s</span>
                <a href="javascript:void(0)" class="pub-input get-code">获取验证码</a>
                <button class="">注&nbsp;&nbsp;&nbsp;&nbsp;册</button>
            </div>
        </div>
        <!-------注册完成-------->
        <div class="register-finish-float">
            <h1 class="tip-box">注册完成</h1>
            <small>请完善你的个人基本信息</small>
            <div class="register-finish-box info-box">
                <input type="text" name="" placeholder="李小冉" class="register-phone pub-input" />
                <!-------验证用户名是否被用-------->
                <em class="verify-name">
                    <i class="icon-ok correct validation"></i>
                    <i class="icon-remove validation error"></i>
                </em>
                <p class="sex-select">
                    <!-------选中男女span标签添加select-------->
                    <span class="select"><i>男</i><a href="javascript:void(0)" class="sex-man"></a></span>
                    <span><i>女</i><a href="javascript:void(0)" class="sex-wonmen"></a></span>
                </p>
                <button class="">完&nbsp;&nbsp;&nbsp;&nbsp;成</button>
            </div>
        </div>
        <!-------重置密码-------->
        <div class="reset-password-float">
            <h1 class="tip-box">重设密码</h1>
            <div class="reset-password-box info-box">
                <input type="text" name="" placeholder="请输入您的新密码" class="reset-password pub-input" />
                <input type="password" name="" placeholder="请确认您的新密码" class="reset-password pub-input" />
                <button class="">完&nbsp;&nbsp;&nbsp;&nbsp;成</button>
            </div>
        </div>
        <!-------验证身份-------->
        <div class="verify-identity-float">
            <h1 class="tip-box">验证身份</h1>
            <div class="verify-identity-box info-box">
                <input type="text" name="" placeholder="手机号 / 只适用中国大陆手机号" class="register-phone pub-input" />
                <input type="text" name="" placeholder="输入验证码" class="register-code pub-input code-box code-identity" /><span class="code-time code-box">60s</span>
                <a href="javascript:void(0)" class="pub-input get-code id-code">获取验证码</a>
                <button class="">下一步</button>
            </div>
        </div>

    </div>

</asp:Content>

