<%@ Page Title="" Language="C#" MasterPageFile="~/master/YuQianMaster.master" AutoEventWireup="true" CodeFile="Search.aspx.cs" Inherits="Search" %>

<%@ MasterType VirtualPath="~/master/YuQianMaster.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="Js/SiteJs/Search.js"></script>
    <style>
       .praise-left .select{display: none}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="Wrap">
        <div class="Main">
            <!--个人-->
            <div class="search" id="search">
                <div class="Inner">
                    <div class="search-nav">
                        <a href="javascript:void(0)" class="select">内容</a>
                        <a href="javascript:void(0)">用户</a>
                    </div>
                    <!---------推荐内容---------->
                    <div class="search-recd-con list search-pub">
                        <%--<div class="recd-con-1">
                            <img src="images/recd-con-1.png" /></div>
                        <div class="recd-con-2">
                            <img src="images/recd-con-2.png" /></div>
                        <div class="recd-con-3">
                            <img src="images/recd-con-3.png" /></div>
                        <div class="recd-con-4">
                            <img src="images/recd-con-4.png" /></div>--%>
                        
                        <%=_hotLabelList %>
                        
                    
                    </div>
                    <!---------内容列表---------->
                    <div class="search-con-list list">
                        <div class="pub-notice pub-call">
                            <ul class="notice-praise-nav pub-call-nav search-pub">
                                <li style="display:none" class="dat-UserID-userid">
                                    <a href="javascript:void(0)">
                                        <div class="praise-left dat-Identitys-class">
                                            <img class="dat-HeadImgUrl-src" src="images/individual-box.png" />
                                            <em class="icons-tages dat-Identitys-class">C</em>
                                            <strong class="dat-NickName"></strong>
                                            
                                        </div>
                                        <div class="praise-right">
                                            <img class="dat-Work3-src dat-WorkID3-workid" src="images/recd-con-4.png" />
                                            <img class="dat-Work2-src dat-WorkID2-workid" src="images/recd-con-4.png" />
                                            <img class="dat-Work1-src dat-WorkID1-workid" src="images/recd-con-4.png" />
                                        </div>
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    <!---------关键字列表---------->
                    <div class="search-key-list list">
                        <ul class="search-pub">
                            <li style="display:none"><a href="Home.aspx?WorkID={WorkID}">
                                <img src="images/recd-con-1.png" class="dat-PicPath-src" /></a></li>
                            
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <!--Main_end-->
    </div>
    <!--Wrap_end-->
    <!---------------顶部搜索-------------------->
    <div class="header-search">
        <div class="search-input">
            <input type="text" placeholder="中国美女" /></div>
        <div class="search-submit"><a href="javascript:void(0)"><i class="icons-seach icons-sprite" id="SeachBtn"></i></a></div>
    </div>
</asp:Content>

