<script setup>
import {ref} from 'vue';

const activeNum = ref(0)

const openActive = (num) => {
    if(num == activeNum.value){
        return
    }
    activeNum.value = num
}
</script>

<template>
    <div class="walletbox">
        <div class="box">
            <div class="header">
                <div class="close-wallet">
                    <div class="close-img">
                        <img src="../assets/images/wwallet.png" alt="">
                        <span>wallet 01</span>
                    </div>
                    <div class="close-tag">
                        <svg t="1725440042023" class="icon" viewBox="0 0 1414 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5914" width="20" height="20"><path d="M271.224593 335.797077l408.802285 404.972283c0.604737 0.604737 1.411053 0.806316 2.01579 1.310264 0.10079 0.10079 0.201579 0.403158 0.302369 0.503948 14.513691 14.412901 37.997648 14.312112 52.410549-0.201579L1139.694272 333.680497c14.412901-14.513691 14.312112-37.896859-0.201579-52.30976-7.189652-7.088863-16.697463-10.683689-26.104485-10.683689-9.507811 0-19.082815 3.695616-26.306064 10.986057L707.911977 664.270116 323.332773 283.285738c-7.189652-7.088863-16.596674-10.683689-26.104485-10.683689-9.608601 0-19.082815 3.695616-26.306064 10.986057C256.54292 297.900218 256.744499 321.384176 271.224593 335.797077L271.224593 335.797077z" fill="#e6e6e6" p-id="5915"></path></svg>
                    </div>
                </div>
                <div class="close-btn">
                    <svg t="1725439319531" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4568" width="24" height="24"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128L512.128 467.904l-263.04-263.84c-12.448-12.48-32.704-12.544-45.248-0.064-12.512 12.48-12.544 32.736-0.064 45.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248a31.937 31.937 0 0 0 22.688 9.44c8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408a31.94 31.94 0 0 0 22.592-9.344c12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" fill="#ffffff" p-id="4569"></path></svg>
                </div>
            </div>
            <div class="wallet-prize">$ 0.00</div>
            <div class="wallet-tag">
                <div :class="activeNum == 0 ? 'active':''" @click="openActive(0)">Deposit</div>
                <div :class="activeNum == 1 ? 'active':''" @click="openActive(1)">Withdrow</div>
                <div :class="activeNum == 2 ? 'active':''" @click="openActive(2)">Transfer Balance</div>
                <div :class="activeNum == 3 ? 'active':''" @click="openActive(3)">Buy Crypto</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.walletbox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .3);
    z-index: 100;
}

.box {
    max-width: 560px;
    width: 80%;
    height: auto;
    padding: 20px;
    background-color: #000;
    border-radius: 12px;
    border: 1px solid #ccc;
}

.header {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
}

.close-wallet {
    display: flex;
    width: 160px;
    height: 38px;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(235, 235, 235, .2);
    color: #fff;
    padding: 0 10px;
}

.close-img {
    display: flex;
    align-items: center;
}

.close-img img {
    width: 24px;
    height: 24px;
}

.close-img span {
    margin-left: 10px;
    font-size: 14px;
}

.close-tag {
    cursor: pointer;
}

.close-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: rgba(235, 235, 235, .2);
    cursor: pointer;
}

.close-btn img {
    width: 20px;
    height: 20px;
    object-fit: contain;
}

.wallet-prize {
    margin: 50px auto;
    color: #fff;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
}

.wallet-tag {
    display: flex;
    align-items: center;
    width: 100%;

    border-bottom: 1px solid rgba(235, 235, 235, .8);
    color: #fff;
}

.wallet-tag>div {
    text-align: center;
    padding: 20px 0;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    user-select: none;
}
.wallet-tag>div:nth-child(1) {
    width: 20%;
}
.wallet-tag>div:nth-child(2) {
    width: 20%;
}
.wallet-tag>div:nth-child(3) {
    width: 30%;
}
.wallet-tag>div:nth-child(4) {
    width: 30%;
}
.wallet-tag>div.active {
    border-bottom: 3px solid #fff;
}
</style>