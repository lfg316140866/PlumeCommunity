﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Release : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e) {
        if (YQFunc.GetUserID() == "") {
            if (HttpContext.Current.Request.UserAgent.ToString().ToLower().Contains("micromessenger")) {
                YQFunc.WechatOAuthProcess(false);
            }
        }
         
    }
     
}