import  util from '../utils/index';
function Login(vue){
    this.$vue = vue;
}
Login.prototype.customModifyPwd = function () {
    var args = util.argumentsFmt(arguments);
    this.$vue.$http.post('/user/change_pwd',args.param)
        .then((res) => {
            args.callBack(res.data);
        })
        .catch((e) => {
            args.callBack(e);
        })
        .finally(() => {
            args.final()
        })
}
Login.prototype.adminModifyPwd = function () {
  var args = util.argumentsFmt(arguments);
  this.$vue.$http.post('/user/admin/change_pwd',args.param)
  .then((res) => {
    args.callBack(res.data);
  })
  .catch((e) => {
    args.callBack(e);
  })
  .finally(() => {
    args.final()
  })
}
Login.prototype.login = function () {
    var args = util.argumentsFmt(arguments);
    this.$vue.$http.post( '/user/login',args.param)
        .then((res) => {
            args.callBack(res.data);
        })
        .catch((e) => {
            args.callBack(e);
        })
        .finally(() => {
            args.final()
        })
}
Login.prototype.logout = function () {
  var args = util.argumentsFmt(arguments);
  this.$vue.$http.get( '/user/logout',args.param)
  .then((res) => {
    args.callBack(res.data);
  })
  .catch((e) => {
    args.callBack(e);
  })
  .finally(() => {
    args.final()
  })
}
Login.prototype.shutdown = function () {
  var args = util.argumentsFmt(arguments);
  this.$vue.$http.get( '/user/shutdown',args.param)
  .then((res) => {
    args.callBack(res.data);
  })
  .catch((e) => {
    args.callBack(e);
  })
  .finally(() => {
    args.final()
  })
}
export default Login;
