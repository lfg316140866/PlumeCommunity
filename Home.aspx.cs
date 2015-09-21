using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class Home : System.Web.UI.Page
{
    public string _BannerList = "";
    public string _ListHtml = ""; 
    protected void Page_Load(object sender, EventArgs e)
    {
        Master.SetTitle("羽茜社区");
        GetBanner();
        GetExpressionList();
    }

    protected void GetBanner()
    {
        string _sql = @"select PicPath,Link  from yq_bas_Banner";
        DataTable _dt = Cmn.DB.getDataTable(_sql);
        if (_dt != null && _dt.Rows.Count > 0) {
            for (int _i = 0; _i < _dt.Rows.Count; _i++) {
                _BannerList += @"<li><a href='" + _dt.Rows[_i]["Link"] + "'> <img src='" + _dt.Rows[_i]["PicPath"] + "' /></a></li>";

            }

        }

    }

    protected void GetExpressionList()
    {
        string _sql = @"select ExpressionCategoryID,ExpressionCategoryDesc from yq_bas_ExpressionCategory";

        DataTable _dt = Cmn.DB.getDataTable(_sql);
        if (_dt != null && _dt.Rows.Count > 0) {
            for (int _i = 0; _i < _dt.Rows.Count; _i++)
            {
                _ListHtml += "<li>";
                _sql = @"select ybe.ExpressionID,ybe.ExpressionDesc,ybe.PicPath from yq_bas_Expression ybe where ExpressionCategoryID=" + _dt.Rows[_i]["ExpressionCategoryID"];
                DataTable _dt1 = Cmn.DB.getDataTable(_sql);
                if (_dt1 != null && _dt1.Rows.Count > 0)
                {
                    for (int _j = 0; _j < _dt1.Rows.Count; _j++)
                    {
                        _ListHtml += "<a href='javascript:void(0)'><img src='" + _dt1.Rows[_j]["PicPath"] + "' /></a>";
                    }
                }
                _ListHtml += "</li>";

            }

        }

    }
}