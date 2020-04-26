
const downloadByBlob = function(res) {
  let url = window.URL.createObjectURL(new Blob([res.data]))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  let fileName = res.headers['content-disposition'].split('=')[1]
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
}
const convertData = function (res,callBack) {
  var reader = new FileReader();
  reader.readAsText(res.data);
  reader.onload = e => {
      if(e.target.result.indexOf('code') !== -1){
        callBack (JSON.parse(e.target.result));
      }else {
        callBack (res);
      }
  }
}
export default {
  downloadByBlob:downloadByBlob,
  convertData:convertData
}
