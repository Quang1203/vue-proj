<template>
    <div class="combobox " ref="combobox"
        :class="{ 'border-red': isValid && !this.itemSelected, 'combobox--focus': isFocus }">
        <input ref="input" :placeholder=placeholder :tabindex=tabindex v-model="itemSelected" class="input"
            @click="comboboxOnFocus" @focus="comboboxOnFocus" @blur="comboboxOnBlur" @input="onSearchItem"
            @keydown="inputOnKeyDown" />
        <div class="icon-down-container">
            <div @click="isShowListCombobox = !isShowListCombobox" class="combobox-filter-icon-down icon-down icon-24">
            </div>
        </div>

        <div class="combobox__list-item" v-show="isShowListCombobox">
            <!-- <div :class="{ 'item-selected': itemFilter.includes(item) }" v-for="item in items" :key="item"
                class="combobox__item page-size-item btn-page-check" @click="itemFilterOnClick(item)">{{ item }}</div> -->
            <div class="combobox__list-item__header">
                <div class="combobox__item">
                    <div class="combobox__list-item__header__left">Mã</div>
                    <div class="combobox__list-item__header__right">Tên</div>
                </div>
            </div>
            <div class="combobox__list-item__body">
                <div class="combobox__item" :class="{ 'item-selected': itemSelected == item[code] }"
                    v-for="(item) in itemSearch" :key="item" @click="itemFilterOnClick(item)">
                    <div class="combobox__list-item__body__left">{{ item[code] }}</div>
                    <div class="combobox__list-item__body__right">{{ item[name] }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ENUM from '@/resources/enum';
import axios from 'axios';

export default {
    name: "ComboboxComponent",
    props: ["placeholder", "tabindex", "isValid", "api", "code", "name", "modelValue"],
    watch: {
        itemSelected(newValue) {
            this.$emit("update:modelValue", newValue);
        },
        modelValue(newValue) {
            this.itemSelected = newValue;
        },
    },
    data() {
        return {
            isFocus: false,
            isShowListCombobox: false,
            items: [],
            itemSearch: [],
            itemSelected: null,
            indexItemSelected: -1,
        }
    },
    methods: {
        /**
         * Chọn item combobox
         * Author: NVDQuang (30/12/2022)
         * @param {string} item giá trị được chọn 
         */
        itemFilterOnClick( item) {
            try {
                // reset lại list
                this.itemSearch = this.items;

                this.itemSelected = item[this.code];
                // this.itemFilter.push(item[this.code]);
                this.isShowListCombobox = false;
                this.$emit("getValue", item)
            } catch (error) {
                console.log(error);
            }
        },
        checKeyDown(event){
            var charCode = (event.which) ? event.which : event.keyCode;
            if (charCode == ENUM.KeyCode.Tab ) {
                this.isShowListCombobox = false;
            }
        },
        /***
        * Filter item combobox khi nhập vào input
        * Author: NVDQuang ( 09/01/2023)
        */
        onSearchItem() {
            try {
                var me = this;
                this.itemSearch = this.items.filter((x) =>
                    x[me.code].toUpperCase()?.includes(me.itemSelected.toUpperCase())
                );
                this.isShowListCombobox = true;
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Bấm phím xuống ở input combobox
         * Author: NVDQuang (09/01/2023)
         */
        inputOnKeyDown(event) {
            try {
                const keyCode = event.keyCode;
                switch (keyCode) {
                    case this.$ENUM.KeyCode.Enter:
                        // eslint-disable-next-line
                        let item = this.itemSearch[this.indexItemSelected];
                        this.itemFilterOnClick(item);
                        break;
                    case this.$ENUM.KeyCode.RowUp:
                        if (this.indexItemSelected > 0) {
                            this.indexItemSelected--;
                            this.itemSelected = this.itemSearch[this.indexItemSelected][this.code];
                        }
                        break;
                    case this.$ENUM.KeyCode.RowDown:
                        if (!this.isShowListCombobox) {
                            this.isShowListCombobox = true;
                        }
                        var maxLength = this.itemSearch.length;
                        if (this.indexItemSelected < maxLength - 1) {
                            this.indexItemSelected++;
                            this.itemSelected = this.itemSearch[this.indexItemSelected][this.code];
                        }
                        break;
                    case this.$ENUM.KeyCode.Tab:
                    this.isShowListCombobox = false;
                        break;
                }
            } catch (error) {
                console.log(error);
            }
        },

        /** 
        * Style khi focus vào combobox
        * Author :  Quang (30/12/2022)
        */
        comboboxOnFocus() {
            this.isFocus = true;
            // this.$refs.input.style.outline = "none";
            this.$refs.input.style.border = "none";
        },

        /** 
        * Style khi blur khỏi combobox
        * Author :  Quang (30/12/2022)
        */
        comboboxOnBlur() {
            this.isFocus = false;
        },

    },
    created() {
        if (this.api) {
            axios.get(this.api).then((response) => {
                this.items = response.data;
                this.itemSearch = response.data;
            })
        }
        this.itemSelected = this.modelValue;
    },

}
</script>

<style scoped>
.combobox {
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    /* height: 36px; */
    position: relative;
}

.combobox input {
    flex: 1;
    height: 36px;
    padding: 0 14px;
    outline: none;
    border: none;
}

.icon-down-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-down {
    display: flex;
    justify-content: center;
    align-items: center;
}

.combobox__list-item {
    width: 100%;
    padding: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 16px rgb(0 0 0 / 24%);
    position: absolute;
    top: 38px;
    display: flex;
    flex-direction: column;
    border-radius: 3.5px;
    z-index: 1;
}

.combobox__item {
    height: 36px;
    border-radius: 4px;
    padding: 0 8px;
    /* margin: 0 0 0 8px; */
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
}

.combobox__list-item__header {
    line-height: 36px;
    /* background-color: #99CAFF; */
    background-color: #CCE4FF;
}

.combobox__list-item__header .combobox__item {
    display: flex;
    /* column-gap: 12px; */
    column-gap: 7px;
}

.combobox__list-item__header .combobox__item div:first-child {
    width: 25%;
}

.combobox__list-item__body {
    line-height: 36px;
}

.combobox__list-item__body .combobox__item {
    display: flex;
    column-gap: 7px;
}

.combobox__list-item__body .combobox__item div:first-child {
    width: 25%;
}

.combobox__list-item__body .combobox__item:hover {
    /* background: #CCE4FF; */
    background: #E6F2FF;
}

.item-selected {
    background: #e8f5f7;
    background: #E6F2FF;
}

.combobox .header__right__select-year__btns {
    margin-right: 12px;
}


.combobox--focus {
    border: 1px solid #3395FF;
}

.border-red {
    border: 1px solid red;
}
</style>