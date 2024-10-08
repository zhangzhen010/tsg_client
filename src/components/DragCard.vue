<template>
  <div class="gacha-games">
    <div class="gacha-title-box">
      <p class="gacha-title">{{ carouselTitle }}</p>
      <button class="gacha-btn" v-if="carouselNumber == 4" @click="goList()">
        EXPLORE
      </button>
      <button class="gacha-btn" v-else @click="goList()">
        EXPLORE MARKETPLACE
      </button>
    </div>
    <div
      class="carousel-container"
      @mousedown.prevent="handleDragStart"
      @mousemove="handleDragging"
      @mouseup="handleDragEnd"
      @mouseleave="handleDragEnd"
      @touchmove="handleDragging"
      @touchstart="handleDragStart"
      @touchend="handleDragEnd"
    >
      <div
        class="carousel-slide"
        ref="carouselSlide"
        :style="{
          transform: `translateX(${currentTranslate}px)`,
          transition: isDragging ? 'none' : '',
        }"
      >
        <div
          class="carousel-item"
          v-for="(item, index) in carouselList"
          :key="index"
          :style="`min-width: ${carouselItem};`"
        >
          <img :src="item" :alt="item" />
        </div>
      </div>
    </div>
    <div class="carousel-tag">
      <div
        class="tag"
        :style="`width:${Math.floor(
          (-currentTranslate / carouselWidth) * 100
        )}%`"
      ></div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import {onMounted, ref} from "vue";

/**
 * carouselNumber:传入展示个数
 * carouselTitle:传入组件的名称
 * carouselList:传入的数据props.carouselList
 */
const props = defineProps({
  carouselTitle: String,
  carouselNumber: Number,
  carouselList: Array,
});

const carouselItem = ref(0);

const isDragging = ref(false);
const startX = ref(0);
const currentTranslate = ref(0);
const prevTranslate = ref(0);

const handleDragStart = (event) => {
  isDragging.value = true;
  window.innerWidth > 768
    ? (startX.value = event.clientX)
    : (startX.value = event.touches[0].clientX);
  prevTranslate.value = currentTranslate.value;
};

const handleDragging = (event) => {
  if (!isDragging.value) return;
  let movedX;
  if (window.innerWidth > 768) {
    movedX = event.clientX - startX.value;
  } else {
    movedX = event.touches[0].clientX - startX.value;
  }
  currentTranslate.value = prevTranslate.value + movedX;
};

const handleDragEnd = () => {
  isDragging.value = false;
  if (currentTranslate.value + carouselWidth.value <= 0) {
    currentTranslate.value = -carouselWidth.value;
  } else if (currentTranslate.value > 0) {
    currentTranslate.value = 0;
  }
};

const carouselSlide = ref(null); // 创建一个响应式引用
const carouselWidth = ref(0);
onMounted(() => {
  if (window.innerWidth < 768 && props.carouselNumber == 4) {
    carouselItem.value = 156 + "px";
    carouselWidth.value =
      props.carouselList.length * 156 - carouselSlide.value.offsetWidth;
  } else if (window.innerWidth < 768 && props.carouselNumber == 7) {
    carouselItem.value = 126 + "px";
    carouselWidth.value =
      props.carouselList.length * 126 - carouselSlide.value.offsetWidth;
  } else {
    carouselItem.value = 100 / props.carouselNumber + "%";
    if (props.carouselList.length <= props.carouselNumber) {
      carouselWidth.value = 0;
    } else {
      carouselWidth.value =
        (carouselSlide.value.offsetWidth / props.carouselNumber) *
        (props.carouselList.length - props.carouselNumber);
    }
  }
});

const goList = () => {
  if (props.carouselNumber == 4) {
    localStorage.setItem("columnNum", 2);
    router.push({
      name: "column",
    });
  } else {
    localStorage.setItem("columnNum", 3);
    router.push({
      name: "column",
    });
  }
};

// const openDetail = (item) => {
//   if (props.carouselNumber == 4) {
//     router.push({
//       name: "GachaDetail",
//       params: {
//       userId:item,
//     },
//     });
//   } else {
//     router.push({
//       name: "details",
//       params: {
//         userId: item,
//       },
//     });
//   }
// };
</script>

<style scoped>
.gacha-games {
  width: 100%;
  height: 442.5px;
  border-radius: 18px;
  margin-top: 65px;
  padding: 50px;
  background-color: #000;
}

.gacha-title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gacha-title {
  font-size: 25px;
  color: #fff;
  text-align: left;
}

.gacha-btn {
  padding: 8px 45px;
  color: #fff;
  background-color: #141414;
  border-radius: 18px;
  border: transparent;
  cursor: pointer;
}

.gacha-btn:hover {
  background-color: #fff;
  color: #141414;
}

.carousel-container {
  position: relative;
  width: 100%;
  margin-top: 50px;
  overflow: hidden;
}

.carousel-slide {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

.carousel-item {
  padding-right: 10px;
  /* min-width: 25%; */
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

img {
  width: 100%;
  height: 237.5px;
  border-radius: 12px;
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

.carousel-tag {
  position: relative;
  width: 100%;
  margin-top: 20px;
  height: 5px;
  border-radius: 12px;
  background-color: #1e1e1e;
  overflow: hidden;
}

.tag {
  position: absolute;
  width: 0%;
  height: 5px;
  left: 0;
  background-color: #fff;
  transition: width 0.3s ease-in-out;
}

.disable-select {
  user-select: none;
}

@media screen and (max-width: 768px) {
  .gacha-games {
    padding: 25px;
    margin-top: 50px;
    height: 285px;
  }

  .gacha-title {
    font-size: 20px;
  }

  .carousel-container {
    margin-top: 25px;
  }

  img {
    height: 160px;
  }
}
</style>