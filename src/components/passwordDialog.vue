<template>
  <div>
    <div v-loading="loading">
      <div class="password-box">
        <ul class="loin-pwd">
          <li>
            <input id="old_pwd_hidden"  name="old_pwd_hidden" class="input"/>
            <input id="new_pwd_hidden"  name="new_pwd_hidden" class="input" type="password"/>
          </li>
          <li>
            <div>
              <span class="label-txt">原密码：</span>
              <input v-model="oldPassword" placeholder="请输入原密码"  maxlength="20" class="input" aria-required="true" autocomplete="new-password"/>
            </div>
            <p class="txt-tip">{{oldPasswordTip}}</p>
          </li>
          <li v-for="(item,index) in pwdData" :key="index">
            <div>
              <span class="label-txt">{{item.txt+'：'}}</span>
              <input :placeholder="item.content" v-model="item.password" maxlength="20" aria-required="true"  :type="item.eyeFlag===false?'password':'text'" @input="passwordInput($event,index)" class="input" autocomplete='new-password'/>
              <i :class="'icon-tip iconfont '+(item.eyeFlag===''?'':item.eyeFlag===true?'icon-icon_visible':'icon-icon_invisible')" @click="toggleEye(index)"></i>
            </div>
            <p class="txt-tip">{{item.tip}}</p>
          </li>

        </ul>
        <div class="btn-box">
          <button @click="submit" class="btn-main small" type="primary">确认</button>
          <button class="btn-main small" type="primary" @click="cancel">取消</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Login from '../service/api/login'
import message from '../components/messageDialog'
let login;
export default {
  name: 'passwordDialog',
    props:{
        param:Object
    },
    data() {
        return {
            pwdData:[
                {txt:'新密码',eyeFlag:'',password:'',tip:'',content:'请输入新密码'},
                {txt:'确认密码',eyeFlag:'',password:'',tip:'',content:'请再次输入新密码'}
            ],
            oldPassword:'',
            oldPasswordTip:'',
            loading:false

        }
    },
    methods: {
        checkValue:function(){
            let flag = true;
            if(this.oldPassword.trim()==''){
                this.oldPasswordTip='请输入原密码';
                flag = false;
            }else{
                this.oldPasswordTip='';
            }
            if(this.pwdData[0].password.length<6){
                this.pwdData[0].tip='新密码不少于6位数';
                flag = false;
            }else{
                this.pwdData[0].tip='';
            }
            if(this.pwdData[1].password&&this.pwdData[0].password!=this.pwdData[1].password){
                this.pwdData[1].tip='两次输入的新密码应一致';
                flag = false;
            }else{
                this.pwdData[1].tip='';
            }
            if(this.pwdData[0].password && this.pwdData[1].password==''){
                this.pwdData[1].tip='请再次输入新密码';
                flag = false;
            }
            return flag;
        },
        toggleEye:function (index) {
            this.pwdData[index].eyeFlag=!this.pwdData[index].eyeFlag;
        },
        passwordInput:function(e,index){
            this.pwdData[index].eyeFlag=!this.pwdData[index].password?'':this.pwdData[index].eyeFlag===true;
            this.pwdData[index].password=this.pwdData[index].password.replace(/[\u4E00-\u9FA5]/g,'');
            this.checkValue();
        },
        submit:function () {
            var _this = this;

            if(!this.checkValue()) return;
            this.loading=true;
            login[this.param.role+'ModifyPwd']({
                old_pwd:_this.oldPassword,
                new_pwd:_this.pwdData[0].password.trim()
            },function (data) {
                _this.loading=false;
                if(data.code==0){
                    _this.$openDialog({
                        title:'消息提示',
                        content:message,
                        showClose:false,
                        param:{message:'密码修改成功，请重新登录',submit:function () {
                                window.location.href = '/';
                            }}})

                   // _this.$closeDialog();
                }else{
                    _this.$codeMessage(data.code,function () {
                      if(data.code===-2){
                        _this.oldPasswordTip='旧密码错误';
                      }else{
                        _this.$notice_message({type:'error',content:'修改密码失败'});
                      }
                    })
                }
            })
        },
        cancel:function () {
            this.$closeDialog(this.param);
        }
    },
    mounted() {
        login = new Login(this);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $font_size:1rem;
  $font_color_tip: #9CE3FF;
  .password-box{
    /*width:500px;*/
    padding:10px;
    font-size:$font_size;
    color:$color_main_txt;
    .btn-ok{
      margin-right:20px;
    }
  }
  .loin-pwd{
    padding: 20px 50px 0;
    li{
      position:relative;
      span{
        margin-right:10px;
      }
      input{
        padding: 8px 14px;
        background: none;
        width: 220px;
        height:20px;
        font-size:$font_size;
        color:$color_main_txt;
      }
    }
    li:first-child{
      position: absolute;
      z-index: -1;
      opacity: 0;
    }
    .txt-tip{
      color: $font_color_tip;
      font-size: .8rem;
      text-align: right;
      line-height: 2rem;
      height:2rem;
    }
    .icon-tip{
      font-size: 32px;
      position: absolute;
      right: .5rem;
      cursor: pointer;
      color: $font_color_tip;
      top: 4px;
    }
  }
  input::-ms-clear{display:none;}/*隐藏文本框叉子*/
  input[type=password]::-ms-reveal { display: none; }
  input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
    -webkit-text-fill-color: #ededed !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
    background-color:transparent;
    background-image: none;
    transition: background-color 50000s ease-in-out 0s;
  }
  input {
    background-color: transparent!important;
    caret-color: #fff;
  }
</style>
