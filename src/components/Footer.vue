<template>
    <div class="footer">
        <div class="footer-left">
            <a href="#">
                <img src="../assets/images/SVG/logo.svg" alt="">
            </a>
        </div>
        <div class="footer-title">
            <p>© TOKYO STUPID GAMES.</p>
        </div>
        <div class="footer-right">
            <a class="icon" href="https://x.com/TokyoStupidGame" target="_blank">
                <img src="../assets/images/SVG/twitter.svg" alt="">
            </a>
            <a class="icon" href="https://discord.gg/tsg" target="_blank">
                <img src="../assets/images/SVG/discord.svg" alt="">
            </a>
            <a class="icon" href="https://t.me/+nsol4cw6D0RiNjg9" target="_blank">
                <img src="../assets/images/SVG/template.svg" alt="">
            </a>
            <div class="gotop" @click="goOffset">
                <img src="../assets/images/SVG/top.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>


const goOffset = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
</script>

<style scoped>
.footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 100px;
    width: 100%;
    height: 90px;
    padding: 0 20px;
    background-color: #141414;
}
.footer-left,.footer-title,.footer-right {
    text-align: center;
    width: 33%;
}

.footer-left a {
    display: block;
    width: 55px;
    height: 40px;
    overflow: hidden;
}

.footer-left a img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.footer-title {
    font-size: 12px;
    color: #ffffff;
}

.footer-right {
    display: flex;
    align-items: center;
    justify-content: right;
}

.icon {
    display: block;
    width: 25px;
    height: 25px;
    margin-right: 25px;
}

.icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.gotop {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #1e1e1e;
    margin-left: 5px;
    cursor: pointer;
}

.gotop img {
    width: 9.5px;
    height: 11.5px;
    object-fit: contain;
}
</style>