using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class Search : System.Web.UI.Page
{
    public string _hotLabelList = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        Master.SetTitle("搜索");
        Master.SetColor("Search");
        GetHotLabel();
    }

    protected void GetHotLabel()
    {
        
        string _sql = "select uhl.LabelID,uhl.PicPath from usr_HotLabel uhl ";
        DataTable _dt = Cmn.DB.getDataTable(_sql);
        if (_dt != null && _dt.Rows.Count > 0)
        {
            for (int _i = 0; _i <_dt.Rows.Count; _i++)
            {
                if (_i < 4)
                {
                   _hotLabelList += "<div class='recd-con-"+(_i+1)+"'><img labelid='" + _dt.Rows[_i]["LabelID"] + "' src='" + _dt.Rows[_i]["PicPath"] + "'></div>"; 
                }
                else
                {
                    _hotLabelList += "<div class='recd-msg'><img labelid='" + _dt.Rows[_i]["LabelID"] + "' src='" +
                                     _dt.Rows[_i]["PicPath"] + "'></div>";
                }
                
            }
            
        }
    }
}