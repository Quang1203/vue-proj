<template >
    <div class="combobox-filter ">
        <div class="combobox-filter-icon icon-24"></div>
        <div class="combobox-filter-text" v-html="filterSelected ? filterSelected : text"></div>
        <div class="combobox-filter-icon-down" @click="showListFilter = !showListFilter"></div>
        <div class="combobox__list-item" v-show="showListFilter">
            <div class="combobox__item" :class="{ 'item-selected': filterSelected == 'Tất cả' }"   @click="filterAllOnClick"> Tất cả</div>
            <div class="combobox__item" :class="{ 'item-selected': filterSelected == filter[name] }" v-for="filter in listFilter" :key="filter" @click="filterOnClick(filter)">{{ filter[name] }} </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "BaseFilter",
    props: ["text", "api", "idName", "name", "modelValue"],
    data() {
        return {
            showListFilter: false,
            filterSelected: null,
            IDFilterSelected: "",
            listFilter: [],
        }
    },
    watch:{
        IDFilterSelected(newValue){
            this.$emit("update:modelValue", newValue);
        }
    },
    methods: {
        /**
         * Chọn filter để lọc
         * Author:  Quang(03/01/2023)
         */
        filterOnClick(filter){
            this.filterSelected = filter[this.name];
            this.showListFilter = false;
            this.IDFilterSelected = filter[this.idName];
        },
        /**
         * Chọn filter Tất cả
         * Author:  Quang(03/01/2023)
         */
        filterAllOnClick(){
            this.filterSelected = "Tất cả";
            this.showListFilter = false;
            this.IDFilterSelected = "";
        },
    },
    created() {
        this.filterSelected = this.modelValue;
        if(this.api){
            axios.get(this.api).then( (response) => {
                this.listFilter = response.data;
            } )
        }
    },
}
</script>
<style scoped>
.combobox-filter {
    position: relative;
    background-color: #ffffff;
    border-radius: 2.5px;
    border: 1px solid #afafaf;
    width: 219px;
    height: 35px;
    display: flex;
    align-items: center;
}

.combobox-filter-icon {
    background: url("../../assets/icon/qlts-icon.svg") -240px -64px;
    margin: 6px 8px 6px 6px;
}

.combobox-filter-text {
    flex: 1;
}

.combobox-filter-icon-down {
    width: 7px;
    height: 5px;
    background: url("../../assets/icon/qlts-icon.svg") -205px -343px;
    cursor: pointer;
    margin-right: 12px;
}

.combobox__list-item {
    position: absolute;
    top: 35px;
    width: 100%;
    padding: 8px;
    box-shadow: 0 4px 16px rgb(0 0 0 / 24%);
    border-radius: 3.5px;
    z-index: 1;
    background-color: #fff;
}

.combobox__item {
    line-height: 36px;
    border-radius: 4px;
    padding: 0 8px;
    margin: 0 0 0 8px;
    cursor: pointer;
    margin: 0;
}
.combobox__item:hover{
    background-color: #E6F2FF;
}
.item-selected {
    background: #e8f5f7;
    background: #E6F2FF;
}
</style>