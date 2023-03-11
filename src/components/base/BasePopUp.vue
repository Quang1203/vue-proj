<template >
    <div class="pop-up-container">
        <div class="pop-up-content">
            <!-- <div class="pop-up__header"></div> -->
            <div class="pop-up__body">
                <!-- <div class="pop-up__icon"></div> -->
                <div class="pop-up__icon"><i class="fa-solid fa-triangle-exclamation"
                        style="color: #ffc502; font-size: 36px;"></i></div>
                <div class="pop-up__text" v-show="formPopUp != ENUM.PopUp.ShowError" v-html="popUpContent" ></div>
                <div class="pop-up__err" v-show="formPopUp == ENUM.PopUp.ShowError">
                    <div v-for="err in listError" :key="err">{{ err }}</div>
                </div>
            </div>
            <div class="pop-up__footer" v-if="formPopUp == ENUM.PopUp.ShowDelete || formPopUp == ENUM.PopUp.ShowError">
                <button class="button-2 btn-cancel-pop-up" @click="closeAll" @keyup.enter="closeAll" tabindex="1"
                    ref="cancelButton" v-html="chooseArray.length == 0 ? 'Đồng ý' : 'Hủy'"
                    :class="{ 'button-blue-color': chooseArray.length == 0 }" v-show="formPopUp == ENUM.PopUp.ShowDelete"></button>
                <button class="button" @click="btnCloseOnClick" @keyup.enter="btnCloseOnClick" ref="cancelButton"
                    v-html="'Đóng'" v-show="formPopUp == ENUM.PopUp.ShowError" tabindex="2"></button>

                <button class="button btn-pop-up-confirm" v-show="(chooseArray.length != 0 && formPopUp == ENUM.PopUp.ShowDelete )"
                    @click="btnConfirmOnClick" tabindex="3">Xóa</button>
            </div>

            <div class="pop-up__footer" v-if="formPopUp == ENUM.PopUp.CloseHasChangedData">
                <button class="button-2" @click="btnCloseOnClick" ref="cancelButton" tabindex="1" v-html="formMode == ENUM.FormMode.Edit?  'Hủy bỏ' :'Không' "></button>
                <button class=" btn-pop-up-not-confirm" :class="{'button': formMode != ENUM.FormMode.Edit}" @click="closeAll" tabindex="2" v-html="formMode == ENUM.FormMode.Edit? 'Không lưu':'Hủy bỏ' "></button>
                <button class="button btn-pop-up-confirm" @click="saveOnClick" tabindex="3" v-show="formMode == ENUM.FormMode.Edit">Lưu</button>
            </div>
        </div>
    </div>
</template>
<script>
import ENUM from '@/resources/enum';
import RESOURCE from '@/resources/resource';
import callAPI from '@/script/callAPI';

export default {
    extends: ENUM,
    props: ["formPopUp", "popUpContent", "chooseArray", "showLoading", "listError", "formMode" ],
    watch: {
    },
    data() {
        return {
            ENUM: ENUM,
        }
    },
    methods: {
        /**
        * Gửi emit cho component cha AssetPage giá trị false để đóng pop-up
        * Author:  Quang ( 02/01/2023)
        */
        btnCloseOnClick() {
            this.$emit("closeButtonOnClick");
        },
        /**
         * Đóng tất cả pop-up và dialog khi bấm "Không lưu" mặc dù dữ liệu đã được chỉnh sửa
         * Author:  Quang(20/02/2023)
         */
        closeAll(){
            this.$emit("closeAll");
        },
        /**
         * Gửi emit thông báo Form Dialog lưu
         * Author:  Quang(20/02/2023)
         */
        saveOnClick(){
            this.$emit("continueSave", true);
            this.$emit("closeButtonOnClick", false);
        },
        /**
        * Click button "Đồng ý" trên popup xác nhận xóa
        * Author:  Quang (02/01/2023)
        */
        btnConfirmOnClick() {
            if (this.chooseArray.length == 1) {
                callAPI.methods.deleteOneAsset(this.chooseArray[0])
                    .then(() => {
                        this.$emit("closeAll");
                        this.$emit("changeToastMessage", true, RESOURCE.ToastMessage.ToastContentSuccessDeleteOne);
                        this.$emit("clearChooseArray");
                        this.$emit("loadData");
                    })
                    .catch( () =>{
                        this.$emit("changeToastMessage", false, RESOURCE.ToastMessage.ToastContentErrorDeleteOne);
                    })
            }
            else {
                var listIDToDelele = this.chooseArray.map(function (item) {
                    return `'${item}'`;
                });
                var stringIDS = listIDToDelele.join(",");
                var body = JSON.stringify(stringIDS);
                callAPI.methods.deleteMoreAsset( body )
                    .then(() => {
                        this.$emit("closeAll");
                        this.$emit("changeToastMessage", true, RESOURCE.ToastMessage.ToastContentSuccessDeleteMore);
                        this.$emit("clearChooseArray");
                        this.$emit("loadData");
                    })
                    .catch( () =>{
                        this.$emit("changeToastMessage", false, RESOURCE.ToastMessage.ToastContentErrorDeleteMore);
                    })
            }
        }
    },
    created() {
    },
    mounted() {
        this.$refs.cancelButton.focus();
    },
}
</script>
<style >
.pop-up-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.650);
    z-index: 2;
}

.pop-up-content {
    width: 400px;
    height: auto;
    position: absolute;
    min-width: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 4px;
    padding: 24px 24px 24px 20px;
}

.pop-up__body {
    display: flex;
    align-items: center;
}
.pop-up__icon{
    background: url("../../assets/icon/warning2.PNG");
    height: 36px !important;
    width: 36px !important;
    background-repeat: no-repeat;
    background-size: contain;
}
.pop-up__text {
    margin-left: 20px;
}

.pop-up__err {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
}

.pop-up__footer {
    margin-top: 24px;
    display: flex;
    justify-content: flex-end;
    column-gap: 10px;
}
.btn-pop-up-not-confirm{
    background-color: rgba(245,245,245,255);
    border: 1px solid #1aa4c8;
    color: #1aa4c8;
    height: 36px;
    min-width: 80px;
    padding: 0 24px;
    border-radius: 3px;
}
.btn-pop-up-not-confirm:hover{
    cursor: pointer;
    background-color: rgba(209,237,244,255);
}
.btn-pop-up-not-confirm:focus{
    background-color: rgba(255,255,255,255);
}
.btn-cancel-pop-up.button-blue-color {
    background-color: #1aa4c8;
    color: #ffffff !important;
}

.button-blue-color:hover {
    background-color: #0582a2;
}

.button-blue-color:active {
    background-color: #28b7dc;
}
</style>