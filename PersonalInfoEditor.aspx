<%@ Page Title="" Language="C#" MasterPageFile="~/master/YuQianMaster.master" AutoEventWireup="true" CodeFile="PersonalInfoEditor.aspx.cs" Inherits="PersonalInfoEditor" %>
<%@ MasterType VirtualPath="~/master/YuQianMaster.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
     <script src="Js/animate/AnimateMan.js"></script>
    <script src="Js/animate/ScenesSwitch.js"></script>
    <script src="Js/animate/Scenes.js"></script>
    <script src="Js/animate/AnimateFrame.js"></script>
    <script src="Js/animate/BasAnimate.js"></script>
    <script src="Js/CmnFuncExd.js"></script>
    <script src="Js/ThirdLib/touch.mini.js"></script>
     <script src="Js/CmnUI/Upload/Upload.js"></script>
    <script src="Js/CmnUI/CmnUI.js"></script>
   <script src="Js/easeljs-0.6.0.min.js"></script>
    <script src="Js/ImageEditing.js"></script>
    <script src="Js/dat.gui.min.js"></script>
    <script src="Js/CmnTools/WechatShare.js"></script>
    <script src="Js/SiteJs/SiteFunc.js"></script>
    <script src="Js/SiteJs/PersonalInfoEditor.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
     <div class="Wrap">
        <div class="Main">
            <!--个人信息编辑-->
            <div class="info-editor" id="info-editor">
                <div class="Inner">
                    <div class="indal-box">
                        <div class="indal-bg"><img class="JscBgImg" src="" alt="" /></div>
                        <div class="indal-top info-editor-top">
                            <div class="indal-portrait">
                                <p class="portrait JscUserImg"><img src="images/UserImg.png" alt=""/></p>
                                <i class="icons-tages JscTalentLable">C</i>
                            </div>
                        </div>
                        <div class="indal-body info-editor-body">
                            <div class="indal-info">
                                <!--如果性别是女的话i标签添加select-->
                                <div class="indal-name "><span class="JscUserName">Dave</span> <i class="indal-sex JscUserSexs icons-sprite"></i></div>
                            </div>
                        </div>
                        <div class="info-editor-btn">
                            <div class="JscFrontCoverHerf editor-front">封面</div>
                            <div class="JscHeadPortraitHerf editor-head">头像</div>
                        </div>
                        <div class="update-load JscLayer" style="display:none">
                                <div class="update-push JscUploadLayer JscLayerHide" style="display:block">
                                    <i class="icons-load"></i>
                                    <span>正在上传...</span>
                                </div>
                                <div class="update-success JscUpdateLayer JscLayerHide" style="display:none">
                                    <i class="icons-right icons-sprite"></i>
                                    <span>更新成功</span>
                                </div>
                        </div>
                    </div>
                    <div class="editor-sidebar">
                        <ul class="editor-nav ">
                            <li class="JscChangeDataName"><a href="javascript:void(0)"><span>昵称</span><em><span class="JscUserName">Adk</span><i class="icon-angle-right"></i></em></a></li>
                            <li class="JscChangeDataSex"><a href="javascript:void(0)"><span>性别</span><em><span class="JscUserSex">男</span><i class="icon-angle-right"></i></em></a></li>
                            <li class="JscChangeDataSigna"><a href="javascript:void(0)"><span>个性签名</span><em><span class="JscSignature user-signature">介绍下自己吧</span><i class="icon-angle-right"></i></em></a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div><!--Main_end-->
    </div><!--Wrap_end-->
    <!---------------顶部菜单-------------------->
    <div class="header-box">
        <div class="return-btn JscBackToPrevious"><a href="javascript:void(0)"><i class="icons-return icons-sprite"></i></a></div>
        <div class="search-btn">
            <a href="javascript:void(0)" class="contact-us JscHrefContact">联系我们</a>
            <a href="javascript:void(0)" class="confirm JscSubmitPicture">确定</a>
        </div>
    </div>

    <!---------------浮层-------------------->
    <div class="pop-float JscFloatAlls" style="z-index:10">
        <!-----------发布成功浮层---------->
        <div class="success-float">
            <div class="success-arrow"><img  src="images/load.png" lazypath="images/success-arrow.png" /></div>
            <div class="success-tip"><img  src="images/load.png" lazypath="images/success-tip.png" /></div>
            <div class="success-text"><img  src="images/load.png" lazypath="images/success-text.png" /></div>
        </div>
        <!-------修改个人信息浮层-------->
        <div class="info-float JscInformationChangesFloat">
            <!-----------性别-------------->
            <div class="gender-box JscSexAllFloat JscInformationHide">
                <div class="gender-man JscSexChange">
                    <a  href="javascript:void(0)">
                        <i class="set-man icons-sprite"></i>
                        <span>男</span>
                    </a>
                </div>
                <div class="gender-wonmen JscSexChange">
                    <a  href="javascript:void(0)">
                        <i class="set-wonmen icons-sprite"></i>
                        <span>女</span>
                    </a>
                </div>
            </div>
            <!-----------个性签名-------------->
            <div class="signature-box JscSignatureFloat JscInformationHide">
                <div class="signature-con">
                    <textarea class="JscSignatureText" placeholder="输入你的个人简介"></textarea>
                </div>
                <div class="float-close-btn"><a  href="javascript:void(0)"><i class="icon-remove"></i></a></div>
            </div>
            <!-----------填写姓名-------------->
            <div class="fill-name-box JscNameFloat JscInformationHide">
                <div class="fill-name-con">
                    <input maxlength="7" type="text" class="JscNameText" name="请输入姓名" placeholder="请输入姓名"/>
                </div>
                <p class="">听说酷炫的名字与你更配哟!</p>
            </div>
            <div class="float-submit-btn JscSubmitInformation"><a  href="javascript:void(0)">确定</a></div>
            <div class="float-close-btn JscCloseFloat"><a  href="javascript:void(0)" class="btn-sprite"></a></div>
        </div>
        <!-------更改封面浮层-------->
        <div class="change-cover-float JscCoverFloat JscInformationHide">
            <div class="change-cover-head JscCoverCanvas change-photo"></div>
        </div>
        <div class="change-cover-float JscCoverFloat1 JscInformationHide">
            <div class="change-cover JscCoverCanvas1 change-photo"></div>
        </div>
       <%-- <div class="change-cover-float JscCoverFloat JscInformationHide" style="display:none">
            <div class="change-cover-head JscCoverCanvas1 "></div>
        </div>--%>
    </div>
</asp:Content>

