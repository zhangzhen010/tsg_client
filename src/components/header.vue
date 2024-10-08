<script setup>
import Navigation from "@/components/Navigation.vue";
import Navpaper from "@/components/Navpaper.vue";
import Loginbox from "@/components/Loginbox.vue";
import Baycandy from "@/components/Baycandy.vue";
import Message from "@/components/widget/Message.vue";
import Settings from "@/components/widget/Settings.vue";
import Tipmessage from "@/components/widget/Tipmessage.vue";
import Tiptext from "@/components/widget/Tiptext.vue";

import {onMounted, ref, watch} from "vue";
import router from "@/router";
import {store} from "@/utils/store";
import axios from "@/utils/axios";
import {
  createWeb3Modal,
  defaultSolanaConfig,
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/solana/vue";
import {solana, solanaDevnet, solanaTestnet} from "@web3modal/solana/chains";
import bs58 from "bs58";
import {loadMoonPay} from "@moonpay/moonpay-js";

const loginToken = ref(false);
const SolanaPrize = ref(0);
const Prize = ref(0);
const userAddress = ref("");
const userPicture = ref("");
const isLoginLeft = ref(false);
const buyVisible = ref(false);

const LoginVisible = ref(false);

const projectId = "f7bc324cd0fd3f0896b01106d2e69d00";

const chains = [solana, solanaDevnet, solanaTestnet];

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Solana Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const solanaConfig = defaultSolanaConfig({
  metadata,
  chains,
  projectId,
});

createWeb3Modal({
  solanaConfig,
  chains,
  projectId,
  wallets: [],
});

const modal = useWeb3Modal();

const { address, isConnected } = useWeb3ModalAccount();

const { disconnect } = useDisconnect();

const getLogin = () => {
  LoginVisible.value = true;
};

const LoginChange = () => {
  LoginVisible.value = false;
};

const loginWallet = () => {
  userAddress.value = address.value.toString();

  onSignMessage();
};

const LoginPrize = (item) => {
  loginToken.value = true;
  Prize.value = item.candy;
  LoginVisible.value = false;
  isLoginLeft.value = true;
  store.changeLogin();
  getPrize();
};

const onSignMessage = async () => {
  const userLogin = localStorage.getItem("token");
  if (!userLogin) {
    const newData = new Date();
    const text = `test-tsg.com wants you to sign in with your Solana account: ${userAddress.value}/n
    Welcome to TOKYO STUPID GAMES. Signing is the only way we can truly know that you are the owner of the wallet you are connecting. signing is safe, gas-less transaction that does not in any way give TOKYO STUPID GAMES permission to perform any transactions with your wallet.

    URL: https://test-tsg.com/
    Version: 1.0
    Chain ID: mainnet
    Issued At: ${dateTime(newData)}
    Request ID: C19865515b6b5-ec998-2i2i-99093ddel32w34`;
    const encoder = new TextEncoder();
    const message = encoder.encode(text);
    const Provider = useWeb3ModalProvider();
    const sign = await Provider.walletProvider.signMessage(message);
    const signaBs58 = bs58.encode(sign);
    const res = await axios.get("/tsg/login/qb", {
      params: {
        account: userAddress.value,
        pwd: signaBs58,
        signContent: text,
      },
    });
    if (res.data.code == 200) {
      loginToken.value = true;
      Prize.value = res.data.data.gcMoney;
      localStorage.setItem("userSigner", signaBs58);
      localStorage.setItem("userName", res.data.data.playerName);
      localStorage.setItem("headPic", res.data.data.avatarUrl);
      localStorage.setItem("userAddress", userAddress.value);
      localStorage.setItem("token", res.data.data.token);
      userPicture.value = res.data.data.avatarUrl;
      store.changeLogin();
      getPrize();
    }
  } else {
    loginToken.value = true;
    getPrize();
  }
};

const dateTime = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份需要加1且补零
  const day = date.getDate().toString().padStart(2, "0"); // 补零
  const hours = date.getHours().toString().padStart(2, "0"); // 补零
  const minutes = date.getMinutes().toString().padStart(2, "0"); // 补零
  const seconds = date.getSeconds().toString().padStart(2, "0"); // 补零

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const getPrize = async () => {
  const prizeRes = await axios.post("/tsg/player/playerInfo");
  if (prizeRes.data.code == 200) {
    Prize.value = prizeRes.data.data.candy;
    localStorage.setItem("headPic", prizeRes.data.data.avatarUrl);
    localStorage.setItem("userName", prizeRes.data.data.playerName);
    userPicture.value = localStorage.getItem("headPic");
  }
};

onMounted(() => {
  if (window.innerWidth < 768) {
    window.addEventListener("scroll", handleScroll);
  }
  const userLogin = localStorage.getItem("token");
  if (userLogin) {
    loginToken.value = true;
    store.changeLogin();
    isLoginLeft.value = true;
    userPicture.value = localStorage.getItem("headPic");
    getPrize();
  }
});

const loginSolana = () => {
  modal.open();
  LoginVisible.value = false;
};

const closeWallet = () => {
  loginToken.value = false;
  isLoginLeft.value = false;
  localStorage.removeItem("headPic");
  localStorage.removeItem("Account");
  localStorage.removeItem("token");
  localStorage.removeItem("userAddress");
  localStorage.removeItem("userSigner");
  localStorage.removeItem("userName");
  disconnect();
  store.changeLogin();
};

const navigationVisible = ref(false);

const openNavigation = () => {
  navigationVisible.value = true;
};

const updateValue = () => {
  navigationVisible.value = false;
  isLoginLeft.value = false;
};

const pageVisible = ref(false);

const openUer = () => {
  pageVisible.value = true;
};

const pageValue = (val) => {
  pageVisible.value = false;

  if(val) {
    router.push({ name: "home" });
  }
  
};

const openMarket = () => {
  router.push({ path: "/user/profile" });
};

const navLeft = ref(null);
const navRight = ref(null);

const handleScroll = () => {
  if (window.scrollY > 30) {
    navLeft.value.style = "display:none;";
    navRight.value.style = "display:flex;";
  } else {
    navLeft.value.style = "display:flex;";
    navRight.value.style = "display:none;";
  }
};

const closeBuyVisible = () => {
  buyVisible.value = false;
};

const getMoon = () => {
  buyVisible.value = true;
};


const key = ref("pk_test_tF2Du6V1C7BcwuzoJywSaVATf8CK6N3");
const wallet = ref("0x7B2E275DDCB0b581Ad244d82705D8F354e2CB947");
const work = ref("SOL");

const moonBay = async () => {
  const moonPay = await loadMoonPay();

  const href = location.origin;

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

watch(
  [() => store.loginToken, () => store.changePrize],
  (newValue, oldValue) => {
    if (newValue[1]) {
      getPrize();
      store.changeNum();
    }
  }
);

watch(
  () => isConnected.value,
  (newVal, oldVal) => {
    if (newVal) {
      loginWallet();
    } else {
      closeWallet();
    }
  }
);
</script>

<template>
  <header>
    <div class="nav">
      <div class="nav_left" ref="navLeft">
        <div class="left_tag" @click="openNavigation">
          <img src="../assets/images/SVG/tag.svg" alt="" />
        </div>
        <div class="left_title">
          <a href="/">
            <img src="../assets/images/SVG/title.svg" alt="" />
          </a>
        </div>
      </div>
      <div class="nav_right" ref="navRight">
        <div v-if="loginToken">
          <div class="right_prize">
            <img
              class="prize_icon"
              src="../assets/images/SVG/prize.svg"
              alt=""
            />
            <span>$ {{ SolanaPrize }}</span>
            <img
              class="prize_bottom"
              src="../assets/images/SVG/bottom.svg"
              alt=""
            />
          </div>
          <div class="right_candy" @click="moonBay">
            <img
              class="prize_icon"
              src="../assets/images/SVG/plat.svg"
              alt=""
            />
            <span>{{ Prize }}</span>
            <img
              class="prize_bottom"
              src="../assets/images/SVG/bottom.svg"
              alt=""
            />
          </div>
        </div>
        <div v-if="loginToken">
          <div class="right_user" @click="openUer">
            <img v-if="userPicture" :src="userPicture" alt="" />
            <img v-else src="../assets/images/avanter.svg" alt="" />
          </div>
          <div class="right_wellat" @click="openMarket">
            <img src="../assets/images/SVG/wallet.svg" alt="" />
          </div>
        </div>
        <div v-if="!loginToken">
          <!-- <WalletMultiButton></WalletMultiButton> -->
          <button class="loginbtn" @click="getLogin">LOGIN</button>
          <!-- <button class="signbtn">SIGN UP</button> -->
        </div>
      </div>
    </div>
  </header>
  <Navpaper :pageVisible="pageVisible" @pageValue="pageValue"></Navpaper>
  <Navigation
    :isLoginLeft="isLoginLeft"
    :navigation="navigationVisible"
    @updateValue="updateValue"
  ></Navigation>
  <Loginbox
    :LoginVisible="LoginVisible"
    @LoginChange="LoginChange"
    @LoginPrize="LoginPrize"
    @loginSolana="loginSolana"
  />
  <Baycandy :buyVisible="buyVisible" @closeBuyVisible="closeBuyVisible" />
  <!-- <Payment /> -->
  <Message />
  <Settings />
  <Tipmessage />
  <Tiptext />
</template>

<style scoped>
header {
  position: fixed;
  width: 100%;
  height: 90px;
  top: 0;
  left: 0;
  padding: 0 20px;
  background-color: #141414;
  z-index: 99;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 24px;
}

.nav_left {
  display: flex;
  align-items: center;
}

.left_tag {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #000000;
  cursor: pointer;
}

.left_tag img {
  position: absolute;
  width: 15px;
  height: 15px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.left_title {
  margin-left: 19px;
}

.left_title img {
  width: 100%;
  height: auto;
}

.nav_right {
  display: flex;
  align-items: center;
}

.nav_right > div {
  display: flex;
  align-items: center;
}

.right_prize {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 160px;
  height: 50px;
  padding: 14.5px;
  border-radius: 25px;
  background-color: #1e1e1e;
  cursor: pointer;
}

.right_prize .prize_icon {
  width: 21px;
  height: 19px;
  object-fit: contain;
}

.right_prize span {
  font-size: 14px;
  user-select: none;
}

.right_prize .prize_bottom {
  width: 12px;
  height: 12px;
  object-fit: contain;
  cursor: pointer;
}

.right_candy {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 160px;
  height: 50px;
  padding: 14.5px;
  border-radius: 25px;
  margin-left: 10px;
  background-color: #1e1e1e;
}

.right_candy .prize_icon {
  width: 24px;
  height: 13.6px;
  object-fit: contain;
}

.right_candy span {
  font-size: 14px;
}

.right_candy .prize_bottom {
  width: 12px;
  height: 12px;
  object-fit: contain;
  cursor: pointer;
}

.right_user {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 10px;
  cursor: pointer;
  overflow: hidden;
}

.right_user img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.right_wellat {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 10px;
  background-color: #1e1e1e;
  cursor: pointer;
}

.right_wellat img {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20.5px;
  height: 18px;
  transform: translate(-50%, -50%);
  object-fit: contain;
}

.nav_logo {
  border: 0;
  color: #fff;
  font-size: 18px;
  text-align: center;
  background-color: transparent;
  cursor: pointer;
}

.loginbtn {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  padding: 15px 60px;
  border: 1px solid #fff;
  background-color: transparent;
  border-radius: 50px;
  cursor: pointer;
}

.loginbtn:hover {
  background-color: #fff;
  color: #000;
}

.signbtn {
  font-size: 18px;
  font-weight: 500;
  padding: 15px 15px;
  background-color: #ffff00;
  border-radius: 8px;
  border: 0px;
  margin-left: 25px;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  header {
    height: 50px;
  }

  .nav {
    position: relative;
    justify-content: center;
  }
  .nav_left {
    display: flex;
  }

  .left_tag {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
  }

  .left_title {
    margin-left: 0;
  }

  .left_title img {
    height: 12px;
  }

  .nav_right {
    width: 100%;
    display: none;
    justify-content: space-between;
  }

  .right_prize {
    width: 125px;
    height: 30px;
    padding: 11.5px;
  }

  .right_prize .prize_icon {
    width: 15px;
    height: 13.5px;
  }

  .right_prize span {
    font-size: 12px;
  }

  .right_prize .prize_bottom {
    width: 6px;
    height: 6px;
  }

  .right_candy {
    width: 100px;
    height: 30px;
    padding: 11.5px;
  }

  .right_candy .prize_icon {
    width: 17px;
    height: 9.5px;
  }

  .right_candy span {
    font-size: 12px;
  }

  .right_candy .prize_bottom {
    width: 6px;
    height: 6px;
  }

  .right_user,
  .right_wellat {
    width: 30px;
    height: 30px;
  }
}
</style>
