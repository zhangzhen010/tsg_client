<script setup></script>

<template>
    <div class="auction">
        <div class="auction-empty">
            <h5>No collectibles to redeem</h5>
            <button>Go back</button>
        </div>
    </div>
</template>

<style scoped>
.auction {
    padding-top: 8px;
    padding-bottom: 40px;
    width: 100%;
    margin-top: 24px;
}
.auction-empty {
    height: 80dvh;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    gap: 24px;
}
.auction-empty h5 {
    margin: 0px;
    font-weight: 800;
    font-size: 18px;
    line-height: 135%;
    color: #fff;
}
.auction-empty button {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    border: 0px rgb(229, 229, 234);
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
   min-width: 64px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    border-radius: 8px;
    background-color: rgb(47, 91, 249);
    color: rgb(255, 255, 255);
    text-transform: capitalize;
    font-size: 14px;
    font-weight: 600;
    line-height: 115%;
    padding: 12px 16px;
    height: fit-content;
}
</style>