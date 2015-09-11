using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class manage_UploadFile : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
         Response.Charset = "UTF-8";
         
        //表单文件域name
		string _inputName=Cmn.Request.Get("inputFileName");

		//文件最大大小 默认3m
		int _limitSize =Cmn.Request.Get("limitSize")!=""?int.Parse(Cmn.Request.Get("limitSize"))*10485760:3*10485760;
		//上传文件根目录
		string _rootPath = Cmn.Request.Get("rootPath")!=""?Cmn.Request.Get("rootPath"):"/Upload";
 		//上传文件后缀
		string _suffix=Cmn.Request.Get("suffix")!=""?Cmn.Request.Get("suffix"):"txt,rar,zip,jpg,jpeg,gif,png,swf,wmv,avi,wma,mp3,mid";
	    //临时文件
		//string _tempPath=$_rootPath.'/'.date("YmdHis").mt_rand(10000,99999).'.tmp';
		//文件名称
		string _fileName="";
        //文件流
        byte[] _file = null;
        //回执数据 
		JObject _receiptData = new JObject();
        JObject _meg = new JObject(); 
        _receiptData.Add("state", "0");
        _receiptData.Add("message", "未捕获的错误！保存失败");
        _receiptData.Add("err", "未捕获的错误！保存失败");
        _receiptData.Add("path", "");
       
		//创建目录
		//FileExd::CreateFolder($_rootPath);
        string _disposition = Request.ServerVariables["HTTP_CONTENT_DISPOSITION"];
    
        if (_disposition != null) {
            // HTML5上传
            _file = Request.BinaryRead(Request.TotalBytes);
            _fileName = Server.UrlDecode(Regex.Match(_disposition, "filename=\"(.+?)\"").Groups[1].Value);// 读取原始文件名
        }
        else  {

            var _imageDatga = Cmn.Request.Get(_inputName);

            if (_imageDatga.IndexOf("base64,") > -1 && _imageDatga.IndexOf("data") > -1) {
               
                _fileName = "temp." + _imageDatga.Substring(11, _imageDatga.IndexOf(";") - 11);

                _imageDatga = _imageDatga.Substring(_imageDatga.IndexOf(",")+1);

                _file = Convert.FromBase64String(_imageDatga);
              
            }
            else{
            
                HttpFileCollection _filecollection = Request.Files;
                HttpPostedFile _postedfile = _filecollection.Get(_inputName);

                // 读取原始文件名
                _fileName = _postedfile.FileName;
                // 初始化byte长度.
                _file = new Byte[_postedfile.ContentLength];
        
                // 转换为byte类型
                System.IO.Stream _stream = _postedfile.InputStream;
                _stream.Read(_file, 0, _postedfile.ContentLength);
                _stream.Close();

                _filecollection = null;
               
            }
        }
        //---
        if (_file.Length == 0) {
            _receiptData["message"] = "文件不存在！";
            _receiptData["err"] = "文件不存在！";
        } else {

            if (_file.Length > _limitSize) {
                _receiptData["message"] = "文件大小超过" + _limitSize + "字节";
                _receiptData["err"] = "文件大小超过" + _limitSize + "字节";
            }
            else
            {

                // 取上载文件后缀名
                string _extension = GetFileExt(_fileName);

                if (("," + _suffix + ",").IndexOf("," + _extension + ",") < 0)
                {
                    _receiptData["message"] = "上传文件扩展名必需为：" + _suffix;
                    _receiptData["err"] = "上传文件扩展名必需为：" + _suffix;
                }
                else
                {

                    string _savePath = _rootPath + "/day_" + DateTime.Now.ToString("yyMMdd");
                    // 生成随机文件名
                    Random _random = new Random(DateTime.Now.Millisecond);
                    string _fileSaveName = DateTime.Now.ToString("yyyyMMddhhmmss") + _random.Next(10000) + "." + _extension;

                    _fileSaveName = _savePath + "/" + _fileSaveName;

                    try
                    {
                        CreateFolder(Server.MapPath(_savePath));

                        System.IO.FileStream fs = new System.IO.FileStream(Server.MapPath(_fileSaveName), System.IO.FileMode.Create, System.IO.FileAccess.Write);
                        fs.Write(_file, 0, _file.Length);
                        fs.Flush();
                        fs.Close();
                    }
                    catch (Exception ex)
                    {
                        _receiptData["message"] = ex.Message.ToString();
                        _receiptData["err"] = ex.Message.ToString();

                    }
                    _receiptData["message"] = "上传成功！";
                    _receiptData["state"] = "1";
                    _receiptData["path"] = _fileSaveName;
                    _receiptData["err"] = "";
                    _meg.Add("url", _fileSaveName);
                    _meg.Add("localname", _fileName);
                    _meg.Add("id", "");
                    _receiptData.Add("msg", _meg);

                }
            }
        }

        _file = null;

        Response.Write(_receiptData.ToString());

    }



    private JObject SaveFile(JObject json) {


        ////文件信息
        //$_fileInfo=pathinfo($fileName);
        ////文件真实后缀
        //$_extension = $_fileInfo["extension"];
        ////回执数据
        //$_receiptData = array("state"=>"0","message"=>"未捕获的错误！保存失败","path"=>"");
        ////保存的文件名称
        //$_fileSaveName = "";
        ////保存的路径
        //$_savePath = $rootPath.'/day_'.date('ymd');
        ////错误信息
        //$_errorMsg = "文件不存在！上传失败";
        ////临时文件路径
        //$_tempPath = $rootPath.date("YmdHis").mt_rand(10000,99999).'.tmp';


        //if(preg_match('/^('.str_replace(',','|',$exts).')$/i',$_extension)) {

        //    $_bytes=filesize($tempPath);
				
        //    if($_bytes > $size){
        //        $_receiptData["message"]='请不要上传大小超过'.FileExd::FormatBytes($_bytes).'的文件';
        //    }
        //    else {

        //        //.'/index.htm'
        //        FileExd::CreateFolder($_savePath);
        //        //if (!file_exists($_savePath.'/index.htm')){echo "文件夹创建失败！";}
				 
        //        PHP_VERSION < '4.2.0' && mt_srand((double)microtime() * 1000000);

        //        $_fileSaveName=date("YmdHis").mt_rand(1000,9999).'.'.$_extension;
        //        $_fileSaveName = $_savePath.'/'.$_fileSaveName;
        //        rename($tempPath,$_fileSaveName);
        //        chmod($_fileSaveName,0755);

        //        $_receiptData["state"] = '1';
        //        $_receiptData["message"] = '上传成功！';
        //        $_receiptData["path"] = $_fileSaveName;
					
        //    }
				
        //}
        //else{
        //    $_receiptData["message"] = '上传文件扩展名必需为：'.$exts;
        //}
			

        //return  $_receiptData;


        return json;
    }
 
    private string GetFileExt(string FullPath)  {
        if (FullPath != "")return FullPath.Substring(FullPath.LastIndexOf('.') + 1).ToLower();
        else return "";
    }

   private void CreateFolder(string FolderPath){
     if (!System.IO.Directory.Exists(FolderPath))System.IO.Directory.CreateDirectory(FolderPath);
    }
    
 

}


 