<template>
    <div class="loading">
        <div class="lds-emisapp">
            <div class="dot-container">
                <div class="dot-items">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="loading__text"> Đang tải</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoadingComponent",
}
</script>

<style scoped>
.loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.467);
    z-index: 4;
}

.lds-emisapp {
    /* position: relative; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 180px;
    height: 100px;
    background-color: #a1aa959b;
    /* box-shadow: 0px 0px 10px #D5D5D5; */
}

.dot-container {
    display: flex;
    flex-direction: column;
    height: 80%;
    width: 80%;
    border-radius: 4px;
    /* transform: translate(-50% , -50%); */
    background-color: #FFFFFF;
    justify-content: center;
    align-items: center;
}

.dot-items {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
}

.loading__text {}

.lds-emisapp .dot-container .dot-items div {
    width: 8px;
    height: 8px;
    margin: 0 4px;
    border-radius: 50%;
    background: #fff;
    animation: lds-emisapp 1s ease-in-out infinite;
}

.lds-emisapp .dot-container .dot-items div:nth-child(1) {
    background-color: #ff0000;
    animation-delay: -0.36s;
}

.lds-emisapp .dot-container .dot-items div:nth-child(2) {
    background-color: tomato;
    animation-delay: -0.24s;
}

.lds-emisapp .dot-container .dot-items div:nth-child(3) {
    background-color: rgb(206, 164, 14);
    animation-delay: -0.12s;
}

.lds-emisapp .dot-container .dot-items div:nth-child(4) {
    background-color: rgb(27, 183, 48);
    animation-delay: 0;
}

@keyframes lds-emisapp {
    0% {
        transform: scale(1, 1);
    }

    50% {
        transform: scale(1.5, 1.5);
    }

    100% {
        transform: scale(1, 1);
    }
}
</style>