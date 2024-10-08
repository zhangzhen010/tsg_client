<script setup>
import {onMounted, ref} from "vue";

import Carousel from "@/components/Carousel.vue";
import Livewinner from "@/components/Livewinner.vue";
import Discover from "@/components/Discover.vue";
import Drag from "@/components/Drag.vue";
import DragCard from "@/components/DragCard.vue";

// import axios from "axios";
import axios from "@/utils/axios";
import img01 from "@/assets/images/1x/lightting.png";
import img02 from "@/assets/images/1x/devil.png";
import img03 from "@/assets/images/1x/fire.png";
import img04 from "@/assets/images/1x/Ice.png";
import banner01 from "@/assets/images/001.jpg";
import banner02 from "@/assets/images/002.jpg";
import banner03 from "@/assets/images/003.jpg";
import video02 from '@/assets/videos/2.mp4'
import video03 from '@/assets/videos/3.mp4'
import video04 from '@/assets/videos/4.mp4'
import video05 from '@/assets/videos/5.mp4'

const twoSection = ref(4);
const threeSection = ref(7);

const newBnner = ref([]);
const bannerList = ref([]);
const twoList = ref([]);
const threeList = ref([]);
const winnerList = ref([]);

onMounted(() => {
  localStorage.setItem("columnNum", 1);
  init();
});

const imgList = ref({
  img01,
  img02,
  img03,
  img04,
  img01,
  img02,
  img03,
});

const banners = ref([banner01, banner02, banner03]);
const twotest = ref([
  {
    id:'tsg',
    name:'TSG Rare degree card pool',
    description:'A TSG Rare degree card pool',
    imageUrlList:[video05],
  },
  {
    id:'tsg',
    name:'TSG Rare degree card pool',
    description:'A TSG Rare degree card pool',
    imageUrlList:[video02],
  },
  {
    id:'tsg',
    name:'TSG Rare degree card pool',
    description:'A TSG Rare degree card pool',
    imageUrlList:[video03],
  },
  {
    id:'tsg',
    name:'TSG Rare degree card pool',
    description:'A TSG Rare degree card pool',
    imageUrlList:[video04],
  },
])

const init = async () => {
  const res = await axios.get("/tsg/publicinfo/gachalist");
  newBnner.value = res.data.data.recommendPoolList;
  bannerList.value = [
    banners.value[banners.value.length - 1],
    ...banners.value,
    banners.value[0],
  ];
  // twoList.value = res.data.data.allPoolList;
  twoList.value = [...res.data.data.allPoolList,...twotest.value];

  const threeRes = await axios.get("/tsg/publicinfo/showCardList");
  threeList.value = imgList.value;
};
</script>

<template>
  <div class="carousel_card">
    <Carousel :bannerList="bannerList" :newBnner="banners"></Carousel>
  </div>
  <Drag
    carouselTitle="GACHA GAMES"
    :carouselNumber="twoSection"
    :carouselList="twoList"
  ></Drag>
  <DragCard
    carouselTitle="MARKETPLACE"
    :carouselNumber="threeSection"
    :carouselList="threeList"
  ></DragCard>
  <Livewinner :winnerList="winnerList"></Livewinner>
  <Discover></Discover>
</template>

<style scoped>
.carousel_box {
  width: 100%;
}

.carousel_card {
  padding-top: 50px;
  width: 100%;
}
</style>
