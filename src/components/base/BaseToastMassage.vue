<template >
    <div class="toast-message">
        <div class="toast-message__icon" v-show="isSuccessToast"> </div>
        <!-- <div class="toast-message__icon" v-show="isSuccessToast" hidden> <i class="fa-solid fa-circle-check"></i></div> -->
        <!-- <div class="toast-message__icon--fail" v-show="!isSuccessToast" > <i class="fa-solid fa-circle-xmark"></i></div> -->
        <div class="toast-message__icon--fail" v-show="!isSuccessToast" > </div>
        <div class="toast-message__text"> {{ toastContent }}</div>
    </div>
</template>
<script>
export default {
    name:"BaseToastMessage",
    props:[ "isSuccessToast", "toastContent" ],
    watch:{

    },
    data() {
        return {
            
        }
    },
}
</script>
<style scoped>
.toast-message {
    /* transition: ease-in-out 1s; */
    transition: all 1s;
    width: 300px;
    position: fixed;
    bottom: 60px;
    right: 20px;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 18px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 16%);
    z-index: 2;

}

.toast-message__icon {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin-right: 18px;
    background: url("../../assets/icon/qlts-icon.svg") -67px -506px;
    background-color: #1ac871 !important;
    box-shadow: 0px 0px 3px 5px #beefd6;
}
.toast-message__icon--fail {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin-right: 18px;
    /* background: url("../../assets/icon/qlts-icon.svg") -67px -506px ; */
    background-image: url("../../assets/icon/error2.PNG");
    box-shadow: 0px 0px 3px 5px #ff5a5a;
    background-repeat: no-repeat;
    background-size: contain;
}
i.fa-solid.fa-circle-check {
    font-size: 20px;
    border-radius: 50%;
    box-shadow: 0px 0px 3px 5px #beefd6;
    color: #1ac871;
}
i.fa-solid.fa-circle-xmark {
    font-size: 19px;
    border-radius: 50%;
    box-shadow: 0px 0px 3px 5px #ff5a5a;
    color: #f52904;
}

.toast-message__text {}
</style>