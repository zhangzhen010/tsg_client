<script setup>
import {RouterView} from 'vue-router'
import Header from '@/components/header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Header></Header>
  <main>
    <RouterView />
  </main>
  <Footer></Footer>
</template>

<style scoped>
main {
  max-width: 1080px;
  min-height: 80vh;
  margin: 0 auto;
  padding-top: 100px;
}

@media screen and (max-width:768px){
  main {
    width: 100%;
    padding: 75px 25px 0px 25px;
    box-sizing: border-box;
  }
}
</style>

<style>
@font-face {
    font-family: 'Italic-variable';
    src: url('../src/assets/fonts/Figtree-Italic-VariableFont_wght.ttf') format('ttf');
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'variable';
    src: url('../src/assets/fonts/Figtree-VariableFont_wght.ttf') format('ttf');
    font-style: normal;
    font-display: swap;
}

p,
span,
i,
h1,
h2,
h3,
h4,
h5,
div,
botton,
tr,
td {
    font-family: 'Italic-variable', 'variable'!important;
}
</style>
