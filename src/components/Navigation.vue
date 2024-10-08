<script setup>
import {ref, watch} from 'vue';
import router from '@/router';

import {store} from '@/utils/store';
import {useDisconnect} from "@web3modal/solana/vue";

const { disconnect } = useDisconnect();
const userAddress = ref('Please log in first')

const isPic = ref('')

const emit = defineEmits(['updateValue'])

const props = defineProps({
    navigation: Boolean,
    isLoginLeft:Boolean
});

const closeNavigation = () => {
    emit('updateValue')
}

const goRoute = (item) => {
    closeNavigation()
    if(item == 'column'){
        localStorage.setItem('columnNum',2)
    }
    router.push({ name: item })
}

const closeWallet = () => {
    store.changeLogin()
    localStorage.removeItem('headPic')
    localStorage.removeItem('Account')
    localStorage.removeItem('token')
    localStorage.removeItem('userAddress')
    localStorage.removeItem('userSigner')
    localStorage.removeItem('userName')
    disconnect()
    // props.isLoginLeft = false
    emit('updateValue')
}

watch(
    () => store.loginToken,
    (newValue, oldValue) => {
      if (newValue) {
          userAddress.value = localStorage.getItem('userName')
          isPic.value = localStorage.getItem('headPic')
          props.isLoginLeft = true
      }
    }
);
</script>

<template>
    <div class="navigation" ref="navigationVisible" :style="navigation?'opacity:1;z-index:999;':'opacity:0;'">
        <div class="navigation-box" ref="navigationBox">
            <div class="navigation-li" @click="goRoute('home')">
                <img src="../assets/images/SVG/home.svg" alt="">
                <span>HOME</span>
            </div>
            <div class="navigation-li" @click="goRoute('column')">
                <img src="../assets/images/SVG/explore.svg" alt="">
                <span>EXPLORE</span>
            </div>
            <div class="navigation-li" @click="goRoute('profile')">
                <img src="../assets/images/SVG/account.svg" alt="">
                <span>ACCOUNT</span>
            </div>
            <div class="navigation-li" @click="goRoute('about')">
                <img src="../assets/images/SVG/about.svg" alt="">
                <span>ABOUT</span>
            </div>
            <div class="navigation-btn navigation-top" @click="goRoute('generate')">
                <p>GENERATE</p>
            </div>
            <div class="navigation-btn" @click="goRoute('column')">
                <p>MARKETPLACE</p>
            </div>
            <div class="navigation-btn" @click="goRoute('submit')">
                <p>SUBMIT RWA</p>
            </div>
            <div class="navigation-tag tag-tops" @click="goRoute('help')">
                <img src="../assets/images/SVG/help.svg" alt="">
                <span>Help</span>
            </div>
            <div class="navigation-tag" @click="goRoute('contact')">
                <img src="../assets/images/SVG/contact.svg" alt="">
                <span>Contact us</span>
            </div>
            <div class="navigation-web3">
                <div class="web3-left">
                    <img v-if="isLoginLeft" :src="isPic" alt="">
                    <span v-if="isLoginLeft">{{userAddress}}</span>
                    <button v-if="!isLoginLeft" class="loginbtn">LOGIN</button>
                </div>
                <div :class="isLoginLeft?'web3-btn':'web3-btns'" @click="closeWallet">
                    <img v-if="isLoginLeft" src="../assets/images/SVG/enter.svg" alt="">
                    <button v-if="!isLoginLeft" class="signbtn">SIGN UP</button>
                </div>
            </div>
            <div class="search-btn">
                <a href="#">
                    <img src="../assets/images/SVG/twitter.svg" alt="">
                </a>
                <a href="#">
                    <img src="../assets/images/SVG/discord.svg" alt="">
                </a>
                <a href="#">
                    <img src="../assets/images/SVG/template.svg" alt="">
                </a>
            </div>
            
        </div>
        <div class="navigation-close" @click="closeNavigation">
                <img src="../assets/images/SVG/close.svg" alt="">
            </div>
        <div class="closebox" :style="navigation?'width:100%;':'width:0;'" @click="closeNavigation"></div>
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-thumb {
    background-color: #fff;
    border-radius: 6px;
}

::-webkit-scrollbar-track {
    background: #191919;
    border-radius: 6px;
}
.navigation {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 342px;
    /* width: 0; */
    height: 100vh;
    background-color: #141414;
    /* overflow: hidden; */
    z-index: 100;
    opacity: 0;
    z-index: -1;
    transition: all .3s ease-in-out;
}

.navigation-box {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 55px;
    /* opacity: 0; */
    z-index: 110;
    overflow-x: hidden;
}

.navigation-li {
    display: flex;
    align-items: center;
    margin-top: 25px;
    cursor: pointer;
}

.navigation-li img {
    width: 30px;
    height: 30px;
    overflow: hidden;
    object-fit: cover;
}

.navigation-li span {
    font-size: 25px;
    color: #fff;
    font-weight: 500;
    margin-left: 15px;
}

.navigation-btn {
    width: 100%;
    height: 54px;
    /* background-color: #1e1e1e; */
    margin-top: 8px;
    text-align: center;
    line-height: 54px;
    border-radius: 12px;
    font-size: 20px;
    color: #fff;
    border: 1px solid #1e1e1e;
    cursor: pointer;
}
.navigation-top {
    margin-top: 35px;
}

.navigation-tag {
    display: flex;
    align-items: center;
    margin-top: 25px;
    cursor: pointer;
}

.tag-tops {
    margin-top: 55px;
}

.navigation-tag img {
    width: 20px;
    height: 20px;
    object-fit: cover;
}

.navigation-tag span {
    color: #fff;
    font-size: 16px;
    margin-left: 8px;
}

.navigation-web3 {
    display: flex;
    width: 100%;
    height: 55px;
    /* background-color: #464646; */
    margin-top: 35px;
    /* border-radius: 12px; */
    /* padding: 10px 15px; */
    align-items: center;
    justify-content: space-between;
}

.web3-left {
    display: flex;
    align-items: center;
}

.web3-left img {
    width: 35px;
    height: 35px;
    overflow: hidden;
    object-fit: cover;
}

.web3-left span {
    font-size: 14px;
    color: #fff;
    margin-left: 10px;
}

.web3-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 35px;
    background-color: #fff;
    border-radius: 6px;
    cursor: pointer;
}
.web3-btns {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: auto;
    background-color: #fff;
    border-radius: 6px;
    cursor: pointer;
}

.web3-btn img {
    width: 25px;
    height: 25px;
    object-fit: contain;
}

.loginbtn {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
  border: 0;
  cursor: pointer;
}

.signbtn {
  font-size: 16px;
  font-weight: 500;
  padding: 10px 10px;
  background-color: #ffff00;
  border-radius: 8px;
  border: 0px;
  cursor: pointer;
}

.search-btn {
    margin-top: 35px;
    width: 100%;
}

.search-btn a {
    display: inline-block;
    width: 25px;
    height: 25px;
    overflow: hidden;
    margin-right: 15px;
}

.search-btn a img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.navigation-close {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background-color: #fff;
    border-radius: 24px;
    right: -55px;
    top: 25px;
    cursor: pointer;
    z-index: 101;
}

.navigation-close img {
    width: 20px;
    height: 20px;
    object-fit: contain;
}
.closebox {
    position: fixed;
    width: 0%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: rgba(0,0,0,.4);
}
</style>