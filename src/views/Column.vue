<script setup>
import {onMounted, ref} from "vue";
import router from "@/router";
import Biglist from "@/components/Biglist.vue";
import Threelist from "@/components/Threelist.vue";
import Forelist from "@/components/Forelist.vue";
import Winvideo from "@/components/Winvideo.vue";
import axios from "@/utils/axios";

import {store} from "@/utils/store";

const activeNum = ref(1);
const activeVideo = ref(false);
const videoUrl = ref("");

const openActive = (e) => {
  if (activeNum.value == e) {
    return;
  }
  if(e == 4) {
    return
  }
  activeNum.value = e;
  localStorage.setItem("columnNum", activeNum.value);
};

const changInit = () => {
  const btn = document.querySelector('.changnew')

  btn.style = "transition: all 1.6s linear;transform: rotateZ(360deg);"

  setTimeout(()=>{
    btn.style = ''
  },1600)
}

const updateVideo = (item) => {
  const userLogin = localStorage.getItem("token");
  if (!userLogin) {
    store.changeMessage("PLEASE LOGIN");
  } else {
    joinOnce(item);
  }
};
const enterVideo = () => {
  activeVideo.value = false;
  router.push({ name: "redeem" });
};

onMounted(() => {
  const cNum = localStorage.getItem("columnNum");
  if (cNum) {
    activeNum.value = localStorage.getItem("columnNum");
  } else {
    activeNum.value = 1;
  }
});

const joinOnce = async (num, item) => {
  const res = await axios.get("/tsg/player/gachaDraw", {
    params: {
      gachaPoolId: item.id,
      count: item.num,
    },
  });
  if (res.data.code == 200) {
    store.setList(res.data.data.gachaCardList);
    store.changeNum();
    videoUrl.value = item.animationUrl;
    activeVideo.value = true;
  }
};
</script>
<template>
  <div>
    <div class="column">
      <div class="column-left">
        <div :class="activeNum == 1 ? 'active' : ''" @click="openActive(1)">
          <i></i>
        </div>
        <div :class="activeNum == 2 ? 'active' : ''" @click="openActive(2)">
          <i></i>
        </div>
        <div :class="activeNum == 3 ? 'active' : ''" @click="openActive(3)">
          <i></i>
        </div>
        <div :class="activeNum == 4 ? 'active' : ''" @click="openActive(4)">
          <i></i>
        </div>
      </div>
      <div class="column-right">
        <!-- <div>
          <img src="../assets/images/SVG/fold.svg" alt="" />
        </div> -->
        <div @click="changInit">
          <img class="changnew" src="../assets/images/SVG/news.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="listbox">
      <Biglist v-if="activeNum == 1" @updateVideo="updateVideo"></Biglist>
      <Threelist v-if="activeNum == 2" @updateVideo="updateVideo"></Threelist>
      <Forelist v-if="activeNum == 3"></Forelist>
    </div>
    <Winvideo
      v-if="activeVideo"
      @enterVideo="enterVideo"
      :videoUrl="videoUrl"
    ></Winvideo>
  </div>
</template>

<style scoped>
.column {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 50px;
}

.column-left {
  display: flex;
  align-items: center;
  width: 200px;
  height: 50px;
  border-radius: 25px;
  background-color: #141414;
  overflow: hidden;
}

.column-left > div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.column-left > div.active {
  background-color: #fff;
}

.column-left > div > i {
  width: 17px;
  height: 13px;
  background-repeat: no-repeat;
  background-size: cover;
}

.column-left > div:nth-child(1) i {
  background-image: url(../assets/images/SVG/bigimg.svg);
}

.column-left > div.active:nth-child(1) i {
  background-image: url(../assets/images/SVG/bigimgactive.svg);
}

.column-left > div:nth-child(2) i {
  background-image: url(../assets/images/SVG/threeimg.svg);
}

.column-left > div.active:nth-child(2) i {
  background-image: url(../assets/images/SVG/threeimgactive.svg);
}

.column-left > div:nth-child(3) i {
  background-image: url(../assets/images/SVG/foreimg.svg);
}

.column-left > div.active:nth-child(3) i {
  background-image: url(../assets/images/SVG/foreimgactive.svg);
}

.column-left > div:nth-child(4) i {
  background-image: url(../assets/images/SVG/listimg.svg);
}

.column-left > div.active:nth-child(4) i {
  background-image: url(../assets/images/SVG/listimgactive.svg);
}

.column-right {
  display: flex;
  align-items: center;
}

.column-right > div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #141414;
  cursor: pointer;
}

.column-right > div:nth-child(1) {
  margin-right: 15px;
}

.column-right > div:nth-child(1) > img {
  width: 19px;
  height: 18px;
  object-fit: cover;
}

.column-right > div:nth-child(2) > img {
  width: 21px;
  height: 22px;
  object-fit: cover;
}

.listbox {
  margin-top: 50px;
}
</style>
