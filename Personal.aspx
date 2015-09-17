<%@ Page Title="" Language="C#" MasterPageFile="~/master/YuQianMaster.master" AutoEventWireup="true" CodeFile="Personal.aspx.cs" Inherits="Personal" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="Js/SiteJs/SiteFunc.js"></script>
    <script src="Js/SiteJs/InformationThrows.js"></script>
    <script src="Js/SiteJs/PersonalInfoEditor.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="Wrap">
        <div class="Main">
            <!--个人-->
            <div class="individual" id="individual">
                <!--<div class="Bg"><img  src="images/load.png" lazypath="images/bg/individual_bg.jpg" /></div>-->
                <div class="Inner JscInnerOne">
                    <div class="indal-box">
                        <div class="indal-bg ">
                            <img class="JscBgImg" src="images/individual-box.png" alt="" /></div>
                        <div class="indal-top">
                            <div class="indal-fans">
                                <em class="fans-attion general-font pub-indal">粉丝</em>
                                <span class="number pub-indal JscFollowedCount">888</span>
                            </div>
                            <div class="indal-portrait ">
                                <p class="portrait JscUserImg">
                                    <img src="images/personal-img.png" alt="" /></p>
                                <i class="icon-tagss JscTalentLable">C</i>
                            </div>
                            <div class="indal-attention">
                                <em class="fans-attion general-font pub-indal">关注</em>
                                <span class="number pub-indal JscFollowCount">36</span>
                            </div>
                        </div>
                        <div class="indal-body">
                            <div class="indal-info">
                                <!--如果性别是女的话i标签添加select-->
                                <div class="indal-name "><span class="JscUserName">Dave</span> <i class="indal-sex icons-sprite JscUserSexs"></i></div>
                                <div class="indal-career JscProfession">自由撰稿人</div>
                            </div>
                            <p class="signatures JscSignature">没有什么不可能的</p>
                        </div>
                        <!--个人-->
                        <div class="personal-btn JscEditInformationBtn">
                            <a href="javascript:void(0)">编辑</a>
                        </div>
                        <!--他人-->
                        <div class="others-btn">
                            <a href="javascript:void(0)" class="icons-sprite"></a>
                        </div>
                    </div>
                    <!--他人的时候隐藏-->
                    <div class="indal-btn">
                        <div class="personal-ford JscCollectBtn"><a href="javascript:void(0)" class="btn-sprite"></a><span class="general-font JscColloctCount">105</span></div>
                        <div class="personal-coll JscReleaseBtn"><a href="javascript:void(0)" class="btn-sprite"></a><span class="general-font JscWorkCount">55</span></div>
                    </div>
                    <div class="indal-con">
                        <ul class="indal-nav JscPhotoBoxOne">
                            <li class="JscPhotoOne dat-WorkID-cid" cid=""><a href="javascript:void(0)">
                                <img class="dat-PicPath-src" src="images/personal-img.png" alt="" /></a></li>
                        </ul>
                    </div>
                </div>
                <div class="Inner JscInnerTwo" style="display: none">
                    <div class="indal-box">
                        <div class="indal-bg ">
                            <img class="JscBgImg" src="images/individual-box.png" alt="" /></div>
                        <div class="indal-top">
                            <div class="indal-fans">
                                <em class="fans-attion general-font pub-indal">粉丝</em>
                                <span class="number pub-indal JscFollowedCount">888</span>
                            </div>
                            <div class="indal-portrait ">
                                <p class="portrait JscUserImg">
                                    <img src="images/personal-img.png" alt="" /></p>
                                <i class="icon-tagss JscTalentLable">C</i>
                            </div>
                            <div class="indal-attention">
                                <em class="fans-attion general-font pub-indal">关注</em>
                                <span class="number pub-indal JscFollowCount">36</span>
                            </div>
                        </div>
                        <div class="indal-body">
                            <div class="indal-info">
                                <!--如果性别是女的话i标签添加select-->
                                <div class="indal-name "><span class="JscUserName">Dave</span> <i class="indal-sex icons-sprite JscUserSexs"></i></div>
                                <div class="indal-career JscProfession">自由撰稿人</div>
                            </div>
                            <p class="signatures JscSignature">没有什么不可能的</p>
                        </div>
                        <!--个人-->
                        <div class="personal-btn JscEditInformationBtn">
                            <a href="javascript:void(0)">编辑</a>
                        </div>
                        <!--他人-->
                        <div class="others-btn">
                            <a href="javascript:void(0)" class="icons-sprite"></a>
                        </div>
                    </div>
                    <!--他人的时候隐藏-->
                    <div class="indal-btn">
                        <div class="personal-ford JscCollectBtn"><a href="javascript:void(0)" class="btn-sprite"></a><span class="general-font JscColloctCount">105</span></div>
                        <div class="personal-coll JscReleaseBtn"><a href="javascript:void(0)" class="btn-sprite"></a><span class="general-font JscWorkCount">55</span></div>
                    </div>
                    <div class="indal-con">
                        <ul class="indal-nav JscPhotoBoxTwo">
                            <li class="JscPhotoTwo dat-WorkID-cid" cid=""><a href="javascript:void(0)">
                                <img class="dat-PicPath-src" src="images/personal-img.png" alt="" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <!--Main_end-->
    </div>
    <!--Wrap_end-->
    <!---------------顶部菜单-------------------->
    <div class="header-box">
        <div class="return-btn"><a href="javascript:void(0)"><i class="icons-return icons-sprite"></i></a></div>
        <div class="search-btn">
            <a href="javascript:void(0)" class="contact-us JscHrefContact">联系我们</a>
        </div>
    </div>

    <!---------------浮层-------------------->
    <div class="pop-float">
        <!-----------发布成功浮层---------->
        <div class="success-float">
            <div class="success-arrow">
                <img src="images/load.png" lazypath="images/success-arrow.png" /></div>
            <div class="success-tip">
                <img src="images/load.png" lazypath="images/success-tip.png" /></div>
            <div class="success-text">
                <img src="images/load.png" lazypath="images/success-text.png" /></div>
        </div>
        <!-------修改个人信息浮层-------->
        <div class="info-float">
            <!-----------性别-------------->
            <div class="gender-box">
                <div class="gender-man">
                    <a href="javascript:void(0)">
                        <i class="set-man btn-sprite"></i>
                        <span>男</span>
                    </a>
                </div>
                <div class="gender-wonmen">
                    <a href="javascript:void(0)">
                        <i class="set-wonmen btn-sprite"></i>
                        <span>女</span>
                    </a>
                </div>
            </div>
            <!-----------个性签名-------------->
            <div class="signature-box">
                <div class="signature-con">
                    <textarea>输入你的个人简介</textarea>
                </div>
                <div class="float-close-btn"><a href="javascript:void(0)" class="btn-sprite"><i class="icon-remove"></i></a></div>
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
        <!-------问答提交-------->
        <div class="answers-float">
            <p class="general-font">感谢您的宝贵意见</p>
            <div class="float-submit-btn"><a href="javascript:void(0)">确定</a></div>
        </div>
    </div>
</asp:Content>

