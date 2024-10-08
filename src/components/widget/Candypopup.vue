<script setup>
import {ref} from "vue";
import axios from "@/utils/axios";

const props = defineProps({
  candyVisible: Boolean,
  walletNum: Number,
  prizeList: Array,
});

const emit = defineEmits(["closeCandy", "burnType"]);

const isok = ref(false);

const closeBox = () => {
  emit("closeCandy");
};

const allTag = ref("");
const allPrize = ref(0);

const choiceTag = (val) => {
  if (val == "eth" || val == "sol") {
    allPrize.value = props.walletNum / 100;
  } else {
    allPrize.value = props.walletNum;
  }

  isok.value = true;
  allTag.value = val;
};

const goBurn = async () => {
  for (let i = 0; i < props.prizeList.length; i++) {
    await axios.post("/tsg/player/burnCardNoVerify", props.prizeList[i].id, {
      headers: {
        "Content-Type": "text/plain", // 根据需要设置内容类型
      },
    });
  }

  isok.value = false;
  allTag.value = 0;
  emit("burnType");
};
</script>

<template>
  <div class="addsection" v-if="candyVisible">
    <div class="closeback" @click="closeBox"></div>
    <div class="addbox">
      <p>PLEASE CHOOSE THE EXCHANGE METHOD</p>
      <div class="card-info">
        <div class="card-tag">
          <p>ETHERNET MAINNET</p>
          <div @click="choiceTag('eth')">
            <span>USDC</span><span>{{ walletNum / 100 }}</span>
          </div>
          <p>SOLANA MAINNET</p>
          <div @click="choiceTag('sol')">
            <span>USDC</span><span>{{ walletNum / 100 }}</span>
          </div>
          <div @click="choiceTag('candy')">
            <span>CANDY</span><span>{{ walletNum }}</span>
          </div>
        </div>
      </div>
      <div class="boxtip">
        <img src="../../assets/images/SVG/title.svg" alt="" />
      </div>
    </div>
    <div class="addbox flexbox" v-if="isok">
      <p>ARE YOU SURE YOU WANT TO EXCHANGE??</p>
      <p v-if="allTag == 'eth'">{{ allPrize }} USDC</p>
      <p v-if="allTag == 'sol'">{{ allPrize }} USDC</p>
      <p v-if="allTag == 'candy'">{{ allPrize }} CANDY</p>
      <p>*TIPS:Please note,transaction results irreversible.*</p>
      <div>
        <button @click="isok = false">CANCEL</button>
        <button @click="goBurn">CONFIRM</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
input:focus {
  outline: none;
}
.addsection {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.closeback {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 20;
}

.addbox {
  position: relative;
  max-width: 780px;
  width: 100%;
  padding: 40px 120px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #000;
  z-index: 22;
}

.addbox > p {
  font-size: 26px;
  color: #fff;
  text-align: center;
}

/**/
.card-info {
  margin-top: 20px;
}

.card-tag {
  color: #fff;
  padding: 40px 0;
}

.card-tag > p {
  text-align: right;
  font-size: 16px;
}

.card-tag > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  border: 1px solid #fff;
  border-radius: 12px;
  padding: 0px 40px;
  margin: 10px 0;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  user-select: none;
}

.card-tag > div > span {
  font-size: 26px;
  color: #ffff00;
}

.card-prize {
  margin: 40px auto;
}

.card-prize {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #ffff00;
}

.enterbox {
  text-align: center;
}

.enterbox > button {
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  width: 120px;
  height: 38px;
  background-color: #ffff00;
  border: 0px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  font-size: 16px;
}
.enterbox > button:active {
  background-color: #ffe600;
}

.boxtip {
  position: absolute;
  right: 20px;
  bottom: 20px;
  font-size: 14px;
  width: auto;
  height: 14px;
  text-align: right;
  color: #fff;
}
.boxtip img {
  width: auto;
  height: 100%;
  object-fit: contain;
}

.addbox.flexbox {
  position: absolute;
  padding: 40px 80px;
}

.flexbox > p:first-child {
  font-size: 26px;
  color: #ffff00;
  font-weight: bold;
}

.flexbox > p:nth-child(2) {
  font-size: 38px;
  color: #ffff00;
  font-weight: bold;
  margin: 20px 0;
}

.flexbox > p:nth-child(3) {
  font-size: 18px;
  color: #fff;
  margin: 20px 0;
}
.flexbox > div {
  display: flex;
  justify-content: space-between;
  margin-top: 45px;
}

.flexbox > div > button {
  width: 42%;
  height: 72px;
  border: 1px solid #fff;
  border-radius: 50px;
  font-size: 18px;
  cursor: pointer;
  user-select: none;
}

.flexbox > div > button:first-child {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.4);
}

.flexbox > div > button:first-child:hover {
  color: #fff;
  background-color: #000;
}

.flexbox > div > button:last-child {
  color: #000;
  background-color: #ffff00;
}

.flexbox > div > button:last-child:hover {
  color: #fff;
  background-color: #000;
}
</style>