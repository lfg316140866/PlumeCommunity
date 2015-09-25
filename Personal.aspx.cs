using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Personal : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string _uid = YQFunc.GetUserID();
        if (HttpContext.Current.Request.Url.ToString().IndexOf("uid") <= 0 || _uid == Cmn.Request.Get("uid")) {
            Master.SetColor("Personal");
        }
        Master.SetTitle("羽茜社区");
    }
}