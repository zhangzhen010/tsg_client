<template>
  <div
    class="carousel-container"
    @mouseover="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <div
      class="carousel-slide"
      :style="{
        transform: `translateX(-${currentSlide * 100}%)`,
        transition: disableTransition ? 'none' : '',
      }"
      @transitionend="handleTransitionEnd"
    >
      <div
        class="carousel-item"
        v-for="(item, index) in bannerList"
        :key="index"
      >
        <div class="carousel-img">
          <img :src="item"/>
          <!-- <video :src="item?.imageUrlList[0]" autoplay muted loop ></video> -->
        </div>
        <div class="carousel-title">
          <p>{{ item?.name }}</p>
          <!-- <button @click="goColumn(item)">LEARN MORE</button> -->
          <button @click="goColumn()">LEARN MORE</button>
        </div>
      </div>
    </div>
  </div>
  <div class="carousel-tag">
    <div
      class="tag-span"
      v-for="(item, index) in newBnner"
      :key="index"
      @click="clickSlide(index)"
    >
      <div :class="currentSlide == index + 1 ? 'active tag' : 'tag'"></div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import router from "@/router";

const props = defineProps({
  bannerList: {
    type: Array,
    default: () => {},
  },
  newBnner: {
    type: Array,
    default: () => {},
  },
});

const currentSlide = ref(1);
const disableTransition = ref(false);


const handleTransitionEnd = () => {
  if (currentSlide.value === props.bannerList.length - 1) {
    disableTransition.value = true;
    currentSlide.value = 1;
  } else if (currentSlide.value === 0) {
    disableTransition.value = true;
    currentSlide.value = props.newBnner.length;
  }
};

const nextSlide = () => {
  if (currentSlide.value < props.bannerList.length - 1) {
    disableTransition.value = false;
    currentSlide.value++;
  }
};

const clickSlide = (e) => {
  if (currentSlide.value > 0) {
    disableTransition.value = false;
    currentSlide.value = e + 1;
  }
};

const autoPlayInterval = ref(null);

const startAutoPlay = () => {
  autoPlayInterval.value = setInterval(() => {
    nextSlide();
  }, 3000); // Adjust the interval to your liking
};

const stopAutoPlay = () => {
  clearInterval(autoPlayInterval.value);
};

const goColumn = () => {
  router.push({ path: "/column" });
};

startAutoPlay();
</script>

<style scoped>
.carousel-container {
  position: relative;
  border-radius: 32px;
  overflow: hidden;
}

.carousel-slide {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

.carousel-item {
  position: relative;
  min-width: 100%;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}

.carousel-img {
  width: 100%;
  height: 420px;
}

.carousel-img img,
.carousel-img video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.carousel-img::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 8;
}

.carousel-title {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  z-index: 9;
}

.carousel-title p {
  font-size: 60px;
  color: #fff;
  text-align: center;
}

.carousel-title button {
  width: 200px;
  height: 60px;
  font-size: 15px;
  margin-top: 45px;
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  border-radius: 38px;
  cursor: pointer;
}

.carousel-tag {
  display: flex;
  margin-top: 24px;
}

.tag-span {
  position: relative;
  width: 100%;
  height: 5px;
  margin: 0 10px;
  background-color: #ccc;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
}

.tag {
  position: absolute;
  width: 0%;
  height: 5px;
  left: 0;
  background-color: #ffed00;
  transition: width 0.3s ease-in-out;
}

.tag.active {
  width: 100%;
}

@media screen and (max-width: 768px) {
  .carousel-item {
    height: 325px;
  }

  .carousel-title p {
    font-size: 44px;
  }
  .carousel-title button {
    width: 150px;
    height: 50px;
    font-size: 12px;
  }
}
</style>