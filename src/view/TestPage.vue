<template >
    <div>
        <div class="content">
            <div class="toolbar">
                <div class="toolbar__left">
                    <div class="toolbar__left__search">
                        <div class="toolbar__left__search__icon icon-24"></div>
                        <input class="input-search " type="text" placeholder="Tìm kiếm tài sản" v-model="keyWord"
                            @keyup.enter="searchOnClick" />
                    </div>
                    <BaseFilter :api="'http://localhost:41911/api/AssetTypes'" :name="'AssetTypeName'" :idName="'AssetTypeID'"
                        text="Loại tài sản" v-model="assetTypeFilter" />
                    <BaseFilter :api="'http://localhost:41911/api/Departments'" :name="'DepartmentName'" :idName="'DepartmentID'"
                        text="Bộ phận sử dụng"  v-model="departmentFilter"/>


                </div>
                <div class="toolbar__right">
                    <button class=" button btn-add" @click="btnAddOnClick">+ Thêm tài sản</button>
                    <button class="btn-export"></button>
                    <button class="btn-delete" @click="btnDeleteOnClick"></button>
                </div>
            </div>
            <div class="grid-container">
                <div class="grid">
                    <table class="table">
                        <thead>
                            <th class="text-align-center th-check-box">
                                <BaseCheckBox @click="checkBoxAllOnClick" ref="checkBoxAll"
                                    :isCheckBoxAll="isCheckBoxAll" />
                            </th>
                            <th class="text-align-center tooltip">STT
                                <span class="tooltiptext">Số thứ tự</span>
                            </th>
                            <th class="text-align-left" style="min-width: 80px; max-width: 80px; width: 80px;">Mã tài
                                sản</th>
                            <th class="text-align-left" style="min-width: 150px">Tên tài sản</th>
                            <th class="text-align-left" style="min-width: 150px">Loại tài sản</th>
                            <th class="text-align-left" style="min-width: 180px; width: 180px;">Bộ phận sử dụng</th>
                            <th class="text-align-right" style="min-width: 60px; width: 60px;">Số lượng</th>
                            <th class="text-align-right" style="min-width: 120px; width: 120px;"> Nguyên giá </th>
                            <th class="text-align-right tooltip" style="min-width: 100px; width: 100px;">HM/KH lũy kế
                                <BaseTooltip :tooltipText="'Hao mòn/ khấu hao lũy kế'" :width="100" />
                            </th>

                            <th class="text-align-right" style="min-width: 120px; width: 120px;">Giá trị còn lại</th>
                            <th class="text-align-center" style="min-width: 100px; width: 100px;">Chức năng</th>
                        </thead>
                        <tbody>
                            <tr v-if="assetData.length == 0 "><td colspan="11">{{ RESOURCE.Table.TableNodata }}</td></tr>
                            <tr v-for="(assetItem, index) in assetData" :key="assetItem.AssetID"
                                @dblclick="editOnclick(assetItem)" @click.ctrl="rowCtrlOnClick(assetItem.AssetID)"
                                :class="{ 'row-selected': chooseArray.includes(assetItem.AssetID) }">
                                <td class="text-align-center">
                                    <BaseCheckBox @click="checkBoxRowOnClick(assetItem.AssetID)"
                                        :isCheckBoxAll="chooseArray.includes(assetItem.AssetID)" />
                                </td>
                                <td class="text-align-center">{{ index + 1 }}</td>
                                <td class="text-align-left" style="max-width: 80px; width: 80px;"
                                    :title="assetItem.AssetCode">
                                    <div>
                                        {{ assetItem.AssetCode }}
                                    </div>
                                </td>
                                <td class="text-align-left">{{ assetItem.AssetName }}</td>
                                <td class="text-align-left">{{ assetItem.AssetTypeName }}</td>
                                <td class="text-align-left">{{ assetItem.DepartmentName }}</td>
                                <td class="text-align-right">{{ formartMoney(assetItem.Quantity) }}</td>
                                <td class="text-align-right">{{ formartMoney(assetItem.Cost) }}</td>
                                <td class="text-align-right">{{
                                    formartMoney(assetItem.Cost * assetItem.DepreciationRate
                                        / 100)
                                }}</td>
                                <td class="text-align-right">{{
                                    formartMoney(assetItem.Cost - (assetItem.Cost *
                                        assetItem.DepreciationRate / 100) )
                                }}</td>
                                <td class="text-align-center optine-row" ref="optionRow">
                                    <div title="Sửa" class="edit-row tooltip" @click="editOnclick(assetItem)">
                                    </div>
                                    <div title="Nhân bản" @click="replicateOnclick(assetItem)"
                                        class="replication-row tooltip">
                                    </div>
                                </td>
                            </tr>
                            <!-- <tr v-if="assetData.length < 14" v-for="( i in  assetData.length ) :key="></tr> -->
                        </tbody>
                        <tfoot :class="{ 'tfoot--fixed': assetData.length < 14 }">
                            <tr >
                                <td colspan="6">
                                    <ThePagging :totalCount="totalCount" :pageNumber="pageNumber" :pageSize="pageSize"
                                        @ResetPaggingAffterChoosePageSize="ResetPaggingAffterChoosePageSize" @updatePageSize="updatePageSize" @updateAssets="updateAssets"
                                        :keyWord="keyWord" :departmentFilter="departmentFilter" :assetTypeFilter="assetTypeFilter"/>
                                </td>
                                <td class="text-align-right"><b> {{ formartMoney(getSumQuatity) }} </b></td>
                                <td class="text-align-right"> <b> {{ formartMoney(getSumCost) }} </b></td>
                                <td class="text-align-right"><b> {{ formartMoney(getSumDepreciationAccumulated) }} </b>
                                </td>
                                <td class="text-align-right"><b> {{ formartMoney(getSumLast) }} </b></td>
                            </tr>
                        </tfoot>

                    </table>
                </div>
                <!-- <ThePagging :totalCount="totalCount" /> -->

            </div>
        </div>
        <BaseDialog v-if="isShowDialog" @closeButtonOnClick="showDialog" @saveButtonOnClick="saveButtonOnClick"
            @showListError="showListError" :formMode="formMode" :assetIDSelected="assetIDSelected"
            :dialogTitle="dialogTitle" />
        <BasePopUp v-if="isShowPopUp" @closeButtonOnClick="showPopUp" :popUpContent="popUpContent"
            :listError="listError" :chooseArray="chooseArray" :showLoading="showLoading"
            @changeToastMessage="changeToastMessage" @loadData="loadData" :formPopUp="formPopUp" />
        <BaseToastMassage v-show="isShowToast" :isSuccessToast="isSuccessToast" :toastContent="toastContent" />
        <BaseLoading v-show="isLoading" />

    </div>
</template>
<script>
import BaseCheckBox from '../components/base/BaseCheckBox.vue';
import BaseDialog from '../components/base/BaseDialog.vue';
import BasePopUp from '../components/base/BasePopUp.vue';
import BaseToastMassage from '../components/base/BaseToastMassage.vue';
import ThePagging from '../components/layout/ThePagging';

import CommonJS from '@/script/common';
import ENUM from '../resources/enum'
import RESOURCE from '../resources/resource'

import axios from 'axios';
import BaseLoading from '@/components/base/BaseLoading.vue';
import BaseFilter from '@/components/base/BaseFilter.vue';
import BaseTooltip from '@/components/base/BaseTooltip.vue';
export default {
    extends: CommonJS,
    components: { BaseDialog, BaseCheckBox, BaseToastMassage, BasePopUp, BaseLoading, BaseFilter, BaseTooltip, ThePagging },
    watch: {
        /**
        * Tự động ẩn toast message sau 3 giây
        * Author :  Quang (29/12/2022)
        */
        isShowToast() {
            setTimeout(() => {
                this.showToastMessage(false);
            }, 3000);
        },
        assetSelected: {
            handler: function (newValue) {
                console.log("new:", newValue);
            },
            deep: true
        },
        /**
         * Thay đổi danh sách tài sản theo kích thước pageSize
         * @param {number} value kích thước chọn
         * Author;  Quang (08/02/2023)
         */
        // pageSize(value){
        //     axios.get(`http://localhost:41911/api/Assets/filter?pageSize=${value}&pageNumber=${this.pageNumber}&keyWord=${this.keyWord}`).then((response) => {
        //         this.assetData = response.data.Data;
        //     })
        // },
        /**
         * Load lại danh sách tài sản khi filter theo phòng ban
         * @param {string} value tên Phòng ban muốn filter
         * Author :  Quang (08/02/2023)
         */
        departmentFilter(value){
            axios.get(`http://localhost:41911/api/Assets/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&keyWord=${this.keyWord}&departmentID=${value}&assetTypeID=${this.assetTypeFilter}`).then((response) => {
                this.assetData = response.data.Data;
                this.totalCount = response.data.TotalCount;
            })
        },
        /**
         * Load lại danh sách tài sản khi filter theo loại tài sản
         * @param {string} value tên Loại tài sản muốn filter
         * Author:  Quang (08/02/2023) 
         */
        assetTypeFilter(value){
            axios.get(`http://localhost:41911/api/Assets/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&keyWord=${this.keyWord}&departmentID=${this.departmentFilter}&assetTypeID=${value}`).then((response) => {
                this.assetData = response.data.Data;
                this.totalCount = response.data.TotalCount;
            })
        }
    },
    data() {
        return {
            test: 1000000000000000000000000000000000000000000000000000000000000000000000000000,
            RESOURCE: RESOURCE,
            listError: [],
            isLoading: false,
            isShowDialog: false,
            isShowPopUp: false,
            isShowToast: false,
            isSuccessToast: true,
            toastContent: RESOURCE.ToastMessage.ToastContentSuccessSave,
            popUpContent: "",
            formMode: ENUM.FormMode.Add,
            formPopUp: ENUM.PopUp.ShowDelete,
            dialogTitle: RESOURCE.Dialog.DialogTitleAdd,
            assetData: [],
            chooseArray: [],
            isCheckBoxAll: false,
            assetSelected: {},
            assetIDSelected: null,
            allAssetCode: [],
            pageNumber: 1,
            pageSize: 20,
            keyWord: "",
            departmentFilter: "",
            assetTypeFilter: "",
            totalCount: null,
            sumQuatity: 0,
            sumCost: 0,
            sumDepreciationAccumulated: 0,
            sumLast: 0,
            isShowListChoosePageSize: false,
        }
    },
    computed: {
        /**
         * Tự động tính toán tổng cột Số lượng cho phân trang
         * Author:  Quang (08/02/2023)
         */
        getSumQuatity() {
            return this.assetData.reduce((total, asset) => total + asset.Quantity, 0);
        },
        /**
        * Tự động tính toán tổng cột Nguyên giá cho phân trang
        * Author:  Quang (08/02/2023)
        */
        getSumCost() {
            return this.assetData.reduce((total, asset) => total + asset.Cost, 0);
        },
        /**
         * Tự động tính toán tổng cột Hao mòn lũy kế cho phân trang
         * Author:  Quang (08/02/2023)
         */
        getSumDepreciationAccumulated() {
            return this.assetData.reduce((total, asset) => total + (asset.Cost * asset.DepreciationRate / 100), 0);
        },
        /**
         * Tự động tính toán tổng cột Còn lại cho phân trang
         * Author:  Quang (08/02/2023)
         */
        getSumLast() {
            return this.getSumCost - this.getSumDepreciationAccumulated;
        }
    },
    methods: {
        /**
        * Hàm ẩn hiện dialog form thêm mới/ chỉnh sửa tài sản
        * Author :  Quang (29/12/2022)
        * @param {bool} true/fale để ẩn/ hiện dialog 
        */
        showDialog(isShowDialog) {
            this.isShowDialog = isShowDialog;
        },
        /**
        * Hàm show thông báo toast message
        * Author :  Quang (02/01/2023)
        * @param {bool} true/fale để ẩn/ hiện toast messegae
        */
        showToastMessage(isShowToast) {
            this.isShowToast = isShowToast;
        },
        /**
        * Hàm ẩn hiện Pop-up xóa tài sản
        * Author :  Quang (29/12/2022)
        * @param {bool} true/fale để ẩn/ hiện dialog 
        */
        showPopUp(isShowPopUp) {
            try {
                this.isShowPopUp = isShowPopUp;
                let count = this.chooseArray.length;
                count = count < 10 ? `0${count}` : count;
                if (count == 0) {
                    this.popUpContent = RESOURCE.PopUpDelete.PopUpContentDeleteNoData;
                }
                if (count == 1) {
                    axios.get(`http://localhost:41911/api/Assets/${this.chooseArray[0]}`)
                        .then((response) => {
                            var codeAss = response.data.AssetCode;
                            var nameAss = response.data.AssetName;
                            this.popUpContent = ` Bạn có muốn xóa tài sản <b> ${codeAss} - ${nameAss} </b>?`;
                        })
                }
                if (count > 1) {
                    this.popUpContent = ` <b> ${count} </b>` + RESOURCE.PopUpDelete.PopUpContentDeleteMore;
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
        * Ẩn hiện loading
        * Author :  Quang (01/01/2023)
        * @param {bool} true/fale để ẩn/ hiện loading
        */
        showLoading(isShow) {
            this.isLoading = isShow;
        },
        /**
        * Click vào nút "Thêm tài sản" trên thanh toolbar
        * Author :  Quang (29/12/2022)
        */
        btnAddOnClick() {
            try {
                this.assetIDSelected = null;
                this.formMode = ENUM.FormMode.Add;
                this.dialogTitle = RESOURCE.Dialog.DialogTitleAdd;
                this.showDialog(true);
            } catch (error) {
                console.log(error);
            }
        },
        /**
        * Click vào nút "Xóa" trên thanh toolbar
        * Author :  Quang (29/12/2022)
        */
        btnDeleteOnClick() {
            try {
                this.formPopUp = ENUM.PopUp.ShowDelete;
                this.showPopUp(true);
            } catch (error) {
                console.log(error);
            }
        },
        /**
        * Click đúp vào từng hàng trên table để chỉnh sửa
        * Author :  Quang (30/12/2022)
        */
        editOnclick(assetItem) {
            try {
                this.formMode = ENUM.FormMode.Edit;
                this.dialogTitle = RESOURCE.Dialog.DialogTitleEdit;
                this.assetIDSelected = assetItem.AssetID;
                this.showDialog(true);
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Click nhân bản để 
        * Author :  Quang (03/02/2023)
        */
        replicateOnclick(assetItem) {
            try {
                this.formMode = ENUM.FormMode.Replication;
                this.dialogTitle = RESOURCE.Dialog.DialogTitleReplicate;
                this.assetIDSelected = assetItem.AssetID;
                this.showDialog(true);
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Ctrl + click chuột vào hàng
         * @param {obj} assetItem 
         * Author: NVQuang (16/01/2023)
         */
        rowCtrlOnClick(code) {
            try {
                if (!this.chooseArray.includes(code)) {
                    this.chooseArray.push(code);
                    if (this.chooseArray.length == this.assetData.length) {
                        this.isCheckBoxAll = true;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Click vào nút check box tất cả
        * Author :  Quang (30/12/2022)
        */
        checkBoxAllOnClick() {
            try {
                this.chooseArray = [];
                if (!this.isCheckBoxAll) {
                    for (let index = 0; index < this.assetData.length; index++) {
                        this.chooseArray.push(this.assetData[index].AssetID);
                    }
                }
                this.isCheckBoxAll = !this.isCheckBoxAll;
            } catch (error) {
                console.log(error);
            }
        },
        /**
        * Click vào check box để thêm/xóa ID cán bộ vào mảng
        * @param {string} val ID tài sản
        * Author:  Quang (30/12/2022)
        */
        checkBoxRowOnClick(val) {
            try {
                if (this.chooseArray.includes(val)) {
                    this.chooseArray.splice(this.chooseArray.indexOf(val), 1);
                    this.isCheckBoxAll = false;
                } else {
                    this.chooseArray.push(val);
                    if (this.chooseArray.length == this.assetData.length) {
                        this.isCheckBoxAll = true;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
        * Show thông báo lỗi nhập thiếu trường thông tin trước khi lưu
        * Author:  Quang (07/01/2023)
        */
        showListError(listErr) {
            try {
                if (listErr.length > 0) {
                    this.listError = listErr;
                    this.formPopUp = ENUM.PopUp.ShowError;
                    this.isShowPopUp = true;
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
        * Show toast message thông báo thành công/thất bại
        * @param {bool} isSuccess true/false tương ứng thành công/ thất bại 
        * @param {string} contentToast nội dung thông báo tương ứng
        * Author:  Quang(08/01/2023) 
        */
        changeToastMessage(isSuccess, contentToast) {
            try {
                this.isSuccessToast = isSuccess;
                this.toastContent = contentToast;
                this.showToastMessage(true);
            } catch (error) {
                console.log(error);
            }
        },
        /**
        * Bấm lưu tài sản
        * Author:  Quang (30/12/2022)
        * @param {obj} ast object tài sản cần lưu 
        */
        saveButtonOnClick(ast) {
            try {
                if (this.formMode == ENUM.FormMode.Add) {
                    axios.post("http://localhost:41911/api/Assets", ast)
                        .then(() => {
                            this.loadData();
                            this.showDialog(false);
                            this.isSuccessToast = true;
                            this.toastContent = RESOURCE.ToastMessage.ToastContentSuccessSave;
                        })
                        .then(() => {
                            this.showToastMessage(true);
                        })
                        .catch(() => {
                            this.isSuccessToast = false;
                            this.toastContent = RESOURCE.ToastMessage.ToastContentErrorSave;
                            this.showToastMessage(true);
                        })
                } else if (this.formMode == ENUM.FormMode.Edit) {
                    axios.put(`http://localhost:41911/api/Assets/${ast.AssetID}`, ast)
                        .then(() => {
                            this.loadData();
                            this.isSuccessToast = true;
                            this.toastContent = RESOURCE.ToastMessage.ToastContentSuccessEdit;
                            this.showDialog(false);
                        })
                        .then(() => {
                            this.showToastMessage(true)
                        })
                        .catch(() => {
                            this.isSuccessToast = false;
                            this.toastContent = RESOURCE.ToastMessage.ToastContentErrorEdit;
                            this.showToastMessage(true);
                        })
                } else {
                    axios.post("http://localhost:41911/api/Assets", ast)
                        .then(() => {
                            this.loadData();
                            this.showDialog(false);
                            this.isSuccessToast = true;
                            this.toastContent = RESOURCE.ToastMessage.ToastContentSuccessReplicate;
                        })
                        .then(() => {
                            this.showToastMessage(true);
                        })
                        .catch(() => {
                            this.isSuccessToast = false;
                            this.toastContent = RESOURCE.ToastMessage.ToastContentErrorReplicate;
                            this.showToastMessage(true);
                        })
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Trở về trang đầu tiên sau khi chọn page size
         * @param {int} num trang hiện tại
         * Author:  Quang (04/02/2023) 
         */
        ResetPaggingAffterChoosePageSize(num) {
            this.pageNumber = num;
        },
        /**
         * Cập nhật số bản ghi 1 trang
         * @param {int} num trang hiện tại
         * Author:  Quang (04/02/2023) 
         */
        updatePageSize(num) {
            this.pageSize = num;
        },
        updateAssets(assets, count) {
            this.assetData = assets;
            this.totalCount = count;
        },
        /***
         * Search từ khóa trên thanh toolbar
         * Author: Quang ( 05/02/2023)
         */
        searchOnClick() {
            axios.get(`http://localhost:41911/api/Assets/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&keyWord=${this.keyWord}`).then((response) => {
                this.assetData = response.data.Data;
                this.totalCount = response.data.TotalCount;
            })
        },
        /**
         * Load lại data sau hi xóa
         * Author:  Quang(06/01/2023)
         */
        loadData() {
            return new Promise((res) => {
                this.showLoading(true);            
                axios.get(`http://localhost:41911/api/Assets/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&keyWord=${this.keyWord}`).then((response) => {
                    res();
                    this.assetData = response.data.Data;
                    this.totalCount = response.data.TotalCount;
                    this.showLoading(false);
                })
            })
        },
    },
    async created() {
        await this.loadData();
        for (let i = 0; i < this.assetData.length; i++) {
            this.sumQuatity += this.assetData[i].Quantity;
            this.sumCost += this.assetData[i].Cost;
            this.sumDepreciationAccumulated += this.assetData[i].Cost * this.assetData[i].DepreciationRate / 100;
            this.sumLast = this.sumCost - this.sumDepreciationAccumulated;
        }
    },
}
</script>
<style scoped>
.tooltip {
    position: relative;
}

.tooltip .tooltiptext {
    visibility: hidden;
    min-width: 100px;
    padding: 4px 6px;
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
    z-index: 2;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}

.content {
    background-color: #f4f7ff;
    padding: 0 20px 17px 20px;
}

.toolbar {
    height: 63px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.toolbar__left {
    display: flex;
    align-items: center;
    column-gap: 11px;
}

.toolbar__left__search {
    display: flex;
    outline: none;
    width: 179px;
    height: 35px;
    background-color: #ffffff;
    border: 1px solid #afafaf;
    border-radius: 2.5px;
}

.toolbar__left__search:hover {
    border-color: #2979ff;
}

.toolbar__left__search__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 6px 0px 6px 7px;
    background: url("../assets/icon/qlts-icon.svg") -240px -20px !important;
}

.input-search {
    border: none;
    outline: none;
    /* flex: 1; */
    width: calc(100% - 36px);
    height: 100%;
    padding: unset;
    padding-left: 8px;
    /* margin-left: 8px; */
}

/* .combobox-filter {
    background-color: #ffffff;
    border-radius: 2.5px;
    border: 1px solid #afafaf;
    width: 219px;
    height: 35px;
    display: flex;
    align-items: center;
}

.combobox-filter-icon {
    background: url("../assets/icon/qlts-icon.svg") -240px -64px !important;
    margin: 6px 8px 6px 6px;
}

.combobox-filter-text {
    flex: 1;
}

.combobox-filter-icon-down {
    width: 7px;
    height: 5px;
    background: url("../assets/icon/qlts-icon.svg") -205px -343px;
    cursor: pointer;
    margin-right: 12px;
} */

.toolbar__right {
    display: flex;
    align-items: center;
}

.button.btn-add {
    width: 110px;
    height: 36px;
    /* padding: 12px 20px 10px 12px; */
    padding: unset;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 3px;
}

.btn-export {
    height: 36px;
    width: 36px;
    padding: unset;
    border: none;
    background: url("../assets/icon/qlts-icon.svg") -279px -103px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, .16);
    background-color: #fff;
    border-radius: 3px;
    margin-right: 10px;
    margin-left: 10px;
    cursor: pointer;
}

.btn-delete {
    height: 36px;
    width: 36px;
    border: none;
    background: url("../assets/icon/qlts-icon.svg") -454px -103px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, .16);
    padding: unset;
    background-color: #fff;
    border-radius: 3px;
    cursor: pointer;
}

.grid-container {
    box-shadow: 0 3px 10px rgba(0, 0, 0, .16);
    border-radius: 3.5px;
    /* border: 1px solid #afafaf; */
    box-sizing: border-box;
    overflow: auto;
}

.grid {
    position: relative;
    width: 100%;
    height: calc(100vh - 44px - 63px - 17px);
    /* height: calc(100vh - 44px - 63px - 17px - 40px); */
    overflow: auto;
    border-radius: 3.5px;
    /* border: 1px solid #afafaf; */
    /* box-shadow: 0 3px 10px rgba(0, 0, 0, .16); */
    background-color: #fff;

}

.grid::-webkit-scrollbar {
    width: 8px;
    height: 8px;

}

.grid::-webkit-scrollbar-thumb {
    background-color: #cdd3d6;
    border-radius: 1px;
    width: 8px;
    height: 234px;
}

.grid::-webkit-scrollbar-track {
    background-color: none;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

table thead {
    height: 38px;
}

.table th {
    position: sticky;
    top: 0;
    background-color: #f5f5f5;
    font-weight: 700;
}

.table tbody tr div {
    /* display: -webkit-box; */
    /* -webkit-line-clamp: 1;
    -webkit-box-orient: vertical; */
    overflow: hidden;
    text-overflow: ellipsis;
}

table tbody tr td:first-child{
    position: sticky;
    left: 0;
    background-color: #fff;
}

table tbody tr td:last-child {
    position: sticky;
    right: 0;
    background-color: #fff;
}

table tbody tr.row-selected td:first-child, table tbody tr:hover td:first-child{
    background-color:rgb(202 236 245 / 20%) ;
}
table tbody tr.row-selected td:first-child, table tbody tr:hover td:last-child{
    background-color:rgb(202 236 245 / 20%) ;
}

table thead th:first-child {
    position: sticky;
    left: 0;
    top: 0;
    background-color: #f5f5f5;
    z-index: 1;
}

table thead th:last-child {
    position: sticky;
    right: 0;
    top: 0;
    /* z-index: 1; */
}

.table th:first-child,
tbody tr td:first-child {
    padding-left: 16px;
    padding-right: 20px;
}

.table tbody tr {
    height: 39px;
    border-bottom: 1px solid #e8f5f7;
}

.row-selected {
    background-color: rgba(26, 164, 200, .2) !important;
}

tr:hover .optine-row {
    visibility: visible;
}

.optine-row {
    visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 39px;
    column-gap: 5px;
}

.optine-row div {
    height: 20px;
    width: 20px;
}

.edit-row {
    background: url("../assets/icon/qlts-icon.svg") -154px -66px;
}

.replication-row {
    background: url("../assets/icon/qlts-icon.svg") -243px -110px;
}

.table tbody tr:hover {
    background-color: rgba(26, 164, 200, .2) !important;
}

table tfoot {
    height: 40px;
    position: sticky;
    bottom: 0;
    background-color: #fff;
    /* position: absolute;
    bottom: 0; */
}

.tfoot--fixed {
    position: fixed;
    bottom: 17px;
}

tfoot tr {
    height: 40px !important;
}

/* .tfooter-absolute{
    position: absolute;
} */
</style>