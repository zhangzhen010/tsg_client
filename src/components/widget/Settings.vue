<script setup>
import * as Bytescale from "@bytescale/sdk";
import {onMounted, ref, watch} from "vue";
import axios from "@/utils/axios";
import {store} from "@/utils/store";
import {setTing, tipText} from "@/utils/change";

// const props = defineProps({
//   setVisible:Boolean
// })

const uploadManager = new Bytescale.UploadManager({
  apiKey: "public_kW15bb56eKyZReN3E35ig1tMTJwm",
});

const uploadText = ref("Modify avatar");

onMounted(() => {
  getUsers();
});

const userList = ref({});

const changeList = ref({
  avatarUrl: "",
  playerName: "",
  userName: "",
  email: "",
  address: "",
});

const btnTag = ref(true);

const getUsers = async () => {
  const res = await axios.post("/tsg/player/playerInfo");

  if (res.data.code == 200) {
    userList.value = res.data.data;
  }
};

const onFileSelected = async (event) => {
  changeList.value.avatarUrl = "";

  const file = event.target.files[0];

  const { fileUrl } = await uploadManager.upload({
    data: file,
    onProgress: ({ progress }) => {
      uploadText.value = `File uploading... ${progress}%`;
    },
  });

  uploadText.value = "Modify avatar";

  userList.value.avatarUrl = fileUrl;
  changeList.value.avatarUrl = fileUrl

  btnTag.value = false;
};

const uploadEmail = (val) => {
  btnTag.value = false;
  changeList.value.email = val;
  
  uploadList();
};
const uploadUsername = (val) => {
  btnTag.value = false;
  changeList.value.userName = val;
  
  uploadList();
};
const uploadPlayername = (val) => {
  btnTag.value = false;
  changeList.value.playerName = val;

  uploadList();
};
const uploadAddress = (val) => {
  btnTag.value = false;
  changeList.value.address = val;

  uploadList();
};

const uploadList = () => {
  if (
    changeList.value.email == userList.value.email &&
    changeList.value.playerName == userList.value.playerName &&
    changeList.value.userName == userList.value.userName &&
    changeList.value.address == userList.value.address &&
    changeList.value.avatarUrl == userList.value.avatarUrl
  ) {
    btnTag.value = false;
  }
};



const saveUser = async () => {
  const res = await axios.post('/tsg/player/updatePlayerInfo',changeList.value)
  if(res.data.code == 200){
    localStorage.setItem('headPic',res.data.data.avatarUrl)
    store.changeNum();
    btnTag.value = true
    tipText.openSet('Modified successfully')
    getUsers()
  }  
  
};

// const emit = defineEmits(['closeSetVisible'])

const closeSet = () => {
  setTing.closeSet()
}

const setVisible = ref(false)

watch(
  ()=>setTing.setVisible,
  (newVal,oldVal)=> {
    setVisible.value = newVal
    newVal ? setTing.changeSet() : setTing.closeSet()
  }
)

</script>

<template>
  <div class="setbox" v-if="setVisible">
    <div class="set-close" @click="closeSet"></div>
    <div class="settag">
      <div class="close-btn" @click="closeSet">
        <img src="../../assets/images/SVG/close.svg" alt="">
      </div>
      <div class="set-profile">
        <div class="set-user">
          <div class="set-image">
            <img v-if="userList.avatarUrl" :src="userList.avatarUrl" alt="" />
            <img v-else src="../../assets/images/avanter.svg" alt="" />
            <label class="custom-file-upload">
              <input
                type="file"
                @change="onFileSelected"
                accept="image/*, video/mp4"
              />
              <!-- <span>{{ uploadText }}</span> -->
            </label>
          </div>
          <div class="set-root">
            <div class="set-email">
              <!-- <h6>Email</h6> -->
              <div class="input-box">
                <input
                  type="text"
                  :value="userList.email"
                  @input="uploadEmail($event.target.value)"
                  placeholder="Email"
                />
              </div>
            </div>
            <div class="set-username">
              <!-- <h6>Username</h6> -->
              <div class="input-box">
                <input
                  type="text"
                  :value="userList.userName"
                  @input="uploadUsername($event.target.value)"
                  placeholder="Username"
                />
              </div>
            </div>
            <div class="set-username">
              <!-- <h6>PlayerName</h6> -->
              <div class="input-box">
                <input
                  :value="userList.playerName"
                  @input="uploadPlayername($event.target.value)"
                  placeholder="PlayerName"
                />
              </div>
            </div>
            <div class="set-username">
              <!-- <h6>Address</h6> -->
              <div class="input-box">
                <input
                  type="text"
                  :value="userList.address"
                  @input="uploadAddress($event.target.value)"
                  placeholder="Address"
                />
              </div>
            </div>
            <div class="set-number">
              <!-- <h6>Username</h6> -->
              <button
                :disabled="btnTag"
                :class="btnTag ? 'btnccc' : ''"
                @click="saveUser"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="set-wallets">
                <h4>Wallets</h4>
                <div class="wallets-box">
                    <div>
                        <div class="wallets-type">
                            <div class="type-info">
                                <div class="info-root">
                                    <img src="../assets/images/SVG/avater.svg" alt="">
                                </div>
                                <div class="info-text">
                                    <span>Courtyard wallet</span>
                                    <span>0x17eD5426850797437AcF9898cae73db70361D5dC</span>
                                    <div class="info-icon">
                                        <h6>$0.00</h6>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" version="1.1"><title id="usdc-icon">USDC icon</title><g id="surface1"><path d="M 12 24 C 18.648438 24 24 18.648438 24 12 C 24 5.351562 18.648438 0 12 0 C 5.351562 0 0 5.351562 0 12 C 0 18.648438 5.351562 24 12 24 Z M 12 24 " style="stroke: none; fill-rule: nonzero; fill: rgb(39, 117, 202); fill-opacity: 1;"></path><path d="M 15.300781 13.898438 C 15.300781 12.148438 14.25 11.550781 12.148438 11.300781 C 10.648438 11.101562 10.351562 10.699219 10.351562 10 C 10.351562 9.300781 10.851562 8.851562 11.851562 8.851562 C 12.75 8.851562 13.25 9.148438 13.5 9.898438 C 13.550781 10.050781 13.699219 10.148438 13.851562 10.148438 L 14.648438 10.148438 C 14.851562 10.148438 15 10 15 9.800781 L 15 9.75 C 14.800781 8.648438 13.898438 7.800781 12.75 7.699219 L 12.75 6.5 C 12.75 6.300781 12.601562 6.148438 12.351562 6.101562 L 11.601562 6.101562 C 11.398438 6.101562 11.25 6.25 11.199219 6.5 L 11.199219 7.648438 C 9.699219 7.851562 8.75 8.851562 8.75 10.101562 C 8.75 11.75 9.75 12.398438 11.851562 12.648438 C 13.25 12.898438 13.699219 13.199219 13.699219 14 C 13.699219 14.800781 13 15.351562 12.050781 15.351562 C 10.75 15.351562 10.300781 14.800781 10.148438 14.050781 C 10.101562 13.851562 9.949219 13.75 9.800781 13.75 L 8.949219 13.75 C 8.75 13.75 8.601562 13.898438 8.601562 14.101562 L 8.601562 14.148438 C 8.800781 15.398438 9.601562 16.300781 11.25 16.550781 L 11.25 17.75 C 11.25 17.949219 11.398438 18.101562 11.648438 18.148438 L 12.398438 18.148438 C 12.601562 18.148438 12.75 18 12.800781 17.75 L 12.800781 16.550781 C 14.300781 16.300781 15.300781 15.25 15.300781 13.898438 Z M 15.300781 13.898438 " style="stroke: none; fill-rule: nonzero; fill: rgb(255, 255, 255); fill-opacity: 1;"></path><path d="M 9.449219 19.148438 C 5.550781 17.75 3.550781 13.398438 5 9.550781 C 5.75 7.449219 7.398438 5.851562 9.449219 5.101562 C 9.648438 5 9.75 4.851562 9.75 4.601562 L 9.75 3.898438 C 9.75 3.699219 9.648438 3.550781 9.449219 3.5 C 9.398438 3.5 9.300781 3.5 9.25 3.550781 C 4.5 5.050781 1.898438 10.101562 3.398438 14.851562 C 4.300781 17.648438 6.449219 19.800781 9.25 20.699219 C 9.449219 20.800781 9.648438 20.699219 9.699219 20.5 C 9.75 20.449219 9.75 20.398438 9.75 20.300781 L 9.75 19.601562 C 9.75 19.449219 9.601562 19.25 9.449219 19.148438 Z M 14.75 3.550781 C 14.550781 3.449219 14.351562 3.550781 14.300781 3.75 C 14.25 3.800781 14.25 3.851562 14.25 3.949219 L 14.25 4.648438 C 14.25 4.851562 14.398438 5.050781 14.550781 5.148438 C 18.449219 6.550781 20.449219 10.898438 19 14.75 C 18.25 16.851562 16.601562 18.449219 14.550781 19.199219 C 14.351562 19.300781 14.25 19.449219 14.25 19.699219 L 14.25 20.398438 C 14.25 20.601562 14.351562 20.75 14.550781 20.800781 C 14.601562 20.800781 14.699219 20.800781 14.75 20.75 C 19.5 19.25 22.101562 14.199219 20.601562 9.449219 C 19.699219 6.601562 17.5 4.449219 14.75 3.550781 Z M 14.75 3.550781 " style="stroke: none; fill-rule: nonzero; fill: rgb(255, 255, 255); fill-opacity: 1;"></path></g></svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="type-right">
                                <span>(default wallet)</span>
                                <button>
                                    <svg class="type-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MoreHorizIcon"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                                </button>
                            </div>
                        </div>
                        <button class="wallets-link">Link wallet</button>
                    </div>
                </div>
            </div> -->
      <!-- <div class="set-save">
                <h4>Email notifications</h4>
                <div></div>
            </div> -->
    </div>
  </div>
</template>

<style scoped>
input::placeholder{
  color: #fff;
  font-size: 18px;
}

.setbox {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: 999;
  justify-content: center;
  align-items: center;
}

.set-close {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .4);
}

.settag {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 780px;
  width: 100%;
  padding: 40px 120px;
  box-sizing: border-box;
  background-color: #000;
  border: 1px solid #ccc;
  border-radius: 16px;
  z-index: 1;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 35px;
  height: 35px;
  padding: 5px;
  border-radius: 50%;
  background-color: #fff;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
}

.close-btn:hover {
background-color: #141414;
}

.close-btn img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.close-btn:hover img{
  filter: invert(1);
}

.set-profile h4 {
  margin: 0px;
  font-weight: 700;
  font-size: 20px;
  line-height: 160%;
  color: #fff;
  padding-top: 16px;
  padding-bottom: 16px;
}

/* .set-user { */
  /* border: 1px solid rgb(246, 246, 246);
  border-radius: 16px;
  padding: 24px; */
/* } */

.set-image {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.25rem;
  line-height: 1;
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
  width: 104px;
  height: 104px;
}

.set-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.set-root {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
}

.set-email h6,
.set-username h6,
.set-number h6 {
  margin: 0px;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  color: #fff;
}

.input-box {
  color: #fff;
  cursor: default;
  background-color: rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  overflow: hidden;
}

.input-box input {
  font: inherit;
  color: #ffff00;
  border: 0px;
  height: 1.4375em;
  display: block;
  min-width: 0px;
  width: 100%;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 12px;
}

.set-number button {
  display: inline-flex;
  float: right;
  justify-content: center;
  position: relative;
  outline: 0px;
  border: 1px solid #ccc;
  margin: 0px;
  cursor: pointer;
  box-shadow: none;
  border-radius: 50px;
  background-color: transparent;
  color: #fff;
  text-transform: capitalize;
  font-size: 18px;
  font-weight: 600;
  line-height: 115%;
  padding: 15px 60px;
  height: fit-content;
  width: fit-content;
}

.set-number button.btnccc {
  background-color: rgba(255, 255, 255, .4);
}

.set-number button:hover {
  background-color: #fff;
  color: #000;
}

.set-number button.btnccc:hover {
  background-color: rgba(255, 255, 255, .4);
  color: #fff;
}

.set-wallets h4 {
  margin: 0px;
  font-weight: 700;
  font-size: 20px;
  line-height: 160%;
  color: #fff;
  padding-top: 16px;
  padding-bottom: 16px;
}
.wallets-box {
  border: 1px solid rgb(246, 246, 246);
  border-radius: 16px;
  padding: 24px;
}
.wallets-box > div {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.wallets-type {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.type-info {
  width: auto;
  display: flex;
  flex-direction: row;
  gap: 16px;
}
.info-root {
  height: 40px;
  width: 40px;
  display: flex;
  flex-shrink: 0;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background-color: rgb(246, 246, 246);
  border-radius: 200px;
}
.info-root img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.info-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info-text span:nth-child(1) {
  margin: 0px;
  font-weight: 600;
  font-size: 12px;
  line-height: 134%;
  text-transform: unset;
  color: #fff;
}
.info-text span:nth-child(2) {
  margin: 0px;
  font-weight: 400;
  font-size: 12px;
  line-height: 134%;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
}
.info-icon h6 {
  margin: 0px;
  font-weight: 600;
  font-size: 14px;
  line-height: 115%;
  color: #fff;
}
.type-right {
  display: flex;
  align-items: center;
}
.type-right span {
  margin: 0px;
  font-weight: 600;
  font-size: 12px;
  line-height: 134%;
  text-transform: unset;
  color: rgb(47, 91, 249);
  margin-right: 10px;
}
.type-icon {
  user-select: none;
  width: 1em;
  height: 1em;
  display: inline-block;
  fill: currentcolor;
  flex-shrink: 0;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: 1.5rem;
}
.wallets-link {
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
  background-color: rgb(246, 246, 246);
  color: rgb(19, 22, 25);
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 600;
  line-height: 115%;
  padding: 12px 16px;
  height: fit-content;
  width: 100%;
}
.wallets-link:hover {
  background-color: rgb(231, 231, 232);
}

.custom-file-upload {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  appearance: none;
  cursor: pointer;
}

.custom-file-upload input {
  display: none;
}

.custom-file-upload span {
  text-align: center;
  opacity: 0;
  color: #fff;
  transition: opacity 0.6s ease-in-out;
}

.custom-file-upload:hover span {
  opacity: 1;
}
</style>