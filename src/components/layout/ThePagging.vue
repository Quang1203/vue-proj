<template>
    <div class="pagging">
        <div class="pagging__left">Tổng số:&nbsp; <span style="font-weight: 700;">{{ totalCount }} </span> &nbsp;bản ghi
        </div>
        <div class="pagging__mid">
            <div class="combobox-choose-page-size">
                <div class="combobox-choose-page-size__number">{{ pageSizeCurrent }}</div>
                <div class="combobox-choose-page-size__icon combobox-filter-icon-down"
                    @click="isShowListChoosePageSize = !isShowListChoosePageSize"></div>
                <div class="combobox__list-item" v-show="isShowListChoosePageSize">
                    <div class="combobox__item" v-for="item in pageSizeList" :key="item" @click="itemFilterOnClick(item)"
                        :class="{ 'item-selected': pageSizeCurrent == item }"> {{ item }} </div>

                </div>
            </div>
            <button class="pagging__mid__btns btn-pre" @click="changePage('pre')"
                :class="{ 'disiable': pageNumber == 1 || !totalPage}"></button>
            <!-- <button class="pagging__mid__btns btn-number btn-active">1</button> -->
            <button class="pagging__mid__btns btn-number" v-for="(page, index) in pages" :key="index"
                :class="{ 'btn-active': page == pageNumber }" @click="changePage(page)"> {{ page }}</button>
            <button class="pagging__mid__btns btn-next" @click="changePage('next')"
                :class="{ 'disiable': pageNumber == totalPage || !totalPage}"></button>
        </div>
        <div class="pagging__right" v-show="false">
            <div class="pagging__right__total total-amount">13</div>
            <div class="pagging__right__total total-full">249.000</div>
            <div class="pagging__right__total total-Accumulated">19.700.000</div>
            <div class="pagging__right__total total-last">224.214.257</div>
        </div>
    </div>
</template>
<script>
import callAPI from '@/script/callAPI';
import router from '@/router';
export default {
    name: "ThePagging",
    props: ["totalCount", "pageNumber", "pageSize", "keyWord", "assetTypeFilter", "departmentFilter"],
    data() {
        return {
            pageSizeList: [20, 50, 100],
            isShowListChoosePageSize: false,
            pageSizeCurrent: 20,
        }
    },
    watch: {
        /**
         * Tổng số trang thay đổi khi thay đổi page size thì reset về trang đầu và lấy dữ liệu trang đầu tương ứng
         * @param {*} value 
         * Author: NVDQuang(06/02/2022)
         */
        totalPage(value) {
            if (value) {
                this.$emit("ResetPaggingAffterChoosePageSize", 1);
                callAPI.methods.getDataFilterAndPaging(1, this.pageSizeCurrent, this.keyWord, this.assetTypeFilter, this.departmentFilter)
                    .then((response) => {
                        var assets = response.Data;
                        this.$emit("updateAssets", assets, response.TotalCount);
                    });
            }
        }
    },
    computed: {
        /**
         * Tính toán số trang
         * Author: NVDQuang (02/02/2023)
         */
        totalPage() {
            return Math.ceil(this.totalCount / this.pageSizeCurrent);
        },
        /**
         * Chia số trang pagging theo pageSize
         * Author: NVDQuang (02/02/2023)
         */
        pages() {
            let pages = [];
            for (let i = 1; i <= this.totalPage; i++) {
                if (i == 1 || i == this.totalPage || (i <= this.pageNumber + 2 && i >= this.pageNumber - 2)) {
                    pages.push(i);
                }
                else if (i == this.pageNumber + 3 || i == this.pageNumber - 3) {
                    pages.push("...")
                }
            }
            return pages;
        },
    },
    methods: {
        /**
        * Chọn item combobox
        * Author: NVDQuang (30/12/2022)
        * @param {string} item giá trị được chọn 
        */
        itemFilterOnClick(item) {
            try {
                this.pageSizeCurrent = item;
                this.isShowListChoosePageSize = false;
                this.$emit("updatePageSize", item);

            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Chọn page
         * @param {string} page page muốn chọn 
         * Author: NVDQuang (02/02/2023)
         */
        changePage(page) {
            if (page == 'pre' && this.pageNumber <= 1) {
                return;
            }
            if (page == 'next' && this.pageNumber >= this.totalPage) {
                return;
            }
            if (page == '...') {
                return;
            }
            if (page == this.pageNumber) {
                return;
            }
            if (page == 'pre') {
                page = this.pageNumber - 1;
            }
            if (page == 'next') {
                page = this.pageNumber + 1;
            }
            callAPI.methods.getDataFilterAndPaging(page, this.pageSizeCurrent, this.keyWord, this.assetTypeFilter, this.departmentFilter)
                .then((response) => {
                    var assets = response.Data;
                    this.$emit("updateAssets", assets, response.TotalCount);
                });
            this.$emit("ResetPaggingAffterChoosePageSize", page)
            router.push({
                path: "/asset",
                query: {
                    pageSize: this.pageSize,
                    pageNumber: page
                }
            })
        }
    },
    created() {
    },
}
</script>
<style scoped>
.pagging {
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 17px;
    padding-right: 107px;
    position: sticky;
    /* position: absolute; */
    /* top:  calc(100vh - 40px); */
    bottom: 0;
    border-radius: 0 0 3.5px 3.5px;
    background-color: #fff;
    /* background-color: aqua; */
    /* z-index: 1; */
}

.pagging__left {
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 11px;
}

.combobox-choose-page-size {
    width: 59px;
    height: 25px;
    background-color: #ffffff;
    border-radius: 2.625px;
    border: 1px solid #afafaf;
    display: flex;
    align-items: center;
    padding-left: 14px;
}

.combobox-choose-page-size__number {
    flex: 1;
}

.combobox-choose-page-size {
    position: relative;
}

.combobox__list-item {
    width: 100%;
    position: absolute;
    bottom: 100%;
    left: 0;
    padding: 0 14px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.combobox__item {
    width: 100%;
    line-height: 24px;
}

.combobox__item:hover {
    background-color: #E6F2FF;
    cursor: pointer;
}

.pagging__mid {
    display: flex;
    align-items: center;
}

.pagging__mid__btns {
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: unset;
    cursor: pointer;
    background-color: #fff;
    font-size: 11px;
    outline: unset;
}

.btn-number+.btn-number {
    margin-left: 7px;
}

.btn-number:hover {
    box-shadow: 0 0px 3px rgba(39, 33, 33, 0.16);
}

.btn-number.btn-active:hover {
    box-shadow: unset;
}

.btn-number-more {
    padding: unset;
    width: 10px !important;
    height: 14px !important;
    margin-right: 5px;
    margin-left: 5px;
}

.btn-pre {
    background: url("../../assets/icon/qlts-icon.svg") -23px -242px;
    margin-left: 16px;
    margin-right: 10px;
    background-color: #fff;
}

.btn-next {
    background: url("../../assets/icon/qlts-icon.svg") -66px -242px;
    background-color: #fff;
    margin-left: 10px;
}

.btn-active {
    background-color: #f5f5f5;
    font-weight: 700;
}

.pagging__right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-weight: 700;
    /* margin-left: 372px; */
}

/* .total-full{
    margin-left: 38px;
    margin-right:   75px;
} */
.total-last {
    margin-right: -4px;
    margin-left: 48px;
}

.total-Accumulated {
    margin-left: 33px;
}

.total-full {
    margin-left: 74px;
}

.item-selected {
    background: #e8f5f7;
    background: #E6F2FF;
}

.disiable {
    opacity: 0.5;
    /* cursor: not-allowed; */
    pointer-events: none;
}</style>