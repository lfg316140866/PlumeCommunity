using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Itf_CSharp_Interface : System.Web.UI.Page
{
    Cmn.JsonItf _Json = new Cmn.JsonItf("IsSuccess", "ErrMsg");
    string _UserID;
    protected void Page_Load(object sender, EventArgs e)
    {
        _UserID = YQFunc.GetUserID();
        string _method = Cmn.Request.Get("Method");
        string _ret = "";
        switch (_method)
        {
            case "GetWorkListOrderDateDesc":
                _ret = GetWorkListOrderDateDesc();
                break;
            case "GetWorkListOrderDateDescByFollow":
                _ret = GetWorkListOrderDateDescByFollow();
                break;
            case "GetCommentTop3ByWorkID":
                _ret = GetCommentTop3ByWorkID();
                break;
            case "GetWorkLabelByWorkID":
                _ret = GetWorkLabelByWorkID();
                break;
            case "SetUserID":
                _ret = SetUserID();
                break;
            case "GetUserID":
                _ret = GetUserID();
                break;
            default:
                _ret = "{\"IsSuccess\":0,\"ErrMsg\":\"不存在的方法名！\"}";
                break;
        }
        Response.Write(_ret);
    }

    protected string GetWorkListOrderDateDesc()
    {
        if (Cmn.Request.Get("PageSize") == "1000")
        {
            return _Json.Get(false, "这次不算");
        }
        string _sql = @"select w.WorkID,DATEDIFF(s ,w.cmn_CreateDate,getDate()) SendTime ,w.cmn_CreateDate,u.UserID,u.UserName,u.NickName,u.WorkCount,u.RealName,u.HeadImgUrl,case '" + _UserID + @"' when uf.UserID then '0' when uf.FollowedUserID then '1' else '2' end FollowState,up.PraiseID,uc.CollectID,w.PicPath,w.PraiseCount,w.ColloctCount
                            from dbo.usr_Works w 
                                left join dbo.usr_Users u 
                                on w.UserID=u.UserID
                                left join dbo.usr_Follow uf
                                on uf.FollowedUserID=w.UserID
                                left join usr_Praise up
                                on up.WorkID=w.WorkID and up.UserID=" + _UserID + @"
                                left join usr_Collect uc
                                on uc.WorkID=w.WorkID and uc.UserID=" + _UserID + @"
                            order by w.cmn_CreateDate desc";
        return Cmn.AjaxJson.SqlToJson(_sql, "GetWorkListOrderDateDesc", 10);
    }

    protected string GetWorkListOrderDateDescByFollow()
    {
        if (Cmn.Request.Get("PageSize") == "1000")
        {
            return _Json.Get(false, "这次不算");
        }
        string _sql = @"select w.WorkID,DATEDIFF(s ,w.cmn_CreateDate,getDate()) SendTime ,w.cmn_CreateDate,u.UserID,u.UserName,u.NickName,u.WorkCount,u.RealName,u.HeadImgUrl,case '" + _UserID + @"' when uf.UserID then '0' when uf.FollowedUserID then '1' else '2' end FollowState,up.PraiseID,uc.CollectID,w.PicPath,w.PraiseCount,w.ColloctCount
                            from dbo.usr_Works w 
                                left join dbo.usr_Users u 
                                on w.UserID=u.UserID
                                left join dbo.usr_Follow uf
                                on uf.FollowedUserID=w.UserID
                                left join usr_Praise up
                                on up.WorkID=w.WorkID and up.UserID=" + _UserID + @"
                                left join usr_Collect uc
                                on uc.WorkID=w.WorkID and uc.UserID=" + _UserID + @"
                            where w.UserID in (select FollowedUserID  from usr_Follow where UserID=" + _UserID + @") or  w.UserID=" + _UserID + @"
                            order by w.cmn_CreateDate desc";
        return Cmn.AjaxJson.SqlToJson(_sql);
    }

    protected string GetCommentTop3ByWorkID()
    {
        string _workID = Cmn.Request.Get("WorkID");
        if (_workID.Trim() == "")
        {
            return _Json.Get(false, "缺少参数");
        }
        if (Cmn.Request.Get("PageSize") == "1000")
        {
            return _Json.Get(false, "无效参数");
        }
        string _sql = @"select top 3 Comment, c.cmn_CreateDate SendTime,u.UserID,u.UserName,u.HeadImgUrl,c.ReplyUserID,(select UserName from usr_Users where UserID=c.ReplyUserID) ReplyUserName,w.WorkID
                            from dbo.usr_Comment c
                                left join dbo.usr_Works w  on w.WorkID=c.WorkID
                                left join dbo.usr_Users u 
                                on c.UserID=u.UserID
                            where c.WorkID=" + _workID + @"
                            order by c.cmn_CreateDate desc";
        return Cmn.AjaxJson.SqlToJson(_sql, "GetCommentTop3ByWorkID" + _workID, 10);
    }

    protected string GetWorkLabelByWorkID()
    {
        string _workID = Cmn.Request.Get("WorkID");
        if (_workID.Trim() == "")
        {
            return _Json.Get(false, "缺少参数");
        }
        if (Cmn.Request.Get("PageSize") == "1000")
        {
            return _Json.Get(false, "无效参数");
        }
        string _sql = @"select ybl.LabelID,ybl.Contents,ybl.WorkCount,wl.LabelLeft,wl.LabelTop,wl.Direction
                         from usr_WorkLabelRel wl
                             left join dbo.yq_bas_Label ybl
                             on wl.LabelID=ybl.LabelID
                         where wl.WorkID=" + _workID;
        return Cmn.AjaxJson.SqlToJson(_sql, "GetWorkLabelByWorkID" + _workID, 10);
    }

    protected string SetUserID()
    {
        if (YQFunc.SetUserID(Cmn.Request.Get("UserID")))
        {
            return _Json.Get(true, "成功");
        }
        else
        {
            return _Json.Get(false, "失败");

        }
    }

    protected string GetUserID()
    {
        return YQFunc.GetUserID();
    }
}