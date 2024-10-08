<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import router from '@/router';
import Winvideo from '@/components/Winvideo.vue';
import list1 from '@/assets/images/testimg/1x/list1.png'
import list2 from '@/assets/images/testimg/1x/list2.png'
import list3 from '@/assets/images/testimg/1x/list3.png'
import list4 from '@/assets/images/testimg/1x/list4.png'

const route = useRoute()


onMounted(() => {

})

const detailInfonumber = ref(true)
const detailInfo = ref(null)
const detailInfoimg = ref(null)
const changeInfo = () => {
    if (detailInfonumber.value) {
        detailInfo.value.style = 'height:64px;'
        detailInfoimg.value.style = 'transform:rotateZ(180deg);'
        detailInfonumber.value = !detailInfonumber.value
    } else {
        detailInfo.value.style = ''
        detailInfoimg.value.style = ''
        detailInfonumber.value = !detailInfonumber.value
    }
}

const detailDesumber = ref(true)
const detailDes = ref(null)
const detailDesimg = ref(null)
const changeDes = () => {
    if (detailDesumber.value) {
        detailDes.value.style = 'height:68px;'
        detailDesimg.value.style = 'transform:rotateZ(180deg);'
        detailDesumber.value = !detailDesumber.value
    } else {
        detailDes.value.style = ''
        detailDesimg.value.style = ''
        detailDesumber.value = !detailDesumber.value
    }
}

const detailOffersumber = ref(true)
const detailOffers = ref(null)
const detailOffersimg = ref(null)
const changeOffers = () => {
    if (detailOffersumber.value) {
        detailOffers.value.style = 'height:68px;'
        detailOffersimg.value.style = 'transform:rotateZ(180deg);'
        detailOffersumber.value = !detailOffersumber.value
    } else {
        detailOffers.value.style = ''
        detailOffersimg.value.style = ''
        detailOffersumber.value = !detailOffersumber.value
    }
}

const detailHistoryumber = ref(true)
const detailHistory = ref(null)
const detailHistoryimg = ref(null)
const changeHistory = () => {
    if (detailHistoryumber.value) {
        detailHistory.value.style = 'height:68px;'
        detailHistoryimg.value.style = 'transform:rotateZ(180deg);'
        detailHistoryumber.value = !detailHistoryumber.value
    } else {
        detailHistory.value.style = ''
        detailHistoryimg.value.style = ''
        detailHistoryumber.value = !detailHistoryumber.value
    }
}

const gachaList = ref([
    {
        img: list1,
        index: 1
    },
    {
        img: list2,
        index: 2
    },
    {
        img: list3,
        index: 3
    },
    {
        img: list4,
        index: 4
    }
])
const gachaImg = ref(gachaList.value[0].img)
const DetailImg = ref('1')
const changeList = (e) => {
    DetailImg.value = e
    gachaImg.value = gachaList.value[e - 1].img
}

const videoVisible = ref(false)

const buyNow = () => {
    videoVisible.value = !videoVisible.value
    
}

const enterVideo = () => {
    videoVisible.value = !videoVisible.value
    router.push({
        name: 'redeem'
    })
}
</script>

<template>
    <p class="title">Card Details</p>
    <div class="detail">
        <div class="detail-left">
            <div class="detail-img">
                <img :src="gachaImg" alt="">
            </div>
            <div class="detail-list">
                <div v-for="item in gachaList" :key="item.index" :class="DetailImg == item.index ? 'active' : ''"
                    @click="changeList(item.index)">
                    <img :src="item.img" alt="">
                </div>
            </div>
            <div class="detail-info" ref="detailInfo">
                <div class="info-title">
                    <div class="info-left">
                        <img src="../assets/images/SVG/info.svg" alt="">
                        <span>Info</span>
                    </div>
                    <div class="info-right" ref="detailInfoimg" @click="changeInfo">
                        <img src="../assets/images/SVG/reture.svg" alt="">
                    </div>
                </div>
                <div class="info-text">
                    <div class="info-word">
                        <span>Standard</span>
                        <span>ERC-721 token on the blockchain</span>
                    </div>
                    <div class="info-word">
                        <span>Chain</span>
                        <span>Solana</span>
                    </div>
                    <div class="info-word">
                        <span>StandToken ID</span>
                        <span class="info-address">106475...7325</span>
                    </div>
                    <div class="info-word">
                        <span>Contract address</span>
                        <span class="info-address">0x251B...dcAD</span>
                    </div>
                    <div class="info-word">
                        <span>Owner address</span>
                        <span class="info-address">0x5C7a...f51d</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-right">
            <div class="detail-right-title">
                <div class="right-img">
                    <img src="../assets/images/SVG/avater.svg" alt="">
                    <span>Est Value</span>
                </div>
                <div class="right-text">
                    <p>GENRE</p>
                </div>
            </div>
            <div class="detail-right-text">
                <p>2001 Pokemon 3 Movie</p>
                <p>Promo #34 Entei</p>
                <p>(PSA 9 MINT)</p>
            </div>
            <div class="detail-right-buy">
                <p>Est Value</p>
                <p>$ 1,000</p>
                <div class="buy-btn" @click="buyNow">
                    <p>BUY NOW</p>
                </div>
            </div>
            <div class="detail-right-des" ref="detailDes">
                <div class="des-title">
                    <div class="des-img">
                        <img src="../assets/images/SVG/detail.svg" alt="">
                        <span>Detail</span>
                    </div>
                    <div class="des-top" ref="detailDesimg" @click="changeDes">
                        <img src="../assets/images/SVG/reture.svg" alt="">
                    </div>
                </div>
                <div class="des-box">
                    <p><span>DESCRIPTION : </span>XXXXXXXXXXXXXXXXXXXX</p>
                </div>
            </div>
            <div class="detail-right-offers" ref="detailOffers">
                <div class="offers-title">
                    <div class="offers-img">
                        <img src="../assets/images/SVG/detail.svg" alt="">
                        <span>Offers</span>
                    </div>
                    <div class="offers-top">
                        <span>Top offers $25.00</span>
                        <img src="../assets/images/SVG/reture.svg" alt="" ref="detailOffersimg" @click="changeOffers">
                    </div>
                </div>
                <div class="offers-box">
                    <div class="offers-item" v-for="item in 5" :key="item">
                        <div>
                            <p class="offers-prize">$ 10.00</p>
                            <p class="offers-from">From : <span class="offers-name">mm1</span></p>
                        </div>
                        <div>
                            <p>Expires : in 6 days</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detail-right-history" ref="detailHistory">
                <div class="history-title">
                    <div class="history-img">
                        <img src="../assets/images/SVG/detail.svg" alt="">
                        <span>history</span>
                    </div>
                    <div class="history-top" ref="detailHistoryimg" @click="changeHistory">
                        <img src="../assets/images/SVG/reture.svg" alt="">
                    </div>
                </div>
                <div class="history-box">
                    <div class="history-item" v-for="item in 5" :key="item">
                        <div>
                            <div class="history-tag">
                                <img src="../assets/images/SVG/tags.svg" alt="">
                                <p>Sale</p>
                            </div>
                            <p class="history-prize">$ 10.00</p>
                            <p class="history-from">From : <span class="history-name">mm1</span></p>
                        </div>
                        <div class="history-to">
                            <p>To : <span>jayhawnft</span></p>
                            <p>10 days ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Winvideo v-if="videoVisible" @enterVideo="enterVideo"></Winvideo>
</template>

<style scoped>
/* 定制滚动条的整体样式 */
::-webkit-scrollbar {
    width: 6px;
    /* 滚动条的宽度 */
}

/* 定制滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
    background-color: #fff;
    /* 滚动条滑块的颜色 */
    border-radius: 6px;
    /* 滚动条滑块的圆角 */
}

/* 定制滚动条轨道的样式 */
::-webkit-scrollbar-track {
    background: #191919;
    /* 滚动条轨道的颜色 */
    border-radius: 6px;
    /* 滚动条轨道的圆角 */
}

.title {
    font-size: 25px;
    color: #fff;
    text-align: left;
}

.detail {
    display: flex;
    justify-content: space-between;
    margin-top: 75px;
}

.detail-left {
    width: 515px;
    height: auto;
}

.detail-img {
    width: 100%;
    height: 515px;
    border-radius: 12px;
    overflow: hidden;
}

.detail-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.detail-list {
    display: flex;
    align-items: center;
    margin-top: 25px;
}

.detail-list div {
    position: relative;
    width: 110px;
    height: 110px;
    border-radius: 12px;
    margin-right: 25px;
    overflow: hidden;
}

.detail-list div::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(0, 0, 0, .4);
}

.detail-list div.active::before {
    background-color: transparent;
}

.detail-list div>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.detail-list img:last-child {
    margin-right: 0;
}

.detail-info {
    width: 100%;
    height: 316px;
    border-radius: 12px;
    margin-top: 50px;
    padding: 20px 10px 10px;
    background-color: #141414;
    transition: height .6s ease-in-out;
    overflow: hidden;
}

.info-title {
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
}

.info-left {
    display: flex;
    align-items: center;
}

.info-left img {
    width: 21px;
    height: 21px;
    object-fit: cover;
}

.info-left span {
    font-size: 15px;
    color: #fff;
    margin-left: 20px;
}

.info-right {
    width: 30px;
    height: 30px;
    overflow: hidden;
    cursor: pointer;
}

.info-right img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.info-text {
    width: 100%;
    height: 236px;
    padding: 25px;
    margin-top: 20px;
    background-color: #1e1e1e;
}

.info-word {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 25px;
}

.info-word:first-child {
    margin-top: 0px;
}

.info-word:nth-child(4) {
    margin-top: 25px;
    padding-top: 25px;
    border-top: 1px solid #282828;
}

.info-word span {
    color: #fff;
    font-size: 12px;
}

.info-word span.info-address {
    color: #ffff00;
}

.detail-right {
    width: 515px;
}

.detail-right-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 25px;
}

.right-img {
    display: flex;
    align-items: center;
}

.right-img img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
}

.right-img span {
    font-size: 12px;
    color: #fff;
    margin-left: 15px;
    text-align: left;
}

.right-text {
    font-size: 12px;
    color: #fff;
    text-align: right;
}

.detail-right-text {
    width: 100%;
    text-align: left;
    font-size: 25px;
    color: #fff;
    margin-top: 25px;
    padding-top: 25px;
    border-top: 1px solid #282828;
}

.detail-right-text p {
    line-height: 1.4;
}

.detail-right-buy {
    width: 100%;
    height: 185px;
    border-radius: 12px;
    margin-top: 50px;
    padding: 25px;
    background-color: #141414;
}

.detail-right-buy>p:nth-child(1) {
    font-size: 12px;
    color: #fff;
    text-align: left;
}

.detail-right-buy>p:nth-child(2) {
    font-size: 25px;
    text-align: left;
    color: #fff;
    margin-top: 12px;
}

.buy-btn {
    margin-top: 25px;
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 15px;
    color: #ffff00;
    text-align: center;
    border-radius: 12px;
    border: 1px solid #282828;
    cursor: pointer;
}

.detail-right-des {
    width: 100%;
    height: 145px;
    padding: 25px 10px 10px;
    margin-top: 25px;
    border-radius: 12px;
    background-color: #141414;
    transition: height .6s ease-in-out;
    overflow: hidden;
}

.des-title {
    display: flex;
    padding: 0 15px;
    justify-content: space-between;
    align-items: center;
}

.des-img {
    display: flex;
    align-items: center;
}

.des-img img {
    width: 19.5px;
    height: 14px;
    overflow: hidden;
    object-fit: cover;
}

.des-img span {
    margin-left: 20px;
    font-size: 20px;
    color: #fff;
    text-align: left;
}

.des-top {
    display: flex;
    align-items: center;
}

.des-top span {
    font-size: 12px;
    color: #fff;
    text-align: right;
    margin-right: 20px;
}

.des-top img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
}

.des-box {
    width: 100%;
    height: 65px;
    /* height: 263px; */
    padding: 25px;
    margin-top: 16px;
    line-height: 1.6;
    background-color: #1e1e1e;
}

.des-box p {
    font-size: 12px;
    color: #fff;
    text-align: left;
}

.des-box p>span {
    color: #fff;
    font-size: 12px;
    text-align: center;
}

.detail-right-offers {
    width: 100%;
    height: 316px;
    padding: 20px 10px 10px;
    margin-top: 25px;
    border-radius: 12px;
    background-color: #141414;
    transition: height .6s ease-in-out;
    overflow: hidden;
}

.offers-title {
    display: flex;
    padding: 0 15px;
    justify-content: space-between;
    align-items: center;
}

.offers-img {
    display: flex;
    align-items: center;
}

.offers-img img {
    width: 19.5px;
    height: 14px;
    overflow: hidden;
    object-fit: cover;
}

.offers-img span {
    margin-left: 20px;
    font-size: 20px;
    color: #fff;
    text-align: left;
}

.offers-top {
    display: flex;
    align-items: center;
}

.offers-top span {
    font-size: 12px;
    color: #fff;
    text-align: right;
    margin-right: 20px;
}

.offers-top img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
}

.offers-box {
    width: 100%;
    height: 236px;
    margin-top: 20px;
    overflow-x: hidden;
}

.offers-item {
    display: flex;
    width: 100%;
    height: 87px;
    padding: 25px;
    justify-content: space-between;
    align-items: flex-end;
}

.offers-item:nth-child(odd) {
    background-color: #1e1e1e;
}

.offers-item:nth-child(even) {
    background-color: #191919;
}

.offers-item>div {
    color: #fff;
    font-size: 12px;
}

.offers-prize {
    font-size: 15px;
}

.offers-from {
    margin-top: 10px;
}

.offers-name {
    color: #ffff00;
}

.detail-right-history {
    width: 100%;
    height: 316px;
    padding: 20px 10px 10px;
    margin-top: 25px;
    border-radius: 12px;
    background-color: #141414;
    transition: height .6s ease-in-out;
    overflow: hidden;
}

.history-title {
    display: flex;
    padding: 0 15px;
    justify-content: space-between;
    align-items: center;
}

.history-img {
    display: flex;
    align-items: center;
}

.history-img img {
    width: 19.5px;
    height: 14px;
    overflow: hidden;
    object-fit: cover;
}

.history-img span {
    margin-left: 20px;
    font-size: 20px;
    color: #fff;
    text-align: left;
}

.history-top {
    display: flex;
    align-items: center;
}

.history-top span {
    font-size: 12px;
    color: #fff;
    text-align: right;
    margin-right: 20px;
}

.history-top img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
}

.history-box {
    width: 100%;
    height: 236px;
    margin-top: 20px;
    overflow-x: hidden;
}

.history-item {
    position: relative;
    display: flex;
    width: 100%;
    height: 142px;
    padding: 25px;
    justify-content: space-between;
    align-items: flex-end;
}

.history-item:nth-child(odd) {
    background-color: #1e1e1e;
}

.history-item:nth-child(even) {
    background-color: #191919;
}

.history-item>div {
    color: #fff;
    font-size: 12px;
}

.history-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72.5px;
    height: 30px;
    border-radius: 8px;
    border: 1px solid #282828;
}

.history-tag img {
    width: 15px;
    height: 15px;
    object-fit: contain;
    overflow: hidden;
}

.history-tag p {
    margin-left: 8px;
    font-size: 15px;
    color: #fff;
}

.history-prize {
    margin-top: 25px;
    font-size: 15px;
}

.history-from {
    margin-top: 10px;
}

.history-name {
    color: #ffff00;
}

.history-to {
    display: flex;
    align-items: center;
}

.history-to p:last-child {
    margin-left: 30px;
}

.history-to span {
    color: #ffff00;
}
</style>