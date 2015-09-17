using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class Notice : System.Web.UI.Page
{
    public string _PraiseList = "";
    public string _CommentList = "";
    public string _FollowList = "";
    public string _AtList = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        Master.SetTitle("消息");
        Getlist();
    }

    protected void GetMessageState()
    {
        
    }

    protected void Getlist()
    {
        string _userID = YQFunc.GetUserID();
        if (_userID == "")
        {
            Response.Redirect("index.html");
        }

        //点赞
        string _sql = @"select m.MessageID,m.cmn_CreateDate,m.UserID,p.UserID,m.SourceTable,m.RecID,m.HasRead,u.NickName,u.HeadImgUrl,p.WorkID,(select top 1 PicPath from usr_WorkImg where WorkID=p.WorkID) PicPath from usr_Message m
			                    left join usr_Praise p
			                    on p.PraiseID=m.RecID
			                    left join usr_Users u
			                    on u.UserID=p.UserID
			                    where m.SourceTable='usr_Praise' and WorkID is not null and m.UserID=" +_userID+
			                    " order by m.MessageID desc";

        DataTable _dt = Cmn.DB.getDataTable(_sql);
        if (_dt != null && _dt.Rows.Count > 0)
        {
            for (int _i = 0; _i < _dt.Rows.Count; _i++)
            {
                _PraiseList += @"<li messageid='" + _dt.Rows[_i]["MessageID"] + "' workid='" + _dt.Rows[_i]["WorkID"] + @"'>
                                <a href='javascript:void(0)'>
                                    <div class='praise-left'>" +
                                       (_dt.Rows[_i]["HasRead"].ToString() == "False" ? "<b></b>" : "") +
                                       " <img src='" + _dt.Rows[_i]["HeadImgUrl"] + @"'>
                                       <strong>" + _dt.Rows[_i]["NickName"] + "</strong>" +

                                  @"</div>
                                    <div class='praise-right'>
                                        <span>赞了你</span>
                                        <img src='" + _dt.Rows[_i]["PicPath"] + @"'>
                                    </div>
                                </a>
                            </li>";
            }
           
        }


        //评论
        _sql = @"select m.MessageID,m.cmn_CreateDate,m.UserID,c.UserID,c.ReplyUserID,m.SourceTable,m.RecID,m.HasRead,u.NickName,u.HeadImgUrl,c.WorkID,(select top 1 PicPath from usr_WorkImg where WorkID=c.WorkID) PicPath from usr_Message m
			                    left join usr_Comment c
			                    on c.CommentID=m.RecID
			                    left join usr_Users u
			                    on u.UserID=c.UserID
			                    where m.SourceTable='usr_Comment' and WorkID is not null and m.UserID=" + _userID +
                                " order by m.MessageID desc";

        _dt = Cmn.DB.getDataTable(_sql);
        if (_dt != null && _dt.Rows.Count > 0) {
            for (int _i = 0; _i < _dt.Rows.Count; _i++) {
                _CommentList += @"<li messageid='" + _dt.Rows[_i]["MessageID"] + "' workid='" + _dt.Rows[_i]["WorkID"] + @"'>
                                <a href='javascript:void(0)'>
                                    <div class='praise-left'>" +
                                       (_dt.Rows[_i]["HasRead"].ToString() == "False" ? "<b></b>" : "") +
                                       " <img src='" + _dt.Rows[_i]["HeadImgUrl"] + @"'>
                                       <strong>" + _dt.Rows[_i]["NickName"] + "</strong>" +

                                  @"</div>
                                    <div class='praise-right'>" +
                                       (_dt.Rows[_i]["ReplyUserID"].ToString() == "" ? "<span>评论了</span>" : "<span>回复了</span>") +
                                        "<img src='" + _dt.Rows[_i]["PicPath"] + @"'>
                                    </div>
                                </a>
                            </li>";
            }

        }

        //关注
        _sql = @"select m.MessageID,m.cmn_CreateDate,m.UserID,f.UserID SendUserID,m.SourceTable,m.RecID,m.HasRead,u.NickName,u.HeadImgUrl from usr_Message m
			                    left join usr_Follow f
			                    on f.FollowID=m.RecID
			                    left join usr_Users u
			                    on u.UserID=f.UserID
			                    where m.SourceTable='usr_Follow' and f.UserID is not null and m.UserID=" + _userID +
                                " order by m.MessageID desc";

        _dt = Cmn.DB.getDataTable(_sql);
        if (_dt != null && _dt.Rows.Count > 0) {
            for (int _i = 0; _i < _dt.Rows.Count; _i++) {
                _FollowList += @"<li messageid='" + _dt.Rows[_i]["MessageID"] + "' userid='" + _dt.Rows[_i]["SendUserID"] + @"'>
                                <a href='javascript:void(0)'>
                                    <div class='praise-left'>" +
                                       (_dt.Rows[_i]["HasRead"].ToString() == "False" ? "<b></b>" : "") +
                                       " <img src='" + _dt.Rows[_i]["HeadImgUrl"] + @"'>
                                       <strong>" + _dt.Rows[_i]["NickName"] + "</strong>" +

                                  @"</div>
                                    <div class='praise-right'>
                                        <span>关注了你</span>
                                       <i class='icon-concern icons-sprite'></i>
                                    </div>
                                </a>
                            </li>";
            }

        }

        //@
        _sql = @"select m.MessageID,m.cmn_CreateDate,m.UserID,w.UserID,m.SourceTable,m.RecID,m.HasRead,u.NickName,u.HeadImgUrl,w.WorkID,(select top 1 PicPath from usr_WorkImg where WorkID=w.WorkID) PicPath from usr_Message m
			                    left join usr_WorkAt wa
			                    on wa.WorkAtID=m.RecID
			                    left join usr_Works w
			                    on w.WorkID=wa.WorkID
			                    left join usr_Users u
			                    on u.UserID=w.UserID
			                    where m.SourceTable='usr_WorkAt' and m.UserID=" + _userID +
                                " order by m.MessageID desc";

        _dt = Cmn.DB.getDataTable(_sql);
        if (_dt != null && _dt.Rows.Count > 0) {
            for (int _i = 0; _i < _dt.Rows.Count; _i++) {
                _AtList += @"<li messageid='" + _dt.Rows[_i]["MessageID"] + "' workid='" + _dt.Rows[_i]["WorkID"] + @"'>
                                <a href='javascript:void(0)'>
                                    <div class='praise-left'>" +
                                       (_dt.Rows[_i]["HasRead"].ToString() == "False" ? "<b></b>" : "") +
                                       " <img src='" + _dt.Rows[_i]["HeadImgUrl"] + @"'>
                                       <strong>" + _dt.Rows[_i]["NickName"] + "</strong>" +

                                  @"</div>
                                    <div class='praise-right'>
                                        <span>@了我</span>
                                        <img src='" + _dt.Rows[_i]["PicPath"] + @"'>
                                    </div>
                                </a>
                            </li>";
            }
        }




    }

}