<script setup>
import {tipText} from "@/utils/change";
import {ref, watch} from "vue";

const candyVisible = ref(false);
const candyText = ref('');

const closeBox = () => {
    tipText.closeSet()
}

watch(
  () => tipText.setVisible,
  (newVal, oldVal) => {
    candyVisible.value = tipText.setVisible;
    candyText.value = tipText.setText;
  }
);
</script>

<template>
  <div class="addsection" v-if="candyVisible">
    <div class="closeback" @click="closeBox"></div>
    <div class="addbox">
        <div class="closebtn" @click="closeBox">
            <img src="../../assets/images/SVG/close.svg" alt="">
        </div>
      <p>{{ candyText }}</p>
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
  z-index: 999;
}

.closeback {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 21;
}

.addbox {
    position: relative;
  max-width: 600px;
  width: 100%;
  padding: 120px 0px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #000;
  z-index: 22;
}

.closebtn {
    position: absolute;
    width: 35px;
    height: 35px;
    right: 10px;
    top: 10px;
    box-sizing: border-box;
    padding: 5px;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    user-select: none;
}

.closebtn>img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.closebtn:hover {
    background-color: #141414;
}
.closebtn:hover>img{
    filter: invert(1);
}

.addbox > p {
  font-size: 26px;
  font-weight: bold;
  color: #ffff00;
  text-align: center;
}

/**/
.card-info {
  margin-top: 20px;
}

.card-tag {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-tag > div {
  margin: 0 18px;
}

.card-tag > div > span {
  color: #ffff00;
  font-size: 16px;
}

.card-tag > div > input {
  margin-left: 10px;
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
  margin-top: 60px;
}

.enterbox > button {
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  width: 240px;
  height: 78px;
  background-color: #ffff00;
  border: 0px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  font-size: 24px;
}
.enterbox > button:hover {
  background-color: #fff;
  color: #151515;
}
.enterbox > button:active {
  background-color: #fff;
}

.boxtip {
  text-align: center;
  margin: 40px auto 10px;
  font-size: 14px;
  color: #fff;
}
</style>