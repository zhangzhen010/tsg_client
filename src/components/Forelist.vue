<script setup>
import router from "@/router";
import {onMounted, ref} from "vue";
import img01 from "@/assets/images/1x/lightting.png";
import img02 from "@/assets/images/1x/devil.png";
import img03 from "@/assets/images/1x/fire.png";
import img04 from "@/assets/images/1x/Ice.png";

const openDetail = (item) => {
  router.push({
    name: "GachaDetail",
    params: {
      userId: item.id,
    },
  });
};

onMounted(() => {
  getColumn();
});

const BigList = ref([]);

const imgList = ref({
  img01,
  img02,
  img03,
  img04,
  img01,
  img02,
  img03,
});
const banners= ref([])

const getColumn = async () => {
  // const res = await axios.get("/tsg/publicinfo/showCardList");
  // console.log(res);
  
  // if (res.data.code == 200) {
  //   BigList.value = res.data.data.allPoolList;
  // }



  banners.value = imgList.value
};

// import video01 from "@/assets/videos/1.mp4";
// import video02 from "@/assets/videos/2.mp4";
// import video03 from "@/assets/videos/3.mp4";
// import video04 from "@/assets/videos/4.mp4";
// import video05 from "@/assets/videos/5.mp4";

// const videoList = ref({
//   video01,
//   video02,
//   video03,
//   video04,
//   video05,
// });
</script>

<template>
  <div>
    <p class="marketbox">MARKETPLACE</p>
    <div class="itembox">
      <div
        class="item"
        v-for="(item, index) in banners"
        :key="'fore' + index"
      >
        <div class="item-img">
          <img :src="item" alt="">
          <!-- <video :src="item.imageUrlList[0]" autoplay muted loop></video> -->
        </div>
        <div class="item-box">
          <p>SSR_TSG</p>
        </div>
        <div class="item-prize">
          <span>$ 2.00</span>
        </div>
      </div>
      <!-- <div
        class="item testitem"
        v-for="(item, index) in videoList"
        :key="'fore' + index"
      >
        <div class="item-img">
          <video :src="item" autoplay muted loop></video>
        </div>
        <div class="item-box">
          <p>Pending online prize pool</p>
        </div>
        <div class="item-prize">
          <span>1 TICKET = 10 Candy</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.marketbox {
  margin-top: -70px;
  text-align: center;
  font-size: 34px;
  color: #fff;
}

.itembox {
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
}

.item {
  position: relative;
  width: 250px;
  height: 365px;
  background-color: #141414;
  padding: 20px;
  border-radius: 18px;
  margin-right: 25px;
  margin-bottom: 25px;
  overflow: hidden;
}

.item:nth-child(4n) {
  margin-right: 0;
}

.item-img {
  width: 210px;
  height: 210px;
  border-radius: 18px;
  overflow: hidden;
}

.item-img img,
.item-img video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-box {
  width: 100%;
  margin-top: 20px;
}

.item-box p {
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
  color: #fff;
  user-select: none;
}

.item-prize {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  font-size: 16px;
  color: #fff;
  user-select: none;
}

.testitem {
  position: relative;
}

.testitem::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.testitem::after {
  content: "The current card pool has not been listed yet, please wait!";
  position: absolute;
  width: 100%;
  text-align: center;
  color: #000;
  font-size: 18px;
  padding: 20px 0;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
