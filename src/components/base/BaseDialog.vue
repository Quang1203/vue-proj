<template>
    <div class="dialog" @keyup.esc="btnCloseOnClick" @keyup="ctrlOnclick">
        <div class="dialog-content">
            <div class="dialog__header">
                <div class="dialog__header__text" v-html="dialogTitle"></div>
                <button class="dialog__header__btn btn-close icon-24" @click="btnCloseOnClick"
                    @keyup.enter="btnCloseOnClick" tabindex="14"></button>
            </div>
            <div class="dialog__body">
                <div class="dialog__body__item">
                    <div class="dialog__body__left">
                        <div class="dialog__body__label">Mã tài sản <i style="color: red;">*</i></div>
                        <input v-model="assetSave.AssetCode" type="text" placeholder="Nhập mã tài sản"
                            ref="isRequiredAssetCode" class="input input-focus"
                            :class="{ 'border-red': requiredInput.isRequiredAssetCode }" tabindex="1"
                            @blur="blurOnInputRequired(assetSave.AssetCode, 'isRequiredAssetCode')">
                        <BaseNoticeRequired v-show="requiredInput.isRequiredAssetCode"> {{ errorAssetCodeContent }}
                        </BaseNoticeRequired>
                    </div>
                    <div class="dialog__body__right">
                        <div class="dialog__body__label">Tên tài sản <i style="color: red;">*</i></div>
                        <input type="text" v-model="assetSave.AssetName" ref="isRequiredAssetName" tabindex="2"
                            class="input input-focus" placeholder="Nhập tên tài sản" id="isRequiredAssetName"
                            :class="{ 'border-red': requiredInput.isRequiredAssetName }"
                            @blur="blurOnInputRequired(assetSave.AssetName, 'isRequiredAssetName')">
                        <span class="input-required" v-show="requiredInput.isRequiredAssetName">{{
                            RESOURCE.NoticeRequired.RequiredAssetName
                        }}</span>
                        <!-- <span class="input-required" v-show="assetSave.AssetName.length > 100" >{{ RESOURCE.NoticeRequired.RequiredMaxLength  }}</span> -->
                    </div>
                </div>
                <div class="dialog__body__item">
                    <div class="dialog__body__left">
                        <div class="dialog__body__label">Mã bộ phận sử dụng<i style="color: red;">*</i></div>
                        <BaseCombobox v-model="assetSave.DepartmentCode" :api="'http://localhost:41911/api/Departments'"
                            :code="'DepartmentCode'" :name="'DepartmentName'" @getValue="getValueDepartment"
                            placeholder="Chọn mã bộ phận sử dụng" tabindex="3"
                            :isValid="requiredInput.isRequiredDepartmentCode" :refer="'isRequiredDepartmentCode'"
                            :requiredInputFocus="requiredInputFocus" />
                        <BaseNoticeRequired v-show="requiredInput.isRequiredDepartmentCode"> {{
                            RESOURCE.NoticeRequired.RequiredDepartmentCode
                        }} </BaseNoticeRequired>

                    </div>
                    <div class="dialog__body__right">
                        <div class="dialog__body__label">Tên bộ phận sử dụng </div>
                        <input type="text" v-model="assetSave.DepartmentName" class="input  input-disiable" readonly>
                    </div>
                </div>
                <div class="dialog__body__item">
                    <div class="dialog__body__left">
                        <div class="dialog__body__label">Mã loại tài sản<i style="color: red;">*</i></div>
                        <BaseCombobox v-model="assetSave.AssetTypeCode" :api="'http://localhost:41911/api/AssetTypes'"
                            :code="'AssetTypeCode'" :name="'AssetTypeName'" @getValue="getValueAssetType"
                            :isValid="requiredInput.isRequiredAssetTypeCode" placeholder="Chọn mã loại tài sản"
                            tabindex="4" :refer="'isRequiredAssetTypeCode'" :requiredInputFocus="requiredInputFocus" />
                        <BaseNoticeRequired v-show="requiredInput.isRequiredAssetTypeCode"> {{
                            RESOURCE.NoticeRequired.RequiredAssetTypeCode
                        }} </BaseNoticeRequired>
                    </div>
                    <div class="dialog__body__right">
                        <div class="dialog__body__label">Tên loại tài sản</div>
                        <input type="text" v-model="assetSave.AssetTypeName" class="input input-disiable" readonly>
                    </div>
                </div>

                <div class="dialog__body__item">
                    <div class="dialog__body__left">
                        <div class="dialog__body__label">Số lượng<i style="color: red;">*</i></div>
                        <BaseInputNumber v-model="assetSave.Quantity" tabindex="5"
                            :isValid="requiredInput.isRequiredQuantity" :refer="'isRequiredQuantity'"
                            :requiredInputFocus="requiredInputFocus" :adjustment="true" />
                        <!-- <BaseComboboxNumber v-model="assetSave.Quantity" tabindex="5"
                            :isValid="requiredInput.isRequiredQuantity" :refer="'isRequiredQuantity'"
                            :requiredInputFocus="requiredInputFocus" /> -->
                        <!-- :blurOnInputRequired="blurOnInputRequired(assetSave.Quantity, 'isRequiredQuantity')" -->
                        <BaseNoticeRequired v-show="requiredInput.isRequiredQuantity"> {{
                            RESOURCE.NoticeRequired.RequiredAmount
                        }} </BaseNoticeRequired>
                    </div>
                    <div class="dialog__body__right dialog__body__right-2">
                        <div class="dialog__body__right-container">
                            <div class="dialog__body__label">Nguyên giá <i style="color: red;">*</i></div>
                            <BaseInputNumber v-model="assetSave.Cost" tabindex="6"
                                :isValid="requiredInput.isRequiredCost" :refer="'isRequiredCost'"
                                :requiredInputFocus="requiredInputFocus" :adjustment="false" />
                            <!-- <BaseInputMoney v-model="assetSave.Cost" tabindex="6"
                                :isValid="requiredInput.isRequiredCost" :refer="'isRequiredCost'"
                                :requiredInputFocus="requiredInputFocus" /> -->
                            <BaseNoticeRequired v-show="requiredInput.isRequiredCost"> {{
                                RESOURCE.NoticeRequired.RequiredCost
                            }}</BaseNoticeRequired>
                        </div>
                        <div class="dialog__body__right-container">
                            <div class="dialog__body__label">Số năm sử dụng<i style="color: red;">*</i></div>
                            <input type="number" v-model="assetSave.LifeTime"
                                :class="{ 'border-red': requiredInput.isRequiredLifeTime }" min="0" tabindex="7"
                                ref="isRequiredLifeTime" class="input input-focus input-number">
                            <!-- @blur="blurOnInputRequired(assetSave.LifeTime, 'isRequiredLifeTime')" -->
                            <BaseNoticeRequired v-show="requiredInput.isRequiredLifeTime" :css="true"> {{
                                RESOURCE.NoticeRequired.RequiredLifeTime
                            }}</BaseNoticeRequired>
                        </div>
                    </div>
                </div>
                <div class="dialog__body__item">
                    <div class="dialog__body__left">
                        <div class="dialog__body__label">Tỷ lệ hao mòn (%)<i style="color: red;">*</i></div>
                        <!-- <BaseInputNumber tabindex="8" v-model="assetSave.DepreciationRate"
                            :isValid="requiredInput.isRequiredDepreciationRate" :refer="'isRequiredDepreciationRate'"
                            :requiredInputFocus="requiredInputFocus" :adjustment="false" /> -->
                        <BaseComboboxNumber tabindex="8" v-model="assetSave.DepreciationRate"
                            :isValid="requiredInput.isRequiredDepreciationRate" :refer="'isRequiredDepreciationRate'"
                            :requiredInputFocus="requiredInputFocus" />
                        <BaseNoticeRequired v-show="requiredInput.isRequiredDepreciationRate"> {{
                            RESOURCE.NoticeRequired.RequiredDepreciationRate
                        }}</BaseNoticeRequired>
                        <BaseNoticeRequired
                            v-show="requiredInput.isRequiredDepreciationRate && depreciationValue != parseInt(this.assetSave.Cost * (this.assetSave.DepreciationRate / 100))">
                            Thiếu thông tin Tỷ lệ hao mòn</BaseNoticeRequired>
                    </div>
                    <div class="dialog__body__right dialog__body__right-2">
                        <div class="dialog__body__right-container">
                            <div class="dialog__body__label">Giá trị hao mòn năm <i style="color: red;">*</i></div>
                            <!-- <input type="text" tabindex="9" v-model="depreciationValue" class="input input-focus input-number"> -->
                            <BaseInputMoney v-model="depreciationValue" tabindex="9"
                                :isValid="requiredInput.isRequiredDepreciationValue"
                                :refer="'isRequiredDepreciationValue'" :requiredInputFocus="requiredInputFocus" />
                            <BaseNoticeRequired v-show="requiredInput.isRequiredDepreciationValue"> {{
                                RESOURCE.NoticeRequired.RequiredDepreciationValue
                            }}</BaseNoticeRequired>
                        </div>
                        <div class="dialog__body__right-container">
                            <div class="dialog__body__label">Năm theo dõi</div>
                            <input type="number" value="2023" class="input input-number input-disiable" readonly>
                        </div>
                    </div>
                </div>

                <div class="dialog__body__item">
                    <div class="dialog__body__left">
                        <div class="dialog__body__label">Ngày mua<i style="color: red;">*</i></div>
                        <BaseDatePicker v-model="assetSave.PurchaseDate" :formMode="formMode" tabindex="10"
                            :isValid="requiredInput.isRequiredDateBuy" :refer="'isRequiredDateBuy'"
                            :requiredInputFocus="requiredInputFocus" />
                        <BaseNoticeRequired v-show="requiredInput.isRequiredDateBuy"> {{
                            RESOURCE.NoticeRequired.RequiredDateBuy
                        }}</BaseNoticeRequired>
                    </div>
                    <div class="dialog__body__right dialog__body__right-3">
                        <div class="dialog__body__right-container">
                            <div class="dialog__body__label ">Ngày bắt đầu sử dụng<i style="color: red;">*</i></div>
                            <BaseDatePicker v-model="assetSave.UsingDate" :formMode="formMode" tabindex="11"
                                :isValid="requiredInput.isRequiredDateUse" :refer="'isRequiredDateUse'"
                                :requiredInputFocus="requiredInputFocus" />
                            <BaseNoticeRequired v-show="requiredInput.isRequiredDateUse">{{
                                RESOURCE.NoticeRequired.RequiredDateUse
                            }}</BaseNoticeRequired>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialog__footer">
                <button class="button-2 btn-cancel" tabindex="13" @click="btnCloseOnClick"
                    @keyup.enter="btnCloseOnClick">Hủy</button>
                <button class="button btn-save" tabindex="12" @click="btnSaveOnClick" @keyup.enter="btnSaveOnClick"
                    v-html="formMode == ENUM.FormMode.Replication ? 'Nhân bản' : 'Lưu'"> </button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

import BaseCombobox from './BaseCombobox.vue';
import BaseComboboxNumber from './BaseComboboxNumber.vue';
import BaseDatePicker from './BaseDatePicker.vue';

import CommonJS from '../../script/common'
import ENUM from '@/resources/enum';
import RESOURCE from '@/resources/resource';
import BaseNoticeRequired from './BaseNoticeRequired.vue';
import BaseInputMoney from './BaseInputMoney.vue';
import BaseInputNumber from './BaseInputNumber.vue';

export default {
    extends: CommonJS,
    components: { BaseCombobox, BaseComboboxNumber, BaseDatePicker, BaseNoticeRequired, BaseInputMoney, BaseInputNumber },
    props: ["assetIDSelected", "formMode", "dialogTitle",],
    watch: {
        assetSave: {
            handler: function () {
                if (this.assetSave.LifeTime) {
                    this.requiredInput.isRequiredLifeTime = false;
                    this.assetSave.DepreciationRate = parseFloat(((1 / (this.assetSave.LifeTime)) * 100).toFixed(2));
                }
                if (this.assetSave.Cost && this.assetSave.DepreciationRate) {
                    this.depreciationValue = parseInt(this.assetSave.Cost * (this.assetSave.DepreciationRate / 100));
                }
                if (this.assetSave.Cost) {
                    this.requiredInput.isRequiredCost = false;
                }
                if (this.assetSave.DepreciationRate) {
                    this.requiredInput.isRequiredDepreciationRate = false;
                }
                if (this.depreciationValue) {
                    this.requiredInput.isRequiredDepreciationValue = false;
                }
                if (this.assetSave.DateBuy) {
                    this.requiredInput.isRequiredDateBuy = false;
                }
                if (this.assetSave.DateUse) {
                    this.requiredInput.isRequiredDateUse = false;
                }
            },
            deep: true
        },
        requiredInput: {
            handler: function () {
                if (this.requiredInput.isRequiredAssetCode) {
                    if (!this.assetSave.AssetCode) {
                        this.errorAssetCodeContent = RESOURCE.NoticeRequired.RequiredAssetCode;
                    } else if (this.assetSave.AssetCode.length > 20) {
                        this.errorAssetCodeContent = RESOURCE.NoticeRequired.RequiredMaxLength;
                    } else {
                        this.errorAssetCodeContent = RESOURCE.NoticeRequired.DuplicateAssetCode;
                    }
                }
            },
            deep: true
        }

    },
    computed: {
    },
    data() {
        return {
            ENUM: ENUM,
            RESOURCE: RESOURCE,
            test: 100000,
            assetSave: {},
            requiredInput: {
                isRequiredAssetCode: false,
                isRequiredAssetName: false,
                isRequiredDepartmentCode: false,
                isRequiredAssetTypeCode: false,
                isRequiredQuantity: false,
                isRequiredCost: false,
                isRequiredDepreciationRate: false,
                isRequiredDepreciationValue: false,
                isRequiredLifeTime: false,
                isRequiredDateBuy: false,
                isRequiredDateUse: false,
            },
            errorAssetCodeContent: "",
            requiredInputFocus: null,
            isValid: true,
            listError: [],
            depreciationValue: 0,
            cost: 0,
        }
    },
    methods: {
        /**
        * Gửi emit cho component cha AssetPage giá trị false để đóng dialog
        * Author: NVDQuang ( 30/12/2022)
        */
        btnCloseOnClick() {
            this.$emit("closeButtonOnClick", false);
        },

        /**
        * Validate khi blur ra khỏi input bắt buộc không được để trống
        * Author: NVDQuang ( 30/12/2022)
        * Modified by: NVDQuang(04/01/2023)
        */
        blurOnInputRequired(val, isRequired) {
            if (!val) {
                this.requiredInput[isRequired] = true;
            } else {
                this.requiredInput[isRequired] = false;
                if (isRequired == "isRequiredAssetCode") {
                    if (this.assetSave.AssetCode.length > 20) {
                        this.requiredInput[isRequired] = true;
                    } else {
                        // Check trùng mã
                        axios.get(`http://localhost:41911/api/Assets/check-duplicate-code?assetID=${this.assetSave.AssetID}&assetCode=${this.assetSave.AssetCode}`)
                            .then((response) => {
                                if (response.data == 1) {
                                    this.requiredInput[isRequired] = true;
                                }
                            })
                    }
                }
            }
        },

        /**
        * Lấy mã bộ phận sử dụng để biding tên bộ phận sử dụng
        * Author: NVDQuang ( 06/01/2023)
        * @param {string} mã bộ phận sử dụng được chọn 
        */
        getValueDepartment(itemSelected) {
            this.requiredInput.isRequiredDepartmentCode = false;
            this.assetSave.DepartmentID = itemSelected.DepartmentID;
            this.assetSave.DepartmentCode = itemSelected.DepartmentCode;
            this.assetSave.DepartmentName = itemSelected.DepartmentName;
        },
        /**
        * Lấy mã bộ phận sử dụng để biding tên bộ phận sử dụng
        * Author: NVDQuang ( 30/12/2022)
        * @param {obj} obj bộ phận sử dụng được chọn 
        */
        getValueAssetType(itemSelected) {
            try {
                this.requiredInput.isRequiredAssetTypeCode = false;
                this.assetSave.AssetTypeID = itemSelected.AssetTypeID;
                this.assetSave.AssetTypeCode = itemSelected.AssetTypeCode;
                this.assetSave.AssetTypeName = itemSelected.AssetTypeName;
                this.assetSave.LifeTime = itemSelected.LifeTime;
                this.assetSave.DepreciationRate = parseFloat(((1 / (this.assetSave.LifeTime)) * 100).toFixed(2));
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Bấm lưu trên form dialog
        * Author: NVDQuang (30/12/2022)
        */
        btnSaveOnClick() {
            try {
                this.listError = [];
                this.isValid = true;
                this.requiredInputFocus = null;

                // Check bỏ trống Mã tài sản
                this.checkInputRequired(this.assetSave.AssetCode, "isRequiredAssetCode", "RequiredAssetCode");
                // Check bỏ trống Tên tài sản
                this.checkInputRequired(this.assetSave.AssetName, "isRequiredAssetName", "RequiredAssetName");
                // Check bỏ trống Mã bộ phận sử dụng
                this.checkInputRequired(this.assetSave.DepartmentCode, "isRequiredDepartmentCode", "RequiredDepartmentCode");
                // Check bỏ trống Mã loại tài sản
                this.checkInputRequired(this.assetSave.AssetTypeCode, "isRequiredAssetTypeCode", "RequiredAssetTypeCode");
                // Check bỏ trống Số lượng
                this.checkInputRequired(this.assetSave.Quantity, "isRequiredQuantity", "RequiredAmount");
                // Check bỏ trống Nguyên giá
                this.checkInputRequired(this.assetSave.Cost, "isRequiredCost", "RequiredCost");
                // Check bỏ trống Số năm sử dụng
                this.checkInputRequired(this.assetSave.LifeTime, "isRequiredLifeTime", "RequiredLifeTime");
                // Check bỏ trống Tỷ lệ hao mòn
                this.checkInputRequired(this.assetSave.DepreciationRate, "isRequiredDepreciationRate", "RequiredDepreciationRate");
                // Check bỏ trống Giá trị hao mòn
                this.checkInputRequired(this.depreciationValue, "isRequiredDepreciationValue", "RequiredDepreciationValue");
                // Check bỏ trống Ngày mua
                this.checkInputRequired(this.assetSave.PurchaseDate, "isRequiredDateBuy", "RequiredDateBuy");
                // Check bỏ trống Ngày sử dụng
                this.checkInputRequired(this.assetSave.UsingDate, "isRequiredDateUse", "RequiredDateUse");

                // for( let i = 0; i < this.requiredInput.length; i++){
                //     if(this.requiredInput[i] == false && !this.requiredInputFocus){
                //         this.requiredInputFocus == requiredInput[i];
                //     }
                // }

                // Check trùng mã
                if (this.assetSave.AssetCode.length < 20) {
                    axios.get(`http://localhost:41911/api/Assets/check-duplicate-code?assetID=${this.assetSave.AssetID}&assetCode=${this.assetSave.AssetCode}`)
                        .then((response) => {
                            if (response.data == 1) {
                                this.isValid = false;
                                this.requiredInput.isRequiredAssetCode = true;
                                // this.listError.push(this.$RESOURCE.NoticeRequired.DuplicateAssetCode);
                            }
                        })
                }

                if (!this.isValid) {
                    console.log(this.assetSave);
                    if (this.requiredInputFocus == "isRequiredAssetCode" || this.requiredInputFocus == "isRequiredAssetName" || this.requiredInputFocus == "isRequiredLifeTime") {
                        this.$refs[`${this.requiredInputFocus}`].focus();
                    }


                    // this.$emit("showListError", this.listError);

                    // Thông báo toastmessage nội dung tương ứng
                    // if (this.formMode == ENUM.FormMode.Add) {
                    //     this.$emit("changeToastMessage", false, RESOURCE.ToastMessage.ToastContentErrorSave);
                    // }
                    // if (this.formMode == ENUM.FormMode.Edit) {
                    //     this.$emit("changeToastMessage", false, RESOURCE.ToastMessage.ToastContentErrorEdit);
                    // }
                } else {
                    this.assetSave.PurchaseDate = this.convertDate(this.assetSave.PurchaseDate);
                    this.assetSave.UsingDate = this.convertDate(this.assetSave.UsingDate);
                    console.log(this.assetSave);
                    this.$emit("saveButtonOnClick", this.assetSave);
                }

            } catch (error) {
                console.log(error);
            }
        },
        /**
        * Dùng tổ hợp phím Ctrl + S để lưu
        * Author: NVDQuang (19/01/2023) 
        */
        ctrlOnclick(event) {
            try {
                var charCode = (event.which) ? event.which : event.keyCode;
                if (charCode == 89 && event.ctrlKey == true) {
                    this.btnSaveOnClick();
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Kiểm tra input có bị rỗng không?
         * Author: NVDQuang (07/01/2023)
         * @param {string} val giá trị ô input 
         * @param {string} inputName tên biến để ẩn/hiện 
         * @param {string} showNameErr Nội dung cần thông báo 
         */
        checkInputRequired(val, inputName, showNameErr) {
            try {
                // if(this.requiredInput[inputName] == true){
                //     this.requiredInputFocus = inputName;
                // }
                if (!val) {
                    this.isValid = false;
                    this.requiredInput[inputName] = true;
                    if (!this.requiredInputFocus) {
                        this.requiredInputFocus = inputName;
                    }
                    this.listError.push(RESOURCE.NoticeRequired[showNameErr]);
                } else {
                    this.requiredInput[inputName] = false;
                    if (this.listError.includes(RESOURCE.NoticeRequired[showNameErr])) {
                        this.listError.splice(this.listError.indexOf(RESOURCE.NoticeRequired[showNameErr]), 1);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

    },

    created() {
        // this.depreciationValue = parseInt(this.assetSave.Cost * (this.assetSave.DepreciationRate / 100));

        // Nếu là formMode là Edit thì sẽ lấy các giá trị input, combobox của tài sản để biding lên dialog
        if (this.formMode == ENUM.FormMode.Edit) {
            axios.get(`http://localhost:41911/api/Assets/${this.assetIDSelected}`)
                .then((response) => {
                    this.assetSave = response.data;
                    console.log(response.data); // sao ngày mua với ngày sử dụng bị thay đổi ?
                    this.assetSave.PurchaseDate = this.formartDate(this.assetSave.PurchaseDate);
                    this.assetSave.UsingDate = this.formartDate(this.assetSave.UsingDate);
                })
            this.depreciationValue = this.assetSave.Cost * this.assetSave.DepreciationRate / 100;
        }
        // Nếu là formMode là Replicate thì sẽ lấy các giá trị input, combobox của tài sản để biding lên dialog
        if (this.formMode == ENUM.FormMode.Replication) {
            axios.get(`http://localhost:41911/api/Assets/${this.assetIDSelected}`)
                .then((response) => {
                    this.assetSave = response.data;
                    console.log(response.data); // sao ngày mua với ngày sử dụng bị thay đổi ?
                    this.assetSave.PurchaseDate = this.formartDate(this.assetSave.PurchaseDate);
                    this.assetSave.UsingDate = this.formartDate(this.assetSave.UsingDate);
                })
                .then(() => {
                    axios
                        .get("http://localhost:41911/api/Assets/new-code")
                        .then((response) => {
                            this.assetSave.AssetCode = response.data;
                        });
                })
            this.depreciationValue = this.assetSave.Cost * this.assetSave.DepreciationRate / 100;
        }


        /**
        * Call API lấy mã nhân viên mới tự động tăng
        * Gán các giá trị mặc định khi thêm mới nếu không chỉnh sửa
        * Author: NVDQuang (02/01/2023)
        */
        if (this.formMode == ENUM.FormMode.Add) {
            axios
                .get("http://localhost:41911/api/Assets/new-code")
                .then((response) => {
                    this.assetSave.AssetCode = response.data;
                });
            this.assetSave.Quantity = 1;
            this.assetSave.LifeTime = 0;
            this.assetSave.Cost = 0;
            this.assetSave.DepreciationRate = 0;
            this.depreciationValue = 0;
            this.assetSave.YearFollow = 2023;
            this.assetSave.PurchaseDate = this.formartDate(new Date());
            this.assetSave.UsingDate = this.formartDate(new Date());
        }
    },

    mounted() {
        this.$refs.isRequiredAssetCode.focus();
    },
};
</script>
<style scoped>
.dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background-color: rgb(1 1 1 / 50%);
    z-index: 2;
}

.dialog-content {
    position: absolute;
    /* height: 500px; */
    width: 800px;
    background-color: rgb(255, 255, 255);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    padding: 20px 16px 0 16px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, .16);
}

.dialog__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.dialog__header__text {
    font-size: 16px;
    font-weight: 700;
}

.dialog__body {
    height: calc(100% - 52px - 44px);
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.dialog__body__item {
    display: flex;
    column-gap: 16px;
    /* justify-content: space-between; */
}

.dialog__body__left {
    width: calc((100% - 32px)/ 3);
    position: relative;
}

input {
    width: 100%;
}

.input-disiable:focus,
#txtPartUsedName.input:focus,
#txtYearFollow.input:focus {
    border: none;
    outline: none;
}

.dialog__body__right {
    flex: 1;
    position: relative;
}


.dialog__body__right-2 {
    display: flex;
    column-gap: 16px;
}

.dialog__body__right-2 .dialog__body__right-container {
    width: calc(50%);
}

.dialog__body__right-container:first-child {
    width: calc(50%);
}

.use-date {
    width: calc(100% - 8px);
}

.dialog__body__right-3 .dialog__body__right-container:first-child {
    width: calc(50% - 8px);
}

/* .dialog__body__right-container {
    width: calc(50% - 8px);
    float: left;
}

.dialog__body__right-container:nth-child(2) {
    margin-left: 16px;
} */

.dialog__body__label {
    margin-bottom: 8px;
}

.dialog__footer {
    height: 52px;
    width: calc(100% + 32px);
    margin-left: -16px;
    margin-top: 20px;
    background-color: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: end;
}

.btn-cancel {
    background-color: #fff;
    color: #000;
    box-shadow: none;
}

.btn-save {
    margin-right: 16px;
    margin-left: 10px;
    box-shadow: none;
}


.combobox .header__right__select-year__btns {
    margin-right: 12px;
}

.input-required {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    font-size: 12px;
    color: red;
}
</style>
