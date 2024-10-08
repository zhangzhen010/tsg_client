<script setup>
import router from "@/router";
import {onMounted, ref} from "vue";
import axios from "@/utils/axios";
import {useRoute} from "vue-router";
import Winvideo from "@/components/Winvideo.vue";

import {store} from "@/utils/store";
import {tipbox} from "@/utils/change";

const prizeNum = ref(1);

const windowWith = ref(false);
const activeVideo = ref(false);
const route = useRoute();
const detailsList = ref({});
const ssrList = ref({});
const srList = ref({});
const nrList = ref({});
const closeTag = ref(false);

const ssrPrize = ref({});
const srPrize = ref({});
const nrPrize = ref({});

const detailsVideo = ref("");

onMounted(async () => {
  if (window.innerWidth < 768) {
    windowWith.value = true;
  }

  const res = await axios.get("/tsg/publicinfo/gachaInfo", {
    params: {
      gachaPoolId: route.params.userId,
    },
  });

  detailsList.value = res.data.data;

  ssrList.value = findList("SSR");
  srList.value = findList("SR");
  nrList.value = findList("NR");
  ssrPrize.value = findPrize("SSR");
  srPrize.value = findPrize("SR");
  nrPrize.value = findPrize("NR");

  detailsVideo.value = detailsList.value.imageUrlList[0];
});

const selectNum = (num) => {
  if (num * detailsList.value.candy > 100 && localStorage.getItem("token")) {
    return tipbox.openSet();
  }
  prizeNum.value = num;
};

const buyNow = async (id) => {
  const btn = document.querySelector(".item-button");
  const userLogin = localStorage.getItem("token");
  btn.style = "background-color: #ffff00;color: #000;";
  if (!userLogin) {
    // alert("Please log in");
    store.changeMessage("Please log in");
  } else {
    const res = await axios.get("/tsg/player/gachaDraw", {
      params: {
        gachaPoolId: id,
        count: prizeNum.value,
      },
    });

    if (res.data.code == 200) {
      store.setList(res.data.data.gachaCardList);
      store.changeNum();
      activeVideo.value = true;
    }
  }
  btn.style = "";
};

const selectVideo = (item) => {
  if (item == detailsVideo.value) {
    return;
  }

  detailsVideo.value = item;
};

const enterVideo = () => {
  activeVideo.value = false;
  router.push({ name: "redeem" });
};

const findList = (val) => {
  const index = detailsList.value.weightList.findIndex(
    (item) => item.quality == val
  );

  return detailsList.value.weightList[index].cardInfoList;
};
const findPrize = (val) => {
  const index = detailsList.value.weightList.findIndex(
    (item) => item.quality == val
  );

  return detailsList.value.weightList[index];
};

const text = ref(
  "This is the prize that players all over the world dream of getting, with all the magic beyond imagination, if you draw your favorite character, you will be able to take home the world's most adorable dolls, what are you waiting for, come on!"
);

const getFirstTwentyWords = (text) => {
  // 使用空格分割字符串为单词数组
  const words = text.split(/\s+/);
  // 提取前20个单词并用空格连接
  const firstTwentyWords = words.slice(0, 18).join(" ");
  return firstTwentyWords + "...";
};
</script>

<template>
  <div class="itembox">
    <div class="item">
      <div class="item-img">
        <video :src="detailsVideo" autoplay muted loop></video>
        <div class="scrool-tag">
          <div
            v-for="(item, index) in detailsList.imageUrlList"
            :key="'video' + index"
            :class="item == detailsVideo ? 'videractive' : ''"
            @click="selectVideo(item)"
          >
            <video :src="item"></video>
          </div>
        </div>
      </div>
      <div class="item-title">
        <div class="item-p">
          <p>TEST SUPER CARD COLLECTION</p>
        </div>
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
          <p><i>DESCRIPTION :</i> {{ text }}</p>
          <p><i>EXPIRE :</i> 8 days</p>
        </div>
        <div class="item-progress">
          <div
            class="item-yellow"
            :style="
              'width:' +
              (detailsList.totalCardCount - detailsList.drawCardCount) /
                detailsList.totalCardCount +
              '%'
            "
          ></div>
        </div>
        <div class="item-exchange">
          <div class="exchange-left">
            <span class="exchange-tip">1 TICKET =</span>
            <i></i>
            <span class="exchange-pts">{{ detailsList.candy }}</span>
          </div>
          <div class="exchange-right">
            <img src="../assets/images/SVG/bill.svg" alt="" />
            <span class="exchange-get">{{ detailsList.drawCardCount }}</span>
            <i>/</i>
            <span>{{ detailsList.totalCardCount }}</span>
          </div>
        </div>
        <div class="item-ticket">
          <p>PURCHASE TICKET</p>
          <p>{{ prizeNum }}</p>
        </div>
        <div class="item-num">
          <div
            @click="selectNum(1)"
            :class="prizeNum == 1 ? 'clickactive' : ''"
          >
            <p>BY TICKET</p>
            <p>x 1</p>
          </div>
          <div
            @click="selectNum(10)"
            :class="prizeNum == 10 ? 'clickactive' : ''"
          >
            <p>BY TICKET</p>
            <p>x 10</p>
          </div>
          <div
            @click="selectNum(100)"
            :class="prizeNum == 100 ? 'clickactive' : ''"
          >
            <p>BY TICKET</p>
            <p>x 100</p>
          </div>
        </div>
        <div class="item-button" @click="buyNow(detailsList.id)">
          <p>BUY NOW</p>
        </div>
      </div>
    </div>
    <div class="cardborder">
      <div class="ssr-item ssr">
        <div class="ssr-img">
          <img src="../assets/images/ssr.png" alt="" />
        </div>
        <div class="ssr-title">
          <p>SUPER SUPER RARE</p>
        </div>
        <div
          class="ssr-card"
          v-for="(item, index) in ssrList"
          :key="'SSR' + index"
        >
          <div class="card-item">
            <div class="card-img">
              <img :src="item.image" alt="" />
            </div>
            <div class="card-title">
              <p>
                $
                {{
                  ((item.usd / 100) * (ssrPrize.burnCandyRatio / 100)).toFixed(
                    2
                  )
                }}
              </p>
              <!-- <P>NOT FOR SALE</P> -->
            </div>
          </div>
        </div>
      </div>
      <div class="ssr-item sr">
        <div class="ssr-img">
          <img src="../assets/images/sr.png" alt="" />
        </div>
        <div class="ssr-title">
          <p>SUPER RARE</p>
        </div>
        <div class="ssr-card">
          <div
            class="card-item"
            v-for="(item, index) in srList"
            :key="'SR' + index"
          >
            <div class="card-img">
              <img :src="item.image" alt="" />
            </div>
            <div class="card-title">
              <p>
                $
                {{
                  ((item.usd / 100) * (srPrize.burnCandyRatio / 100)).toFixed(2)
                }}
              </p>
              <!-- <P>NOT FOR SALE</P> -->
            </div>
          </div>
        </div>
      </div>
      <div class="ssr-item r">
        <div class="ssr-img">
          <img src="../assets/images/r.png" alt="" />
        </div>
        <div class="ssr-title">
          <p>RARE</p>
        </div>
        <div class="ssr-card">
          <div
            class="card-item"
            v-for="(item, index) in nrList"
            :key="'NR' + index"
          >
            <div class="card-img">
              <img :src="item.image" alt="" />
            </div>
            <div class="card-title">
              <p>
                $
                {{ (item.usd / 100) * (nrPrize.burnCandyRatio / 100) }}
              </p>
              <!-- <P>NOT FOR SALE</P> -->
            </div>
          </div>
        </div>
      </div>
      <div class="ssr-item lc" v-if="closeTag">
        <div class="ssr-img">
          <img src="../assets/images/lc.png" alt="" />
        </div>
        <div class="ssr-title">
          <p>LESS COMMON</p>
        </div>
        <div class="ssr-card">
          <div class="card-item" v-for="item in 12" :key="item">
            <div class="card-img">
              <img src="../assets/images/testimg/1x/list3.png" alt="" />
            </div>
            <div class="card-title">
              <p>2007 EX Power Keepers #1 Aggrpn - Holo(CGC 9 MINT)</p>
              <p>NOT FOR SALE</p>
            </div>
          </div>
        </div>
      </div>
      <div class="ssr-item lo">
        <div class="ssr-img">
          <img src="../assets/images/lo.png" alt="" />
        </div>
        <div class="ssr-title">
          <p>LAST ONE</p>
        </div>
        <div class="ssr-card">
          <div class="card-item">
            <div class="card-img">
              <img src="../assets/images/1x/devil.png" alt="" />
            </div>
            <div class="card-title">
              <p>$ 2.00</p>
              <!-- <p>NOT FOR SALE</p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <Winvideo
      v-if="activeVideo"
      @enterVideo="enterVideo"
      :videoUrl="detailsList.animationUrl"
    ></Winvideo>
  </div>
</template>

<style scoped>
.itembox {
  padding-top: 50px;
}
.item {
  display: flex;
  width: 100%;
  /* height: 540px; */
  height: auto;
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
}

.item-img > img,
.item-img > video {
  width: 100%;
  height: 480px;
  object-fit: contain;
}

.scrool-tag {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.scrool-tag > div {
  width: 24%;
  height: 120px;
  margin: 0 5px;
  padding: 8px;
  background-color: #000;
  border-radius: 12px;
  overflow: hidden;
  box-sizing: border-box;
  border: 2px solid #000;
  cursor: pointer;
}

.scrool-tag > div.videractive {
  border: 2px solid #ffff00;
}

.scrool-tag > div:first-child {
  margin-left: 0;
}
.scrool-tag > div:last-child {
  margin-right: 0;
}

.scrool-tag > div > video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-title {
  width: 50%;
  height: 100%;
  padding: 50px;
}

.item-p {
  text-align: center;
  color: #fff;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 45px;
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
  background-color: #ffff00;
  color: #000;
}
.cardborder {
  width: 100%;
  height: auto;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.ssr-item {
  margin-top: 35px;
}

.ssr-img {
  margin: 0 auto;
  text-align: center;
}

.ssr-img img {
  width: 400px;
  height: 400px;
}

.ssr-title P {
  font-size: 24px;
  color: #fff;
  text-align: center;
}

.ssr-card {
  display: flex;
  margin-top: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.card-item {
  width: 22%;
  height: auto;
  background-color: #000;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 20px;
  margin: 10px;
}

.card-img {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.card-img img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.card-title {
  margin-top: auto;
}

.card-title > p:nth-child(1) {
  font-size: 16px;
  color: #fff;
  line-height: 1.5;
}

.card-title > p:nth-child(2) {
  margin-top: 20px;
  font-size: 12px;
  color: #ccc;
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
