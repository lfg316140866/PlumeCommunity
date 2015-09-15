using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class YuQianMaster : System.Web.UI.MasterPage
{
    public string _NickName = "";
    public string _HeadImgUrl = "";

    protected void Page_Load(object sender, EventArgs e)
    {
        GetUserInfo();
    }

    public void SetTitle(string Title)
    {
        Page.Title = Title;
    }

    public void GetUserInfo()
    {
        string _userID = YQFunc.GetUserID();
        if (_userID == "")
        {
            Response.Redirect("index.html");
        }
        string _sql = "select uu.NickName,uu.HeadImgUrl from usr_Users uu where UserID="+_userID;
        DataTable _dt = Cmn.DB.getDataTable(_sql);
        if (_dt != null && _dt.Rows.Count > 0)
        {
            _NickName = _dt.Rows[0]["NickName"].ToString();
            _HeadImgUrl = _dt.Rows[0]["HeadImgUrl"].ToString();
        }
    }
}
