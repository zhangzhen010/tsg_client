<template>
    <div ref="canvasContainer" class="canvas-container">
        <!-- <canvas ref="canvas"></canvas> -->
        <img ref="logo" src="../assets/images/SVG/logo.svg" class="logo" />
        <button class="skip-button" @click="skipVideo">Skip</button>
        <button class="volume-button" @click="changeVolunme">
            <svg v-if="volumeBtn" t="1722215591593" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4281" width="40" height="40"><path d="M257.493333 322.4l215.573334-133.056c24.981333-15.413333 57.877333-7.914667 73.493333 16.746667 5.301333 8.373333 8.106667 18.048 8.106667 27.914666v555.989334C554.666667 819.093333 530.784 842.666667 501.333333 842.666667c-9.994667 0-19.786667-2.773333-28.266666-8L257.493333 701.6H160c-41.237333 0-74.666667-33.013333-74.666667-73.738667V396.138667c0-40.725333 33.429333-73.738667 74.666667-73.738667h97.493333z m26.133334 58.4a32.298667 32.298667 0 0 1-16.96 4.8H160c-5.888 0-10.666667 4.714667-10.666667 10.538667v231.733333c0 5.813333 4.778667 10.538667 10.666667 10.538667h106.666667c5.994667 0 11.872 1.664 16.96 4.8L490.666667 770.986667V253.013333L283.626667 380.8zM800.906667 829.653333a32.288 32.288 0 0 1-45.248-0.757333 31.317333 31.317333 0 0 1 0.768-44.693333c157.653333-150.464 157.653333-393.962667 0-544.426667a31.317333 31.317333 0 0 1-0.768-44.682667 32.288 32.288 0 0 1 45.248-0.757333c183.68 175.306667 183.68 460.010667 0 635.317333z m-106.901334-126.186666a32.288 32.288 0 0 1-45.248-1.216 31.328 31.328 0 0 1 1.237334-44.672c86.229333-80.608 86.229333-210.56 0-291.178667a31.328 31.328 0 0 1-1.237334-44.672 32.288 32.288 0 0 1 45.248-1.216c112.885333 105.546667 112.885333 277.418667 0 382.965333z" fill="#ffffff" p-id="4282"></path></svg>
            <svg v-else t="1722219690121" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4471" width="40" height="40"><path d="M128 420.576v200.864h149.12l175.456 140.064V284.288l-169.792 136.288H128z m132.256-64l204.288-163.968a32 32 0 0 1 52.032 24.96v610.432a32 32 0 0 1-51.968 24.992l-209.92-167.552H96a32 32 0 0 1-32-32v-264.864a32 32 0 0 1 32-32h164.256zM752 458.656L870.4 300.8a32 32 0 1 1 51.2 38.4L792 512l129.6 172.8a32 32 0 0 1-51.2 38.4l-118.4-157.856-118.4 157.856a32 32 0 0 1-51.2-38.4l129.6-172.8-129.6-172.8a32 32 0 0 1 51.2-38.4l118.4 157.856z" fill="#ffffff" p-id="4472"></path></svg>
        </button>
        <video id="video" ref="video" width="760" height="760" class="video" @ended="videoEnded" autoplay>
            <source :src="videoUrl" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';

const props = defineProps({
    videoUrl:String
})

const volumeBtn = ref(true)

const emit = defineEmits(['enterVideo'])

onMounted(() => {
    const video = document.getElementById('video')
    video.volume = 0.5;
    video.autoplay = true
    video.play()
})

const changeVolunme = () => {
    const video = document.getElementById('video')
    
    volumeBtn.value = !volumeBtn.value
    volumeBtn.value ? video.volume = 0.5 : video.volume = 0
    
}

const skipVideo = () => {
    const video = document.getElementById('video')
    video.pause();
    video.currentTime = video.duration;
    emit('enterVideo')
}
// 结束播放
const videoEnded = () => {
    emit('enterVideo')
}
</script>

<style scoped>
.canvas-container {
    position: fixed;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    /* background-image: url(../assets/images/1x/background01.png); */
    background-color: #000;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    z-index: 999;
}

canvas {
    position: absolute;
    top: 0;
    left: 0;
}

.logo {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 100px;
    height: auto;
}

.skip-button {
    position: absolute;
    width: 150px;
    height: 50px;
    bottom: 10%;
    right: 10%;
    font-size: 20px;
    border-radius: 16px;
    border: 1px solid #fff;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    cursor: pointer;
}

.volume-button {
    position: absolute;
    width: auto;
    height: auto;
    bottom: 10%;
    right: 4%;
    border: 0px;
    background-color: transparent;
    cursor: pointer;
}

.video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: 90%;
    transform: translate(-50%, -50%);
}
</style>