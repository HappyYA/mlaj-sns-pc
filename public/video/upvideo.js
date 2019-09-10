/** 
   * 创建一个上传对象
   * 使用 STSToken 上传方式
   */

  var videoId;
  function createUploader () {
    var uploadervideo = new AliyunUpload.Vod({
      timeout: 60000,
      partSize: 1048576,
      parallel: 5,
      retryCount: 3,
      retryDuration: 2,
      region: 'cn-shanghai',
      userId: 99999,
      // 添加文件成功
      addFileSuccess: function (uploadInfo) {
        console.log('添加文件成功, 等待上传...')
        console.log("addFileSuccess: " + uploadInfo.file.name)
        uploadervideo.startUpload()
      },
      // 开始上传
      onUploadstarted: function (uploadInfo) {
        var stsUrl = 'http://api-dev.ikid06.ltd/oss/sts-token';
        $.get(stsUrl, function (data) {
          var info = data.data;
          var accessKeyId = info.AccessKeyId
          var accessKeySecret = info.AccessKeySecret
          var secretToken = info.SecurityToken
          uploadervideo.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
        }, 'json')
        console.log('文件开始上传...')
        
        console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
      },
      // 文件上传成功
      onUploadSucceed: function (uploadInfo) {
        console.log('uploadInfo',uploadInfo);
        videoId = uploadInfo.videoId;
        var mediaUrl = '';
        console.log('文件上传成功!');
        $.get('http://api.ikid06.ltd/oss/video-url?key='+videoId,function(data){
            mediaUrl = data.data.signed_url
            if(uploadInfo.file.type.indexOf('video')>-1){
              uploadervideo.editor.replaceSelection('<video class="mla-video" width="320" height="240" controls><source src="'+mediaUrl+'" type="video/mp4">您的浏览器不支持 video 标签。</video><br/>');
            }else if(uploadInfo.file.type.indexOf('audio')>-1){
              uploadervideo.editor.replaceSelection('<audio class="mla-audio" controls><source src="'+mediaUrl+'" type="video/mp4">您的浏览器不支持 video 标签。</audio><br/>');
            }
        })
        // $('#fileShow').append('<a href="javascript:;"><span onclick="del(this)" class="del"></span></a>');
        var obj=uploadInfo;
        localStorage.setItem("filetemp",obj);
      },
      // 文件上传失败
      onUploadFailed: function (uploadInfo, code, message) {
        console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
        console.log('文件上传失败!')
      },
      // 取消文件上传
      onUploadCanceled: function (uploadInfo, code, message) {
        console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
        console.log('文件已暂停上传!')

      },
      // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
      onUploadProgress: function (uploadInfo, totalSize, progress) {
        console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
        var progressPercents = Math.ceil(progress * 100)

        // $('#sts-progress-audio').text(progressPercents)
        console.log('文件上传中...')

      },
      // 上传凭证超时
      onUploadTokenExpired: function (uploadInfo) {
        // 如果是上传方式二即根据 STSToken 实现时，从新获取STS临时账号用于恢复上传
        // 上传文件过大时可能在上传过程中 sts token 就会失效, 所以需要在 token 过期的回调中调用 resumeUploadWithSTSToken 方法
        // 这里是测试接口, 所以我直接获取了 STSToken
        console.log('文件上传超时!')

        var stsUrl = 'http://api-dev.ikid06.ltdoss/sts-token';
        $.get(stsUrl, function (data) {
          var info = data.data;
          var accessKeyId = info.access_key_id;
          var accessKeySecret = info.access_key_secret;
          var secretToken = info.security_token;
          var expiration = info.expiration;
          uploadervideo.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, secretToken, expiration)
        }, 'json')
      },
      // 全部文件上传结束
      onUploadEnd: function (uploadInfo) {
//          $('#fileShow').append('<img src="../img/avatar.png"/>');
		
      }
    })
    return uploadervideo
  }

  var uploadervideo = null
  uploadervideo = createUploader()

