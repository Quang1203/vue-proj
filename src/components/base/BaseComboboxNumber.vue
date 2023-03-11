<template>
    <div class="combobox " ref="combobox" :class="{ 'border-red': isValid, 'combobox--focus': isFocus }">
        <input type="text" step="0.01" min="0" ref="input" class="input input-number" @click="comboboxOnFocus"
            @focus="comboboxOnFocus" @blur="comboboxOnBlur" @keydown="onlyNumber" @input="changeValue" :value="number"
            :tabindex="tabindex" />
        <div class="header__right__select-year__btns">
            <div class="header__right__select-year__btns-up" @click="increaseNumber"></div>
            <div class="header__right__select-year__btns-down" @click="decreaseNumber"></div>
        </div>
    </div>
</template>

<script>
import ENUM from '@/resources/enum';
export default {
    name: "ComboboxNumberComponent",
    props: ["tabindex", "modelValue", "isValid",],
    watch: {
        valueInput(newValue) {
            this.$emit("update:modelValue", newValue);
        },
        modelValue(newValue) {
            this.valueInput = newValue;
        },

    },
    data() {
        return {
            valueInput: null,
            isFocus: false,
        }
    },
    computed: {
        number: function () {
            if (this.valueInput) {
                var number = this.valueInput.toString().replace(".", ",");
                return number;
            } else {
                return 0;
            }
        },
    },
    methods: {
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

        /***
        * Click tăng giá trị trên combobox number
        * Author:  Quang (30/12/2022)
        */
        increaseNumber() {
            try {
                this.valueInput++;
            } catch (error) {
                console.log(error);
            }
        },
        /***
        * Click giảm giá trị trên combobox number
        * Author:  Quang (30/12/2022)
        */
        decreaseNumber() {
            try {
                if (this.valueInput > 1)
                    this.valueInput--;
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Update giá trị khi value thay đổi
        * Author: NVDQuang (13/01/2023)
        */
        changeValue(event) {
            try {
                if(event.target.value){
                    var value = parseFloat(event.target.value.replaceAll(",", ".")).toFixed(2);
                }
                this.$emit("update:modelValue", value);
            } catch (error) {
                console.log(error);
            }
        },
        /**
        * Chỉ cho nhập số, không được nhập text
        * Author: NVDQuang (13/01/2023)
        * ModifiedBy : NVDQuang (15/01/2023)
        */
        onlyNumber(event) {
            try {
                var charCode = (event.which) ? event.which : event.keyCode;
                if (charCode == ENUM.KeyCode.Backspace) {
                    return true;
                }
                if (charCode == ENUM.KeyCode.KeyA && event.ctrlKey == true) {
                    return true;
                }
                // Bàn phím số bên phải bàn phím
                if (charCode == ENUM.KeyCode.Left || charCode == ENUM.KeyCode.Right || (charCode > 95 && charCode < 106)) {
                    return true;
                }
                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    event.preventDefault();
                }
                return true;
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.valueInput = this.modelValue;
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
    padding-right: 12px;
}

.combobox input {
    height: 36px;
    padding: 0 14px;
    flex: 1;
    outline: none;
    border: none;
}

.combobox--focus {
    border: 1px solid #3395FF;
}

.border-red {
    border: 1px solid red;
}
</style>