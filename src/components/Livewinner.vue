<template>
    <div class="gacha-games">
        <div class="gacha-text">
            <p class="gacha-title">LIVE WINNERS</p>
            <i class="gacha-icon"></i>
        </div>
        <div class="scroll-table">
            <table class="winner-table">
                <thead>
                    <tr>
                        <th style="width: 400px;">ITEM</th>
                        <th style="width: 192px;">Est Value</th>
                        <th style="width: 192px;">Got for</th>
                        <th style="width: 192px;">New ouner</th>
                    </tr>
                </thead>
                <tbody class="winner-tbody">
                    <tr v-for="item in winnerList" :key="'table' + item">
                        <td>
                            <div class="table-item">
                                <div class="item-img">
                                    <img src="../assets/images/1x/tableimg.png" alt="">
                                </div>
                                <div class="item-title">
                                    <p>Sneaky Arrogannt Cnuts #80 5</p>
                                    <p>Sneaky Arrogannt Cnuts </p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="table-item">
                                <p>123</p>
                            </div>
                        </td>
                        <td>
                            <div class="table-item">
                                <p>123</p>
                            </div>
                        </td>
                        <td>
                            <div class="table-item">
                                <div class="item-img">
                                    <img src="../assets/images/1x/tableimg.png" alt="">
                                </div>
                                <div class="item-title">
                                    <p>Sneaky</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    winnerList: Array,
});
</script>

<style scoped>
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-thumb {
    background-color: #fff;
    border-radius: 6px;
}

::-webkit-scrollbar-track {
    background: #191919;
    border-radius: 6px;
}

.gacha-games {
    width: 100%;
    height: 700px;
    border-radius: 32px;
    margin-top: 65px;
    padding: 50px;
    background-color: #000;
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

.gacha-icon {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-left: 50px;
    background-color: #00FF00;
}

.scroll-table {
    max-height: 531px;
    overflow-y: auto;
    margin-top: 50px;
    display: block;
}

th,
td {
    border: 1px solid #000;
    border-collapse: collapse;
}

.winner-table {
    width: 100%;
    height: 100%;
    color: #fff;
    text-align: left;
}

.winner-table th {
    position: sticky;
    top: 0;
    font-size: 15px;
    font-weight: normal;
    height: 45px;
    padding: 0px 15px;
    background-color: #1E1E1E;
    line-height: 45px;
    box-sizing: border-box;
    border-top: 0px;
    z-index: 2;
}

.winner-table thead {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #1E1E1E;
}


.winner-tbody tr {
    height: 80px;
}

.winner-tbody td {

    padding: 0 15px;
    font-size: 15px;
    color: #fff;
}

tr:nth-child(odd) td {
    background-color: #1e1e1e;
}

tr:nth-child(even) td {
    background-color: #191919;
}

.table-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    vertical-align: auto;
}

.item-img {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
}

.item-img img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.item-title {
    margin-left: 15px;
}

.item-title p {
    color: #fff;
    text-align: left;
    margin: 5px 0;
}

.item-title p:nth-child(1) {
    font-size: 15px;

}

.item-title p:nth-child(2) {
    font-size: 12px;
}

@media screen and (max-width:768px) {
    .gacha-games {
        padding: 25px;
        max-height: 398px;
        border-radius: 18px;
    }

    .scroll-table {
        margin-top: 25px;
        max-height: 312px;
    }
}
</style>