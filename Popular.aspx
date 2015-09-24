<%@ Page Title="" Language="C#" MasterPageFile="~/master/YuQianMaster.master" AutoEventWireup="true" CodeFile="Popular.aspx.cs" Inherits="Popular" %>

<%@ MasterType VirtualPath="~/master/YuQianMaster.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script>
        $(function () {
            if (Cmn.Func.GetParamFromUrl("returnurl") != "") {
                SiteFunc.BackBtnBind(function () {
                    location.href = decodeURIComponent(Cmn.Func.GetParamFromUrl("returnurl"));
                });
            } else {
                SiteFunc.BackBtnBind();
            }
            $(".search-recd-con img[labelid]").click(function () {
                SiteFunc.JumpPage("Home.aspx?lid=" + $(this).attr("labelid"));
                
            });
        })
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="Wrap">
        <div class="Main">
            <!--首页-->
            <div class="popular" id="popular">
                <div class="Inner">
                    <div class="search-recd-con search-pub">
                       <%=_hotLabelList %>
                    </div>
                </div>
            </div>
        </div>
        <!--Main_end-->
    </div>
    <!--Wrap_end-->
</asp:Content>

