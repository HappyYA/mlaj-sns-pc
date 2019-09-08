var imgurl,returnurl ;
var ossdata;
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://api-dev.ikid06.ltd/oss/web-signature', false);
xhr.onreadystatechange = function () {
    // readyState == 4说明请求已完成
    if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
        // 从服务器获得数据 
        // console.log(JSON.parse(xhr.responseText).data)
        ossdata = JSON.parse(xhr.responseText).data;
        // fn.call(this, xhr.responseText);
    }
};
xhr.send();

accessid= ossdata.accessid;
accesskey= 'ufu7nS8kS59awNihtjSonMETLI0KLy';
host = ossdata.host;

g_dirname = ''
g_object_name = ''
g_object_name_type = ''
now = timestamp = Date.parse(new Date()) / 1000; 

var policyText = {
    "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    "conditions": [
    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
    ]
};

var policyBase64 = Base64.encode(JSON.stringify(policyText))
message = policyBase64
var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true }) ;
var signature = Crypto.util.bytesToBase64(bytes);


function get_dirname()
{
    dir = ossdata.ext.ARTICLE;
    if (dir != '' && dir.indexOf('/') != dir.length - 1) {
        dir = dir + '/'
    }
    g_dirname = dir
}

function random_string(len) {
　　len = len || 32;
　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';   
　　var maxPos = chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

function calculate_object_name(filename)
{
    suffix = get_suffix(filename)
        g_object_name = g_dirname + random_string(10) + suffix
    console.log(g_object_name,g_object_name_type)
    return ''
}

function get_uploaded_object_name(filename)
{
    if (g_object_name_type == 'local_name') {
        tmp_name = g_object_name
        tmp_name = tmp_name.replace("${filename}", filename);
        return tmp_name
    } else if (g_object_name_type == 'random_name') {
        return g_object_name
    }
}

function set_upload_param(up, filename, ret)
{
    g_object_name = g_dirname;
    if (filename != '') {
        suffix = get_suffix(filename)
        calculate_object_name(filename)
    }
    new_multipart_params = {
        'key' : g_object_name,
        'policy': ossdata.policy,
        'OSSAccessKeyId': ossdata.accessid, 
        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
        'signature': ossdata.signature,
    };

    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });

    up.start();
}
console.log(document.getElementById('con'))
window.uploaders = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : 'addOss', 
    //multi_selection: false,
	container: document.getElementById('con'),
	flash_swf_url : './plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : './plupload-2.1.2/js/Moxie.xap',
    url : 'http://oss.aliyuncs.com',

	init: {
		PostInit: function() {
            console.log(123)
			// document.getElementById('ossfile').innerHTML = '';
			// document.getElementById('postfiles').onclick = function() {
            // set_upload_param(uploader, '', false);
            // return false;
			// };
		},

		FilesAdded: function(up, files) {
            console.log(this.editor)
			// plupload.each(files, function(file) {
			// 	document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
			// 	+'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
			// 	+'</div>';
            // });
            console.log(files[0].name,ossdata.ext.oss_cdn+'/'+g_object_name,g_object_name)
            // $('#console').html(`<img src="${ossdata.ext.oss_cdn+'/'+g_object_name}"/>`)
            set_upload_param(uploaders, '', false);
                return false;
             console.log(up,files,g_object_name)
		},

		BeforeUpload: function(up, file) {
            get_dirname();
            set_upload_param(up, file.name, true);
        },

		UploadProgress: function(up, file) {
			// var d = document.getElementById(file.id);
			// d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
            // var prog = d.getElementsByTagName('div')[0];
			// var progBar = prog.getElementsByTagName('div')[0]
			// progBar.style.width= 2*file.percent+'px';
			// progBar.setAttribute('aria-valuenow', file.percent);
		},

		FileUploaded: function(up, file, info) {
            if (info.status == 200)
            {
                this.editor.replaceSelection('![image]('+ ossdata.ext.oss_cdn+'/'+g_object_name+')');
                console.log(ossdata.ext.oss_cdn+'/'+g_object_name)
                // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name(file.name);
            }
            else
            {
                // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
            } 
		},

		Error: function(up, err) {
			// document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
		}
	}
});


