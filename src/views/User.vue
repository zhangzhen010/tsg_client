<script setup>
import router from '@/router';
import {onMounted, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import axios from "@/utils/axios";
import {setTing} from "@/utils/change";

const route = useRoute();
const routeName = ref('')
const username = ref('')
const userAddress= ref('')
const headPic = ref('')

onMounted(() => {
    routeName.value = route.name

    getInit()
})

const getInit = async () => {
    const prizeRes = await axios.post("/tsg/player/playerInfo");
    if(prizeRes.data.code == 200){
        username.value = prizeRes.data.data.playerId
        headPic.value = prizeRes.data.data.avatarUrl
        userAddress.value = prizeRes.data.data.playerName
    }
    
}

const openPage = (item) => {
    router.push({ name: item })
}

const editChange = () => {
    setTing.changeSet()
}

watch(route, (newRoute, oldRoute) => {
    routeName.value = newRoute.name

});
</script>

<template>
    <div class="profile">
        <!-- <p class="profile-title">Profile</p> -->
        <div class="profile-top">
            <div class="profile-avater">
                <div class="profile-img">
                    <img v-if="headPic" :src="headPic" alt="">
                    <img v-else src="../assets/images/avanter.svg" alt="">
                </div>
                <div class="profile-user">
                    <p>{{userAddress}}</p>
                    <p>UID : {{ username }}</p>
                </div>
            </div>
            <div class="profile-setting">
                <button class="profile-edit" @click="editChange()">
                    <img src="../assets/images/SVG/edit.svg" alt="">
                    <span>Edit profile</span>
                </button>
                <button class="profile-share">
                    <img src="../assets/images/SVG/share.svg" alt="">
                </button>
            </div>
        </div>
        <div class="profile-nav">
            <div class="profile-tag">
                <div :class="routeName == 'profile' ? 'active' : ''" @click="openPage('profile')">
                    <p>Collection</p>
                </div>
                <div :class="routeName == 'activity' ? 'active' : ''" @click="openPage('activity')">
                    <p>Activity</p>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<style scoped>
.profile {
    padding: 50px 20px 0px 20px;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

.profile-title {
    font-size: 46px;
    color: #fff;
    text-align: left;
}

.profile-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.profile-avater {
    display: flex;
    align-items: center;
    margin-top: 45px;
}

.profile-img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
}

.profile-img>img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.profile-user {
    margin-left: 32px;
}

.profile-user p:nth-child(1) {
    font-size: 24px;
    color: #fff;
    line-height: 2.1;
}

.profile-user p:nth-child(2) {
    font-size: 14px;
    color: #fff;
    line-height: 2.1;
}

.profile-setting {
    display: flex;
    align-items: center;
    justify-content: right;
}

.profile-edit {
    display: flex;
    align-items: center;
    height: 33px;
    padding: 5px 20px;
    color: #fff;
    background-color: transparent;
    border: 1px solid #ccc;
    cursor: pointer;
}

.profile-edit img {
    width: 24px;
    height: 24px;
    object-fit: cover;
}

.profile-edit span {
    font-size: 16px;
    margin-left: 10px;
}

.profile-edit:hover {
    background-color: #fff;
    color: #000;
}

.profile-edit:hover img {
    filter:invert(1);
}

.profile-share {
    width: 33px;
    height: 33px;
    background-color: transparent;
    margin-left: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
}

.profile-share img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
}

.profile-share:hover {
    background-color: #fff;
    color: #000;
}

.profile-share:hover img {
    filter:invert(1);
}

.profile-nav {
    margin-top: 45px;
}

.profile-tag {
    display: flex;
    width: 100%;
    border-bottom: 1px solid rgb(229, 229, 234);
}

.profile-tag>div {
    position: relative;
    padding: 7px 30px;
    font-size: 18px;
    color: #fff;
    line-height: 45px;
    cursor: pointer;
}

.profile-tag>div::before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0%;
    height: 3px;
    background-color: rgb(229, 229, 234);
    transition: width .6s ease-in-out;
}

.profile-tag>div.active::before {
    right: auto;
    left: 0;
    width: 100%;
}

</style>