<template >
    <div>
        <span class="input-required" :class="{'css' : css}">
            <slot></slot>
        </span>
    </div>
</template>
<script>
export default {
    props: ["css"],
    created() {
  
    },
}
</script>
<style >
.input-required {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    font-size: 12px;
    color: red;
}
.css{
    left: 262px;
}
</style>