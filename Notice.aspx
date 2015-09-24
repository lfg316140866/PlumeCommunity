<%@ Page Title="" Language="C#" MasterPageFile="~/master/YuQianMaster.master" AutoEventWireup="true" CodeFile="Notice.aspx.cs" Inherits="Notice" %>

<%@ MasterType VirtualPath="~/master/YuQianMaster.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="Js/SiteJs/Notice.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="Wrap">
        <div class="Main">
            <!--通知-->
            <div class="notice" id="notice">
                <div class="Inner" style="padding-bottom: 100px">
                    <!--消息通知-->
                    <div class="notice-msg pub-notice">
                        <ul class="notice-msg-nav">
                            <li cl=""><a href="javascript:void(0)"><i class="icons-sprite"></i><span>官方通知</span></a></li>
                            <li cl="notice-comment"><a href="javascript:void(0)"><i class="icons-sprite"></i><span>评论</span><%=Master.GetMessageState(Master._CommentUnReadNum) %></a></li>
                            <li cl="notice-praise"><a href="javascript:void(0)"><i class="icons-sprite"></i><span>赞</span><%=Master.GetMessageState(Master._PraiseUnReadNum) %></a></li>
                            <li cl="notice-attention"><a href="javascript:void(0)"><i class="icons-sprite"></i><span>关注</span><%=Master.GetMessageState(Master._FollowUnReadNum) %></a></li>
                            <li cl="notice-who"><a href="javascript:void(0)"><i class="icons-sprite"></i><span>提到了我</span><%=Master.GetMessageState(Master._AtUnReadNum) %></a></li>
                        </ul>
                    </div>
                    <!--赞-->
                    <div class="notice-praise pub-notice pub-call">
                        <ul class="notice-praise-nav">
                            <%=Master._PraiseList %>
                            <%--<li>
                                <a href="javascript:void(0)">
                                    <div class="praise-left">
                                        <b></b>
                                        <img src="images/individual-box.png" />
                                        <strong>寻找你的存在</strong>
                                    </div>
                                    <div class="praise-right">
                                        <span>赞了你</span>
                                        <img src="images/individual-box.png" />
                                    </div>
                                </a>
                            </li>--%>
                            
                        </ul>
                    </div>
                    <!--谁@了我-->
                    <div class="notice-who pub-notice pub-call">
                        <ul class="notice-praise-nav pub-call-nav">
                            <%=Master._AtList %>
                           <%-- <li>
                                <a href="javascript:void(0)">
                                    <div class="praise-left">
                                        <b></b>
                                        <img src="images/individual-box.png" />
                                        <strong>寻找你的存在</strong>
                                    </div>
                                    <div class="praise-right">
                                        <span>@了我</span>
                                        <img src="images/individual-box.png" />
                                    </div>
                                </a>
                            </li>--%>
                          
                        </ul>
                    </div>
                    <!--评论-->
                    <div class="notice-comment pub-notice pub-call">
                        <ul class="notice-praise-nav pub-call-nav">
                             <%=Master._CommentList %>
                           <%-- <li>
                                <a href="javascript:void(0)">
                                    <div class="praise-left">
                                        <b></b>
                                        <img src="images/individual-box.png" />
                                        <strong class="comment-descet">寻找你的存在</strong>
                                        <small>寻找你的存在</small>
                                    </div>
                                    <div class="praise-right">
                                        <span>评论了</span>
                                        <img src="images/individual-box.png" />
                                    </div>
                                </a>
                            </li>
                            --%>
                        </ul>
                    </div>
                    <!--关注了你-->
                    <div class="notice-attention pub-notice pub-call">
                        <ul class="notice-praise-nav pub-call-nav">
                            <%=Master._FollowList %>
                           <%-- <li>
                                <a href="javascript:void(0)">
                                    <div class="praise-left">
                                        <b></b>
                                        <img src="images/individual-box.png" />
                                        <strong>寻找你的存在</strong>
                                    </div>
                                    <div class="praise-right">
                                        <span>关注了你</span>
                                        <i class="icon-concern icons-sprite"></i>
                                    </div>
                                </a>
                            </li>--%>
                            
                        </ul>
                    </div>
                    <!--关注-->
                    <div class="notice-focus pub-notice pub-call">
                        <ul class="notice-praise-nav pub-call-nav">
                            <li>
                                <a href="javascript:void(0)">
                                    <div class="praise-left">
                                        <img src="images/individual-box.png" />
                                        <strong>寻找你的存在</strong>
                                        <em class="icon-tages">C</em>
                                    </div>
                                    <div class="praise-right">
                                        <i class="icon-correct icons-sprite"></i>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <div class="praise-left">
                                        <img src="images/individual-box.png" />
                                        <strong>寻找你的存在</strong>
                                    </div>
                                    <div class="praise-right">
                                        <i class="icon-correct icons-sprite"></i>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <div class="praise-left">
                                        <img src="images/individual-box.png" />
                                        <strong>寻找你的存在</strong>
                                    </div>
                                    <div class="praise-right">
                                        <i class="icon-correct icons-sprite"></i>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!--社区小管家-->
                    <div class="notice-community">
                        <div class="community-box">
                            <div class="community-des">
                                <img  src="images/community-img.png" />
                                <span class="community-tip">
                                    <em>精彩内容抢都是</em>
                                </span>
                            </div>
                            <div class="community-more">
                                <ul>
                                    <li>
                                        <a href="javascript:void(0)">
                                            <span>反对是否和第三是对方法第三方范德萨第三方士大夫</span>
                                            <img  src="images/community-img.png" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">
                                            <span>反对是否和第三方和第三方士大夫</span>
                                            <img  src="images/community-img.png" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">
                                            <span>反对是否和第三方和第三方士大夫</span>
                                            <img  src="images/community-img.png" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">
                                            <span>反对是否和第三方和第三方士大夫</span>
                                            <img  src="images/community-img.png" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">
                                            <span>反对是否和第三方和第三方士大夫</span>
                                            <img  src="images/community-img.png" />
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <!--粉丝-->
                    <div class="notice-fans pub-notice pub-call">
                        <ul class="notice-praise-nav pub-call-nav">
                            <li>
                                <a href="javascript:void(0)">
                                    <div class="praise-left">
                                        <img src="images/individual-box.png" />
                                        <strong>寻找你的存在</strong>
                                        <em class="icon-tages">C</em>
                                    </div>
                                    <div class="praise-right">
                                        <i class="icon-correct incon-fans-correct icons-sprite"></i>
                                        <i class="icon-concern icon-fans-concern icons-sprite"></i>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <div class="praise-left">
                                        <img src="images/individual-box.png" />
                                        <strong>寻找你的存在</strong>
                                    </div>
                                    <div class="praise-right">
                                        <i class="icon-correct incon-fans-correct icons-sprite"></i>
                                        <i class="icon-concern icon-fans-concern icons-sprite"></i>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <div class="praise-left">
                                        <img src="images/individual-box.png" />
                                        <strong>寻找你的存在</strong>
                                    </div>
                                    <div class="praise-right">
                                        <i class="icon-correct incon-fans-correct icons-sprite"></i>
                                        <i class="icon-concern icon-fans-concern icons-sprite"></i>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <!--Main_end-->
    </div>
    <!--Wrap_end-->
    <!--Wrap_end-->
</asp:Content>

