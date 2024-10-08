<template>
    <div ref="canvasContainer" class="canvas-container">
        <!-- <canvas ref="canvas"></canvas> -->

        <img ref="logo" src="../assets/images/SVG/logo.svg" class="logo" />
        <button class="skip-button" @click="skipVideo">Skip</button>
        <!-- <video id="video" ref="video" width="760" height="760" class="video" @ended="videoEnded" autoplay>
            <source src="../assets/videos/winer.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video> -->

    </div>
</template>

<script setup>
import {onMounted} from 'vue';

onMounted(() => {
    const video = document.getElementById('video')
    video.volume = 1.0;
    video.autoplay = true
    video.play()
})

const skipVideo = () => {
    const video = document.getElementById('video')
    video.pause();
    video.currentTime = video.duration;
}
// 结束播放
const videoEnded = () => {
    
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
    background-image: url(../assets/images/1x/background01.png);
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
    bottom: 20%;
    right: 20%;
    font-size: 20px;
    border-radius: 16px;
    border: 1px solid #fff;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    cursor: pointer;
}

.video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>