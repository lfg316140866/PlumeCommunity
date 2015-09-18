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
    protected void Page_Load(object sender, EventArgs e)
    {
        Master.SetTitle("羽茜社区");
        GetBanner();
    }

    protected void GetBanner()
    {
        string _sql = @"select PicPath,Link  from yq_bas_Banner";
        DataTable _dt = Cmn.DB.getDataTable(_sql);
        if (_dt != null && _dt.Rows.Count > 0)
        {
            for (int _i = 0; _i < _dt.Rows.Count; _i++)
            {
                _BannerList += @"<li><a href='" + _dt.Rows[_i]["Link"] + "'> <img src='" + _dt.Rows[_i]["PicPath"] + "' /></a></li>";
                                   
            }
            
        }

    }
}