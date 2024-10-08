<script setup>
import {onMounted, ref} from "vue";
import axios from "@/utils/axios";

const InventoryList = ref([]);

const pageSize = ref(0)
const pageList = ref([])

onMounted(() => {
  getInventory();
});

const getInventory = async () => {
  const res = await axios.get("/tsg/player/getCardList");
  if (res.data.code == 200) {
    InventoryList.value = res.data.data;

    pageSize.value = Math.ceil(InventoryList.value.length / 8);
    pageList.value = InventoryList.value.slice(0, 8);
  }
};
</script>

<template>
  <div class="nize">
    <div class="nize-box" v-if="InventoryList.length == 0">
      <h1 class="h1">Vault your graded cards for free at</h1>
      <h6 class="h6-title">
        We provide free vaulting and insurance through our partner Brink’s, the
        global leader in protecting valuables.
      </h6>
      <h6 class="h6-text">
        We accept slabs from the top grading companies: PSA, BGS, SGC, CGS, CGC,
        and HGA
      </h6>
      <div class="nize-text">
        <h6>
          <svg
            class="nize-svg"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="CheckIcon"
          >
            <path
              d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
            ></path></svg
          >No sales tax, shipping, or storage fees.
        </h6>
        <h6>
          <svg
            class="nize-svg"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="CheckIcon"
          >
            <path
              d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
            ></path></svg
          >Earn 1% every time your card is resold.
        </h6>
        <h6>
          <svg
            class="nize-svg"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="CheckIcon"
          >
            <path
              d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
            ></path></svg
          >Redeem the physical card 24/7 in 150+ countries.
        </h6>
      </div>
      <button>Get Started</button>
    </div>
    <div class="nize-list" v-else>
      <div class="itembox">
        <div
          class="item"
          v-for="(item, index) in pageList"
          :key="'fore' + index"
        >
          <div class="item-img">
            <img
              :src="item.image"
              alt=""
            />
          </div>
          <div class="item-box">
            <p>{{ item.name }}</p>
          </div>
          <div class="item-prize">
            <span>$ {{ (item.usd / 100 / 100 * item.burnFtRatio).toFixed(2) }}</span>
          </div>
        </div>
      </div>
      <div class="pagebox">
        <div class="collecpage">
          <!-- <div
            v-for="item in pageSize"
            @click="getNext(item)"
            :key="'page' + item"
            :class="onSize == item ? 'active' : ''"
          >
            {{ item }}
          </div> -->

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nize {
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  flex-direction: row;
}
.nize-box {
  max-width: 90%;
  margin-top: 24px;
  margin-bottom: 24px;
}
.h1 {
  margin: 0px;
  font-weight: 600;
  font-size: 48px;
  line-height: 116.7%;
  color: #fff;
}
.h6-title {
  margin: 16px 0px 0px;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  color: #fff;
}
.h6-text {
  margin: 16px 0px 0px;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  color: #fff;
}
.nize-text h6 {
  margin: 0px;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  margin: 15px 0;
  color: #fff;
}
.nize-svg {
  user-select: none;
  width: 1em;
  height: 1em;
  display: inline-block;
  fill: currentcolor;
  flex-shrink: 0;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: 1.5rem;
  vertical-align: text-bottom;
  margin-right: 8px;
}
.nize-box button {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  outline: 0px;
  border: 0px rgb(229, 229, 234);
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  min-width: 64px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: none;
  border-radius: 8px;
  background-color: rgb(47, 91, 249);
  color: rgb(255, 255, 255);
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 600;
  line-height: 115%;
  padding: 12px 16px;
  height: fit-content;
}

.nize-list {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.itembox {
  display: flex;
  flex-wrap: wrap;
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

.item-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #fff;
}

.item-box {
  width: 100%;
  margin-top: 20px;
}

.item-box p {
  font-size: 15px;
  line-height: 1.6;
  color: #fff;
}

.item-prize {
  position: absolute;
  left: 20px;
  bottom: 20px;
  font-size: 12px;
  color: #fff;
}

</style>