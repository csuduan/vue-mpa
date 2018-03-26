<template>
    <div class="mybox">
        <div class="login" id="login">
            <a href="javascript:;" class="log-close"><i class="icons close"></i></a>
            <div class="log-bg">

                <div class="log-logo">Welcome!</div>
                <div class="log-text">@doterlin</div>
            </div>
            <div class="log-email">
                <input type="text" placeholder="Email" :class="'log-input' + (account==''?' log-input-empty':'')" v-model="account"/>
                <input type="password" placeholder="Password" :class="'log-input' + (password==''?' log-input-empty':'')"  v-model="password"/>
                <a href="javascript:;" class="log-btn" @click="login">Login</a>
            </div>
            <Loading v-if="isLoging" marginTop="-30%"></Loading>
        </div>
    </div>

</template>

<script>
    import Loading from './loading.vue'
    import md5 from 'md5'
    import axios from 'axios'

    export default {
        name: 'Login',
        data() {
            return {
                isLoging: false,
                account: '',
                password: ''
            }
        },
        components: {
            Loading
        },
        methods: {
            //登录逻辑
            login() {
                if (this.account != '' && this.password != '') {
                    this.toLogin();
                }
            },
            //登录请求
            toLogin() {
                let password = md5(this.password);
                let param = {
                    account: this.account,
                    password: password
                }
                //设置在登录状态
                this.isLoging = true;
                axios.get('/api/login', {
                    params: param
                }).then((result) => {
                    let res = result.data
                    if (res.status == "0") {
                        let expireDays = 1000 * 60 * 60 * 24 * 15;
                        this.setCookie('user', res.result, expireDays);
                        this.isLoging = false;

                        sessionStorage.setItem('user', res.result)
                        this.$router.push('/');
                    } else {
                        this.$router.push('/');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .mybox {
        min-height: 100vh;
        display: flex;
        justify-content:center;
        align-items: center;


    }

    .login{
        margin-top: -100px;
        width: 500px; height: 555px;
        background: #fff;-webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
        border-radius: 5px; -webkit-box-shadow:  0px 3px 16px -5px #070707; box-shadow:  0px 3px 16px -5px #070707}





    .log-bg {
        background: url(/static/images/login-bg.jpg);
        width: 100%;
        height: 180px;
        /*overflow: hidden;*/
    }

    .log-logo {
        height: 80px;
        margin: 120px auto 25px;
        text-align: center;
        color: #1fcab3;
        font-weight: bold;
        font-size: 40px;
    }

    .log-text {
        color: #57d4c3;
        font-size: 13px;
        text-align: center;
        margin: 0 auto;
    }

    .log-logo, .log-text {
        z-index: 2
    }



    .login-email {
        height: 17px;
        width: 29px;
    }

    .log-btns {
        padding: 15px 0;
        margin: 0 auto;
    }

    .log-btn {
        width: 402px;
        /*行内元素转块元素*/
        display: block;
        text-align: left;
        line-height: 50px;
        margin: 0 auto 15px;
        height: 50px;
        color: #fff;
        font-size: 13px;
        -webkit-border-radius: 5px;
        background-color: #3B5999;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
        border-radius: 5px;
    }

    .log-btn.tw {
        background-color: #13B4E9
    }

    .log-btn.email {
        background-color: #50E3CE
    }

    .log-btn:hover, .log-btn:focus {
        color: #fff;
        opacity: .8;
    }

    .log-email {
        text-align: center;
        margin-top: 20px;
    }

    .log-email .log-btn {
        background-color: #50E3CE;
        text-align: center;
    }

    .log-input-empty {
        border: 1px solid #f37474 !important;
    }

    .isloading {
        background: #d6d6d6
    }

    .log-btn .icons {
        margin-left: 30px;
        vertical-align: middle;
    }

    .log-btn .text {
        left: 95px;
        line-height: 50px;
        text-align: left;
    }

    .log-input {
        width: 370px;
        padding: 0 15px;
        font-size: 13px;
        border: 1px solid #EBEBEB;
        margin: 0 auto 15px;
        height: 48px;
        line-height: 48px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
        border-radius: 5px;
    }

    .log-input.warn {
        border: 1px solid #f88787
    }

</style>
