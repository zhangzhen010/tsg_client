<script setup>
import axios from "@/utils/axios";
import {loadMoonPay} from "@moonpay/moonpay-js";
import {ref} from "vue";

const props = defineProps({
  buyVisible: Boolean,
});

const emit = defineEmits(['closeBuyVisible'])

const key = ref("pk_test_tF2Du6V1C7BcwuzoJywSaVATf8CK6N3");
const wallet = ref("0x7B2E275DDCB0b581Ad244d82705D8F354e2CB947");
const work = ref("eth");

const moonBay = async () => {
  const moonPay = await loadMoonPay();

  const href = location.origin

  const res = await axios.post(
    "/tsg/pay/moonPayUrlSign",
    `${href}?apiKey=${key.value}&currencyCode=${work.value}&walletAddress=${wallet.value}`
  );

  if (res.data.code == 200) {
    const message = res.data.message;

    const widget = moonPay?.({
      flow: "buy",
      environment: "sandbox",
      params: {
        apiKey: key.value,
        currencyCode: message,
        walletAddress: wallet.value,
      },
      variant: "overlay",
      handlers: {
        async onTransactionCompleted(props) {
          console.log("onTransactionCompleted", props);
        },
      },
    });

    widget?.show();
  }
};

const loseBuy = () => {
    emit("closeBuyVisible")
}
</script>

<template>
  <div class="buybox" v-if="buyVisible">
    <div class="buybackground" @click="loseBuy"></div>
    <div class="buy">
      <button @click="moonBay">打开组件</button>
    </div>
  </div>
</template>

<style scoped>
.buybox {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
.buybackground {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.buy {
  position: absolute;
  width: 460px;
  height: 320px;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  z-index: 101;
}
</style>