<template>
  <input ref="input" type="text" :value="money" @input="changeValue" class="input input-focus input-number"
    :tabindex="tabindex" @keydown="onlyNumber" :class="{ 'border-red': isValid  }"/>
</template>

<script>
import CommonJS from '../../script/common'

export default {
  extends: CommonJS,
  name: "BaseInputMoney",
  props: ["modelValue", "tabindex", "isValid", ],
  watch: {
    modelValue(newValue) {
      this.value = newValue;
    },
  },
  computed: {
    money: function () {
      if (this.value) {
        // var money = new Intl.NumberFormat().format(this.value);
        var money = this.formartMoney(this.value);
        return money;
      } else {
        return 0;
      }
    },
  },
  data() {
    return {
      value: null,
    };
  },
  methods: {
    /**
     * Update giá trị khi value thay đổi
     * Author:  Quang (13/01/2023)
     */
    changeValue(event) {
      try {
        // console.log(event);
        var value = parseInt(event.target.value.replaceAll(".", ""));
        this.$emit("update:modelValue", value);
      } catch (error) {
        console.log(error);
      }
    },

    /**
    * Chỉ cho nhập số, không được nhập text
    * Author:  Quang (13/01/2023)
    * ModifiedBy :  Quang (15/01/2023)
    */
    onlyNumber(event) {
      try {
        var charCode = (event.which) ? event.which : event.keyCode;
        // console.log(charCode);
        if (charCode == 65 && event.ctrlKey == true) {
          return true;
        }
        if (charCode == 37 || charCode == 39 || (charCode > 95 && charCode < 106)) {
          return true;
        }

        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          // alert("sai");
          event.preventDefault();
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.value = this.modelValue;
  },
};
</script>
<style scoped>
.border-red{
    border: 1px solid red;
}
</style>
