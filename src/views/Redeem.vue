<script setup>
import Candypopup from "@/components/widget/Candypopup.vue";
import router from "@/router";
import {tipbox} from "@/utils/change";
import {store} from "@/utils/store";
import {onMounted, ref} from "vue";

const userList = ref([]);
const prizeList = ref([]);
const candyPrize = ref(0);
const walletPrize = ref(0);

const goColumn = (e) => {
  router.push({ name: e });
};

onMounted(() => {
  userList.value = store.joinList;
  userList.value.forEach((item) => {
    item.discode = false;
  });
});

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

// 目前支持USDC
const candyVisible = ref(false);
const walletNum = ref(0);

const openCandybox = () => {
  if(walletPrize.value == 0){
    return store.changeMessage('Please select the NFT that requires BURN')
  }
  candyVisible.value = true;
  walletNum.value = walletPrize.value;
};

const closeCandy = () => {
  candyVisible.value = false;
};

const goSolana = () => {
  window.open('https://magiceden.io/', '_blank');
}

const burnType = () => {
  candyVisible.value = false
  store.changeMessage('PLEASE SELECT THE CARD WHICH YOU WANT TO EXCHANGE')
}
</script>

<template>
  <div class="itembox">
    <div class="redeem">
      <div
        class="item"
        v-for="(item, index) in userList"
        :key="'fore' + item.id"
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
            {{
              ((item.usd / 100) * (item.burnCandyRatio / 100)).toFixed(2)
            }}</span
          >
        </div>
        <div :class="item.discode ? 'item-active' : ''"></div>
      </div>
    </div>
    <div class="butbox">
      <div class="sellbtn" @click="goSolana">
        <p>SELL</p>
      </div>
      <div class="exchengebtn" @click="openCandybox">
        <p>EXCHENGE</p>
        <div class="exchenge-prize">
          <span>$ {{ walletPrize.toFixed(2) }} / {{ candyPrize }} tsg</span>
          <img src="../assets/images/SVG/prizetag.svg" alt="" />
        </div>
      </div>
      <div class="operation">
        <div class="ship" @click="tipbox.openSet()">
          <p>SHIPPING</p>
        </div>
        <div class="skip" @click="goColumn('profile')">
          <p>SKIP</p>
        </div>
      </div>
    </div>
    <Candypopup
      :candyVisible="candyVisible"
      :walletNum="walletNum"
      :prizeList="prizeList"
      @closeCandy="closeCandy"
      @burnType="burnType"
    />
  </div>
</template>

<style scoped>
.itembox {
  width: 100%;
  padding: 25px;
  background-color: #141414;
  border-radius: 18px;
  overflow: hidden;
}

.redeem {
  display: flex;
  flex-wrap: wrap;
}

.item {
  position: relative;
  width: 250px;
  height: 365px;
  background-color: #1e1e1e;
  padding: 12px;
  border-radius: 18px;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  overflow: hidden;
}

.item:nth-child(4n) {
  margin-right: 0;
}

.item-img {
  width: 100%;
  height: auto;
  border-radius: 18px;
  overflow: hidden;
  background-color: #fff;
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
  text-align: center;
  line-height: 1.6;
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

.item-active {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 45px;
  height: 45px;
  background-image: url(../assets/images/SVG/active.svg);
  background-size: cover;
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
  border: 1px solid #282828;
  line-height: 100px;
  font-size: 25px;
  color: #ffff00;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
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
  line-height: 100px;
  font-size: 25px;
  margin-top: 10px;
  color: #ffff00;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
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

.ship {
  margin-right: 15px;
}
</style>
