<template >
    <div class="check-box" @keyup.enter="checkBoxOnClick" @click="checkBoxOnClick"
        :class="{'check-box--active'  : isCheckBox }"></div>
</template>
<script>
export default {
    props:[ "isCheckBoxAll" ],
    data() {
        return {
            isCheckBox: false,
        }
    },
    created(){
        this.isCheckBox = this.isCheckBoxAll;
    },
    watch: {
        // Theo dõi biến check ở cột thead
        isCheckBoxAll() {
            this.isCheckBox = this.isCheckBoxAll;
        },
    },
    methods: {
        /**
         * Click check box
         * Author: Quang(30/12/2022)
         */
        checkBoxOnClick() {
            this.isCheckBox = !this.isCheckBox;
        }
    },

}
</script>
<style >
.check-box {
    margin: auto;
    height: 14px;
    width: 14px;
    background: url("../../assets/icon/qlts-icon.svg") -113px -377px;
}

.check-box:not(.disabled)hover {
    background: url("../../assets/icon/qlts-icon.svg") -157px -377px;
}

.check-box.check-box--active {
    background: url("../../assets/icon/qlts-icon.svg") -157px -377px;
}

.row-selected {
    background-color: #CCE8FF;
}
</style>