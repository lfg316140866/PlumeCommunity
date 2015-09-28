<%@ Page Title="" Language="C#" MasterPageFile="~/master/YuQianMaster.master" AutoEventWireup="true" CodeFile="Recommend.aspx.cs" Inherits="Recommend" %>
<%@ MasterType VirtualPath="~/master/YuQianMaster.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="Js/animate/AnimateMan.js"></script>
    <script src="Js/animate/ScenesSwitch.js"></script>
    <script src="Js/animate/Scenes.js"></script>
    <script src="Js/animate/AnimateFrame.js"></script>
    <script src="Js/animate/BasAnimate.js"></script>
    <script src="Js/Public.js"></script>
    <script src="Js/SiteJs/SiteFunc.js"></script>
    <script src="Js/SiteJs/Recommendindex.js"></script>
    <script src="Js/SiteJs/Recommend.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="Wrap cmn-AnimteFrameContainer">
        <div class="Main cmn-ScenesContainer">
            <!--推荐-->
            <div class="cmn-Scenes PublicScenes recommend" id="recommend" style="display:block">
                <!--<div class="Bg"><img  src="images/load.png" lazypath="images/bg/recommend_bg.jpg" /></div>-->
                <div class="Inner">
                    <div class="recommend-tip"><h3>你可能感兴趣的人</h3></div>
                    <div class="attention-box JscRecommendBox">
                        <!--attention-bar为一条达人信息-->
                        <div wid="" uid="" class="attention-bar JscRecommendOne dat-WorkID-wid dat-UserID-uid">
                            <div class="attention-con">
                                <img class="JscUserUploadImg dat-PicPath-src" src="images/load.png" lazypath="images/master-img.png" />
                            </div>
                           <%-- btn-sprite <div class="set-label JscLableChange">
                                        <div class="choose-desc">
                                            <div class="choose-desc-box">
                                                <span class="attention-desc-text JscLableTest">辛MM的中国范</span>
                                                <b class="attention-arrow"></b>
                                            </div>
                                        </div>
                                        <div class="choose-desc-round">
                                            <i class="drop"></i>
                                        </div>

                                        <div class="choose-desc tags-set">
                                            <div class="choose-desc-box choose-desc-fr">
                                                <span class="attention-desc-text JscLableTest">辛MM的中国范</span>
                                                <b class="attention-arrow"></b>
                                            </div>
                                        </div>
                                    </div>--%>
                            <div class="attention-footer">
                                <div class="attention-footer-user">
                                    <span usid="" class="user-avatar JscUidJump dat-UserID-usid"><img class="JscUserHeadImg dat-HeadImgUrl-src" src="images/load.png" lazypath="images/master-img.png" /></span>
                                    <strong class="master-name general-font center-vertical JscUserNameTest dat-NickName">Jennyioers</strong>
                                </div>
                                <div class="attention-footer-number">
                                    <i class="icons-edits icons-sprite"></i>
                                    <em class="edit-number general-font center-vertical JscUserWorkCount dat-WorkCount">35</em>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="skip-btn"><a class="general-font" href="Home.aspx">跳过</a></div>
                    <div class="attention-btn JscAttentionBtn"><a class="btn-sprite" href="javascript:void(0)"></a></div>
                </div>
            </div>
             <!--登陆-->
            <div class="cmn-Scenes PublicScenes land" id="land" style="display:none">
                <div class="Bg"><img  src="images/load.png" lazypath="images/bg/land_bg.jpg" /></div>
                <div class="Inner JscHideMenu">
                    <div class="logo"><img  src="images/load.png" lazypath="images/logo.png" /></div>
                    <div class="line"><img  src="images/load.png" lazypath="images/line.png" /></div>
                    <div class="landed-btn JscHomeLogonBtn"><a href="javascript:void(0)">登录</a></div>
                    <div class="register-btn JscHomeRegisterBtn"><a href="javascript:void(0)">注册</a></div>
                    <div class="more-land">
                        <ul class="more-land-nav">
                            <li><a href="javascript:void(0)" class="btn-sprite"></a></li>
                            <li><a href="javascript:void(0)" class="btn-sprite"></a></li>
                            <li><a href="javascript:void(0)" class="btn-sprite"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div><!--Main_end-->
    </div><!--Wrap_end-->
    <!---------------顶部菜单-------------------->
    <div class="header-box" style="display:none">
        <div class="return-btn  JscReturnIndex"><a href="javascript:void(0)"><i class="icons-return icons-sprite"></i></a></div>
    </div>

    <!---------------浮层-------------------->
    <div class="pop-float JscFloatAll">
        <!-----------发布成功浮层---------->
        <div class="success-float JscFloatAllHide">
            <div class="success-arrow"><img  src="images/load.png" lazypath="images/success-arrow.png" /></div>
            <div class="success-tip"><img  src="images/load.png" lazypath="images/success-tip.png" /></div>
            <div class="success-text"><img  src="images/load.png" lazypath="images/success-text.png" /></div>
        </div>
        <!-------修改个人信息浮层-------->
        <div class="info-float JscFloatAllHide">
            <!-----------性别-------------->
            <div class="gender-box">
                <div class="gender-man">
                    <a  href="javascript:void(0)">
                        <i class="set-man icons-sprite"></i>
                        <span>男</span>
                    </a>
                </div>
                <div class="gender-wonmen">
                    <a  href="javascript:void(0)">
                        <i class="set-wonmen icons-sprite"></i>
                        <span>女</span>
                    </a>
                </div>
            </div>
            <!-----------个性签名-------------->
            <div class="signature-box">
                <div class="signature-con">
                    <textarea>输入你的个人简介</textarea>
                </div>
                <div class="float-close-btn"><a  href="javascript:void(0)" class="btn-sprite"></a></div>
            </div>
            <!-----------填写姓名-------------->
            <div class="fill-name-box">
                <div class="fill-name-con">
                    <input type="text" name="请输入姓名" placeholder="请输入姓名"/>
                </div>
                <p class="">听说酷炫的名字与你更配哟!</p>
            </div>
            <div class="float-submit-btn"><a  href="javascript:void(0)">确定</a></div>
            <div class="float-close-btn"><a  href="javascript:void(0)" class="btn-sprite"></a></div>
        </div>
        <!-------登陆-------->
        <div class="land-float JscLogonFloat JscFloatAllHide">
            <h1 class="tip-box">与中国美的不期而遇</h1>
            <div class="land-box info-box">
                <input type="tel" maxlength="11" name="" placeholder="请输入您的手机号" class="land-phone pub-input JscLogonPhoneText"/>
                <input type="password" name="" placeholder="请输入您的密码" class="land-password pub-input JscLogonPassWordText"/>
                <button class="JscLogonBtn">登录</button>
                <a href="javascript:void(0)" class="forget-password JscForgetHref">忘记密码？</a>
            </div>
        </div>
        <!-------注册-------->
        <div class="register-float JscRegisterFloat JscFloatAllHide">
            <h1 class="tip-box">注册账号</h1>
            <div class="register-box info-box">
                <input type="tel" maxlength="11" name="" placeholder="手机号 / 只适用中国大陆手机号" class="register-phone pub-input JscRegisterPhoneText"/>
                <input type="password" maxlength="14" name="" placeholder="6-14位密码、建议数字、字母、符号" class="register-password pub-input JscRegisterPassWordText"/>
                <input type="tel" maxlength="6" name="" placeholder="输入验证码" class="register-code pub-input code-box JscRegisterVerificationText"/><span class="code-time code-box JscRegisterTimeText">60s</span>
                <a href="javascript:void(0)" class="pub-input get-code JscRegisterGetVerificationeHref">获取验证码</a>
                <button class="JscRegisterBtn">注&nbsp;&nbsp;&nbsp;&nbsp;册</button>
            </div>
        </div>
        <!-------注册完成-------->
        <div class="register-finish-float JscInformationFloat JscFloatAllHide">
            <h1 class="tip-box">注册完成</h1>
            <small>请完善你的个人基本信息</small>
            <div class="register-finish-box info-box">
                <input type="text" name="" placeholder="输入您的昵称" class="register-phone pub-input JscInformationNameText"/>
                <!-------验证用户名是否被用-------->
                <em class="verify-name JscISInformationNameText">
                    <i class="icon-ok correct validation JscvalidationLable"></i>
                    <i class="icon-remove validation error JscvalidationErrorLable"></i>
                </em>
                <p class="sex-select ">
                    <!-------选中男女span标签添加select-------->
                    <span class="select JscSexSelect"><i>男</i><a href="javascript:void(0)" class="sex-man icons-sprite"></a></span>
                    <span class="JscSexSelect"><i>女</i><a href="javascript:void(0)" class="sex-wonmen icons-sprite"></a></span>
                </p>
                <button class="JscInformationBtn">完&nbsp;&nbsp;&nbsp;&nbsp;成</button>
            </div>
        </div>
        <!-------重置密码-------->
        <div class="reset-password-float JscResetPasswordFloat JscFloatAllHide">
            <h1 class="tip-box">重设密码</h1>
            <div class="reset-password-box info-box">
                <input type="password" maxlength="14" name="" placeholder="请输入您的新密码" class="reset-password pub-input JscPasswordText"/>
                <input type="password" maxlength="14" name="" placeholder="请确认您的新密码" class="reset-password pub-input JscConfirmText"/>
                <button class="JscResetPasswordBtn">完&nbsp;&nbsp;&nbsp;&nbsp;成</button>
            </div>
        </div>
        <!-------验证身份-------->
        <div class="verify-identity-float JscForgotPasswordFloat JscFloatAllHide">
            <h1 class="tip-box">验证身份</h1>
            <div class="verify-identity-box info-box">
                <input type="tel" maxlength="11" name="" placeholder="手机号 / 只适用中国大陆手机号" class="register-phone pub-input JscForgotPasswordText"/>
                <input type="tel" name="" maxlength="6" placeholder="输入验证码" class="register-code pub-input code-box code-identity JscVerificationText"/><span class="code-time code-box JscForgotPasswordTime">60s</span>
                <a href="javascript:void(0)" class="pub-input get-code id-code JscGetVerification">获取验证码</a>
                <button class="JscNextBtn">下一步</button>
            </div>
        </div>
        <!-------问答提交-------->
        <div class="answers-float JscFloatAllHide">
            <p class="general-font">感谢您的宝贵意见</p>
            <div class="float-submit-btn"><a  href="javascript:void(0)">确定</a></div>
        </div>
    </div>


</asp:Content>

