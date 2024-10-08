<script setup>
import router from "@/router";
import axios from "@/utils/axios";
import {onMounted, ref} from "vue";
import {tipbox} from "@/utils/change";
import video01 from '@/assets/videos/1.mp4'
import video02 from '@/assets/videos/2.mp4'
import video03 from '@/assets/videos/3.mp4'
import video04 from '@/assets/videos/4.mp4'
import video05 from '@/assets/videos/5.mp4'

const emit = defineEmits(["updateVideo"]);

const prizeNum = ref(1);
const BigList = ref([])

const openDetail = (item) => {
  router.push({
    name: "GachaDetail",
    params: {
      userId:item.id,
    },
  });
};

const buyNow = (item) => {
  emit("updateVideo",item);
};

const windowWith = ref(false);

onMounted(() => {
  if (window.innerWidth < 768) {
    windowWith.value = true;
  }

  init()
});

const init = async () => {
  const res = await axios.get('/tsg/publicinfo/gachalist')

  if(res.data.code == 200){
    BigList.value = res.data.data.allPoolList
    BigList.value.forEach(item=>{
      item.num = 1
    })
  }
}

const selectNum = (item,num) => {
  if(num == 100 && localStorage.getItem('token')){
    return tipbox.openSet()
  }

  item.num = num
  
};

const text = ref("This is the prize that players all over the world dream of getting, with all the magic beyond imagination, if you draw your favorite character, you will be able to take home the world's most adorable dolls, what are you waiting for, come on!")

const getFirstTwentyWords = (text) => {
    // 使用空格分割字符串为单词数组
    const words = text.split(/\s+/);
    // 提取前20个单词并用空格连接
    const firstTwentyWords = words.slice(0, 18).join(' ');
    return firstTwentyWords + '...';
}

const videoList = ref({
  video01,
  video02,
  video03,
  video04,
  video05
})
</script>

<template>
  <div class="itembox">
    <div class="item" v-for="(item,index) in BigList" :key="'list' + index">
      <div class="item-img" @click="openDetail(item)">
        <p v-if="windowWith">SUPER DOLL POOL IN FANTASY</p>
        <!-- <img :src="item.imageUrl" alt="" /> -->
        <video :src="item.imageUrlList[0]" autoplay muted loop></video>
        <p v-if="windowWith">DESCRIPTION:{{ item.description }}</p>
      </div>
      <div class="item-title">
        <div class="item-top">
          <div class="top-avatar">
            <img src="../assets/images/SVG/discord.svg" alt="" />
            <span>Est Value</span>
          </div>
          <div class="top-tip">
            <p>GENRE</p>
          </div>
        </div>
        <div class="item-text" v-if="!windowWith">
          <p>SUPER DOLL POOL IN FANTASY</p>
          <p><i>DESCRIPTION :</i> {{ getFirstTwentyWords(text) }}</p>
          <p><i>EXPIRE :</i> 8 days</p>
        </div>
        <div class="item-progress">
          <div class="item-yellow" :style="'width:'+ (item.totalCardCount - item.drawCardCount) / item.totalCardCount +'%'"></div>
        </div>
        <div class="item-exchange">
          <div class="exchange-left">
            <span class="exchange-tip">1 TICKET =</span>
            <i></i>
            <span class="exchange-pts">{{ item.candy }} Candy</span>
          </div>
          <div class="exchange-right">
            <img src="../assets/images/SVG/bill.svg" alt="" />
            <span class="exchange-get">{{item.drawCardCount}}</span>
            <i>/</i>
            <span>{{item.totalCardCount}}</span>
          </div>
        </div>
        <div class="item-ticket">
          <p>BY TICKET</p>
          <p>1</p>
        </div>
        <div class="item-num">
          <div
            @click="selectNum(item,1)"
            :class="item.num == 1 ? 'clickactive' : ''"
          >
            <p>BY TICKET</p>
            <p>x 1</p>
          </div>
          <div
            @click="selectNum(item,10)"
            :class="item.num == 10 ? 'clickactive' : ''"
          >
            <p>BY TICKET</p>
            <p>x 10</p>
          </div>
          <div
            @click="selectNum(item,100)"
            :class="item.num == 100 ? 'clickactive' : ''"
          >
            <p>BY TICKET</p>
            <p>x 100</p>
          </div>
        </div>
        <div class="item-button" @click="buyNow(item)">
          <p>BUY NOW</p>
        </div>
      </div>
    </div>
    <div class="item testitem" v-for="(item,index) in videoList" :key="'test' + index">
      <div class="item-img">
        <!-- <img :src="item.imageUrl" alt="" /> -->
        <video :src="item" autoplay muted loop></video>
      </div>
      <div class="item-title">
        <div class="item-top">
          <div class="top-avatar">
            <img src="../assets/images/SVG/discord.svg" alt="" />
            <span>Est Value</span>
          </div>
          <div class="top-tip">
            <p>GENRE</p>
          </div>
        </div>
        <div class="item-text" v-if="!windowWith">
          <p>Pending online prize pool</p>
          <p><i>DESCRIPTION :</i> Pending online prize pool</p>
          <p><i>TIME OUT :</i> 8 days</p>
        </div>
        <div class="item-progress">
          <div class="item-yellow" :style="'width:0%'"></div>
        </div>
        <div class="item-exchange">
          <div class="exchange-left">
            <span class="exchange-tip">1 TICKET =</span>
            <i></i>
            <span class="exchange-pts">10 Candy</span>
          </div>
          <div class="exchange-right">
            <img src="../assets/images/SVG/bill.svg" alt="" />
            <span class="exchange-get">0</span>
            <i>/</i>
            <span>0</span>
          </div>
        </div>
        <div class="item-ticket">
          <p>BY TICKET</p>
          <p>1</p>
        </div>
        <div class="item-num">
          <div
            class="clickactive"
          >
            <p>BY TICKET</p>
            <p>x 1</p>
          </div>
          <div>
            <p>BY TICKET</p>
            <p>x 10</p>
          </div>
          <div>
            <p>BY TICKET</p>
            <p>x 100</p>
          </div>
        </div>
        <div class="item-button">
          <p>BUY NOW</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  width: 100%;
  height: 540px;
  border-radius: 16px;
  align-items: center;
  background-color: #141414;
  overflow: hidden;
  margin-bottom: 25px;
}

.item-img {
  width: 50%;
  height: 100%;
  padding: 25px;
  background-color: #282828;
  cursor: pointer;
}

.item-img > img,
.item-img > video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-title {
  width: 50%;
  height: 100%;
  padding: 50px;
}

.item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.top-avatar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-avatar img {
  width: 30px;
  height: 30px;
  object-fit: cover;
}

.top-avatar span {
  display: inline-block;
  margin-left: 15px;
  font-size: 12px;
  color: #fff;
}

.top-tip p {
  font-size: 12px;
  color: #fff;
}

.item-text {
  padding-top: 25px;
  border-top: 1px solid #282828;
}

.item-text p {
  color: #fff;
}

.item-text p > i {
  font-weight: 600;
  font-style: normal;
}

.item-text p:nth-child(1) {
  font-size: 20px;
}

.item-text p:nth-child(2) {
  font-size: 15px;
  margin-top: 20px;
  line-height: 1.8;
}

.item-text p:nth-child(2) {
  font-size: 15px;
  line-height: 1.8;
}

.item-progress {
  position: relative;
  margin-top: 25px;
  width: 100%;
  height: 10px;
  background-color: #282828;
  border-radius: 25px;
  overflow: hidden;
}

.item-yellow {
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  background-color: #ffff00;
}

.item-exchange {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.exchange-left {
  display: flex;
  align-items: center;
}

.exchange-tip {
  font-size: 15px;
  color: #fff;
}

.exchange-left i {
  display: inline-block;
  width: 23px;
  height: 12.5px;
  background-image: url(../assets/images/SVG/prizetag.svg);
  margin: 0 10px;
}

.exchange-pts {
  font-size: 15px;
  color: #fff;
}

.exchange-right {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 15px;
  letter-spacing: 1.8px;
}

.exchange-right > img {
  width: 22px;
  height: 14px;
  object-fit: cover;
  margin-right: 10px;
}

.exchange-right > span {
  color: #fff;
  font-size: 15px;
}

.exchange-right > i {
  display: inline-block;
  font-style: normal;
  margin: 0 5px;
}

.exchange-right > .exchange-get {
  color: #ffff00;
}

.item-ticket {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  border-radius: 12px;
  padding: 0 25px;
  margin-top: 25px;
  background-color: #000000;
}

.item-ticket > p {
  font-size: 15px;
  color: #fff;
}

.item-ticket > p:nth-child(1) {
  text-align: left;
}

.item-ticket > p:nth-child(2) {
  text-align: right;
}

.item-num {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.item-num > div {
  width: 140px;
  height: 60px;
  border-radius: 12px;
  padding: 15px 0 14px;
  cursor: pointer;
}

.item-num > div:nth-child(1) {
  background-color: #1e1e1e;
}

.item-num > div:nth-child(2) {
  background-color: #323232;
}

.item-num > div:nth-child(3) {
  background-color: #464646;
}

.item-num > div.clickactive {
  background-color: #ffff00;
}

.item-num > div > p {
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: 1.2;
}
.item-num > div.clickactive > p {
    color: #000;
}

.item-num > div > p:nth-child(2) {
  font-size: 15px;
}

.item-button {
  width: 100%;
  height: 60px;
  font-size: 15px;
  color: #ffff00;
  text-align: center;
  line-height: 60px;
  margin-top: 10px;
  border-radius: 12px;
  border: 1px solid #282828;
  cursor: pointer;
  user-select: none;
}

.item-button:hover {
  color: #000;
  background-color: #ffff00;
}

.testitem {
  position: relative;
}

.testitem::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .4);
}

.testitem::after {
  content:'The current card pool has not been listed yet, please wait!';
  position: absolute;
  width: 100%;
  text-align: center;
  color: #000;
  font-size: 26px;
  padding: 20px 0;
  background-color: rgba(255, 255, 255, .8);
}

@media screen and (max-width: 768px) {
  .item {
    height: 325px;
  }

  .item-img {
    position: relative;
    display: flex;
    align-items: center;
    /* flex-direction: column; */
  }

  .item-img img {
    height: auto;
  }
  .item-img p:nth-child(1) {
    position: absolute;
    top: 25px;
    left: 0;
    width: 100%;
    color: #fff;
    text-align: center;
  }
  .item-img p:nth-child(3) {
    position: absolute;
    bottom: 25px;
    left: 0;
    width: 100%;
    color: #fff;
    text-align: center;
  }
  .item-title {
    /* width: 100%; */
  }
}
</style>
