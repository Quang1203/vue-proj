<template>
    <div class="dialog" @keyup.esc="btnCloseOnClick" @keydown="ctrlOnclick">
        <div class="dialog-content">
            <div class="dialog__header">
                <div class="dialog__header__text" v-html="dialogTitle"></div>
                <button class="dialog__header__btn btn-close icon-24 tooltip" ref="btnClose" @click="btnCloseOnClick"
                    @keyup.enter="btnCloseOnClick" tabindex="14" @keydown="checkKeyDown">
                    <BaseTooltip :tooltipText="'Đóng (ESC)'" :height="36" />
                </button>
            </div>
            <div class="dialog__body">
                <div class="dialog__body__item">
                    <div class="dialog__body__left">
                        <div class="dialog__body__label">Mã tài sản <i style="color: red;">*</i></div>
                        <input v-model="assetSave.AssetCode" type="text" placeholder="Nhập mã tài sản"
                            ref="isRequiredAssetCode" class="input input-focus"
                            @keydown="checkLengthInput($event, assetSave.AssetCode, 20)"
                            @paste="handlePaste($event, assetSave.AssetCode, 20)"
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
                            @blur="blurOnInputRequired(assetSave.AssetName, 'isRequiredAssetName')"
                            @keydown="checkLengthInput($event, assetSave.AssetName, 255)"
                            @paste="handlePaste($event, assetSave.AssetName, 255)" autocomplete="on">
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
                            placeholder="Chọn mã bộ phận sử dụng" tabindex="3" ref="isRequiredDepartmentCode"
                            @keydown="checkLengthInput($event, assetSave.DepartmentCode, 20)"
                            @paste="handlePaste($event, assetSave.DepartmentCode, 20)"
                            :isValid="requiredInput.isRequiredDepartmentCode" />
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
                            @keydown="checkLengthInput($event, assetSave.AssetTypeCode, 20)"
                            @paste="handlePaste($event, assetSave.AssetTypeCode, 20)"
                            :isValid="requiredInput.isRequiredAssetTypeCode" placeholder="Chọn mã loại tài sản" tabindex="4"
                            ref="isRequiredAssetTypeCode" />
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
                        <BaseInputNumber v-model="assetSave.Quantity" tabindex="5" ref="isRequiredQuantity"
                            :isValid="requiredInput.isRequiredQuantity" :adjustment="true" />
                        <!-- :blurOnInputRequired="blurOnInputRequired(assetSave.Quantity, 'isRequiredQuantity')" -->
                        <BaseNoticeRequired v-show="requiredInput.isRequiredQuantity"> {{
                            RESOURCE.NoticeRequired.RequiredAmount
                        }} </BaseNoticeRequired>
                    </div>
                    <div class="dialog__body__right dialog__body__right-2">
                        <div class="dialog__body__right-container">
                            <div class="dialog__body__label">Nguyên giá <i style="color: red;">*</i></div>
                            <BaseInputNumber v-model="assetSave.Cost" tabindex="6" :isValid="requiredInput.isRequiredCost"
                                ref="isRequiredCost" :adjustment="false" />
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
                            :isValid="requiredInput.isRequiredDepreciationRate" ref="isRequiredDepreciationRate" />
                        <BaseNoticeRequired v-show="requiredInput.isRequiredDepreciationRate"> {{
                            errorDepreciationRateContent }} </BaseNoticeRequired>
                    </div>
                    <div class="dialog__body__right dialog__body__right-2">
                        <div class="dialog__body__right-container">
                            <div class="dialog__body__label">Giá trị hao mòn năm <i style="color: red;">*</i></div>
                            <!-- <input type="text" tabindex="9" v-model="depreciationValue" class="input input-focus input-number"> -->
                            <BaseInputMoney v-model="depreciationValue" tabindex="9" ref="isRequiredDepreciationValue"
                                :isValid="requiredInput.isRequiredDepreciationValue" />
                            <BaseNoticeRequired v-show="requiredInput.isRequiredDepreciationValue"> {{
                                errorDepreciationValueContent }} </BaseNoticeRequired>
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
                            :isValid="requiredInput.isRequiredDateBuy" ref="isRequiredDateBuy" />
                        <BaseNoticeRequired v-show="requiredInput.isRequiredDateBuy"> {{
                            RESOURCE.NoticeRequired.RequiredDateBuy
                        }}</BaseNoticeRequired>
                    </div>
                    <div class="dialog__body__right dialog__body__right-3">
                        <div class="dialog__body__right-container">
                            <div class="dialog__body__label ">Ngày bắt đầu sử dụng<i style="color: red;">*</i></div>
                            <BaseDatePicker v-model="assetSave.UsingDate" :formMode="formMode" tabindex="11"
                                :isValid="requiredInput.isRequiredDateUse" ref="isRequiredDateUse" />
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
                <button class="button btn-save tooltip" tabindex="12" @click="btnSaveOnClick" @keyup.enter="btnSaveOnClick">
                    Lưu
                    <BaseTooltip :tooltipText="'Ctrl + S'" :width="60" :height="36" />
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import BaseCombobox from '../../components/base/BaseCombobox.vue';
import BaseComboboxNumber from '../../components/base/BaseComboboxNumber.vue';
import BaseDatePicker from '../../components/base/BaseDatePicker.vue';
import BaseNoticeRequired from '../../components/base/BaseNoticeRequired.vue';
import BaseInputMoney from '../../components/base/BaseInputMoney.vue';
import BaseInputNumber from '../../components/base/BaseInputNumber.vue';
import BaseTooltip from '../../components/base/BaseTooltip.vue';

import ENUM from '@/resources/enum';
import RESOURCE from '@/resources/resource';
import CommonJS from '../../script/common'
import callAPI from '@/script/callAPI';

export default {
    extends: CommonJS,
    components: { BaseCombobox, BaseComboboxNumber, BaseDatePicker, BaseNoticeRequired, BaseInputMoney, BaseInputNumber, BaseTooltip },
    props: ["assetIDSelected", "formMode", "dialogTitle", "isContinueSave"],
    watch: {
        /**
         * Xác nhận lưu khi dữ liệu thay đổi
         * Author:  Quang(20/02/2023)
         * @param {bool} val thực thi validate trước khi lưu nếu giá trị nhận được là true
         */
        isContinueSave(val) {
            if (val) {
                this.btnSaveOnClick();
                this.$emit("resetIsContinueSave", false);
            }
        },
        assetSave: {
            handler: function () {
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

                // if (newVal !== oldVal) {
                //     this.hasChangedData = false;
                // }
                // else {
                //     this.hasChangedData = true;
                // }
            },
            deep: true
        },
        'assetSave.LifeTime': function (value) {
            this.requiredInput.isRequiredLifeTime = false;
            if (value > 0) {
                this.assetSave.DepreciationRate = parseFloat(((1 / value) * 100).toFixed(2));
            }
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
            assetOriginal: {},
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
            errorDepreciationRateContent: RESOURCE.NoticeRequired.RequiredDepreciationRate,
            errorDepreciationValueContent: RESOURCE.NoticeRequired.RequiredDepreciationValue,
            requiredInputFocus: null,
            isValid: true,
            hasChangedData: false,
            listError: [],
            depreciationValue: 0,
            cost: 0,
        }
    },
    methods: {
        /**
        * Gửi emit cho component cha AssetPage giá trị false để đóng dialog
        * Author:  Quang ( 30/12/2022)
        */
        btnCloseOnClick() {
            if (JSON.stringify(this.assetSave) === JSON.stringify(this.assetOriginal)) {
                this.hasChangedData = false;
            } else {
                this.hasChangedData = true;
            }
            if (this.hasChangedData) {
                this.$emit("showNoticeChangedData");
            } else {
                this.$emit("closeButtonOnClick", false);
            }
        },

        /**
        * Validate khi blur ra khỏi input bắt buộc không được để trống
        * Author:  Quang ( 30/12/2022)
        * Modified by:  Quang(04/01/2023)
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
                        callAPI.methods.checkDuplicateCode(this.assetSave.AssetID, this.assetSave.AssetCode)
                            .then((response) => {
                                if (response == 1) {
                                    this.requiredInput[isRequired] = true;
                                }
                            })
                    }
                }
            }
        },

        /**
        * Lấy mã bộ phận sử dụng để biding tên bộ phận sử dụng
        * Author:  Quang ( 06/01/2023)
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
        * Author:  Quang ( 30/12/2022)
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
        * Author:  Quang (30/12/2022)
        */
        async btnSaveOnClick() {
            try {
                this.listError = [];
                this.isValid = true;
                this.requiredInputFocus = null;

                // FOR
                const checks = [
                    { field: this.assetSave.AssetCode, message: "RequiredAssetCode" },
                    { field: this.assetSave.AssetName, message: "RequiredAssetName" },
                    { field: this.assetSave.DepartmentCode, message: "RequiredDepartmentCode" },
                    { field: this.assetSave.AssetTypeCode, message: "RequiredAssetTypeCode" },
                    { field: this.assetSave.Quantity, message: "RequiredAmount" },
                    { field: this.assetSave.Cost, message: "RequiredCost" },
                    { field: this.assetSave.LifeTime, message: "RequiredLifeTime" },
                    { field: this.assetSave.DepreciationRate, message: "RequiredDepreciationRate" },
                    { field: this.depreciationValue, message: "RequiredDepreciationValue" },
                    { field: this.assetSave.PurchaseDate, message: "RequiredDateBuy" },
                    { field: this.assetSave.UsingDate, message: "RequiredDateUse" },
                ];

                for (let i = 0; i < checks.length; i++) {
                    const { field, message } = checks[i];
                    this.checkInputRequired(field, `is${message}`, message);
                }


                // // Check bỏ trống Mã tài sản
                // this.checkInputRequired(this.assetSave.AssetCode, "isRequiredAssetCode", "RequiredAssetCode");
                // // Check bỏ trống Tên tài sản
                // this.checkInputRequired(this.assetSave.AssetName, "isRequiredAssetName", "RequiredAssetName");
                // // Check bỏ trống Mã bộ phận sử dụng
                // this.checkInputRequired(this.assetSave.DepartmentCode, "isRequiredDepartmentCode", "RequiredDepartmentCode");
                // // Check bỏ trống Mã loại tài sản
                // this.checkInputRequired(this.assetSave.AssetTypeCode, "isRequiredAssetTypeCode", "RequiredAssetTypeCode");
                // // Check bỏ trống Số lượng
                // this.checkInputRequired(this.assetSave.Quantity, "isRequiredQuantity", "RequiredAmount");
                // // Check bỏ trống Nguyên giá
                // this.checkInputRequired(this.assetSave.Cost, "isRequiredCost", "RequiredCost");
                // // Check bỏ trống Số năm sử dụng
                // this.checkInputRequired(this.assetSave.LifeTime, "isRequiredLifeTime", "RequiredLifeTime");
                // // Check bỏ trống Tỷ lệ hao mòn
                // this.checkInputRequired(this.assetSave.DepreciationRate, "isRequiredDepreciationRate", "RequiredDepreciationRate");
                // // Check bỏ trống Giá trị hao mòn
                // this.checkInputRequired(this.depreciationValue, "isRequiredDepreciationValue", "RequiredDepreciationValue");
                // // Check bỏ trống Ngày mua
                // this.checkInputRequired(this.assetSave.PurchaseDate, "isRequiredDateBuy", "RequiredDateBuy");
                // // Check bỏ trống Ngày sử dụng
                // this.checkInputRequired(this.assetSave.UsingDate, "isRequiredDateUse", "RequiredDateUse");

                // Check trùng mã
                if (this.assetSave.AssetCode.length < 20) {
                    const response = await callAPI.methods.checkDuplicateCode(this.assetSave.AssetID, this.assetSave.AssetCode);
                    if (response == 1) {
                        this.isValid = false;
                        this.requiredInput.isRequiredAssetCode = true;
                        // this.listError.push(this.$RESOURCE.NoticeRequired.DuplicateAssetCode);
                    }
                }

                // Validate nghiệp vụ Tỷ lệ hao mòn
                if (this.assetSave.DepreciationRate && this.assetSave.DepreciationRate != (100 / this.assetSave.LifeTime).toFixed(2)) {
                    this.isValid = false;
                    this.errorDepreciationRateContent = RESOURCE.NoticeRequired.RequiredDepreciationRateExact;
                    this.requiredInput.isRequiredDepreciationRate = true;
                }
                // Validate nghiệp vụ Giá trị hao mòn năm
                if (this.depreciationValue && this.depreciationValue > this.assetSave.Cost) {
                    this.isValid = false;
                    this.errorDepreciationValueContent = RESOURCE.NoticeRequired.RequiredDepreciationValueExact;
                    this.requiredInput.isRequiredDepreciationValue = true;
                }


                const arr = [];
                for (let key in this.requiredInput) {
                    arr.push({ key, value: this.requiredInput[key] });
                }
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].value == true && this.requiredInputFocus == null) {
                        this.requiredInputFocus = arr[i].key;
                    }
                }

                if (!this.isValid) {
                    if (this.requiredInputFocus == "isRequiredAssetCode" || this.requiredInputFocus == "isRequiredAssetName"
                        || this.requiredInputFocus == "isRequiredLifeTime") {
                        this.$refs[`${this.requiredInputFocus}`].focus();
                    } else {
                        this.$refs[`${this.requiredInputFocus}`].$refs.input.focus();
                    }
                    // this.$emit("saveButtonOnClick", this.assetSave);

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
                    this.$emit("saveButtonOnClick", this.assetSave);
                }

            } catch (error) {
                console.log(error);
            }
        },
        /**
        * Dùng tổ hợp phím Ctrl + S để lưu
        * Author:  Quang (19/01/2023) 
        */
        ctrlOnclick(event) {
            try {
                var charCode = (event.which) ? event.which : event.keyCode;
                if (charCode == ENUM.KeyCode.KeyS && event.ctrlKey == true) {
                    event.preventDefault();
                    this.btnSaveOnClick();
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Kiểm tra input có bị rỗng không?
         * Author:  Quang (07/01/2023)
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
                    // if (!this.requiredInputFocus) {
                    //     this.requiredInputFocus = inputName;
                    // }
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

        /**
         * 
         * @param {Giá trị ô input} val 
         * @param {Độ dài lớn nhất cho phép nhập} maxLenghth 
         * @param {*} event 
         */
        checkLengthInput(event, val, maxLenghth) {
            var charCode = (event.which) ? event.which : event.keyCode;
            if (val == this.assetSave.AssetCode) {
                if (charCode == ENUM.KeyCode.Tab && event.shiftKey == true) {
                    this.$refs.btnClose.focus();
                }
            }
            if (charCode == ENUM.KeyCode.Backspace) {
                return true;
            }
            if (charCode == ENUM.KeyCode.KeyA && event.ctrlKey == true) {
                return true;
            }
            if (charCode == ENUM.KeyCode.Tab || charCode == ENUM.KeyCode.Left || charCode == ENUM.KeyCode.Right) {
                return true;
            }
            if (val && val.length >= maxLenghth) {
                event.preventDefault();
            }

        },
        /**
         * Kiểm tra độ dài trước khi cho phép paste
         * @param {*} event Event người dùng 
         * @param {Strign} value Giá trị hiện tại của ô input
         * @param {int} num Số lượng tối đa cho phép paste
         * Author:  Quang (21/02/2023)
         */
        handlePaste(event, value, num) {
            // Lấy giá trị paste từ clipboard của trình duyệt
            const clipboardData = event.clipboardData || window.clipboardData;
            const pastedData = clipboardData.getData('text');
            const lastString = value + pastedData;
            if (lastString.length > num) {
                event.preventDefault();
            } else {
                return true;
            }
        },

        /**
         * Kiểm tra thao tác bàn phím trước khi thả phím
         * @param {*} event 
         * Author:  Quang (16/02/2023)
         */
        checkKeyDown(event) {
            // tab về từ đầu
            this.$refs.isRequiredAssetCode.focus();

            var charCode = (event.which) ? event.which : event.keyCode;
            if (charCode == ENUM.KeyCode.Tab && event.shiftKey == true) {
                return true;
            }
            if (charCode == ENUM.KeyCode.Enter) {
                return true;
            }
            if (charCode == ENUM.KeyCode.Tab) {
                event.preventDefault();
            }
        },
        /**
         * Kiểm tra thao tác bàn phím trước khi thả phím
         * @param {*} event 
         * Author:  Quang (16/02/2023)
         */
        //  notShiftTab(event) {

        //     var charCode = (event.which) ? event.which : event.keyCode;
        //     if (charCode == ENUM.KeyCode.Tab && event.shiftKey == true) {
        //         event.preventDefault();
        //     }
        //     if (charCode == ENUM.KeyCode.Enter) {
        //         return true;
        //     }
        // }
    },

    created() {
        // Nếu là formMode là Edit thì sẽ lấy các giá trị input, combobox của tài sản để biding lên dialog
        if (this.formMode == ENUM.FormMode.Edit) {
            callAPI.methods.getAssetByID(this.assetIDSelected)
                .then((response) => {
                    this.assetSave = response;
                    // console.log(response); // sao ngày mua với ngày sử dụng bị thay đổi ?
                    this.assetSave.PurchaseDate = this.formartDate(this.assetSave.PurchaseDate);
                    this.assetSave.UsingDate = this.formartDate(this.assetSave.UsingDate);
                }).then(() => {
                    this.depreciationValue = this.assetSave.Cost * this.assetSave.DepreciationRate / 100;
                    this.assetOriginal = JSON.parse(JSON.stringify(this.assetSave));
                })
        }
        // Nếu là formMode là Replicate thì sẽ lấy các giá trị input, combobox của tài sản để biding lên dialog
        if (this.formMode == ENUM.FormMode.Replication) {
            callAPI.methods.getAssetByID(this.assetIDSelected)
                .then((response) => {
                    this.assetSave = response;
                    // this.assetSave.AssetID = "";
                    delete this.assetSave.AssetID;
                    // console.log(response); // sao ngày mua với ngày sử dụng bị thay đổi ?
                    this.assetSave.PurchaseDate = this.formartDate(this.assetSave.PurchaseDate);
                    this.assetSave.UsingDate = this.formartDate(this.assetSave.UsingDate);
                })
                .then(() => {
                    callAPI.methods.getNewAssetCode()
                        .then((response) => {
                            this.assetSave.AssetCode = response;
                        });
                })
            this.depreciationValue = this.assetSave.Cost * this.assetSave.DepreciationRate / 100;
        }

        /**
        * Call API lấy mã nhân viên mới tự động tăng
        * Gán các giá trị mặc định khi thêm mới nếu không chỉnh sửa
        * Author:  Quang (02/01/2023)
        */
        if (this.formMode == ENUM.FormMode.Add) {
            callAPI.methods.getNewAssetCode()
                .then((response) => {
                    this.assetSave.AssetCode = response;
                })
                .then(() => {
                    this.assetSave.Quantity = 1;
                    this.assetSave.LifeTime = 0;
                    this.assetSave.Cost = 0;
                    this.assetSave.DepreciationRate = 0;
                    this.depreciationValue = 0;
                    this.assetSave.YearFollow = 2023;
                    this.assetSave.PurchaseDate = this.formartDate(new Date());
                    this.assetSave.UsingDate = this.formartDate(new Date());
                })
                .then(() => {
                    this.assetOriginal = JSON.parse(JSON.stringify(this.assetSave));
                })
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
