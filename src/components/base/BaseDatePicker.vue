<template>
    <div class="demo-date-picker" :class="{ 'border-red-required': isValid && !this.valueDate }">
        <el-date-picker class="date-picker" ref="input" :tabindex="tabindex" style="width:100%" v-model="valueDate"
            type="date" placeholder="Chọn ngày" format="DD/MM/YYYY" value-format="DD/MM/YYYY">
        </el-date-picker>
    </div>
</template>

<script >
import ENUM from '@/resources/enum';
export default {
    name: "BaseDateTimePicker",
    props: ["tabindex", "formMode", "modelValue", "isValid",],
    watch: {
        modelValue(newValue) {
            this.valueDate = newValue;
        },
        valueDate(newValue) {
            this.$emit("update:modelValue", newValue);
        },
    },
    data() {
        return {
            valueDate: null,
        }
    },
    created() {
        this.valueDate = new Date();
        let date = this.valueDate.getDate();
        date = date < 10 ? `0${date}` : date;
        let month = this.valueDate.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        let year = this.valueDate.getFullYear();
        this.valueDate = `${date}/${month}/${year}`;

        if (this.formMode == ENUM.FormMode.Edit) {
            this.valueDate = this.modelValue;
        }
    }
}


</script>
<style scoped>
.demo-date-picker {
    display: flex;
    width: 100%;
    height: 36px;
    padding: 0;
    flex-wrap: wrap;

}

.dialog__body__left .demo-date-picker {
    width: 100%;
}

.dialog__body__right-2 .dialog__body__right-container:first-child {
    width: calc(100% - 16px);
}
</style>
