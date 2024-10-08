<script></script>

<template>
    <div class="empty">
        <div class="empty-root">
            <div class="empty-box">
                <h3 class="empty-h3">Nothing yet</h3>
                <p class="empty-p">Looks like there’s still nothing. Offers received will be shown here</p>
                <div class="empty-btn">
                    <a href="#">
                        <button>Explore marketplace</button>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.empty {
    margin-top: 16px;
    margin-bottom: 16px;
}

.empty-root {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60dvh;
    margin-top: 0px;
}
.empty-box {
    max-width: 400px;
    text-align: center;
    margin: 0 auto;
}
.empty-h3 {
    font-size: 24px;
    color: #fff;
    line-height: 133.4%;
    font-weight: 700;
    margin: 0 0 16px;
}
.empty-p {
    font-size: 14px;
    color: #fff;
    line-height: 143%;
    font-weight: 400;
    margin: 0;
}
.empty-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 8px;
    margin-top: 40px;
}
.empty-btn button {
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
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    border-radius: 8px;
    background-color: transparent;
    color: rgb(47, 91, 249);
    text-transform: capitalize;
    font-size: 14px;
    font-weight: 600;
    line-height: 115%;
    padding: 12px 16px;
    height: fit-content;
}
</style>