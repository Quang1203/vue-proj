<template >
    <div>
        <span class="tooltiptext" :style="{'width': width + 'px', 'height' : height + 'px'}">{{ tooltipText }}</span>
    </div>
</template>
<script>
export default {
    props: ["tooltipText", "width", "height"],

    data() {
        return {
            
        }
    },
}
</script>
<style scoped>
.tooltip .tooltiptext {
    visibility: hidden;
    /* min-width: 150px; */
    height: auto;
    padding: 4px 6px;
    text-align: center;
    /* width: 100px; */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: black;
    color: #fff;
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 3;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>