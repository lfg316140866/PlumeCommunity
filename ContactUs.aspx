﻿<%@ Page Title="" Language="C#" MasterPageFile="~/master/YuQianMaster.master" AutoEventWireup="true" CodeFile="ContactUs.aspx.cs" Inherits="ContactUs" %>
<%@ MasterType VirtualPath="~/master/YuQianMaster.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="Wrap">
        <div class="Main">
            <!--联系我们-->
            <div class="contact-us" id="contact-us">
                <div class="Bg"><img  src="images/load.png" lazypath="images/bg/land_bg.jpg" /></div>
                <div class="Inner">
                   <div class="contact">
                       <textarea name="" id="" cols="30" rows="10" placeholder="请输入您的宝贵意见" class="general-font JscMessageText"></textarea>
                   </div>
                </div>
            </div>
        </div><!--Main_end-->
    </div><!--Wrap_end-->
    <!---------------顶部菜单-------------------->
    <div class="header-box">
        <div class="return-btn JscReturnBtn"><a href="javascript:void(0)"><i class="icons-return icons-sprite"></i></a></div>
        <p class="general-font">联系我们</p>
        <div class="search-btn JscMessageBtn">
            <a href="javascript:void(0)" class="contact-us">发送</a>
        </div>
    </div>
    <!---------------浮层-------------------->
    <div class="pop-float">
        <!-------问答提交-------->
        <div class="answers-float">
            <p class="general-font">感谢您的宝贵意见</p>
            <div class="float-submit-btn"><a  href="javascript:void(0)">确定</a></div>
        </div>
    </div>
    <!---------------底部导航-------------------->
    <div class="footer-box">
        <ul class="footer-nav">
            <li><a href="javascript:void(0)" class="select"><i class="icons-home icons-sprite"></i><span>首页</span></a></li>
            <li><a href="javascript:void(0)"><i class="icons-heart icons-sprite"></i><span>热门</span></a></li>
            <li><a href="javascript:void(0)" class="update"><em class="bar-bg"><i class="icon-circle-blank"></i></em></a></li>
            <li><a href="javascript:void(0)"><i class="icons-volume-down icons-sprite"></i><span>通知</span></a></li>
            <li><a href="javascript:void(0)"><i class="icons-user icons-sprite"></i><span>我的</span></a></li>
        </ul>
    </div>
    <script>
        Cmn.Func.MobileAdaptive(640, 1008, "images/AdviseVertical.png", Cmn.Func.MobileAdaptiveMode.WidthHeight);
    </script>
</asp:Content>

