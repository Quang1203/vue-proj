<template>
    <div class="loading">
        <span class="loader"></span>
    </div>
</template>

<script>
export default {
    name: "LoaderComponent",
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
.loader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: #1aa4c8;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>