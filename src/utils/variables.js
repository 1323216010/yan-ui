  // 定义一些公共的属性和方法
  // const kkIp = 'http://120.46.176.87:8012'
  const kkIp = 'http://111.230.194.21:8012'
  const onlinePreview = kkIp + '/onlinePreview?url=';
  const downloadFile = kkIp + '/demo/'

  // const fileUpload = kkIp + '/fileUpload';
  const fileUpload = 'http://localhost:8080/files/review' + '/fileUpload';

  // const deleteFile = kkIp + '/deleteFile';
  const deleteFile = 'http://111.230.194.21:8333/admin/vod/file' + '/deleteFile';

   // 暴露出这些属性
  export default {
    fileUpload,
    onlinePreview,
    downloadFile,
    deleteFile,
  }