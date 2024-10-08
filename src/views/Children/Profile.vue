<script setup>
import {onMounted, ref} from "vue";
import axios from "@/utils/axios";
import Candypopup from "@/components/widget/Candypopup.vue";
import {store} from "@/utils/store";
import router from "@/router";
import {tipbox, tipText} from "@/utils/change";

const userList = ref([]);
const pageList = ref([]);
const contentVisible = ref(false);
const pageSize = ref(0);
const onSize = ref(1);

onMounted(() => {
  getUser();
});

const getUser = async () => {
  const res = await axios.get("/tsg/player/getCardList");
  if (res.data.code == 200) {
    userList.value = res.data.data;
    if (userList.value.length == 0) {
      contentVisible.value = false;
    } else {
      contentVisible.value = true;
    }
    userList.value.forEach(item => {
      item.discode = false
    })
  }
};

const getNext = (num) => {
  onSize.value = num;
  pageList.value = userList.value.slice((num - 1) * 8, 8 * num);
};

const goSolana = () => {
  window.open('https://magiceden.io/', '_blank');
}

const walletPrize = ref(0)
const prizeList = ref([])
const candyPrize = ref(0)

const clickPrize = (item, index) => {
  if (userList.value[index].discode) {
    userList.value[index].discode = !userList.value[index].discode;
    walletPrize.value -= (item.usd / 100) * (item.burnCandyRatio / 100);
    addList(item);
  } else {
    userList.value[index].discode = !userList.value[index].discode;
    walletPrize.value += (item.usd / 100) * (item.burnCandyRatio / 100);
    addList(item);
  }

  candyPrize.value = walletPrize.value * 100;
};

const addList = (item) => {
  const index = prizeList.value.findIndex(
    (obj) => obj.metaPublicKey == item.metaPublicKey
  );

  if (index !== -1) {
    prizeList.value.splice(index, 1);
  } else {
    const addres = localStorage.getItem("userAddress");

    prizeList.value.push({
      transactionId: "",
      type: 2,
      chainType: "USD",
      currencyType: "usd",
      ratio: 1,
      id:item.id,
      value: (item.usd / 100) * (item.burnCandyRatio / 100),
      targetWalletAddress: addres,
      metaPublicKey: item.metaPublicKey,
      mintPublicKey: item.mintPublicKey,
    });
  }
};

const candyVisible = ref(false)

const openCandy = () => {
  if(candyPrize.value == 0){
    return store.changeMessage('Please select the NFT that requires BURN')
  }
  candyVisible.value = true
}

const closeCandy = () => {
  candyVisible.value = false
}

const burnType = () => {
  candyVisible.value = false
  getUser()
  tipText.openSet('BURN IN PROGRESS, PLEASE SIGN WITH YOUR WALLET.')
}

const goMarkplace = () => {
  localStorage.setItem("columnNum",3)
  router.push({ path: '/column' });
}
</script>

<template>
  <div class="empty">
    <div class="empty-root" v-if="!contentVisible">
      <div class="empty-box">
        <h3 class="empty-h3">Your collection is empty</h3>
        <p class="empty-p">
          Seems like you don't own any NFTs, you can try to own one on the Marketplace.
        </p>
        <div class="empty-btn" @click="goMarkplace">
          <a href="#">
            <button>Explore marketplace</button>
          </a>
        </div>
      </div>
    </div>
    <div v-if="contentVisible">
      <div class="itembox">
        <div
          :class="item.discode?'item active':'item'"
          v-for="(item, index) in userList"
          :key="'fore' + index"
          @click="clickPrize(item, index)"
        >
          <div class="item-img">
            <img :src="item.image" alt="" />
          </div>
          <div class="item-box">
            <p>{{ item.name }}</p>
          </div>
          <div class="item-prize">
            <span
              >$
              {{ ((item.usd / 100 / 100) * item.burnFtRatio).toFixed(2) }}</span
            >
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
      <div class="butbox">
        <div class="sellbtn" @click="goSolana">
          <p>SELL</p>
        </div>
        <div class="exchengebtn" @click="openCandy">
          <p>EXCHENGE</p>
          <div class="exchenge-prize">
            <span>$ {{ walletPrize }} tsg</span>
            <img src="../../assets/images/SVG/prizetag.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="operation">
        <div class="ship" @click="tipbox.openSet()">
          <p>SHIPPING</p>
        </div>
      </div>
    </div>
    <Candypopup @closeCandy="closeCandy" @burnType="burnType" :candyVisible="candyVisible" :prizeList="prizeList" :walletNum="candyPrize"/>
  </div>
</template>

<style scoped>
.empty {
  margin-top: 16px;
  margin-bottom: 16px;
}

.empty-root {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60dvh;
  margin-top: 0px;
}
.empty-box {
  max-width: 400px;
  text-align: center;
  margin: 0 auto;
}
.empty-h3 {
  font-size: 24px;
  color: #fff;
  line-height: 133.4%;
  font-weight: 700;
  margin: 0 0 16px;
}
.empty-p {
  font-size: 14px;
  color: #fff;
  line-height: 143%;
  font-weight: 400;
  margin: 0;
}
.empty-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  margin-top: 40px;
}
.empty-btn button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
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
  background-color: transparent;
  color: rgb(47, 91, 249);
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 600;
  line-height: 115%;
  padding: 12px 16px;
  height: fit-content;
}
.itembox {
  display: flex;
  flex-wrap: wrap;
  max-height: 100vh;
  overflow-y: hidden;
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
  cursor: pointer;
  user-select: none;
  overflow: hidden;
}

.item.active {
  border: 1px solid #ffff00;
}

.item:nth-child(4n) {
  margin-right: 0;
}

.item-img {
  width: 210px;
  height: 210px;
  border-radius: 18px;
  background-color: #fff;
  overflow: hidden;
}

.item-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-box {
  width: 100%;
  margin-top: 20px;
}

.item-box p {
  font-size: 20px;
  line-height: 1.6;
  text-align: center;
  color: #fff;
}

.item-prize {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  font-size: 18px;
  color: #fff;
}

.pagebox {
  display: flex;
  justify-content: center;
}

.collecpage {
  display: flex;
  align-items: center;
  /* margin-top: 25px; */
  margin: 0 auto;
}
.collecpage > div {
  width: 30px;
  height: 30px;
  border: 1px solid #fff;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  margin: 0 10px;
  cursor: pointer;
}
.collecpage > div.active {
  background-color: #ffff00;
  color: #000;
}

.butbox {
  margin-top: 20px;
  width: 100%;
}

.sellbtn {
  position: relative;
  width: 100%;
  height: 100px;
  border-radius: 12px;
  border: 1px solid #ccc;
  line-height: 100px;
  font-size: 25px;
  color: #ffff00;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
}

.sellbtn:hover {
  background-color: #fff;
  color: #000;
}

.sell-prize {
  position: absolute;
  display: flex;
  align-items: center;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
}

.sell-prize span {
  font-size: 12px;
  color: #fff;
}

.sell-prize img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 10px;
}

.exchengebtn {
  position: relative;
  width: 100%;
  height: 100px;
  border-radius: 12px;
  background-color: #1e1e1e;
  border: 1px solid #ccc;
  line-height: 100px;
  font-size: 25px;
  margin-top: 10px;
  color: #ffff00;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
}

.exchengebtn:hover {
  background-color: #fff;
  color: #000;
}

.exchenge-prize {
  position: absolute;
  display: flex;
  align-items: center;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
}

.exchenge-prize span {
  font-size: 18px;
  color: #fff;
}

.exchenge-prize img {
  width: 28px;
  height: auto;
  margin-left: 10px;
}

.exchengebtn:hover .exchenge-prize span {
  color: #000;
}

.exchengebtn:hover .exchenge-prize img {
  filter: invert(1);
}

.operation {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
}

.ship,
.skip {
  width: 237.5px;
  height: 75px;
  border: 1px solid #ccc;
  text-align: center;
  color: #fff;
  line-height: 75px;
  border-radius: 12px;
  cursor: pointer;
}
</style>