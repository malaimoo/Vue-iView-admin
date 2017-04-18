<template>
  <i-form ref="formLogin" :model="formLogin" :rules="formLoginRules" class="card-box">
    <Form-item class="formLogin-title">
      <h3>系统注册</h3>
    </Form-item>

    <Form-item prop="username">
      <i-input size="large" type="text" v-model="formLogin.username" placeholder="手机号">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </i-input>
    </Form-item>
    <Form-item prop="password">
      <i-input size="large" type="password" v-model="formLogin.password" placeholder="密码">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </i-input>
    </Form-item>

    <Form-item prop="captcha">

      <Row>
        <Col span="15">
        <i-input size="large" type="captcha" v-model="formLogin.captcha" placeholder="验证码">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </i-input>
        </Col>
        <Col span="8" offset="1">
        <Button @click.native="getCaptcha" size="large">获取验证码</Button>
        </Col>
      </Row>

    </Form-item>


    <Form-item class="login-no-bottom">
      <Row>
        <i-col :xs="{ span: 4, offset: 6 }">
          <i-button type="primary" @click="handleSubmit('formLogin')"> 注册</i-button>
        </i-col>
        <i-col :xs="{ span: 4, offset: 6 }">
          <i-button type="primary" @click="$router.push('Login')">登录</i-button>
        </i-col>
      </Row>
    </Form-item>


  </i-form>
</template>
<script>

  import api from '../api/apinew'
  import axios from 'axios'
  import Qs from 'qs'
  import validator from 'validator'

  const axiosconfig = {
    baseURL: 'http://cloud.smartkit.io/',
    method: 'GET',
    transformRequest: [
      function (data) {
        return data
        // return Qs.stringify(data);
      }],

    transformResponse: [
      function (data) {
        return data;
      }
    ],

    headers: {
      'Accept': 'application/json,text/html',
      'Content-Type': 'application/json;charset=UTF-8'
    },

    params: {},
    paramsSerializer: function (params) {
      return Qs.stringify(params)
    },

    timeout: 10000,
    withCredentials: false, // default
    responseType: 'json', // default

    //将upload事件注释掉，防止跨域状态下发起option请求
    // onUploadProgress: function(progressEvent) {
    // 	// Do whatever you want with the native progress event
    // },
    // onDownloadProgress: function(progressEvent) {
    // 	// Do whatever you want with the native progress event
    // },

    maxContentLength: 2000,
    validateStatus: function (status) {
      return status >= 200 && status < 500; // default
    },
    maxRedirects: 5, // default
  }

  export default {
    data () {
      return {
        formLogin: {
          username: '',
          password: '',
          captcha: '',
          remember: []
        },
        formLoginRules: {
          username: [
            {required: true, message: '请填写手机号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ],
          captcha: [
            {required: true, message: '请填写验证码', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {

      getCaptcha(mobile){
        if (validator.isMobilePhone(this.formLogin.username), 'zh_CN') {
          axios.get('http://cloud.smartkit.io/get_captcha', {
            params: {
              account: this.formLogin.username,
            },
            headers: {
              'Accept': 'application/json,text/html,text/html',
              'Content-Type': 'application/x-www-form-urlencoded '
            },
            paramsSerializer: function (params) {
              return Qs.stringify(params)
            },
          }).then(
            (resp) => {
              this.$Message.success('发送成功')
            }
          )
        } else {
          this.$Message.error('请输入正确的手机号!');
        }
      },

      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          sessionStorage.setItem('user', JSON.stringify(this.formLogin.username));
          if (valid) {
            axios.get('http://cloud.smartkit.io/register', {
              params: {
                account: this.formLogin.username,
                password: this.formLogin.password,
                captcha: this.formLogin.captcha,
              },
              headers: {
                'Accept': 'application/json,text/html,text/html',
                'Content-Type': 'application/x-www-form-urlencoded '
              },
              paramsSerializer: function (params) {
                return Qs.stringify(params)
              },
            }).then(
              (resp) => {
                if (resp.data.code == 200) {
                  this.$Message.success('注册成功')
                  this.$router.replace('Login')
                }else {
                  this.$Message.error('注册失败' + resp.data.code )
                }
              }
            ).reject(error => {
            })
          }
          else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      formLoginReset(name){
        this.$refs[name].resetFields();
      }
    },
    mounted() {

    }
  }
</script>


<style scoped>
  .card-box {
    padding: 20px;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    /*margin-bottom: 20px;*/
    background-color: #F9FAFC;
    margin: 180px auto;
    width: 400px;
    border: 1px solid #8492A6;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .formLogin-title {
    text-align: center;
    font-seze: 28px;
  }

  .formLogin-title h3 {
    font-size: 18px;
  }

  .login-no-bottom {
    margin-bottom: 10px;
  }

</style>
