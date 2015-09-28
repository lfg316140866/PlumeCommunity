<%@ Page Title="" Language="C#" MasterPageFile="~/master/YuQianMaster.master" AutoEventWireup="true" CodeFile="FollowFans.aspx.cs" Inherits="FollowFans" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="Js/SiteJs/FollowFans.js"></script>
    <style>.praise-left .select{display: none}



.pub-call ul li a .praise-right .icons-set.self{display: none}

    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="Wrap">
        <div class="Main">
            <!--通知-->
            <div class="notice" id="notice">
                <div class="Inner">                    <!--关注-->
                    <div id="ListFollow" class="notice-focus pub-notice pub-call">
                        <ul class="notice-praise-nav pub-call-nav">
                            <li class="dat-UserID-userid">
                                <a href="javascript:void(0)">
                                    <div class="praise-left">
                                        <img class="dat-HeadImgUrl-src" src="images/individual-box.png" />
                                        <strong class="dat-NickName"></strong>
                                        <em class="icons-tages dat-Identitys-class">C</em>
                                    </div>
                                    <div class="praise-right">
                                          <i class="BtnFollow icons-set dat-FollowState-class dat-FollowID-followid icons-sprite"></i>
                                    </div>
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                    <!--粉丝-->
                    <div id="ListFans" class="notice-fans pub-notice pub-call">
                        <ul class="notice-praise-nav pub-call-nav">
                            <li class="dat-UserID-userid">
                                <a href="javascript:void(0)">
                                    <div class="praise-left">
                                        <img class="dat-HeadImgUrl-src" src="images/individual-box.png" />
                                        <em class="icons-tages dat-Identitys-class">C</em>
                                        <strong class="dat-NickName"></strong>
                                        
                                    </div>
                                    <div class="praise-right">
                                       <i class="BtnFollow icons-set dat-FollowState-class dat-FollowID-followid icons-sprite"></i>
                                    </div>
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>

        </div><!--Main_end-->
    </div><!--Wrap_end-->
</asp:Content>

