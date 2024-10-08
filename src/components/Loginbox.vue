<script setup>
import {googleAuthCodeLogin} from "vue3-google-login"
import axios from '@/utils/axios'
import {ref} from "vue";
import {useDisconnect} from "@web3modal/solana/vue";

const props = defineProps({
    LoginVisible: Boolean,
});

const { disconnect } = useDisconnect();

const emial = ref('')

const emit = defineEmits(["LoginChange","LoginPrize","loginSolana"]);

const closeBox = () => {
    isEmail.value = true
    // localStorage.removeItem('headPic')
    // localStorage.removeItem('Account')
    // localStorage.removeItem('token')
    // localStorage.removeItem('userAddress')
    // localStorage.removeItem('userSigner')
    // localStorage.removeItem('userName')
    // disconnect()
    emit('LoginChange')
}

const login = async () => {
  const res = await googleAuthCodeLogin()
  const reslogin = await axios.get('/tsg/login/googleLogin',{
    params:{
        code:res.code
    }
  })
  if(reslogin.data.code){
    localStorage.setItem("token", reslogin.data.data.token);
    localStorage.setItem("Account", reslogin.data.data.playerName);
    localStorage.setItem("headPic", reslogin.data.data.avatarUrl);
    emit('LoginPrize',reslogin.data.data)
  }
}

const isEmail = ref(true)
const CAPTCHA = ref('')

const submit = async () => {
    if(emial.value == ''){
        alert('Email cannot be empty')
    }

    const res = await axios.get('/ygy/login/sendLoginMail',{
        params:{
            email:emial.value
        }
    })

    if(res.data.code == 200){
        alert('Sent successfully')
        isEmail.value = false
    }
}

const codeLogin = async () => {
    if(emial.value == ''){
        alert('Email cannot be empty')
    }
    if(CAPTCHA.value == ''){
        alert('The verification code cannot be empty')
    }

    const res = await axios.get('/tsg/login/emailLogin',{
        params:{
            email:emial.value,
            code:CAPTCHA.value
        }
    })

    if(res.data.code == 200){
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("Account", res.data.data.account);
        localStorage.setItem("headPic", res.data.data.headPic);
        emit('LoginPrize',res.data.data)
    }
}

const loginWallet = () => {
    emit('loginSolana')
}

const tsgVisible = ref(false)

</script>

<template>
    <div class="login-terms" v-if="LoginVisible">
        <div class="back-close" @click="closeBox"></div>
        <div class="login-box">
            <div class="logo">
                <img src="../assets/images/logopage.png" alt="">
            </div>
            <div class="email-box" v-if="tsgVisible">
                <div :class="isEmail?'email':'email cold'">
                    <svg t="1723690960690" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5149" width="30" height="30"><path d="M868.1 932H155.9c-77.4 0-140.3-62.9-140.3-140.3V232.3c0-77.4 63-140.3 140.3-140.3H868c77.4 0 140.3 62.9 140.3 140.3v559.4c0.1 77.4-62.9 140.3-140.2 140.3zM155.9 146.5c-47.3 0-85.8 38.5-85.8 85.8v559.4c0 47.3 38.5 85.8 85.8 85.8H868c47.3 0 85.7-38.5 85.7-85.8V232.3c0-47.3-38.5-85.8-85.7-85.8H155.9z" p-id="5150" fill="#919191"></path><path d="M511.9 557.7c-3.3 0-6.5-1-9.4-2.9l-467.6-326c-7.4-5.2-9.2-15.4-4.1-22.8 5.2-7.4 15.4-9.2 22.8-4.1l458.3 319.4L970.4 202c7.4-5.2 17.6-3.3 22.8 4.1 5.2 7.4 3.3 17.6-4.1 22.8L521.3 554.8a16.8 16.8 0 0 1-9.4 2.9z" p-id="5151" fill="#919191"></path></svg>
                    <input type="text" v-model="emial" placeholder="your@email.com">
                    <span @click="submit">Submit</span>
                </div>
                <div :class="isEmail?'code':'code codeinput'">
                    <input type="text" v-model="CAPTCHA" placeholder="Verification Code">
                </div>
                <div :class="isEmail?'sbumitbtn':'sbumitbtn enterbtn'" @click="codeLogin">
                    <p>Enter</p>
                </div>
            </div>
            <div class="google" v-if="tsgVisible" @click="login">
                <svg t="1723771924053" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4273" width="30" height="30"><path d="M214.101333 512c0-32.512 5.546667-63.701333 15.36-92.928L57.173333 290.218667A491.861333 491.861333 0 0 0 4.693333 512c0 79.701333 18.858667 154.88 52.394667 221.610667l172.202667-129.066667A290.56 290.56 0 0 1 214.101333 512" fill="#FBBC05" p-id="4274"></path><path d="M516.693333 216.192c72.106667 0 137.258667 25.002667 188.458667 65.962667L854.101333 136.533333C763.349333 59.178667 646.997333 11.392 516.693333 11.392c-202.325333 0-376.234667 113.28-459.52 278.826667l172.373334 128.853333c39.68-118.016 152.832-202.88 287.146666-202.88" fill="#EA4335" p-id="4275"></path><path d="M516.693333 807.808c-134.357333 0-247.509333-84.864-287.232-202.88l-172.288 128.853333c83.242667 165.546667 257.152 278.826667 459.52 278.826667 124.842667 0 244.053333-43.392 333.568-124.757333l-163.584-123.818667c-46.122667 28.458667-104.234667 43.776-170.026666 43.776" fill="#34A853" p-id="4276"></path><path d="M1005.397333 512c0-29.568-4.693333-61.44-11.648-91.008H516.650667V614.4h274.602666c-13.696 65.962667-51.072 116.650667-104.533333 149.632l163.541333 123.818667c93.994667-85.418667 155.136-212.650667 155.136-375.850667" fill="#4285F4" p-id="4277"></path></svg>
                <span>Google</span>
            </div>
            <button class="wallet" @click="loginWallet()">CONNECT WALLET</button>
            <p class="title">By logging in I agree to the <span>Terms</span> & <span>Privacy Policy</span></p>
            <p class="title">Protected by Privy</p>
        </div>
    </div>
</template>

<style scoped>
input:focus {
    outline: none;
}

.login-terms {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
}

.back-close {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.4);
    z-index: 1000;
}

.login-box {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 720px;
    max-width: 50%;
    height: auto;
    padding: 45px 60px;
    background-color: #fff;
    border-radius: 14px;
    z-index: 1100;
}

.logo {
    width: 140px;
    height: auto;
    margin: 0 auto;
}
.logo > img {
    width: 100%;
    height: auto;
    filter: brightness(0);
    margin: 0 auto;
}

.email-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.email,.google,.wallet {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: 68px;
    margin-top: 25px;
    border: 1px solid #ccc;
    padding: 15px 25px;
    border-radius: 10px;
    transition: width .6s ease-in-out;
}

.email.cold{
    width: 48%;
}
.email > input {
    width: 100%;
    font-size: 18px;
    padding: 5px 25px;
    border: 0;
    color: #919191;
    box-sizing:border-box;
}

.email > span {
    font-size: 18px;
    color: #929292;
    cursor: pointer;
}

.code {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 0%;
    height: 68px;
    margin-top: 25px;
    border: 1px solid #ccc;
    padding: 0px;
    border-radius: 10px;
    transition: width .6s ease-in-out;
    opacity: 0;
    overflow: hidden;
}

.codeinput {
    opacity: 1;
    width: 28%;
    padding: 0px;
}

.codeinput > input {
    width: 100%;
    font-size: 18px;
    padding: 5px 15px;
    border: 0;
    color: #919191;
    box-sizing:border-box;
}

.sbumitbtn {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 0%;
    height: 68px;
    margin-top: 25px;
    border: 1px solid #ccc;
    padding: 0px;
    border-radius: 10px;
    transition: width .6s ease-in-out;
    opacity: 0;
    background-color: #ffff00;
    user-select: none;
    overflow: hidden;
    cursor: pointer;
}

.sbumitbtn p {
    width: 100%;
    color: #000;
    text-align: center;
}

.enterbtn {
    font-size: 18px;
    color: #919191;
    text-align: center;
    width: 18%;
    opacity: 1;
}

.google {
    user-select: none;
    cursor: pointer;
}

.google:active {
    color: #ffff00;
    background-color: #000;
}

.google > span {
    font-size: 18px;
    font-weight: 500;
    margin-left: 25px;
}
.title {
    font-size: 16px;
    color: #919191;
    font-weight: 500;
    text-align: center;
    margin-top: 15px;
    font-family: 'Italic-variable';
}
.title>span {
    color: #000;
}

.wallet {
    cursor: pointer;
    justify-content: center;
    font-size: 20px;
    background-color: #000;
    color: #fff;
}
.wallet:hover {
    background-color: #fff;
    color: #000;
}
.wallet:active {
    background-color: #fff;
}
</style>