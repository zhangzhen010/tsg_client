<template>
    <div class="gacha-games">
        <div class="gacha-text">
            <p class="gacha-title">DISCOVER</p>
        </div>
        <div class="gacha-box">
            <div class="photo-item" v-for="(item,index) in banners" :key="'photo' + index">
                <div class="photo-img">
                    <img :src="item" alt="">
                </div>
                <div class="photo-text">
                    <p class="photo-title">Test Data</p>
                    <div class="photo-tip">
                        <p>Not available now</p>
                        <!-- <p>and collectibles</p> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import banner01 from "@/assets/images/001.jpg";
import banner02 from "@/assets/images/002.jpg";
import banner03 from "@/assets/images/003.jpg";
import {ref} from "vue";


const banners = ref([banner01, banner02, banner03]);
</script>

<style scoped>
.gacha-games {
    width: 100%;
    height: auto;
    margin-top: 65px;
}

.gacha-text {
    display: flex;
    align-items: center;
}

.gacha-title {
    display: inline-block;
    font-size: 25px;
    color: #fff;
    text-align: left;
}

.gacha-box {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    width: 100%;
}

.photo-item {
    width: 343px;
    height: 320px;
    border-radius: 16px;
    background-color: #141414;
    overflow: hidden;
}
.photo-img {
    position: relative;
    width: 100%;
    height: 190px;
}
.photo-img::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.6);
    transition: all .6s ease-in-out;
}

.photo-item:hover .photo-img::before {
    background-color: transparent;
}

.photo-img img {
    width: 100%;
    height: 100%;
}
.photo-text {
    color: #fff;
    padding: 30px;
}
.photo-title {
    font-size: 20px;
    text-align: left;
}
.photo-tip {
    margin-top: 15px;
    font-size: 15px;
    text-align: left;
    line-height: 1.4;
}

@media screen and (max-width:768px){
    .gacha-box {
        justify-content: normal;
        flex-direction: column;
    }
    .photo-item {
        width: 100%;
        margin-bottom: 18px;
    }
}
</style>