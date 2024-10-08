<script setup>
import router from "@/router";
import axios from "@/utils/axios";
import {onMounted, ref} from "vue";
import video01 from '@/assets/videos/1.mp4'
import video02 from '@/assets/videos/2.mp4'
import video03 from '@/assets/videos/3.mp4'
import video04 from '@/assets/videos/4.mp4'
import video05 from '@/assets/videos/5.mp4'

const emit = defineEmits(["updateVideo"]);

const openDetail = (item) => {
  router.push({
    name: "GachaDetail",
    params: {
      userId:item.id,
    },
  });
};

onMounted(()=>{
  init()
})

const BigList = ref([])

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
  item.num = num
  console.log(item);
  
};

const buyNow = (item) => {
  emit("updateVideo", item);
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
    <div class="item" v-for="(item,index) in BigList" :key="'box' + index">
      <div class="item-title" @click="openDetail(item)">
        <div class="title-text">
          <!-- <p>TRADING CARD</p> -->
        </div>
        <!-- <img :src="item.imageUrl" alt="" /> -->
        <video :src="item.imageUrlList[0]" autoplay muted loop></video>
      </div>
      <div class="item-box">
        <div class="box-pts">
          <p>1 TICKET =</p>
          <i></i>
          <p>{{item.candy}} Candy</p>
        </div>
        <div class="box-progress">
          <i :style="'width:'+ (item.totalCardCount - item.drawCardCount) / item.totalCardCount +'%'"></i>
        </div>
        <div class="box-ticked">
          <img src="../assets/images/SVG/bill.svg" alt="" />
          <span class="exchange-get">{{item.totalCardCount - item.drawCardCount}}</span>
          <i>/</i>
          <span>{{item.totalCardCount}}</span>
        </div>
        <div class="item-num">
          <div
            @click="selectNum(item,1)"
            :class="item.num == 1?'active':''"
          >
            <p>BY TICKET</p>
            <p>x 1</p>
          </div>
          <div
            @click="selectNum(item,10)"
            :class="item.num == 10?'active':''"
          >
            <p>BY TICKET</p>
            <p>x 10</p>
          </div>
          <div
            @click="selectNum(item,100)"
            :class="item.num == 100?'active':''"
          >
            <p>BY TICKET</p>
            <p>x 100</p>
          </div>
        </div>
        <div class="item-btn">
          <button @click="buyNow(item)">BUY NOW</button>
        </div>
      </div>
    </div>
    <div class="item testitem" v-for="(item,index) in videoList" :key="'boxts' + index">
      <div class="item-title">
        <div class="title-text">
          <!-- <p>TRADING CARD</p> -->
        </div>
        <!-- <img :src="item.imageUrl" alt="" /> -->
        <video :src="item" autoplay muted loop></video>
      </div>
      <div class="item-box">
        <div class="box-pts">
          <p>1 TICKET =</p>
          <i></i>
          <p>10 Candy</p>
        </div>
        <div class="box-progress">
          <i :style="'width:0%'"></i>
        </div>
        <div class="box-ticked">
          <img src="../assets/images/SVG/bill.svg" alt="" />
          <span class="exchange-get">0</span>
          <i>/</i>
          <span>0</span>
        </div>
        <div class="item-num">
          <div>
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
        <div class="item-btn">
          <button>BUY NOW</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.itembox {
  display: flex;
  flex-wrap: wrap;
}

.item {
  width: 343px;
  /* height: 548px; */
  height: auto;
  border-radius: 18px;
  background-color: #141414;
  margin-right: 25px;
  margin-bottom: 25px;
  overflow: hidden;
}

.item:nth-child(3n) {
  margin-right: 0;
}

.item-title {
  position: relative;
  width: 100%;
  height: 343px;
  padding: 30px;
  background-color: #282828;
  cursor: pointer;
}

.item-title img,
.item-title video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title-text {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 0%;
  /* transition: height .4s ease-in-out; */
  overflow: hidden;
  /* background: linear-gradient(to bottom, #141414, rgba(0, 0, 0, 0)); */
  background: rgba(255, 255, 255, .2);
}

.item:hover .title-text {
  height: 100%;
}

.title-text p {
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 80px;
}

.item-box {
  width: 100%;
  padding: 30px;
}

.box-pts {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-pts p {
  font-size: 15px;
  color: #fff;
}

.box-pts > i {
  display: inline-block;
  width: 23px;
  height: 12.5px;
  background-image: url(../assets/images/SVG/prizetag.svg);
  margin: 0 15px;
}

.box-progress {
  position: relative;
  width: 100%;
  height: 5px;
  background-color: #282828;
  border-radius: 25px;
  margin-top: 15px;
  overflow: hidden;
}

.box-progress > i {
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 5px;
  transition: width 1s ease-in-out;
  background-color: #ffff00;
}

.box-ticked {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  color: #fff;
  font-size: 15px;
  letter-spacing: 1.8px;
}

.box-ticked > img {
  width: 22px;
  height: 14px;
  object-fit: cover;
  margin-right: 10px;
}

.box-ticked > span {
  color: #fff;
  font-size: 15px;
}

.box-ticked > i {
  display: inline-block;
  font-style: normal;
  margin: 0 5px;
}

.box-ticked > .exchange-get {
  color: #ffff00;
}

.item-num {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.item-num > div {
  width: 91px;
  height: 50px;
  border-radius: 12px;
  padding: 10px 0 10px;
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

.item-num > div.active {
  background-color: #ffff00;
}

.item-num > div > p {
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: 1.2;
}

.item-num > div > p:nth-child(2) {
  font-size: 15px;
}

.item-num > div.active > p{
  color: #000;
}

.item-btn {
  margin-top: 20px;
}
.item-btn>button {
  width: 100%;
  height: 48px;
  font-size: 20px;
  border-radius: 12px;
  color: #ffff00;
  background-color: transparent;
  border: 1px solid #282828;
  cursor: pointer;
}
.item-btn>button:hover {
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
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .4);
  z-index: 9;
}

.testitem::after {
  content:'The current card pool has not been listed yet, please wait!';
  position: absolute;
  width: 100%;
  text-align: center;
  color: #000;
  font-size: 18px;
  padding: 20px 0;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, .8);
  z-index: 10;
}

.testitem:hover .title-text {
  height: 0;
}
</style>